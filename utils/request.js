import config from './config.js'


export default function(url,data='',method='get'){

  return new Promise(function(resoved,rej){
     wx.request({
       url: config.baseUrl+url,
       data,
       method,
       header:{
         cookie: JSON.parse(wx.getStorageSync('cookies') || '[]').toString()
       },
       success: (res) => {
         if (data.isLogin){
           let cookies = res.cookies;
           wx.setStorage({
              key: 'cookies',
              data: JSON.stringify(cookies)
            })
         }
         resoved(res.data)
       }
     })
   })

}