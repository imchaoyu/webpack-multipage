import '../style/common.css'
import '../style/adviser.css'
$(function () {
  //alert(cookie);
  $('body').height($(document).height());
  // 置业顾问信息
  $('.btn-subadv').on('click', function () {
    var uid = $('#uid').val();
    var adviserName = $('#advname').val();
    var adviserPhone = $('#advphone').val();
    var regphone = /^1[0-9]{10}$/; //验证手机号规则
    if (adviserName == '') {
      alert('请输入姓名！');
      return false;
    } else if (adviserPhone == '') {
      alert('请输入手机号！');
      return false;
    } else if (!regphone.test(adviserPhone)) {
      alert('手机号格式错误！')
    } else {
      location.href='vipcard.html'
    }
  })
})