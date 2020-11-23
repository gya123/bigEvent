$(function () {

    // 切换注册
     $('#showReg').on('click',function () {
         $('.loginpart').toggle();
         $('.registerpart').toggle()
     })

    //  切换登录
    $('#showlogin').on('click',function () {
        $('.loginpart').toggle();
         $('.registerpart').toggle()
    })

    // 表单验证
    let form = layui.form;
    form.verify({

        // 用户名验证
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
         // 密码验证
         ,pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] 
        
         
        //  确认密码验证
        , repass: (value,item) => {
            //value时表单的值，item时表单的DOM对象
            if (value !== $('#input1').val()) {
               return '两次密码不一致!'
           }
        }
        
    })

  
    
    // 提交注册 按钮必须用submit事件，如果用click等会你的表单验证不符时也会触发登录或者注册
    $('.registerpart form').on('submit', function (e) {
        e.preventDefault();
        let data = $('.registerpart .login-form').serialize();
        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: res => {
                console.log( res );
                if (res.status === 0) {
                    // 1、提示注册成功，请登录
                    
                        let layer = layui.layer;
                        
                        layer.msg('注册成功，请登录',{
                           
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, // 2、切换到登录页面
                            () => {
                                $('#showlogin').click();
                          });
                } else { 
                    layer.msg(res.message,{
                           
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            }
        })
    })


      // 提交登陆
    $('.loginpart .login-form').on('submit', function (e) {
        e.preventDefault();
        // o1、收集表单信息
        let data = $('.loginpart .login-form').serialize();
          console.log(data, '我点了');

        //  2、发送ajax请求验证账号密码
          $.ajax({
              type: 'POST',
              url: '/api/login',
              data,
              success: (res) => {
                //   console.log( res );

                // 判断是否登录成功
                if (res.status===0)//登录成功
                {
                    console.log(res);
                    // 1、提示用户登录成功
                    let layer = layui.layer;
                        
                        layer.msg(res.message,{
                           
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, 
                            () => {
                                // 2、把返回的token存起来
                                localStorage.setItem('token', res.token)
                                
                    // 3、页面跳转到个人主页
                                
                                location.href = '/index.html'
                                //location.href 做了啥：
                                // 1、发送了一个同步的get请求
                                // 2、跳转页面
                                // 3、把响应回来的数据渲染到新的页面中
                          });
                   
                } else {
                    // 提示用户登录失败
                    layer.msg(res.message, {
                        time:2000
                    })
                }
              }
          })
})

    
    
})

  
