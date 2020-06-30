$(function () { 
    let form = layui.form
    form.verify({
        pass:[/^[\S]{6,12}$/,'密码需要在6-12位'],
        newPass:function (value) { 
            if(value === $('[name=oldPwd]').val()) {
                return '新密码和原密码不能一样'
            }
         },
         rePass: function (value) { 
             if(value!==$('input:[name=newPwd]')) {
                 return '两次密码不一致'
             }
          }
    })



    $('.layui-btn').on('click',function () { 
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $('.layui-form').serialize(),
            
            success: function (res) {
                if(res.status!==0) {
                    return '更新失败'
                }
                return '更新成功'
            }
        });
     })
 })