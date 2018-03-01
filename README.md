# fis-mod-commonjs
用fis和modjs构建前端项目，基本的构建，能在浏览器端正常运行commonjs写法
> 通过fis的构建流程，从单文件编译到打包,再到用fis内置的server，整个流程都能跑通。

### 构建重点
fis的构建流程分为单文件编译和打包两个阶段
> 单文件编译分为lint(代码检查),parser(编译)，optimizer(代码优化)等阶段，比如下面的例子：
```
  fis.match('**.js', {
    isMod: true, // 把代码包装成amd格式
    useHash: false,
    optimizer: fis.plugin('uglify-js')
});
fis.match('**.less', {
    parser: fis.plugin('less'), // 编译
    rExt: '.css',
    optimizer: fis.plugin('uglify-js') // 压缩
 })
```
> 打包阶段
其中package阶段又分为prepackager、packager、postpackager (打包前处理，打包中处理，打包后处理)，
在fis-conf.js中有详细的解释。

