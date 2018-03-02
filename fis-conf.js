fis.require('smarty')(fis);
fis.set('namespace', 'fisMod');
/**
* 单文件编译阶段
* 分为lint(代码检查),parser(编译)，optimizer(代码优化)等阶段
*/
fis.match('**.js', {
    isMod: true, // 把代码包装成amd格式
    useHash: false
});
fis.match('static/vendor/mod.js', {
    wrap: false // 所选文件不进行amd的包装
});

/**
* 按照介绍，fis3 已经默认不自带模块化开发支持。所以如果用commonjs规范开发，那就要加下面这句。
* 但是现在我尝试的情况是不需要下面这句也能照常用commonjs规范进行开发。
* 原因还未知，自己测试不是版本的问题
*/
//fis.hook('commonjs');
/**
* fis的构建流程分为单文件编译和打包两个阶段
* 其中package阶段又分为prepackager、packager、postpackager (打包前处理，打包中处理，打包后处理)
* 这里用到了2个阶段
* packager: 把相应的依赖打包到一个文件中
* postpackager: 把打包好的模块js插入到页面中
*/
fis.match('::package', {
    packager: fis.plugin('map', {
        useTrack: true, // 将合并前的文件路径写进注释，方便定位
        // useSourceMap: true, // 默认是false，有这个map，可以记录每个文件的依赖关系。
        'merge/all.js': 'static/*.js'
    }),
    // npm install [-g] fis3-postpackager-loader
    // 静态资源前端加载器,用来分析页面中使用的和依赖的资源（js或css）, 并将这些资源做一定的优化后插入页面中
    // 如把零散的文件合并。
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        //useInlineMap: true, // 资源映射表内嵌(有了这个属性，像mod.js这种独立的文件将不会被合并到一个文件中)
        //allInOne: true // 把零碎的资源合并到一个文件中,一般不用这个属性，太暴力
    })
    
});

/**
* 设置不进行编译构建的文件
*/
fis.set('project.ignore', [
    'node_modules/**',
    'output/**',
    '.git/**',
    '.gitignore',
    '*.md',
    'package.json',
    'fis-conf.js'
]);

/**
* 设置部署的规则，因为有些属性或对文件的操作，最好是放在部署阶段来完成
* 比如说要把所有的图片改地址，因为上线后，图片地址是cnd上的，
* 再比如说把所有的js、css文件加hash的操作等等
* 部署的命令用的是 fis.media()
* 注意这里的部署规则设置，也是发生在文件编译阶段。根据部署规则编译完成后，再执行上面的打包流程
*/
fis.media('debug')
    .match('*.{eot,woff,ttf,svg,gif,js,css,scss}', {
        // 把图片、gif、css、js的引用路径全都变成测试机路径
        domain: 'http://cp01-lapp3-5.epc.com:8310' // 随便举个路径的栗子
    })
    .match('static/**.js', {
        useHash: true
    });










