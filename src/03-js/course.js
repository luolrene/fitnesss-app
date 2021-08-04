require("../02-css/course.less");
require("../05-fonts/iconfont.css")
document.ready(function () {
    utils.createFooter("course")
    const BASE_URL = 'http://139.9.177.51:8099'
    // 获取用户的数据
    let user = JSON.parse(localStorage.getItem("user"))
    // console.log(user);
    // 获取课程
    $http.get("/sports/courseList", { id: user.userId }, function (res) {
        console.log(res);
        let newCourse = res.data.find(function (item, index) {
            return item.latest === 1
        })
        console.log(newCourse);
        // 拼接
        let html = `
            <img src="${BASE_URL + newCourse.imgurl}" alt=""  class="bg">
            <div class="text-box">
                <p class=" one">${newCourse.name}</p>
                <p class="f12 ml16 c9a two">${newCourse.desc}</p>
            </div>
`
        document.querySelector(".course-title-box").innerHTML = html

    //  //渲染页面
    let html1 = '';
    res.data.forEach(function (item, index) {
        console.log(item);
        html1 += `
     <a href="./description.html?id=${item.courseId}">
       <div class="list-item mt20">
       <img src="${BASE_URL + item.imgurl}" alt="">
       <div class="text">
         <p>标题：${item.name}</p>
         <p>介绍：${item.desc}</p>
       </div>
     </div>
     </a>
   `
    })
    document.querySelector('.list').innerHTML = html1;
    console.log(html1);
    })


})