require("../02-css/publicity.css")
document.ready(function () {
    console.log("111");
})
// 获取标签
let timeNum = document.querySelector("span")
let rightBox = document.querySelector(".rightBox")
// 倒计时跳转
setInterval(function () {
    let num = Number(timeNum.textContent) - 1;
    console.log(num);
    if (num === 0) {
        // 如果值为0是，跳转页面
        location.href = './login.html'
        // 停止倒计时
        clearInterval()
    } else {
        // 倒计时未结束，将数字渲染到页面
        timeNum.textContent = num
    }
}, 1000)

// 点击跳转
rightBox.addEventListener("click", function (e) {
    location.href = './login.html'
})