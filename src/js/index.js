import '../style/common.css'
import '../style/index.css'

$(function () {
  $('body').height($(document).height());
  // 注册
  $('#btnRegister').on('click', function () {
    var uid = $('#uid').val();
    var uname = $('#uname').val();
    var cellphone = $('#cellphone').val();
    var regphone = /^1[0-9]{10}$/; //验证手机号规则
    if (uname == '') {
      alert('请输入姓名！');
      return false;
    } else if (cellphone == '') {
      alert('请输入手机号！');
      return false;
    } else if (!regphone.test(cellphone)) {
      alert('手机号格式错误！')
    } else {
      location.href='vipcard.html'
    }
  })
})