import { SET_COUNT } from '@/store/types'

export const initialState = {
  count: 1
}

export default function (state = initialState, action:{type:string,payload:any}) {
  switch(action.type) {
    case SET_COUNT:{
      return {
        ...state,
        count: action.payload
      }
    }
    default:{
      return state
    }
  }
}