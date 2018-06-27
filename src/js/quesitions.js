import '../style/common.css'
import '../style/quesitions.css'
$(function () {
  //alert(cookie);
  $('body').height($(document).height());
  // quesitions
  $('.btn-next').on('click', function () {
    var val = $(this).parents().siblings('p').find('input:checked').val();
    if (val == '' || val == null) {
      alert('请选择答案！')
      return false;
    } else {
      $(this).parents('.que').hide();
      $(this).parents('.que').next('.que').addClass('fadeInRight').show();
    }

  })
  $('.btn-submit').on('click', function () {
    location.href='adviser.html'
  });
})