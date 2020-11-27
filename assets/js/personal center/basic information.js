$(function () {
    let id;
    // 得到layui的表单模块
    let form = layui.form
    // 得到layui的弹出层模块
    let layer = layui.layer
     // 封装一个初始化个人信息填充到表单的函数
    const setInfo = () => {
        // 1、发送ajax请求拿到个人信息
        
        $.ajax({
            url: '/my/userinfo',
            // 2、处理响应回来的个人信息，填到表单中
            success: (res) => {
                // console.log('用户基本信息', res);
                if (res.status === 0) {
                    // layui表单赋值操作
                    form.val("formTest", res.data);
                    id = res.data.id
                }
            }

        })

    };
    
    // 一打开基本资料页面就把用户的信息自动填入表单
    setInfo();

    // 点击重置按钮，就恢复初始化用户信息天道表单中
    $('.layui-btn-primary').on('click',function () {
        setInfo();
    })


    // 表单验证
    form.verify({
        nickname: (value,item) => {
            if (value.length > 6 || value.length < 1) {
                return '昵称必须是1-6位字符';
            }
        }
    })

    
    // 提交修改
        // 1、注册表单的submit事件
        $('.layui-form').on('submit',function (e) {
            e.preventDefault();
            // 2、收集表单信息
            let data = form.val("formTest");
           
            // console.log(info, id);
            data.id = id
            console.log( data );
             // 3、发送修改用户信息的请求
            $.ajax({
                type:'POST',
                url: '/my/userinfo',
                data,
                success: (res) => {
                    // 4、处理响应，如果修改成功
                    if (res.status === 0) {
                        // console.dir(  $('#welcome') );
                        // 提示‘更新用户信息成功’，
                        layer.msg('更新用户信息成功!')
                        // 把首页的欢迎词更新成新的昵称
                        window.parent.$('#welcome').html(`欢迎&nbsp;&nbsp;${data.nickname}`)
                    }
                }
            })
        })
})

   
    