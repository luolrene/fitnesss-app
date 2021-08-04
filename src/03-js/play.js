require("../02-css/play.less")
document.ready(function () {
    let baseUrl = 'http://139.9.177.51:8099';
    // 从本地存储中获取video的数据
    let videoList = JSON.parse(localStorage.getItem('videoList'));
    console.log(videoList);

    //   获取dom
    let videoDom = document.querySelector("video")
    let num = document.querySelector(".num")
    let sum = document.querySelector(".sum")
    let name = document.querySelector(".name")
    let leftBtn = document.querySelector(".left")
    let rightBtn = document.querySelector(".right")
    let playBtn = document.querySelector(".play")
    let proDom = document.querySelector(".pro")
    let returnBtn = document.querySelector(".return")
    // 定义一个全局变量
    let videoIndex = 0


    // 阻止事件冒泡
    returnBtn.addEventListener("click", function (e) {
        e.stopPropagation()
        location.href = "./course.html"
    })


    // 根据当前视频的索引 进行播放
    // 更换video src 属性
    // 跟新 当前进度： 1/4
    // 跟新 视频title
    //index:当前播放视频的索引 （第几个视频）
    function play(index) {
        let videoUrl = baseUrl + videoList[index].videoUrl;
        console.log(videoUrl);
        //更换video src 属性
        videoDom.src = videoUrl
        // 跟新 当前进度： 1/4
        num.textContent = videoIndex + 1;
        sum.textContent = videoList.length;
        // 跟新 视频title
        name.textContent = videoList[index].title;

    }
    play(videoIndex)

    // 当前视频播放为完成后自动切换到下一个视频
    //  video 播放结束的 事件监听
    // ended
    videoDom.addEventListener('ended', function () {
        console.log('我播放完了....');
        videoIndex++;
        if (videoIndex < videoList.length) {
            play(videoIndex);
        }
    })
    // 点击画面暂停/播放
    videoDom.addEventListener("click",function(){
        if (videoDom.paused) {
            videoDom.play();
        }
        else {
            videoDom.pause();
        }
    })
    
    leftBtn.addEventListener("click", function () {
        if (videoIndex - 1 >= 0) {
            videoIndex--;
            play(videoIndex);
        }
        console.log(videoIndex);
    })

    rightBtn.addEventListener("click", function () {
        if (videoIndex + 1 < videoList.length) {
            videoIndex++;
            play(videoIndex);
        }
        console.log(videoIndex);
    })

    playBtn.addEventListener("click", function () {
        // play() 和 pause()
        if (videoDom.paused) {
            videoDom.play();
        }
        else {
            videoDom.pause();
        }
    })

    setInterval(function () {
        // 总时间
        // console.log(videoDom.duration);
        // 当前时间
        // console.log(videoDom.currentTime);
        let len = (videoDom.currentTime / videoDom.duration) * 100
        // console.log(len);
        proDom.style.width = len + "%"
    }, 30)
})