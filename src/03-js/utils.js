/**
 * 工具函数
 */
document.ready(function () {
    const utils = {}
// @msg string 提醒文本
// @status Number 状态

    utils.createToast = function (status,msg) {
        // 创建div
        let toast = document.createElement("div");
        // 给div添加类名
        toast.className = "toast";
        let html = `
        <p><span>${status===0?'√':'×'}</span></p>
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
    // 挂载到window上
    window.utils = utils
   
})