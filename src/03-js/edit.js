require("../lib/weui/weui.js")
require("../02-css/edit.less")
document.ready(function () {
  let genderDom = document.querySelector("#gender");
  let birthdayDom = document.querySelector("#birthday");
  let birthdayValDom = document.querySelector("#birthdayVal");
  let proBtn = document.querySelector("#proBtn");
  let cityBtn = document.querySelector("#cityBtn");
  let btn = document.querySelector(".btn");
  let nick = document.querySelector(".nick");
  let signInp = document.querySelector(".sign")
  console.log(nick);
  let pId = ""


  // 获取uesrId
  let user = JSON.parse(localStorage.getItem("user"))
  // 创建对象  全局变量
  let obj = {
    userId: user.userId, // 用户id
    nickname: "", // 昵称
    gender: "", // 性别
    birthday: "", // 生日
    sign: "", // 签名
    address: [],//城市
  }


  genderDom.addEventListener('click', function () {
    //生成 picker 
    weui.picker([{
      label: '男',
      value: '男'
    }, {
      label: '女',
      value: '女'
    }], {
      onConfirm: function (result) {
        console.log('确认值');
        console.log(result[0].value);
        document.querySelector('#genderVal').textContent = result[0].value;
      },
      title: '性别'
    });
  })



  birthdayDom.addEventListener('click', function () {
    weui.datePicker({
      start: 1850,
      end: new Date().getFullYear(),
      onConfirm: function (res) {
        console.log(res);
        // let str = res[0].label + res[1].label + res[2].label;
        let str = `${res[0].value}-${res[1].value < 10 ? "0" + res[1].value : res[1].value}-${res[2].value < 10 ? "0" + res[2].value : res[2].value}`
        console.log(str);
        birthdayValDom.textContent = str;
      },
      title: '出生日期'
    })
  })

  // 点击选着省份
  proBtn.addEventListener("click", function () {
    //  获取全国的所有省份
    $http.get("/address/province", function (res) {

      //  从data里面把全部省份拿出来
      let proList = res.data
      // console.log(proList);
      // 循环遍历，从原本的数组中提取出需要的数据，返回成一个新的数组
      let arr = proList.map(function (item, index) {
        // console.log(item);
        return {
          label: item.name,
          value: item.addressId
        }
      })
      weui.picker(arr, {
        onConfirm: function (result) {
          document.querySelector('#porVal').textContent = result[0].label;
          // 将id传给pId
          pId = result[0].value
          console.log(pId);
          // 选择了省份，清空城市
          document.querySelector('#cityVal').textContent = "请选择城市";
        },
        title: '选择省份'
      });
    })
  })

  // 点击城市
  cityBtn.addEventListener("click", function () {
    if (!pId) {
      utils.createToast(1, "请选择省份")
    }
    // 获取所有省份
    $http.get("/address/city/" + pId, function (res) {
      // console.log(res);
      let arr = res.data.map(function (item, index) {
        return {
          label: item.name,
          value: item.addressId
        }
      })
      weui.picker(arr, {
        onConfirm: function (result) {
          document.querySelector('#cityVal').textContent = result[0].label;
        },
        title: '选择城市'
      });

    })
  })

  // 保存信息事件监听
  btn.addEventListener("click", function (res) {
    // 昵称
    obj.nickname = nick.value
    // 性别
    obj.gender = genderVal.textContent
    // 生日
    obj.birthday = birthdayVal.textContent
    // 城市
    obj.address[0] = porVal.textContent
    obj.address[1] = cityVal.textContent
    // 个性签名
    obj.sign = signInp.value
    console.log(obj);
    $http.post('/users/userEdit', obj, function (res) {
      console.log(res);
      if (res.status == 0) {
        utils.createToast(0, "修改成功")
        setTimeout(function () {
          location.href = "./my.html"
        }, 1000)
      }


    })



  })




})