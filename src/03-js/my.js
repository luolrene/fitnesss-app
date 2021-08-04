require("../02-css/my.less")
require("../05-fonts/iconfont.css")
document.ready(function () {
    let name = document.querySelector(".name");
    let sign = document.querySelector(".sign span");
    let photo = document.querySelector(".photo")
    let times = document.querySelector(".times span")
    let calorie = document.querySelector(".calorie")
    let inpBox = document.querySelector("#inpBox")
    let offBtn=document.querySelector(".off")
    let header=document.querySelector("header")
    const BASE_URL = 'http://139.9.177.51:8099'



    utils.createFooter("my")
    let user = JSON.parse(localStorage.getItem("user"))
    $http.get("/users/accountinfo", { userId: user.userId }, function (res) {
        // console.log(res.data);
        // 获取数据
        name.textContent = res.data.nickname;
        if (res.data.sign) {
            sign.textContent = res.data.sign;
        }
        if (res.data.imgurl) {
            photo.src = res.data.imgurl
        }
    })

    $http.get("/users/mysportsBadge", { userId: user.userId }, function (res) {
        times.textContent = res.data.sports.times;
        calorie.textContent = res.data.sports.calorie;
    })
    inpBox.addEventListener("change", function (res) {
        //    获取input框中的所有文本流
        // console.log(this.files);
        //    通过ajax模仿form表单，并发送
        $updateFile("/users/upload", "imgurl", this.files[0], function (res) {
            let url = BASE_URL + res.data
            document.querySelector("img").src = url
            // 将更改的图片信息传到数据库
            $http.post("/users/userEdit", { imgurl: url, userId: user.userId }, function (res) {
                console.log("将更改的图片信息传到数据库");
            })
        })

    })
    // 点击图片换头像，inp框也点击到
    photo.addEventListener("click", function (e) {
        inpBox.click();
        // 阻止事件冒泡
        e.stopPropagation();
    })
    // 点击头部跳转修改个人信息
    header.addEventListener("click",function(e){
        location.href="./edit.html"
    })

    // 退出登录交互效果
    offBtn.addEventListener("click",function(e){
        location.href="./login.html"
        localStorage.removeItem("user")
    })
})