import React,{useEffect,useCallback,useState} from 'react'
import {getImgCode} from '@/api/test'
export default function Home() {
  const [code,setCode] = useState('')
  const [img,setImg] = useState('')
  useEffect(() => {
    getImgCode().then((res:any)=>{
      if(res && res.code === 1){
        setImg(res.data.captcha)
        setCode(res.data.captchaKey)
      }
    })
  },[])
  return (
    <div>
      <h1>HOME</h1>
      {code}
      <img src={img} alt=""/>
    </div>
  )
}
