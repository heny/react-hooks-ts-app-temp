import React,{useCallback} from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'
import {setCount} from '@/store/actions/test'
import Box from '@/components/Box/Box'
interface AboutProps {
  name:string
}
export default function About() {
  const mapState = useCallback((state:any)=>({
    count:state.test.count
  }),[])
  const {count} = useMappedState(mapState)
  const dispatch = useDispatch()
  const addCount = useCallback(()=>{
    dispatch(setCount(count+1))
  },[count])
  return (
    <div>
      About
      <h3>count:{count}</h3>
      <button onClick={addCount}>点我</button>
      <Box name="我是撒大苏打" />
    </div>
  )
}
