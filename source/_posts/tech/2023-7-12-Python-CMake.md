---
title: 使用 CMake 构建 PyTorch 和 Numpy C++ 拓展
tags:
  - 炼丹
  - python
  - pytorch
  - vscode
  - cmake
  - 指北
---

使用 CMake 构建 PyTorch 和 Numpy C++ 拓展能适应更复杂的项目并使用灵活的编译选项. 然而, 许多互联网上的教程中的方法已经不能在较新版本的 PyTorch 和 CMake 使用. 本文介绍了几种作者在近期测试成功的使用 CMake 构建 PyTorch 和 Numpy 拓展的方案. 需要注意的是, 许多 CMake 配置文件都包含了对某个依赖历史版本的问题引入的 Workaround, 不能在新版本正常工作, 本文所述的方法也有极大概率无法在将来工作.

<!-- more -->

下文给出三个 `CMakeLists.txt` 的例子, 其中问题的解决方案是通用的.

## 使用原生 Python.h 与 numpy.h

{% link https://github.com/src-d/kmcuda/blob/master/src/CMakeLists.txt %}

[kmcuda](https://github.com/src-d/kmcuda) 项目通过原生的 Python 和 Numpy 头文件实现了从 Python 调用 C++ 库, 并通过 Numpy ndarray 传递数据, 通过手动在 CMake 文件中配置 CUDA 相关静态链接库来使用 CUDA 加速计算. 原仓库的 `CMakeLists.txt` 文件无法在 Windows 上正常使用, 其 CUDA 命令行参数和 macOS 上的 Workaround 也很可能过时.

{% link https://github.com/Duanyll/kmcuda/blob/windows-build/src/CMakeLists.txt %}

这个分支的 `CMakeLists.txt` 文件能在 Windows 上工作.

{% folding 完整 CMakeLists.txt %}

```cmake
cmake_minimum_required(VERSION 3.16 FATAL_ERROR)

project(KMCUDA CXX C CUDA)
set(CMAKE_MODULE_PATH ${CMAKE_HOME_DIRECTORY}/cmake)

set (CMAKE_CXX_STANDARD 11)
set (CMAKE_CXX_STANDARD_REQUIRED ON)
set (CMAKE_CUDA_STANDARD 11)
set (CMAKE_CUDA_STANDARD_REQUIRED ON)

find_package(OpenMP REQUIRED)
if (MSVC)
  set (OpenMP_CXX_FLAGS "${OpenMP_CXX_FLAGS} -openmp:experimental")
endif()
set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${OpenMP_CXX_FLAGS}")

find_package(CUDAToolkit REQUIRED)
if (NOT CUDA_ARCH)
  set(CUDA_ARCH 86)
endif()
set(CMAKE_CUDA_ARCHITECTURES ${CUDA_ARCH})

if (NOT DISABLE_PYTHON)
  find_package(PythonInterp 3 REQUIRED)
  find_package(PythonLibs 3 REQUIRED)
  if (NOT NUMPY_INCLUDES)
    execute_process(COMMAND ${PYTHON_EXECUTABLE} -c "import numpy; print(numpy.get_include())" OUTPUT_VARIABLE NUMPY_INCLUDES)
  endif()
endif()

if (NOT DISABLE_R)
  find_package(R)
endif()

set(SOURCE_FILES kmcuda.cc kmcuda.h wrappers.h private.h fp_abstraction.h tricks.cuh
                 metric_abstraction.h kmeans.cu knn.cu transpose.cu)
if (PYTHONLIBS_FOUND)
  list(APPEND SOURCE_FILES python.cc)
endif()
if (R_FOUND)
  list(APPEND SOURCE_FILES r.cc)
endif()

add_library(KMCUDA SHARED ${SOURCE_FILES})

add_compile_definitions(_MWAITXINTRIN_H_INCLUDED _FORCE_INLINES)
add_compile_definitions(CUDA_ARCH=${CUDA_ARCH})

target_link_libraries(KMCUDA CUDA::curand)
target_link_libraries(KMCUDA OpenMP::OpenMP_CXX)

if (PYTHONLIBS_FOUND)
  include_directories(${PYTHON_INCLUDE_DIRS} ${NUMPY_INCLUDES})
  target_link_libraries(KMCUDA ${PYTHON_LIBRARIES})
endif()

if (R_FOUND)
  include_directories(${R_INCLUDE_DIRS})
  target_link_libraries(KMCUDA ${R_LIBRARIES})
endif()

if (SUFFIX)
  set_target_properties(KMCUDA PROPERTIES SUFFIX ${SUFFIX})
endif()
```

{% endfolding %}

### 使用正确的 Conda 环境

由于 Conda 的实现方式, 不能通过在 `CMakeLists.txt` 中调用 `conda` 命令来设置 Python 环境 ^[https://discourse.cmake.org/t/create-and-activate-python-conda-environment-with-cmake/5777]. 需要先在终端中激活 Conda 环境

```sh
conda activate my_env
cmake ...
```

如果使用 Visual Studio Code 的 CMake Tools 插件, 似乎 `environmentSetupScript` 选项存在问题, 在 Windows 上指定该选项似乎会被 `visualStudio` 选项 (用与加载 Visual Studio 的 `vcvarsall.bat`) 覆盖, 从而无法加载 Conda 环境. 一种方法是*先关闭所有的 VSCoda 窗口*, 然后再在终端中使用

```sh
conda activate my_env
code .
```

来打开已具有正确 Python 环境的 VSCode 窗口, 并使用此拓展进行 CMake Configure.

### 通过 Python 解释器查找 Numpy 头文件

```cmake
find_package(PythonInterp 3 REQUIRED)
find_package(PythonLibs 3 REQUIRED)
if (NOT NUMPY_INCLUDES)
  execute_process(COMMAND ${PYTHON_EXECUTABLE} -c "import numpy; print(numpy.get_include())" OUTPUT_VARIABLE NUMPY_INCLUDES)
endif()
```

无需手动设置 `NUMPY_INCLUDES` 变量. Numpy 的 C 接口只含有头文件, 此后只需要

```cmake
include_directories(${PYTHON_INCLUDE_DIRS} ${NUMPY_INCLUDES})
```

另外,

```cmake
find_package(PythonLibs 3 REQUIRED)
```

通常能正确查找到 `PYTHON_INCLUDE_DIRS` 变量. 如果查找失败, 可以使用 [下面的方法](#通过-python-解释器查找-python-头文件)

## 使用 SWIG 和 Numpy.i

{% link https://www.swig.org/ %}

SWIG 用于生成 C++ 的 Python 接口, 能生成将 C++ 类和 STL 容器翻译为 Python 类和容器的胶水代码. [这个仓库](https://github.com/hijkzzz/alpha-zero-gomoku/blob/master/CMakeLists.txt) 实现了通过 SWIG, 在 Python 代码中操作 C++ 类并传递 Numpy 数组. 也实现了在 C++ 代码中链接并调用 PyTorch 实现 CUDA 加速. 然而, 这个配置文件没有实现直接向 C++ 代码传递 PyTorch Tensor.

{% folding 完整 CMakeLists.txt %}

```cmake
cmake_minimum_required(VERSION 3.14.0)
project(libzerogomoku)

# option
option(WRAP_LIB "wrap library" ON)
option(UNIT_TEST "unit test" OFF)

set(CMAKE_CXX_STANDARD 14)

# ----------------- pytorch -----------------
if (NOT TORCH_CMAKE_PATH)
    # run python and read pytorch cmake path
    execute_process(COMMAND python -c "import torch; print(torch.utils.cmake_prefix_path)" OUTPUT_VARIABLE TORCH_CMAKE_PATH OUTPUT_STRIP_TRAILING_WHITESPACE)
    # cache TORCH_CMAKE_PATH
    set(TORCH_CMAKE_PATH ${TORCH_CMAKE_PATH} CACHE PATH "TORCH_CMAKE_PATH")
endif()
message(STATUS "TORCH_CMAKE_PATH: ${TORCH_CMAKE_PATH}")
set(CMAKE_PREFIX_PATH ${TORCH_CMAKE_PATH})
message(STATUS "CMAKE_PREFIX_PATH: ${CMAKE_PREFIX_PATH}")
# suppress warning C4624 when using msvc
if(MSVC)
    add_compile_options(/wd4624)
endif()
# find torch
find_package(Torch REQUIRED)

# ----------------- swig -----------------
# find swig
find_package(SWIG REQUIRED)
include(${SWIG_USE_FILE})

# ----------------- python -----------------
# find python
find_package(Python 3.6 REQUIRED)
# run python and read python include path
execute_process(COMMAND python -c "from distutils.sysconfig import get_python_inc; print(get_python_inc())" OUTPUT_VARIABLE Python_INCLUDE_DIRS OUTPUT_STRIP_TRAILING_WHITESPACE)
message(STATUS "Python_INCLUDE_DIRS: ${Python_INCLUDE_DIRS}")
include_directories(${Python_INCLUDE_DIRS})
# if PYTHON_LIBRARIES is defined, use it
if(PYTHON_LIBRARIES)
    set(Python_LIBRARIES ${PYTHON_LIBRARIES})
endif()
# if Python_LIBRARIES is not found, warn user
if(NOT Python_LIBRARIES)
    message(WARNING "Python_LIBRARIES not found, please set it manually")
endif()
message(STATUS "Python_LIBRARIES: ${Python_LIBRARIES}")
add_compile_definitions(SWIG_PYTHON_INTERPRETER_NO_DEBUG)

# ----------------- numpy -----------------
# run python and get numpy include path
execute_process(COMMAND python -c "import numpy; print(numpy.get_include())" OUTPUT_VARIABLE NUMPY_INCLUDE_DIRS OUTPUT_STRIP_TRAILING_WHITESPACE)
message(STATUS "NUMPY_INCLUDE_DIRS: ${NUMPY_INCLUDE_DIRS}")
include_directories(${NUMPY_INCLUDE_DIRS})
# download numpy.i if not found
if(EXISTS "lib/numpy.i")
    message(STATUS "numpy.i found")
else()
    message(STATUS "numpy.i not found, downloading...")
    file(DOWNLOAD https://raw.githubusercontent.com/numpy/numpy/master/tools/swig/numpy.i lib/numpy.i)
endif()

# add sources
include_directories(./src)
include_directories("${CMAKE_CURRENT_BINARY_DIR}/lib")
aux_source_directory(./src SOURCES)

# swig
if(WRAP_LIB)
    set_property(SOURCE ./src/libzerogomoku.i PROPERTY CPLUSPLUS ON)
    swig_add_library(libzerogomoku TYPE SHARED LANGUAGE python SOURCES ./src/libzerogomoku.i ${SOURCES})
    swig_link_libraries(libzerogomoku ${Python_LIBRARIES} ${TORCH_LIBRARIES})

    # The following code block is suggested to be used on Windows.
    # According to https://github.com/pytorch/pytorch/issues/25457,
    # the DLLs need to be copied to avoid memory errors.
    # if (WIN32)
    #     file(GLOB TORCH_DLLS "${TORCH_INSTALL_PREFIX}/lib/*.dll")
    #     add_custom_command(TARGET _libzerogomoku
    #                        POST_BUILD
    #                        COMMAND ${CMAKE_COMMAND} -E copy_if_different
    #                        ${TORCH_DLLS}
    #                        $<TARGET_FILE_DIR:_libzerogomoku>)
    # endif (WIN32)
endif()

# unit test
if(UNIT_TEST)
    add_library(test_lib ${SOURCES})
    target_link_libraries(test_lib ${TORCH_LIBRARIES})

    add_executable(thread_pool_test ./test/thread_pool_test.cpp)
    target_link_libraries(thread_pool_test test_lib)

    add_executable(gomoku_test ./test/gomoku_test.cpp)
    target_link_libraries(gomoku_test test_lib)

    add_executable(libtorch_test ./test/neural_network_test.cpp)
    target_link_libraries(libtorch_test test_lib)

    add_executable(mcts_test ./test/mcts_test.cpp)
    target_link_libraries(mcts_test test_lib)
endif()
```

{% endfolding %}

### 编写 SWIG 接口

可以通过 pip 安装 SWIG 到命令行

```sh
pip install swig
```

SWIG 将 `.i` 文件展开成胶水 C++ 代码.

{% link https://github.com/Duanyll/alpha-zero-gomoku/blob/b05f3327f28e8e0b1a4088536aae23d5c66d54d4/src/libzerogomoku.i %}

```swig
%module(threads="1") libzerogomoku

%{
#define SWIG_FILE_WITH_INIT
#include "gomoku.h"
#include "neural_network.h"
#include "mcts.h"
%}
```

被百分号大括号包围的 C++ 代码不会被 SWIG 解析. 这将在胶水代码中包含这些头文件.

```swig
%include "gomoku.h"
%include "mcts.h"
```

`%include` 指令让 SWIG 解析头文件中的 C++ 函数与类等声明, 生成胶水代码. 需要注意, SWIG 只支持有限的 C++ 语法, 不要使用复杂的 C++ 语法. 如果 SWIG 无法解析某个头文件中的语法, 可以不引用头文件, 而是直接在 SWIG 文件中编写简化的 C++ 声明.

```swig
%include "std_vector.i"
namespace std {
  %template(IntVector) vector<int>;
  %template(IntVectorVector) vector<vector<int>>;
  %template(DoubleVector) vector<double>;
  %template(DoubleVectorVector) vector<vector<double>>;
  %template(CharVector) vector<char>;
}
%include "std_string.i"
```

引入一些 STL 类型的支持. 需要为 STL 模版类型设置别名.

### 为 SWIG 接口添加 Numpy 支持

{% link https://numpy.org/doc/stable/reference/swig.interface-file.html %}

Numpy 提供对 SWIG 的支持, 可以不在 C 代码中引用 Numpy 的头文件, 而是让 SWIG 把 Numpy 数组对象转换成特定的 C 函数原型 (参数中包含指向数据的裸指针和数组长度). 需要在 SWIG 接口文件中引入 `numpy.i` 并选择需要转换的原型

```swig
%include "numpy.i"
%apply (int DIM1, int DIM2, int* INPLACE_ARRAY2) {(int dim1, int dim2, int *data)};
```

之后具有 `(int dim1, int dim2, int *data)` 参数列表的函数就可以接受可就地修改的 numpy 二维数组. 更多的原型可在 [这里](https://numpy.org/doc/stable/reference/swig.interface-file.html#available-typemaps) 查找.

```swig
%{
  static struct InitNumpy {
      InitNumpy() { _import_array(); }
  } _init_numpy;
%}
```

在接口胶水代码中插入这段代码, 并保证 `_import_array()` 函数只被调用一次 ^[通常也不会多次调用它, 其他部分的 C++ 代码都不需要引用 Numpy 的头文件]. 这个函数将会设置 Numpy 函数调用的基地址.

### 在 CMake 中使用 SWIG

需要获得 Numpy 的包含文件目录

```cmake
# run python and get numpy include path
execute_process(COMMAND python -c "import numpy; print(numpy.get_include())" OUTPUT_VARIABLE NUMPY_INCLUDE_DIRS OUTPUT_STRIP_TRAILING_WHITESPACE)
message(STATUS "NUMPY_INCLUDE_DIRS: ${NUMPY_INCLUDE_DIRS}")
include_directories(${NUMPY_INCLUDE_DIRS})
```

下面的代码自动下载 `numpy.i`

```cmake
# download numpy.i if not found
if(EXISTS "lib/numpy.i")
    message(STATUS "numpy.i found")
else()
    message(STATUS "numpy.i not found, downloading...")
    file(DOWNLOAD https://raw.githubusercontent.com/numpy/numpy/master/tools/swig/numpy.i lib/numpy.i)
endif()
```

并需要把下载的 `numpy.i` 添加到包含目录

```cmake
include_directories("${CMAKE_CURRENT_BINARY_DIR}/lib")
```

查找 SWIG. `FindSwig` 是 CMake 自带的.

```cmake
# find swig
find_package(SWIG REQUIRED)
include(${SWIG_USE_FILE})
```

使用专门的函数声明 SWIG 库文件和静态链接

```cmake
set_property(SOURCE ./src/libzerogomoku.i PROPERTY CPLUSPLUS ON)
swig_add_library(libzerogomoku TYPE SHARED LANGUAGE python SOURCES ./src/libzerogomoku.i ${SOURCES})
swig_link_libraries(libzerogomoku ${Python_LIBRARIES} ${TORCH_LIBRARIES})
```

### 通过 Python 解释器查找 Python 头文件

```cmake
# find python
find_package(Python 3.6 REQUIRED)
# run python and read python include path
execute_process(COMMAND python -c "from distutils.sysconfig import get_python_inc; print(get_python_inc())" OUTPUT_VARIABLE Python_INCLUDE_DIRS OUTPUT_STRIP_TRAILING_WHITESPACE)
message(STATUS "Python_INCLUDE_DIRS: ${Python_INCLUDE_DIRS}")
include_directories(${Python_INCLUDE_DIRS})
# if PYTHON_LIBRARIES is defined, use it
if(PYTHON_LIBRARIES)
    set(Python_LIBRARIES ${PYTHON_LIBRARIES})
endif()
# if Python_LIBRARIES is not found, warn user
if(NOT Python_LIBRARIES)
    message(WARNING "Python_LIBRARIES not found, please set it manually")
endif()
message(STATUS "Python_LIBRARIES: ${Python_LIBRARIES}")
```

`FindPython` 经常找不到 `Python_INCLUDE_DIRS`, 这时可以通过 Python 解释器查找.

## 使用 PyTorch 和 pybind11

很遗憾, PyTorch 的 C++ 接口的 API 文档十分简略. 将就着猜猜怎么用吧!

{% folding 完整 CMakeLists.txt %}

```cmake
cmake_minimum_required (VERSION 3.21)

set (CMAKE_CXX_STANDARD 14)
set (CMAKE_CXX_STANDARD_REQUIRED ON)
set (CMAKE_CUDA_STANDARD 14)
set (CMAKE_CUDA_STANDARD_REQUIRED ON)

project ("ConvByCluster" LANGUAGES CXX CUDA)

if (MSVC)
  # suppress C4624
  set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /wd4624")
endif()

find_package(PythonInterp 3 REQUIRED)
find_package(PythonLibs 3 REQUIRED)

execute_process(COMMAND ${PYTHON_EXECUTABLE} -c "import torch; print(torch.utils.cmake_prefix_path)" OUTPUT_VARIABLE PYTORCH_CMAKE_PREFIX_PATH OUTPUT_STRIP_TRAILING_WHITESPACE)
list(APPEND CMAKE_PREFIX_PATH "${PYTORCH_CMAKE_PREFIX_PATH}/Torch")
message("PYTORCH_CMAKE_PREFIX_PATH ${PYTORCH_CMAKE_PREFIX_PATH}")
message("CMAKE_PREFIX_PATH ${CMAKE_PREFIX_PATH}")
find_package(Torch REQUIRED)
find_library(TORCH_PYTHON_LIBRARY torch_python PATHS "${TORCH_INSTALL_PREFIX}/lib")

message("TORCH_LIBRARIES: ${TORCH_LIBRARIES}")
message("TORCH_PYTHON_LIBRARY: ${TORCH_PYTHON_LIBRARY}")
message("CMAKE_CUDA_FLAGS: ${CMAKE_CUDA_FLAGS}")
message("CUDA_NVCC_FLAGS: ${CUDA_NVCC_FLAGS}")

include_directories(${PYTHON_INCLUDE_DIRS})

add_library(conv_by_cluster SHARED "kernel.cpp")
target_link_libraries(conv_by_cluster
  ${PYTHON_LIBRARIES}
  ${TORCH_LIBRARIES}
  ${TORCH_PYTHON_LIBRARY}
)
target_compile_definitions(conv_by_cluster PRIVATE TORCH_EXTENSION_NAME=conv_by_cluster)
```

{% endfolding %}

### 在 C++ 中调用 PyTorch

确保已在 Python 环境中安装 `torch`, 即可通过 Python 解释器找到 PyTorch 库

```cmake
execute_process(COMMAND ${PYTHON_EXECUTABLE} -c "import torch; print(torch.utils.cmake_prefix_path)" OUTPUT_VARIABLE PYTORCH_CMAKE_PREFIX_PATH OUTPUT_STRIP_TRAILING_WHITESPACE)
list(APPEND CMAKE_PREFIX_PATH "${PYTORCH_CMAKE_PREFIX_PATH}/Torch")
message("PYTORCH_CMAKE_PREFIX_PATH ${PYTORCH_CMAKE_PREFIX_PATH}")
message("CMAKE_PREFIX_PATH ${CMAKE_PREFIX_PATH}")
find_package(Torch REQUIRED)
```

`FindTorch` 已经把 `PyTorch` 的头文件添加到包含目录中, 还需要静态链接 `TORCH_LIBRARIES`

```cmake
target_link_libraries(conv_by_cluster
  ${PYTHON_LIBRARIES}
  ${TORCH_LIBRARIES}
)
```

这样, 在 C++ 代码中

```cpp
#include <torch/torch.h>

int main() {
  torch::Tensor tensor = torch::rand({2, 3}).to(torch::kCUDA);
  std::cout << tensor << std::endl;
}
```

即可使用 PyTorch.

### 添加 pybind11 导出

PyTorch 的包含文件中已经引用了 pybind11. 还需要额外静态链接一个库

```cmake
find_library(TORCH_PYTHON_LIBRARY torch_python PATHS "${TORCH_INSTALL_PREFIX}/lib")

target_link_libraries(conv_by_cluster
  ${PYTHON_LIBRARIES}
  ${TORCH_LIBRARIES}
  ${TORCH_PYTHON_LIBRARY}
)
```

在 C++ 代码中

```cpp
#include <torch/extension.h>

// ...

torch::Tensor Test_forward_cpu(const torch::Tensor &x, const torch::Tensor &y) {
  // ...
}

std::vector<torch::Tensor> Test_backward_cpu(const torch::Tensor &gradOutput) {
  // ...
}

PYBIND11_MODULE(TORCH_EXTENSION_NAME, m) {
  m.def("forward", &Test_forward_cpu, "Test forward");
  m.def("backward", &Test_backward_cpu, "Test backward");
}
```

需要添加定义

```cmake
target_compile_definitions(conv_by_cluster PRIVATE TORCH_EXTENSION_NAME=conv_by_cluster)
```

使得 `PYBIND11_MODULE` 生成的 `PyInit_xxx` 函数调用名称和可执行文件名相同. 另外, 在 Windows 上, 需要把 `.dll` 后缀重命名为 `.pyd` 才能用

```python
from conv_by_cluster import forward, backward
```

引入.

### 解决动态链接问题

在 Windows 上, 如果生成了调用 PyTorch 的可执行文件, 可能需要把 PyTorch 使用的各种动态链接库复制到可执行文件目录

```cmake
# The following code block is suggested to be used on Windows.
# According to https://github.com/pytorch/pytorch/issues/25457,
# the DLLs need to be copied to avoid memory errors.
if (WIN32)
    file(GLOB TORCH_DLLS "${TORCH_INSTALL_PREFIX}/lib/*.dll")
    add_custom_command(TARGET _libzerogomoku
                       POST_BUILD
                       COMMAND ${CMAKE_COMMAND} -E copy_if_different
                       ${TORCH_DLLS}
                       $<TARGET_FILE_DIR:_libzerogomoku>)
endif (WIN32)
```

才能正常运行. 如果是生成了 pybind11 接口库, 则不需要这么做, 应当在 Python 代码中先引入 PyTorch 再引入拓展库.

```python
import torch
from conv_by_cluster import forward, backward
```

如果先引入了拓展库, 容易导致找不到 DLL 或者 DLL 冲突. 另外, 其他的一些 Python CUDA 包, 如 `bitsandbytes` 等在 Windows 上找不到 cudart, cudnn 等问题都可以尝试先 `import torch`. PyTorch 会加载这些动态链接库, 而且这些库是内置在 PyTorch 中的, 通常不会找不到.

## 调试 C++ 代码

使用 Conda 环境时通常不会安装 Python 解释器的调试库 `pythonx.xx_d.lib`, 通常调试代码时也不需要对 Python 解释器本身进行调试, 然而, 如果定义了 `_DEBUG` 符号, `Python.h` 会强制通过 `#pragma` 链接 Python 调试库, 导致链接出错. ^[这个调试库通过 pragma 引入, 在 CMake 生成的项目文件中并没有引用, 很难排查]

```c++
#ifdef _DEBUG
#undef _DEBUG
#include <Python.h>
#define _DEBUG 1
#else
#include <Python.h>
#endif
```

在 C++ 代码对 `Python.h` 暂时取消 `_DEBUG` 宏. `torch/extension.h` 引用了 `Python.h`, 也取消 `_DEBUG`

```cpp
#ifdef _DEBUG
#undef _DEBUG
#include <torch/extension.h>
#define _DEBUG 1
#else
#include <torch/extension.h>
#endif
```

SWIG 提供了一个宏定义可实现上面的效果

```cmake
add_compile_definitions(SWIG_PYTHON_INTERPRETER_NO_DEBUG)
```

使用 VSCode 调试从 Python 调用的 C++ 代码, 可以使用附加启动功能. 在 `launch.json` 中添加配置

```json
{
  "name": "(Windows) 附加",
  "type": "cppvsdbg",
  "request": "attach",
  "processId": "${command:pickProcess}"
}
```

先启动 Python 解释器 (可以附加 Python 调试器). 使用

```python
import os; print(os.getpid())
```

查看 PID, 不要结束 Python 调试, 启动 C++ 调试附加到该进程, 即可命中 C++ 代码中的断点.
