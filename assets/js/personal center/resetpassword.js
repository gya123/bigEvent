$(function () {

   

    // 获取layui的form模块
    let form = layui.form;
    // 获取layui的layer模块
    let layer = layui.layer;


     // 发送请求前先校验表单
     form.verify({

       
        // 新密码必须和原密码相同
        differ: (value, item) => {
            console.log("🚀 ~ file: resetpassword.js ~ line 26 ~ value,item", value,item)
            if (value === $('#old').val()) {
                return '新密码不能和原密码相同'
            }
         }

        //  新密码和确认 新密码必须一致
         
        , same: (value,item) => {
            if (value !== $('#new').val()) {
                 return '两次输入的密码不一致'
             }
         }
         
          // 1、输入的必须是密码格式
        ,pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] 
    })
      



     // 给表单注册提交事件事件
$('.layui-form').on('submit', function (e) {
    


    // 取消点击按钮后表单的默认提交事件
    e.preventDefault();


   


    // 搜集表单内容
    let data = $('.layui-form').serialize();

    
    // 发送修该密码的ajax请求
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data,
        success: (res) => {
            if (res.status === 0) {
                // 修改密码成功
                // 1、弹出提示修改密码成功

                layer.msg('修改密码成功')
                // 2、清空输入框内容
                $('.layui-form')[0].reset()
            } else {
                // 提示用户修改密码失败
                layer.msg(res.message)
            }
        }
    })


})
})