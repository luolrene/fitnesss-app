/**
 * 工具函数
 */
document.ready(function () {
    const utils = {}
    // @msg string 提醒文本
    // @status Number 状态

    utils.createToast = function (status, msg) {
        // 创建div
        let toast = document.createElement("div");
        // 给div添加类名
        toast.className = "toast";
        let html = `
        <p><span>${status === 0 ? '√' : '×'}</span></p>
        <p>${msg}</p>
         `
        //将tosat的内容添加到toast上
        toast.innerHTML = html
        // 获取body，将toast添加到html上
        let body = document.querySelector("body")
        body.appendChild(toast)
        // 两秒后清除toas
        setTimeout(function () {
            toast.remove()
        }, 2000)
    }

    // 抽离尾部公共样式布局
    utils.createFooter = function (page) {
        let footer = document.createElement("footer")
        footer.className = "dpflex"
        let html = `
        <div class="iconBox">
        <a href="./home.html">
        <p><i class="${page==="home"?"iconfont icon-shouye1  on":"iconfont icon-shouye1"}"></i></p>
        <p class="${page==="home"?"on":""}">首页</p>
        </a>
        </div>
        <div class="iconBox">
         <a href="./course.html">
         <p> <i class="${page==="course"?"iconfont icon-shouye  on":"iconfont icon-shouye"}"></i></p>
         <p class="${page==="course"?"on":""}">运动</p>
         </a>
         </div>
        <div class="iconBox">
       <a href="./my.html">
       <p> <i class="${page==="my"?"iconfont icon-wode  on":"iconfont icon-wode"}"></i></p>
       <p class="${page==="my"?"on":""}">我的</p>
       </a>
       </div>
        `
        footer.innerHTML = html
        document.querySelector("body").appendChild(footer)
    }
    // 挂载到window上
    window.utils = utils

})