const fs = require("fs");

hexo.extend.filter.register("after_clean", function () {
    // remove some other temporary files
    if (fs.existsSync(".cache")) {
        fs.rmSync(".cache", { recursive: true, force: true });
    }
});