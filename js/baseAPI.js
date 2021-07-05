// 每次使用$.get() 或者 $.post() 发起请求时,
// 会先调用这个函数 $.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;

  // 统一为有权限的接口,设置请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  // 全局同意挂载complete回调函数
  opstions.complate = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 强制清空token
      localStorage.removeItem("token");
      // 强制跳转到登录页
      location.href = "/login.html";
    }
  };
});
