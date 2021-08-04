require("../02-css/description.less")
require("../05-fonts/iconfont.css")
document.ready(function(){
   let imgBox=document.querySelector(".img-box");
   let imgDom=document.querySelector("img");
   let returnBtn=document.querySelector(".return")
   let baseUrl = 'http://139.9.177.51:8099';
   let obj = utils.strToObj(location.search);
  console.log(obj.id);
  returnBtn.addEventListener("click",function(e){
    e.stopPropagation()
    location.href="./course.html"
  })
  //获取id之后发送 请求详情的 接口
  $http.get('/sports/courseDetail', { id: obj.id }, function (res) {
      console.log(res);
      imgDom.src = baseUrl + res.data.imgurl;
      //将视频列表存储到本地存储
      console.log(res.data.fragments);
      localStorage.setItem('videoList', JSON.stringify(res.data.fragments))
     
    })
    imgBox.addEventListener("click",function(e){
          location.href="./play.html"
    })
})