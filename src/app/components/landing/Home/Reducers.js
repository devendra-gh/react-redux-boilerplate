import { ActionType } from '../../../../constants'
const initialState = {}

export default function homeReducer (state = initialState, action) {

  switch (action.type) {

    case ActionType.GET_HOME:
      return {
        ...state,
        ...action.data,
      }

    default :
      return state
  }

}
