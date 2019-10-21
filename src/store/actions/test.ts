// import { useDispatch } from 'redux-react-hook'
import { SET_COUNT } from '@/store/types'

// const dispatch = useDispatch()
export const setCount = (count:number)=>{
  return  {
    type:SET_COUNT,
    payload:count
  }
}


/* 
(dispatch:any)=>{
  console.log(count)
  dispatch({
    type:SET_COUNT,
    payload:count
  })


*/