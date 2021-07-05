// 每次使用$.get() 或者 $.post() 发起请求时,
// 会先调用这个函数 $.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
});
