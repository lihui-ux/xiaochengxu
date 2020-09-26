// pages/personal/personal.js

import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance:0,
    moveTransition:'none',
    userInfo:{},
    playList:{}
  },

  handleTouchStart(event) {
    //  将位置存到this上面，方便在移动的函数里使用
    this. startY = event.touches[0].clientY
    this.setData({
      moveTransition: 'none'
    })
  },
  handelTouchMove(event) {
    let moveY = event.touches[0].clientY

    let moveDistance = Math.floor(moveY - this.startY)
    //  进行判断，不能向上滑动
    if (moveDistance < 0) return

    //  向下滑动大于80的时候。也不能滑动
    if (moveDistance > 80) return
    this.setData({
      moveDistance,
    })

  },

    //  手指抬起时，返回初始位置
  handleTouchEnd(){
      this.setData({
        moveDistance:0,
        moveTransition:"transform 600ms"
      })
  },
  //  点击跳转到登录页面a
  toLogin(){
    if (this.data.userInfo.nickname) return
    wx.redirectTo({
      url:"/pages/login/login",
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userInfoStr = wx.getStorageSync('userInfo')
    if (!this.data.userInfo.nickname && userInfoStr) {
      this.setData({
        userInfo: JSON.parse(userInfoStr)
      })
    }

    // 发请求获取最近播放音乐
    const result = await request('/user/record', { uid: this.data.userInfo.userId,type:1})
    this.setData({
      playList: result.weekData
    })

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