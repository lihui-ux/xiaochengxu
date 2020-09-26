// pages/login/login.js

import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     phone:'' ,
     password:""
  },


//  获取input框输入的值
  changeInput(ev){
    let type = ev.currentTarget.id
    this.setData({
      [type]: ev.detail.value
    })
  },
//  点击登录
 async login(){
    //  获取参数
    let {phone,password} = this.data
    //  验证手机号
    let phoneReg = new RegExp(/^1[0-9]{10}/)
    let pwdReg = new RegExp(/[a-zA-Z0-9]{6}/)
    if (!phoneReg.test(phone)){
        wx.showToast({
          title: '手机号格式错误',
        })
        return
    }
    if (!pwdReg.test(password)) {
      wx.showToast({
        title: '密码格式错误',
      })
      return
    }
    let result = await request('/login/cellphone', {phone, password,isLogin:true})
    //    获取到数据之后存起来
   console.log(result)
    wx.setStorage({
      key: 'userInfo',
      data: JSON.stringify(result.profile)
    })
    wx.showToast({
      title: '登录成功',
      icon:'sucess'
    })
    wx.switchTab({
      url:'/pages/personal/personal'
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})