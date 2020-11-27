$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')

    // 得到layui的layer弹出信息莫鲁哀
    let layer = layui.layer;

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    

    // 点击上传按钮选择图片文件
    // 点击上传按钮相当于点击了file文件域，文件域隐藏
    // 给上传按钮注册点击事件
    $('#upload').on('click', function () {
        // console.log( '我点了' );
        $("input[type='file']").click();
    })



    // --------------  更换剪裁区的图片 ---------------
    // 当文件域的内容改变的时候，更换图片
    $('#file').change(function () {
        // console.log(111);
        // 1. 找到选择的图片（文件对象）
        // console.dir(this);
        let fileObj = this.files[0]; // 我们选择的图片的文件对象
        // 2. 根据文件对象，生成一个临时的url，用于访问被选择的图片
        let url = URL.createObjectURL(fileObj);
        // console.log(url);
        // 3. 更换剪裁区的图片的src属性
        // - 销毁原理的剪裁区
        // - 更换图片
        // - 重新创建剪裁区
        $image.cropper('destroy').attr('src', url).cropper(options);
    });
    // console.log("🚀 ~ file: changeavatar.js ~ line 43 ~  fileObj", fileObj)
    
    // ---------------  点击 确定 的时候，剪裁图片，转成base64格式，提交字符串到接口 ----------
    $('#sure').click(function () {
        // 剪裁得到一张图片（canvas图片）
        let i = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        });
          
          // 把图片转成base64格式
      let str = i.toDataURL(); // 把canvas图片转成base64格式
      // console.log(str); // base64格式的字符串
      // ajax提交字符串给接口
    
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: { avatar: str },
            success: res=> {
                // 处理响应
                // 1、判断是否相应成功
                if (res.status === 0) {
                    // 更改头像成功，弹出提示信息
                layer.msg('更改头像成功')
                    console.log("🚀 ~ file: changeavatar.js ~ line 79 ~ window", window)
                    
                    console.log("🚀 ~ file: changeavatar.js ~ line 79 ~ window.parent", window.parent)
                    
                    // 同步更新主页头像
                    // 把之前封装好的的发请求获取用户信息渲染头像的函数再调用一次
                    // 先回到主页面，在调用在主页面定义的函数
                    window.parent.getUserInfo();
                }
            }
        })
                   
        
        
    }
    )
})