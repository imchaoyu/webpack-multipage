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
      $.ajax({
        type: "POST",
        url: "doreg.php",
        data: {
          uid: cookie,
          username: uname,
          cellphone: cellphone
        },
        success: function (data) {

          data = $.parseJSON(data);
          cookie = data.uid;
          if (data.data == 1 || data.data == 2) {
            // var str = toUtf8(data.text);
            $("#code").qrcode({
              width: 174, //宽度
              height: 174, //高度
              text: data.uid
            });
            var mycanvas1 = document.getElementsByTagName('canvas')[0];
            var img = convertCanvasToImage(mycanvas1);
            $('#code').append(img);
            $('#register').addClass('fadeOut').hide();
            $('#card').show().addClass('fadeIn');
          } else if (data == 3) {
            alert("手机号与姓名不匹配");
          } else {
            alert("服务器繁忙请重试")
          }
        },
        error: function (error) {
          alert(error)
        }
      });
    }
  })
  // 点击问卷按钮
  $('#gotoAsk').on('click', function () {
    //alert(cookie);
    $.ajax({
      type: "POST",
      data: {
        uid: cookie
      },
      url: "api_c.php",
      success: function (data) {
        // alert(data);
        if (data == 1) {
          alert("您已参加过问卷调查！");
        } else if (data == 0) {
          $('#card').addClass('fadeOut').hide();
          $('#questions').show().addClass('fadeIn');
        }
      }
    })

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
    var uid = $('#uid').val();
    var answers = $("#questionsForm").serializeArray();


    $.ajax({
      type: "POST",
      url: "api_sub_wj.php",
      data: {
        uid: cookie,
        answers: answers
      },
      success: function (data) {
        console.log(data);
        //data = $.parseJSON(data);
        if (data == 1) {
          $('#questions').hide();
          $('#adviser').show().addClass('fadeIn');
        } else {
          alert("服务器繁忙请重试");
        }
      },
      error: function (error) {
        alert(error)
      }
    });
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
      $.ajax({
        type: "POST",
        url: "api_sub_gw.php",
        data: {
          uid: uid,
          adviserName: adviserName,
          adviserPhone: adviserPhone
        },
        success: function (data) {
          //alert(data);
          //data = $.parseJSON(data);
          if (data == 1) {
            alert('提交成功，感谢配合！');
            $('#card').show().removeClass('fadeOut');
            $('#adviser').hide();
          } else {
            alert("服务器繁忙请重试");
          }
        },
        error: function (error) {
          alert("服务器繁忙请重试2");
        }
      })
    }
  })
})