$.ajaxPrefilter(function (options) { 
    //ajax请求发送之前先调用这个函数，options就是ajax请求的参数
    options.url = 'http://ajax.frontend.itheima.net'+options.url
 })