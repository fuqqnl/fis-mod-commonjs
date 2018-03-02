<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>fis3+modjs</title>
    <!-- <script type="text/javascript" src="static/vendor/mod.js"></script> -->
</head>
<body>
<h2>fis3+modjs构建commonjs代码</h2>
<div>用到的必要fis插件：
    <p>fis3-postpackager-loader</p>
    <small>作用是静态资源前端加载器。用来分析页面中使用的依赖，并将这些资源做一定优化后，插入到页面中。</small>
</div>
<script>
    var initMain = require('./static/main.js');
    initMain.init();
</script>
</body>
</html>