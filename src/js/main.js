$(function () {
  //alert(cookie);
  $('body').height($(document).height());
  if (cookie != "") {
    var str = cookie;
    $('#register').hide();
    $('#card').show();
    $("#code").qrcode({
      width: 174, //宽度
      height: 174, //高度
      text: str
    });
    var mycanvas1 = document.getElementsByTagName('canvas')[0];
    var img = convertCanvasToImage(mycanvas1);
    $('#code').append(img);
  } else {
    $('#register').show();
  }
  //从 canvas 提取图片 image
  function convertCanvasToImage(canvas) {
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG
    image.crossOrigin = "anonymous";
    image.src = canvas.toDataURL("image/png");
    return image;
  }
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
  // 点击问卷按钮
  $('#gotoAsk').on('click', function () {
    location.href='quesitions.html'
  })
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