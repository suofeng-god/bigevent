$(function () {
  // 点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击去登录的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});

layui.use("form", function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    // 自定义校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // 通过value拿到的是确认密码中的值
      // 拿到密码框中的值
      var pwd = $(".reg-box [name=password]").val();
      // 进行一次等于判断
      if (value !== pwd) {
        return "两次密码不一致,请重新输入!";
      }
      // 如果判断失败,则return "错误提示消息"
    },
  });
});

// 监听注册表单的提交事件
$("#form_reg").on("submit", function (e) {
  // 阻止默认提交行为 form表单action="" 阻止这个默认行为
  e.preventDefault();
  // 提交信息
  var data = {
    username: $("#form_reg [name=username]").val(),
    password: $("#form_reg [name=password]").val(),
  };
  $.post("/api/reguser", data, function (res) {
    // 临时保存用户注册时的用户名
    var uname = $("#form_reg [name=username]").val();
    if (res.status !== 0) {
      return layer.msg(res.message);
    }
    layer.msg("注册成功,请登录!");
    // 跳转到登录页面
    $("#link_login").click();
    // 自动填写刚注册的用户名
    $("#form_login [name=username]").val(uname);
  });
});

// 监听登录表单的提交事件
$("#form_login").submit(function (e) {
  // var data = {
  //   username: $("#form_login [name=username]").val(),
  //   password: $("#form_login [name=password]").val(),
  // };
  // 阻止默认提交行为
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/login",
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("登陆失败!");
      }
      layer.msg("登陆成功!");
      console.log(res.token);
      // 将登陆成功的token保存在localStorage中
      localStorage.setItem("token", res.token);
      // 跳转到后台主页
      location.href = "/index.html";
    },
  });
});
