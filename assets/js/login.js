$(function() {
    $('#links').on('click',function () {  
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#link_login').on('click',function () { 
        $('.reg_box').hide();
        $('.login_box').show();
     })
    //  添加验证规则
    var form = layui.form
    var layer = layui.layer
     console.log(form)
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          //形参value得到的是确认密码框中的值
        rePwd:function (value) { 
            var pwd = $('.reg_box [name=password]').val()
            if(pwd!==value) {
                return "两次密码不一致"
            }
         }
    })

    //监听注册表单的提交
    $('#reg_form').on('submit',function (e) {  
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function (response) {
                if(response.status !==0) {
                  return layer.msg(response.message)
                }
                layer.msg('注册成功，请登录')
                //模拟人的点击事件
                $('#link_login').click()
            }
        });
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (response) {
                if(response.status!==0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',response.token)
                //跳转到后台主页
                location.href = './index.html'
            }
        });
        
    });
})