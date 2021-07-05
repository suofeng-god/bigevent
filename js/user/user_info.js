$(function () {
  var layer = layui.layer;
  // 设置昵称校验规则
  var form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间!";
      }
    },
  });

  initUserInfo();

  // 初始化用户信息页面
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败!");
        }
        // 获取用户信息成功
        // 调用form.val() 快速给表单赋值
        form.val("formUserInfo", res.data);
      },
    });
  }
  // 重置按钮绑定事件
  $("#btn_reset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
  // 监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败!");
        }
        // 修改信息后,更新用户头像信息
        window.parent.getUserInfo();
        layer.msg("更新用户信息成功!");
      },
    });
  });
});
