import '../../style/common.css'
import './vipcard.css'
$(function () {
  //alert(cookie);
  $('body').height($(document).height());
  // 点击问卷按钮
  $('#gotoAsk').on('click', function () {
    location.href='quesitions.html'
  })
})