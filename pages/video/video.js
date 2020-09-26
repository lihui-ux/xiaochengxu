// pages/video/video.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     navList:[],
    currentIndex:null,
    videoList:[],
    trigger:false,
    videoId:null
  },

async changActive(event){
    this.setData({
      currentIndex: event.currentTarget.dataset.id
    })
   //  在数据还没有请求回来的时候，先加载loading，提升用户体验
   wx.showLoading({
     title: '正在加载，请稍等',
   })
  await this.getVideoListData()
  //  关闭加载状态
  wx.hideLoading() 
  },





  //  封装函数发请求
async getVideoListData(){
   const videoData = await request('/video/group', 
           { id:this.data.currentIndex })
       this.setData({
           videoList: videoData.datas
      })
    },

//  下拉刷新，这个回调可以监听到下拉的时候，下拉时应该要请求数据，数据请求到下拉结束
async refresherRefresh(){
   await this.getVideoListData()
    this.setData({
      trigger: false,
    })
  },

//  当滑动到底部时，上拉加载更多
scrollTolower(){
    //  模拟请求数据
      let data ;
      setTimeout(()=>{
        data = [
          {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_57B282070780439AB8B7EEBADA7B0BF4",
              "coverUrl": "https://p1.music.126.net/9rQe8QvlonyK_6gjUs-KBw==/109951163405417082.jpg",
              "height": 720,
              "width": 1280,
              "title": "Wake (Live ) - Hillsong Young & Free",
              "description": "该回来的，总会回来",
              "commentCount": 116,
              "shareCount": 356,
              "resolutions": [
                {
                  "resolution": 240,
                  "size": 34912508
                },
                {
                  "resolution": 480,
                  "size": 58638761
                },
                {
                  "resolution": 720,
                  "size": 81994785
                }
              ],
              "creator": {
                "defaultAvatar": false,
                "province": 1000000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/yX7jUxKx0MQsKKHm09TdKQ==/109951162889224877.jpg",
                "accountStatus": 0,
                "gender": 1,
                "city": 1002700,
                "birthday": 809712000000,
                "userId": 250935934,
                "userType": 0,
                "nickname": "DJGrandMother",
                "signature": "心情如歌",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951162889224880,
                "backgroundImgId": 109951164570679090,
                "backgroundUrl": "http://p1.music.126.net/lnHCc8D-vLK3E7AphhCO6w==/109951164570679086.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 11,
                "remarkName": null,
                "avatarImgIdStr": "109951162889224877",
                "backgroundImgIdStr": "109951164570679086",
                "avatarImgId_str": "109951162889224877"
              },
              "urlInfo": {
                "id": "57B282070780439AB8B7EEBADA7B0BF4",
                "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/P8DZRued_1777476644_shd.mp4?ts=1600919817&rid=67045BE5AADF7E81410E9AF64893300E&rl=3&rs=owHvOhzRHwjbLkDlIdLYmEYcpddxViic&sign=33d87cbee10371f85374a1f2bea82a9f&ext=MbQfiMjsqTjGUrkgAnxbxsSylRxH5VhHzFV5ThhjfyiSCkcYqls2QnMPFzPFNGf2TzxMdlMd3x85Re1upgk5GucHgnVYTYzUr%2BxJl2GJta0KMD2nLWP%2BHVZ3D0Kpgp%2BFprsHzNg%2F0k3A8ZmrhP57eQRGhbFLB%2BDO4NukIn%2BPPUcgxDMeBXvSSet8RB2N86GBR%2F0dG%2FSoju1XlcCQhMHVQtP3pMZpRL9aYLx%2Bg8qHbKJqZUsE8IvZefqWchakvvSO",
                "size": 81994785,
                "validityTime": 1200,
                "needPay": false,
                "payInfo": null,
                "r": 720
              },
              "videoGroup": [
                {
                  "id": 57106,
                  "name": "欧美现场",
                  "alg": "groupTagRank"
                },
                {
                  "id": 59108,
                  "name": "巡演现场",
                  "alg": "groupTagRank"
                },
                {
                  "id": 1100,
                  "name": "音乐现场",
                  "alg": "groupTagRank"
                },
                {
                  "id": 58100,
                  "name": "现场",
                  "alg": "groupTagRank"
                },
                {
                  "id": 5100,
                  "name": "音乐",
                  "alg": "groupTagRank"
                }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "57B282070780439AB8B7EEBADA7B0BF4",
              "durationms": 279173,
              "playTime": 131625,
              "praisedCount": 1308,
              "praised": false,
              "subscribed": false
            }
          }
        ]
        // 数据回来后添加到data中
        this.setData({
          videoList: [...this.data.videoList,data]
        })
      },2000)
 
  },

//  当点击视频时，停止上一个视频的播放
handelPlay(ev){
    let { id } = ev.currentTarget;
  //  创建执行文上下对象来停止播放,this.vid是上一个视频的id，一开始是没有值
   //  判断如果有上一个视频的id才执行停止的功能，并且上一个id的值和当前点击的值应该不一样
    if (this.vid && this.vid !== id){
      let preVideoContext = wx.createVideoContext(this.vid)
      preVideoContext.pause();
    }
      //  将当前点击的id存入到this中
      this.vid = id
  },

  //  点击某张图片的时候，切换成对应的video
  changVideoId(ev){
//  获取点击的图片的id
    let { id } = ev.currentTarget
    //  更新data中的videoId，这样页面的判断就能生效，就能显示video
    this.setData({
      videoId:id
    })
      //  设置自动播放
    let videoContext = wx.createVideoContext(id);
    videoContext.play();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const result = await request('/video/group/list')
    this.setData({
      navList:result.data.slice(0,14),
      currentIndex:result.data[0].id
    })

   this.getVideoListData()
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
  onShareAppMessage: function ({from,target}) {
     //  区分是点击的button按钮来的还是点击头部来的
    let { imgurl, title} = target.dataset
     if(from === 'button'){
       console.log(target)
        //  页面转发按钮
       return {
         title,
         path: '/pages/video/video',
         imageUrl: imgurl
       }

     } else if (from ==='menu'){
        //  右上角转发菜单
        return {
          title:'本土音乐',
          path:'/pages/index/index',
          imageUrl:'/static/images/logo.png'
        }
     }
  }
})