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

  toRecommendSong(){
      wx.navigateTo({
        url: '/pages/recommendSong/recommendSong',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
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
    request("/banner",{type:2},"get").then((res)=>{
          this.setData({
            bannerList: res.banners
          })
    })

    request("/personalized").then((res) => {
      this.setData({
        recommendList: res.result
      })
    }) 

      //  请求排行榜的歌曲
      let arr = [3,5,7,9,22]

      let index = 0
      let topList = []
      while(index < arr.length){
        const result = await request('/top/list',{idx:arr[index++]})
        let data = {
          name: result.playlist.name,
          tracks: result.playlist.tracks.slice(0,3)
        }
        topList.push(data)
        this.setData({
          topList
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