export default function(url,data='',method='get'){
   
  return new Promise(function(resoved,rej){
     wx.request({
       url,
       data,
       method,
       success: (res) => {
         resoved(res.data)
       }
     })
   })

}