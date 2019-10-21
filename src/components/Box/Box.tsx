import React from 'react'
import {BoxProp} from '@/types/components/box'


export default function Box(prop:BoxProp) {
  let {name} = prop
  return (
    <h2>
      {name}
    </h2>
  )
}
