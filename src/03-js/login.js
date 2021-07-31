require("../02-css/login.css");
require("../05-fonts/iconfont.css")


document.ready(function () {
    // 获取标签
    let inText = document.querySelector(".inText")
    let inPsd = document.querySelector(".inPsd")
    let btn = document.querySelector(".btn")
    let msg = document.querySelector(".msg")
    let login = document.querySelector(".login")


    login.addEventListener("click", function (e) {
        location.href = "./register.html"
    })
    // 事件监听事件
    btn.addEventListener("click", function (e) {
        if (inText.value && inPsd.value) {
            let data = { account: inText.value, password: inPsd.value }
            $http.post("/users/login", data, function (res) {
                // 登录成功
                if (res.status == 0) {
                    // 将数据存到本地
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    // 跳转页面
                    console.log(utils);
                    utils.createToast(0,"登录成功");
                    //  跳转到首页页面
                    setTimeout(function () {
                        location.href = './home.html';
                    }, 3000)
                } else {
                    // 如果res.status===1 注册失败
                    utils.createToast(1,res.msg);
                }
            })
        }
    })
})


