---
title: 在 ComfyUI 中优雅地函数式编程
tags:
  - comfyui
  - 图论
  - 指北
repo: Duanyll/comfyui_functional
cover: https://img.duanyll.com/img/f60c2562.png
---

我给 ComfyUI 写了一个插件 [ComfyUI-Functional](https://github.com/Duanyll/comfyui_functional)，能让你在 ComfyUI 的节点图中直观地定义函数，实现在工作流中复用流程，还能多次地、动态地调用函数，从而以函数式编程的形式直观地实现循环、递归等复杂控制结构，构建图灵完备的工作流。

非常建议将本节点包与 [Basic Data Handling](https://github.com/StableLlama/ComfyUI-basic_data_handling) 搭配使用，这个节点包提供了大量 Python 基本数据类型的节点，能让你在 ComfyUI 中更方便地编程。

## 定义函数

定义函数非常简单。只需要在节点图中添加 `Function Parameter` 节点和 `Function End` 节点，它们分别表示函数的参数和返回值，它们之间的节点就构成了函数体。

![定义一个 x + 1 函数](https://img.duanyll.com/img/fa65de7f.png)

函数可以有多个参数，但只能有一个返回值。定义具有多个输入参数的函数时，给 `Function Parameter` 增加编号来区分不同的参数。

{% box 提示 %}

函数只能有一个返回值的限制是因为在 ComfyUI 的 Python 代码中很难声明输出数量可变的节点。如果你需要返回多个值，可以把它们打包成一个 `LIST`。

{% endbox %}

![定义 x + y 函数](https://img.duanyll.com/img/e0222031.png)

下面是一个更实际的例子，我们将 ComfyUI 的官方 Flux Fill 模型工作流封装成一个函数，具有两个输入参数，分别是待 Inpaint 的图像和 Mask，返回值是 Inpaint 后的图像。

![Inpaint 函数](https://img.duanyll.com/img/472052a6.png)

{% box 提示 %}

可以在函数里使用不依赖于 `Function Parameter` 的节点，这些节点只会在函数定义时执行一次，并在函数调用时复用它们的输出。这样就可以在函数里使用加载的模型，或者固定的文本 Condition 等，就像在普通工作流中使用它们一样。

{% endbox %}

{% box 提示 %}

可以双击修改 `Function Parameter` 节点的标题，备注参数的含义。

{% endbox %}

## 调用函数

定义函数后函数不会立刻运行，`Function End` 节点的输出是一个函数对象，需要使用 `Call Function` 节点来调用它。

{% box 提示 %}

如果立刻运行上面例子里的工作流，就会产生一个 "Prompt has no outputs" 错误。

{% endbox %}

将 `Function End` 节点的输出连接到 `Call Function` 节点的 `Function` 输入端口，然后依次连接参数，就可以从 `Call Function` 节点的输出端口获得函数的返回值。

![调用 x + 1 函数](https://img.duanyll.com/img/8a4f8feb.png)

`Call Function` 节点可以连接任意数量的函数输入端口，要调用具有多个参数的函数，只需要依次连接所有参数即可。

![调用 x / y 函数](https://img.duanyll.com/img/381d119a.png)

函数很有用的地方在于，可以在工作流中多次调用同一个函数，从而复用节点图。下面的例子两次调用了 $x^2+1$ 函数。

![在工作流中复用函数](https://img.duanyll.com/img/dfc6e532.png)

在函数里也可以调用别的函数，从而实现更复杂的功能。下面的例子先定义了 $f(x, y) = x + y$, 然后定义了 $g(x) = f(x, x + 1)$, 最后调用了 $g(2)$ 得到结果 5.

![在函数中调用其他函数](https://img.duanyll.com/img/e24a5f02.png)

{% folding 高级技巧：递归函数 %}

甚至可以实现递归的函数调用！只需要把函数对象本身作为参数传入 `Call Function` 节点即可。下面的例子定义了这个函数：

$$
f(x) = \begin{cases}
  x + f(x - 1) & x > 0 \\
  1 & x \leq 0
\end{cases}
$$

![递归调用函数](https://img.duanyll.com/img/76821b2e.png)

计算 $f(3)$ 的结果是 7.

使用递归函数时，要非常小心地设置终止条件，以免造成无限递归。尽管递归函数结合 `if/else` 节点就可以实现图灵完备的计算，使用下面介绍的高阶函数来实现循环通常会更简单、更安全。

{% endfolding %}

## 使用高阶函数

> 这个节点包通过高阶函数的形式实现循环和复杂控制结构，这比其他节点包采用的形式更加直观和通用，确保工作流可以通过 API 调用在无需额外交互的情况下运行。

高阶函数是指以函数作为输入或输出的函数。ComfyUI-Functional 提供了几个常用的高阶函数节点，能让你更方便地实现循环等复杂控制结构。

{% box 重要提示 color:yellow %}

使用本节点包的函数处理数组时，请务必使用 [Basic Data Handling](https://github.com/StableLlama/ComfyUI-basic_data_handling) 节点包提供的 `LIST` 数据类型来传递列表，而**不要使用 ComfyUI 自带的 Data List 功能**！

将 Data List 作为函数的参数和返回值会导致不可预期的错误或卡顿，且由于 ComfyUI 的限制，目前暂时无法检测到这种错误。你可以使用 [Basic Data Handling](https://github.com/StableLlama/ComfyUI-basic_data_handling) 节点包的 `convert to Data List` 和 `convert to LIST` 节点在 `LIST` 和 Data List 之间转换。

{% endbox %}

![Map 高阶函数](https://img.duanyll.com/img/1459c201.png)

将 `Function End` 节点产生的函数对象传给各类高阶函数就可以轻松对列表应用函数，或者实现迭代计算。目前内置了八个 Mathematica 风格的高阶函数，分别是：

| 高阶函数  | 作用                                                               | 解释                                                                                             |
| --------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Comap     | `Comap[{f, g, h}, x] := {f[x], g[x], h[x]}`                        | 将多个函数应用于同一个输入，例如比较不同方法对相同输入的效果                                     |
| Fold      | `Fold[f, x, {a, b, c}] := f[f[f[x, a], b], c]`                     | 从左到右迭代地将函数应用于列表元素，类似于 Python 的 `functools.reduce`                          |
| Map       | `Map[f, {a, b, c}] := {f[a], f[b], f[c]}`                          | 将函数应用于列表的每个元素，类似于 Python 的 `map`                                               |
| MapIndexed | `MapIndexed[f, {a, b, c}] := {f[a, 1], f[b, 2], f[c, 3]}`          | 将函数应用于列表的每个元素，并传入元素的索引作为第二个参数                                       |
| Nest      | `Nest[f, x, n] := f(f(...f(x)...))` (n 次)                         | 将函数迭代地应用于初始值 n 次                                                                    |
| NestWhile | `NestWhile[f, x, p]`                                               | 迭代地将函数应用于初始值，直到不满足条件 p (`p[x]` 是返回 BOOLEAN 值的函数)，可以实现 While 循环 |
| Select    | `Select[p, {a, b, c}] := {x                                        | x ∈ {a, b, c}, p[x]}`                                                                            | 选择列表中满足条件的元素，类似于 Python 的 `filter` |
| TakeWhile | `TakeWhile[p, {a, b, c}] := {a, b, ..., y}` (直到 `p[y]` 为 False) | 从列表开头开始选择元素，直到遇到第一个不满足条件的元素为止                                       |

结合高阶函数，在工作流中实现流程控制非常容易。

{% box 提示 %}

需要在循环体中对多个变量应用迭代？请考虑将多个变量打包成一个 `LIST`，然后在循环体中使用 `LIST` 的解包功能来访问各个变量。

{% endbox %}

{% folding 实现更多的高阶函数 %}

编写一点 Python 代码以实现更多高阶函数非常容易！ComfyUI-Functional 节点包使用 Python 协程来实现多次函数调用。请看 `NestWhile` 节点的实现：

```python
class NestWhile(CoroutineNodeBase):
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "function": ("CLOSURE",),
                "x": (AnyType("*"), ),
                "predicate": ("CLOSURE",),
                "max_depth": ("INT", {"default": 10, "min": 1, "max": 100}),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID"
            }
        }
        
    CATEGORY = "duanyll/functional/high_order"
    RETURN_TYPES = (AnyType("*"), )
    
    def run_coroutine(self, function, x, predicate, max_depth):
        for _ in range(max_depth):
            should_continue = yield (predicate, [x])
            if not should_continue:
                break
            x = yield (function, [x])
        return x
```

`NestWhile` 节点继承自 `CoroutineNodeBase`，并实现了 `run_coroutine` 方法。这个方法是一个 Python 协程，使用 `yield` 语句来多次调用传入的函数。

{% endfolding %}

## 利用副作用

在函数式编程中，函数通常不应该有副作用，即不应该修改外部状态或依赖于外部状态。然而 ComfyUI-Functional 节点包提供了一些节点，允许你在函数中使用副作用，轻松地实现一些功能。

`Sow` 和 `Reap` 节点允许你在函数中收集数据。`Sow` 节点将数据添加到一个隐含的列表中，而 `Reap` 节点则返回这个列表。这样你就可以在函数中动态地收集数据，而不需要显式地传递和返回它们。

![使用 Sow 和 Reap 在循环中收集数据](https://img.duanyll.com/img/f60c2562.png)

{% box 提示 %}

为了保证在反复运行同一个工作流时得到完整的结果，运行带有副作用的工作流时，将会按需要禁用 ComfyUI 的缓存功能，这意味着可能会进行重复的计算，从而增加运行时间。

{% endbox %}

对于带有副作用的节点来说，节点之间执行的先后顺序会影响结果。为了控制执行顺序，本节点包提供的有副作用的节点都具有一个 `signal` 输入端口和对应的输出端口，节点会原封不动地传递这个值。为了确保副作用节点在某个节点之后执行，将这个节点的输出连接到副作用节点的 `signal` 输入端口；为了使副作用节点在某个节点之前执行，将 `signal` 串联到这个节点的输入连接上。

## 调试函数

本节点包约定：所有依赖于 `Function Parameter` 的节点（作为函数体的一部分），其输出都应该最终被 `Function End` 节点连接。如果有输出节点直接依赖于函数参数，就会导致错误（ComfyUI 默认对所有的输出节点求值，这样就会导致函数体在定义时就被执行）。那么如何观察函数体里的中间结果输出？本节点包提供了 `Inspect` 节点，可以用来在函数运行的过程中观察中间结果。

![使用 Inspect 节点动态观察函数内的值](https://img.duanyll.com/img/48e09d07.png)

`Inspect` 节点有一个 `signal` 输入输出端口，可以用来控制它的执行顺序。`Inspect` 节点的第二组 `value` 输入输出端口用来连接待观察的值。使用时，将一个输出节点 **直接** （不经过其他节点）连接到 `Inspect` 的第二个输出端口，就可以在函数运行时动态观察这个值，而不强制执行函数体。

如果函数运行太快，导致结果一闪而过，可以在 `Inspect` 节点前面或后面增加一个 `Sleep` 节点来延长观察时间。

{% box 提示 %}

`Inspect` 节点实际的行为是只有它的输出 `signal` 被依赖时，才触发 `value` 绑定的输出节点。因此在使用时确保它的 `signal` 在恰当的位置被连接。

即使不在函数体中，`Inspect` 节点也非常有用。在 If/Else 的分支中，使用 `Inspect` 节点可以防止强制对某个分支求值，只有在分支被选中时才会更新结果。

{% endbox %}