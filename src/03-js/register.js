require("../02-css/register.css");
require("../05-fonts/iconfont.css")

document.ready(function () {
    //   手机号
    let inpText = document.querySelector(".inp-text");
    //   验证码
    let inpAuth = document.querySelector(".inp-auth");
    // 密码
    let inpPsd = document.querySelector(".inp-psd");
    // 再次确认密码
    let inpPsd1 = document.querySelector(".inp-psd1");
    // 注册按钮
    let btn = document.querySelector(".btn")
    let msg = document.querySelector(".msg")

    let code = ""
    let captcha1 = new CaptchaMini();
    captcha1.draw(document.querySelector('#captcha1'), function (res) {
        code = res
    })
 let log=document.querySelector(".log")
 log.addEventListener("click",function(e){
     location.href='./login.html'
 })
    // DOM的值
    // 监听注册按钮的事件
    btn.addEventListener("click", function (e) {
        // 判断所有的input 必须有值
        msg.textContent=""
        // console.log("111");
        if (inpText.value && inpAuth.value && inpPsd.value && inpPsd1.value) {
            // 正则验证手机号是否正确
            let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
            if (!reg.test(inpText.value)) {
                // 提醒用户
                utils.createToast(1,'手机号输入错误');
                return;
            }
            // 判断两次密码是否一致
            if (inpPsd.value != inpPsd1.value) {
                utils.createToast(1,'密码输入有错误');
                return;
            }
            // 判断验证码是否正确
            if (code.toLowerCase() != inpAuth.value.toLowerCase()) {
                utils.createToast(1,'验证码不正确');
                return;
            }
            let data={
                account:inpText.value,
                password:inpPsd.value
            }
            $http.post('/users/add',data,function(res){
                // 如果res.status===0 注册成功
                if(res.status==0){
                    utils.createToast(0,res.msg);
                    // 跳转到登录页面
                    setTimeout(function(){
                        // location.href='./login.html';
                        $http.post("/users/login", data, function (res1) {
                            // 登录成功
                            if (res1.status == 0) {
                                // 将数据存到本地
                                localStorage.setItem("uesr", JSON.stringify(res1.data.user))
                                // 跳转页面
                                //  跳转到首页页面
                                setTimeout(function () {
                                    location.href = './home.html';
                                }, 3000)
                            } 
                        })







                    },2000)
                }else{
                      // 如果res.status===1 注册失败
                      utils.createToast(1,res.msg);
                }
            })
        }
       
    })



})
