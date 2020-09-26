// pages/recommendSong/recommendSong.js
import request from '../../utils/request.js';
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:"",
    day:"",
    recommendList:[],
    currentIndex:null
  },
  // 用于跳转详情页面
  toSong(event){
    let { id,index } = event.currentTarget.dataset
    this.setData({
      currentIndex:index
    })
    wx.navigateTo({
      url: '/pages/song/song?songId='+id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //  创建时间
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })


    if (wx.getStorageSync('cookies')) {
      const result = await request('/recommend/songs')
      this.setData({
        recommendList: result.recommend
      })
    }else{
      wx.showModal({
        title:'请先登录',
        content:'需要登录账号',
        cancelText:'回到首页',
        confirmText:'去登陆',
        success:function(res){
          // 点击的确定，就要跳到登录页面
          if(res.confirm){
              wx.redirectTo({
                url: '/pages/login/login',
              })
          }else{
            wx.navigateBack();
          }
        }


      })
    }

    //  接收song页面传过来的需要的id
    PubSub.subscribe('swichType',(msg,data)=>{
      let currentIndex = this.data.currentIndex
      let id
      if (data === 'pre'){
          //  证明想要上一首的id

          //  判断边界值,如果当前是第一首歌，点击上一首时，让它等于最后一首
        if (currentIndex === 0){
          currentIndex = this.data.recommendList.length
          }
          currentIndex--
      } else if (data === 'next'){
    //  证明想要上下一首的id
        if (currentIndex === this.data.recommendList.length - 1 ) {
          currentIndex = 0
        }
        currentIndex++
      }
      this.setData({
        currentIndex
      })
      //  获取id
      id = this.data.recommendList[currentIndex].id  

      //将id传给song页面
      PubSub.publish('getMusicId',id)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:async function () {


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