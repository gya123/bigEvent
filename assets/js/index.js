

    //定义发送ajax请求的函数,应为其他的入口函数内要复用，所以写在全局作用域中
    // 如果写在入口函数中，就是在局部作用域定义的函数，其他入口函数中不能调用
    var getUserInfo = () => {
        $.ajax({
            url: '/my/userinfo',
            
            success(res) {
                console.log( res );
                if (res.status === 0) {

                    // 设置欢迎语
                    let name = res.data.nickname || res.data.username
                $('.userinfo').html(` <span id="welcome">欢迎&nbsp;&nbsp;${name}</span>`)

                    // 设置头像
                    if (res.data.user_pic) {
                        $('#image').html(`<image class=" avatar" src=${res.data.user_pic}></image>`)
                        $(`<image class=" avatar" src=${res.data.user_pic}></image>`).prependTo('.layui-side .userinfo')
                    } else {
                        $(`<span class="text-avatar">${name[0].toUpperCase()}</span>`).prependTo('ul.layui-layout-right')
                        $(`<span class="text-avatar">${name[0].toUpperCase()}</span>`).prependTo('.layui-side .userinfo')
                    }
                }
            }
        })
    }



$(function () {


   

    // 退出登录
    let layer = layui.layer
    $('#layui-nav-item').on('click', function () {
    //    console.log( '我点了' );
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 关闭弹框
        layer.close(index);
        // 删除token
        localStorage.removeItem('token')
            // 跳转页面到login.html
            location.href = '/home/login.html'
      });
   })

    
    // 主页DOM一打开就发请求获取用户信息并渲染到页面中
    getUserInfo()

})


