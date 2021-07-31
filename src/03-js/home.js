require("../02-css/home.less");
require("../05-fonts/iconfont.css")
// 轮播图
var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: true,//自动切换

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },
})
document.ready(function () {
    let rankDom = document.querySelector("#rankDom")
    let signiaNum = document.querySelector("#signiaNum")
    let punchIn = document.querySelector("#punchIn")
    let cardBtn = document.querySelector("#cardBtn")
    //   获取本地存储的数据
    let user = JSON.parse(localStorage.getItem("user"));
    //   console.log(user);
    // 封装函数，渲染页面
    function getData() {
        $http.get('/headPageInfo', { userId: user.userId }, function (res) {
            // 成功，将拿取到的数据展示在页面上
            console.log(res);
            rankDom.innerHTML = res.data.rank
            signiaNum.innerHTML = res.data.insigniaNum
            punchIn.innerHTML = res.data.punchIn
            if (res.data.isPunch == "false") {
                cardBtn.className = "box"
            } else {
                cardBtn.className = "box hide"
            }
        })
    }

    getData()

    cardBtn.addEventListener("click", function () {
        $http.get('/clockIn', { userId: user.userId }, function (res) {
            if (res.status == 0) {
                // 打卡成功
                getData()

            }
        })
    })


})