// pages/song/song.js
import request from '../../utils/request.js'
import PubSub from 'pubsub-js'
let appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{},
    isPlaying:false,
    songId:null,
    musicUrl:''
  },
//  播放事件
async handlePlay(){
   //  如果已经有音频地址，就不发请求了
   if (!this.data.musicUrl){
    await this.getMusicUrl()
   }
 
      //   让c3效果动起来
  this.setData({
        isPlaying:!this.data.isPlaying
      })

  this.playAudio()

  },

//  监听音频
  addAudioListener(){
     //背景音频播放,更新app实例中的状态
    this.backgroundAudioManager.onPlay(()=>{
        //  判断当前页面的歌曲是否与我背景音频播放的相同,如果相同才改变他的页面C3效果播放状态
      if (this.data.songId === appInstance.globalData.audioId){
        this.setData({
          isPlaying: true
        })
      }
      appInstance.globalData.playState = true 
    }) 
    //  背景音频暂停
    this.backgroundAudioManager.onPause(() => {
      if (this.data.songId === appInstance.globalData.audioId) {
        this.setData({
          isPlaying: false
        })
      }
      appInstance.globalData.playState = false
    }) 
    //  背景音频停止（退出）
    this.backgroundAudioManager.onStop(() => {
      if (this.data.songId === appInstance.globalData.audioId) {
        this.setData({
          isPlaying: false
        })
      }
      appInstance.globalData.playState = false
    }) 


  },
//  给上一首下一首的按钮绑定点击事件，并将id传递给recommendsong页面
  switchSong(event){
    PubSub.publish('swichType', event.currentTarget.id)
  },


 // 1. 请求歌曲详细信息
 async getMusicDetail(){
    const result = await request('/song/detail', { ids: this.data.songId })
    let songObj = result.songs[0]
   this.setData({
     songObj,
   })
   //  将头部栏的名字改成歌曲名字
   wx.setNavigationBarTitle({
     title: songObj.name,
   })
  },
       //  获取播放地址
  async getMusicUrl(){
  const musicUrlData = await request('/song/url', { id: this.data.songId })
    this.setData({
      musicUrl: musicUrlData.data[0].url
    })
  },

  // 获取背景播放音频
  playAudio(){
    //  让音频播放起来,获取背景音频
    // let backgroundAudioManager = wx.getBackgroundAudioManager()
    //  判断如果点击了播放，就让音频自动播放
    if (this.data.isPlaying) {
      this.backgroundAudioManager.src = this.data.musicUrl
      this.backgroundAudioManager.title = this.data.songObj.name
      //  将播放状态和播放的歌曲的id存储到app实例中
      appInstance.globalData.playState = true
      appInstance.globalData.audioId = this.data.songId
    } else {
      // 点击了暂停就停止
      this.backgroundAudioManager.pause()
      appInstance.globalData.playState = false
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {

    //  获取到上个页面传过来的id，发送请求展示数据
    let {songId} = options
    // const result =await request('/song/detail', {ids:songId})
    // let songObj = result.songs[0]
    this.setData({
      songId
    })
   await this.getMusicDetail()

    //  判断状态
    let { playState, audioId } = appInstance.globalData
    if (playState && audioId === songId){
        // 如果为播放状态，并且id相同证明进入的同一首歌，就让它c3效果动起来
        this.setData({
          isPlaying:true
        })
    }

  //  给背景音频绑定监听，需要获取背景音频，直接添加到实例上，到时通过this使用
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    //  监听音频，绑定一个函数，直接调用
    this.addAudioListener()


  //  接收recommendsong页面传递过来的实际id
    PubSub.subscribe('getMusicId', async (msg,data)=>{
      this.setData({
        songId: data
      })
        // 1. 请求歌曲详细信息和地址
      this.getMusicDetail()
     await  this.getMusicUrl()   

      //  判断状态
      let { playState, audioId } = appInstance.globalData
      if (playState && audioId === data) {
        console.log(playState, audioId, data)
        // 如果为播放状态，并且id相同证明进入的同一首歌，就让它c3效果动起来
        this.setData({
          isPlaying: true
        })

        //  背景播放音频
        this.playAudio()
      }   


       //  2.自动播放对应歌曲，让c3效果动起来
        // this.setData({
        //   isPlaying:true
        // })
        //  背景播放音频
      // this.playAudio()
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