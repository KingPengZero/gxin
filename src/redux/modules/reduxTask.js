import Utility from '../../Common/Utility';

const __Base = 'GoCom/VEP/Conference/';
const Load = __Base + 'Load';
const LoadSuccess = __Base + 'LoadSuccess';
const LoadFail = __Base + 'LoadFail';
// const UpdateSelectPeopleRadio = __Base + 'UpdateSelectPeopleRadio';
const __API = __Base + 'API/';
const APIReduxTestSuccess = __API + 'ReduxTestSuccess';
const APIReduxTestFail = __API + 'ReduxTestFail';
// 轻任务详情
const APITaskDetailSuccess = __API + 'TaskDetailSuccess';
const APITaskDetailFail = __API + 'TaskDetailFail';
// 修改轻任务
const APIEditTaskSuccess = __API + 'EditTaskSuccess';
const APIEditTaskFail = __API + 'EditTaskFail';
const APIExtEditTaskSuccess = __API + 'ExtEditTaskSuccess';
const APIExtEditTaskFail = __API + 'ExtEditTaskFail';
const APIGetPeopleListSuccess = __API + 'GetPeopleListSuccess';
const APIGetPeopleListFail = __API + 'GetPeopleListFail';
const APIGetReplyListFail = __API + 'GetReplyListFail';
const APIGetReplyListSuccess = __API + 'GetReplyListSuccess';
const APIGetContextListFail = __API + 'GetContextListFail';
const APIGetContextListSuccess = __API + 'GetContextListSuccess';
const APIReplyFail = __API + 'ReplyFail';
const APIReplySuccess = __API + 'ReplySuccess';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  let __Result = {...state
  };
  if (action.result) { // 这里就是请求完成了
    Object.assign(__Result, {
      loading: false,
      loaded: true
    });
    __Result.Result = action.result;
  }
  if (action.error) { // 请求完了之后出错信息
    Object.assign(__Result, {
      loading: false,
      loaded: false
    });
    __Result.Error = action.error;
  }
  switch (action.type) {
    case APIReduxTestSuccess:
      __Result = action.result;
      break;
    case LoadSuccess:                                                                 // 加载成功
      __Result.data = action.result;
      break;
    case APIGetPeopleListSuccess:
      __Result = Utility.parseStateMoreData2(state, 'peopleList', action);
      break;
    case APIGetReplyListSuccess:
      __Result = Utility.parseStateMoreData2(state, 'replyList', action);
      break;
    case APIGetContextListSuccess:
      __Result = action.result;
      break;
    case APITaskDetailSuccess:
      __Result.TaskDetail = action.result;
      break;
    case APIEditTaskSuccess:
      __Result.TaskDetail = action.result;
      break;
    case APIExtEditTaskSuccess:
      __Result.TaskDetail = action.result;
      break;
    case APIReplySuccess:
      __Result.TaskDetail = action.result;
      break;
    case APITaskDetailFail:
    case APIEditTaskFail:
    case APIExtEditTaskFail:
    case APIGetPeopleListFail:
    case APIGetReplyListFail:
    case APIGetContextListFail:
    case APIReplyFail:
    case LoadFail: // 加载失败
      break;
    default:
  }
  return __Result;
}

export function onReduxTemp() {
  return {
    types: [Load, APIReduxTestSuccess, APIReduxTestFail],
    promise: (client) => client.get(client.API.TestDemo)
  };
}
/**
 * 
 * 查看任务详情
 * 
 * @export
 * @param {any} argument   任务id
 * @returns 
 */
export function onTaskDetail(argument) {
  console.log(Utility.$convertToUrlParams(argument));
  return {
    types: [Load, APITaskDetailSuccess, APITaskDetailFail],
    promise: (client) => client.get(Utility.format(client.API.TaskDetail, argument))
  };
}

/**
 * 更改轻任务  内容  或者  状态
 * @export
 * @param {any} conId
 * @param {any} argument
 * @returns
 */
export function onEditTask(conId, argument) {
  return {
    types: [Load, APIEditTaskSuccess, APIEditTaskFail],
    promise: (client) => client.put(Utility.format(client.API.EditTask, conId), {
      data: argument
    })
  };
}
/**
 * 更改轻任务  内容  或者  状态
 * @export
 * @param {any} conId
 * @param {any} argument
 * @returns
 */
export function onExtEditTask(conId, argument) {
  return {
    types: [Load, APIExtEditTaskSuccess, APIExtEditTaskFail],
    promise: (client) => client.put(Utility.format(client.API.ExtEditTask, conId), {
      data: argument
    })
  };
}
/**
 * 获取任务执行人list
 * @param row
 * @returns {{types: *[]}}
 */
export function onGetPeopleList(conId, condition) {
  return {
    types: [Load, APIGetPeopleListSuccess, APIGetPeopleListFail],
    promise: (client) => client.get(Utility.format(client.API.ExtList, conId) + '?' + Utility.$convertToUrlParams(Utility.$conditionSetPageIndexAndPageSize(condition))),
    Condition: condition
  };
}
/**
 * 获取任务回复list
 * @param row
 * @returns {{types: *[]}}
 */
export function onGetReplyList(conId, condition) {
  return {
    types: [Load, APIGetReplyListSuccess, APIGetReplyListFail],
    promise: (client) => client.get(client.API.GetReplyList + '?' + 'msg_id=' + conId + '&' + Utility.$convertToUrlParams(Utility.$conditionSetPageIndexAndPageSize(condition))),
    Condition: condition
  };
}
/**
 * 获取任务上下文list
 * @param row
 * @returns {{types: *[]}}
 */
export function onGetContextList(conId) {
  return {
    types: [Load, APIGetContextListSuccess, APIGetContextListFail],
    promise: (client) => client.get(client.API.GetContextList + '?' + 'msg_id=' + conId),
  };
}

/**
 * 更改轻任务  内容  或者  状态
 * @export
 * @param {any} conId
 * @param {any} argument
 * @returns
 */
export function onReply(msg_id, argument) {
  return {
    types: [Load, APIReplySuccess, APIReplyFail],
    promise: (client) => client.post(client.API.GetReplyList + '?' + 'msg_id=' + msg_id, {
      data: argument
    })
  };
}
