import { ActionType } from '../../../../constants'

export function getHomeActionType(data) {
  return {
    type: ActionType.GET_HOME,
    data: data
  };
}