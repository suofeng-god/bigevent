$(function () {
  var layer = layui.layer;
  // 调用函数获取用户基本信息
  getUserInfo();
  $("#btn-logout").on("click", function () {
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //点击确定
        // 清空本地存储的localStorage
        localStorage.removeItem("token");
        // 跳转至登录页面
        location.href = "/assets/login.html";
        // 关闭confirm询问框
        layer.close(index);
      }
    );
  });
});

// 获取用户的信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    // 以/my开头的需要权限
    url: "/my/userinfo",
    // 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败!");
      }
      renderAvatar(res.data);
    },
    // 无论成功与否都会最终调用complete回调函数
    // complete: function (res) {
    //   console.log("执行了conplete回调函数");
    //   console.log(res.responseJSON);
    // if (
    //   res.responseJSON.status === 1 &&
    //   res.responseJSON.message === "身份认证失败！"
    // ) {
    //   // 强制清空token
    //   localStorage.removeItem("token");
    //   // 强制跳转到登录页
    //   location.href = "/assets/login.html";
    // }
    // },
  });
}
// 渲染用户的头像
function renderAvatar(user) {
  // 获取用户名
  var name = user.nickname || user.username;
  // 渲染欢迎用户名
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  // 渲染头像
  if (user.user_pic !== null) {
    // 渲染图像头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    var firstChart = name[0].toUpperCase();
    $(".text-avatar").html(firstChart).show();
  }
}
