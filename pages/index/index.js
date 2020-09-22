// pages/index/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[],
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: "http://localhost:3000/banner",
    //    data:{
    //       type:2
    //    },
    //    success:(res)=>{
    //      console.log(res)
    //      this.setData({
    //        bannerList:res.data.banners
    //      })
    //    }
    // })
    request("http://localhost:3000/banner",{type:2},"get").then((res)=>{
          this.setData({
            bannerList: res.banners
          })
    })

    request("http://localhost:3000/personalized").then((res) => {
      this.setData({
        recommendList: res.result
      })
    }) 

let ids = [5,10,15,20]
let index = 0
let topList = []
    while (index < ids.length){
      request('http://localhost:3000/top/list', { idx: ids[index++] }).then((res) => {
        let topDate = {}
        topDate.name = res.playlist.name
        topDate.musicList = res.playlist.tracks.slice(0,3)
        topList.push(topDate)
        this.setData({
          topList
        })
      })
    }
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