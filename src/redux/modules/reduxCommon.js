import Utility from '../../Common/Utility';
const __Base = 'GOCOM/WP/Common/';
const Load = __Base + 'Load';
const LoadSuccess = __Base + 'LoadSuccess';
const LoadFail = __Base + 'LoadFail';

const EditPageSliderInfo = __Base + '/EditPageSliderInfo';
const SetNavbarIsShow = __Base + '/SetNavbarIsShow';
const _BaseNBEditTitle = __Base + 'NavBar/';
const NbTitleEdit = _BaseNBEditTitle + 'Title_Edit';
const NbTitleInfo = _BaseNBEditTitle + 'Title_Info';
const DictStatusName = __Base + 'DictStatusName';

const __UpdateTime = __Base + '/__UpdateTime';
const __DeleteStateByFields = __Base + '/DeleteStateByFields';
// 清空信息
const ClearContentSuccess = __Base + '/ClearContentSuccess';
const UpdateObjectCopy = __Base + '/UpdateObjectCopy';
// 改变关联或取消关联
const __UpdateListRelationState = __Base + '/UpdateListRelationState';

/**
 * 设置变量操作
 * @type {string}
 */
const OnSetContent = __Base + 'OnSetContent';
const UrlParamsEdit = __Base + 'UrlParamsEdit';

const __API = __Base + 'API/';
const __POST = __API + '/POST';               // POST方法处理
const __PUT = __API + '/PUT';                 // PUT方法处理
const __DELETE = __API + '/DELETE';           // DELETE方法处理
const __GET = __API + '/GET';                 // GET方法处理

let __TEMP_SERVICES_SYSTEM_TIEM;
const initialState = { loaded: false, __Times: 0, };

function __ProcessDeleteStateByFields(state, action) {
  const { StateName, Fields } = action;
  if (!StateName || !Fields) {
    return state;
  }
  const __Data = state[StateName] || {};
  const List = Utility.isArray(__Data) ? __Data : __Data.List;
  if (!Utility.isArray(List)) {
    return state;
  }
  const __C_Name = Fields.constructor.name;
  let __fields = [];
  if (__C_Name === 'Object') {
    __fields = [Fields];
  } else if (__C_Name === 'Array') {
    __fields = Fields;
  } else {
    return state;
  }
  const __times = __fields.length;
  List.forEach((item, index) => {
    let __count = 0;
    for (let i = 0; i < __times; i++) {
      const { Key, Value } = __fields[i];
      if (item[Key] === Value) {
        __count++;
      }
    }
    if (__count === __times) {
      List.splice(index, 1);
      if (state[StateName].Total) {
        state[StateName].Total--;
      }
    }
  });
  return state;
}

function __ProcessConent(state, action) {
  const { StateName, result, Condition } = action;
  const { params } = Condition;
  const { size, page } = params || {};
  if (size > 0) {
    let __Data = state[StateName];
    if (!__Data) {
      __Data = {};
      state[StateName] = __Data;
    }
    if (!result) {
      state[StateName].List = [];
      state[StateName].Condition = Condition;
    }

    const { content } = result;
    if (!Utility.isArray(content)) {
      if (!Utility.isArray(state[StateName].List) || page === 0) {
        state[StateName].List = [];
      }
      params.IsExistsNextData = false;
      state[StateName].Condition = params;
      return state;
    }

    const __pgCount = size || Utility.constItem.PageSize;
    const __pgIndex = page || 0;
    params.page = Number(__pgIndex) + 1;
    params.size = __pgCount;
    params.IsExistsNextData = content.length < __pgCount ? false : true;
    if (content) {
      if (__pgIndex !== 0 && Utility.isArray(__Data.List)) {
        __Data.List = __Data.List.concat(content);
      } else {
        __Data.List = content;
      }
    }
    __Data.Condition = params;
    __Data.CurrentIndex = page;
    state[StateName] = __Data;
  } else {
    state[StateName] = result;
  }
  return state;
}

function __ProcessGetArray(state, action) {
  const { StateName, Condition, result } = action;
  const { params } = Condition;
  const { pg_index, pg_count, index } = params;
  let __Result = state[StateName];
  if (!__Result) {
    __Result = {};
    state[StateName] = __Result;
  }
  if (!result) {
    state[StateName].List = [];
    state[StateName].Condition = Condition;
    return state;
  }
  const { elements, totalElements } = result || {};
  if (!Utility.isArray(elements)) {
    if (!Utility.isArray(state[StateName].List) || pg_index === 0) {
      state[StateName].List = [];
    }
    params.IsExistsNextData = false;
    state[StateName].Condition = params;
    state[StateName].Total = totalElements;
    return state;
  }
  const __pgCount = pg_count || Utility.constItem.PageSize;
  const __pgIndex = pg_index || 0;
  params.pg_index = Number(__pgIndex) + 1;
  params.pg_count = __pgCount;
  params.IsExistsNextData = elements.length < __pgCount ? false : true;
  if (elements) {
    if (__pgIndex !== 0 && Utility.isArray(__Result.List)) {
      __Result.List = __Result.List.concat(elements);
    } else {
      __Result.List = elements;
    }
  }
  __Result.Condition = params;
  __Result.Total = totalElements;
  __Result.CurrentIndex = index;

  state[StateName] = __Result;
  return state;
}

function __ProcessRequestByGet(state, action) {
  const { StateName, result, Condition } = action;
  const { params } = Condition;
  if (params) {
    const { pg_index, __ContentArray } = params || {};
    if (!!__ContentArray) {
      return __ProcessConent(state, action);
    }
    if (pg_index || pg_index >= 0) {
      // 说明返回的数组。
      return __ProcessGetArray(state, action);
    }
  }

  if (StateName) {
    state[StateName] = result;
  }
  return state;
}

function __ProcessUpdateObjectCopy(state, action) {
  const { StatusName, Condition, NewObj } = action;
  const __Data = state[StatusName];
  if (!__Data) {
    return state;
  }
  const { List } = __Data || {};
  if (!Utility.isArray(List)) {
    return state;
  }
  const { Key, Value } = Condition;
  for (let i = 0; i < List.length; i++) {
    // let row = List[i];
    if (List[i][Key] === Value) {
      List[i] = NewObj;
      break;
    }
  }
  return state;
}

// 改变关联或取消关联
function __UpdateRelationList(state, action) {
  const { StateName, ChangeItem } = action;
  if (!StateName || !ChangeItem) {
    return state;
  }
  const __Data = state[StateName];
  const { List } = __Data || {};
  if (!Utility.isArray(List)) {
    return state;
  }
  const __Item_Name = ChangeItem.constructor.name;
  if (__Item_Name !== 'Object') {
    return state;
  }
  List.forEach((item) => {
    if ((item.uuid === ChangeItem.uuid)) {
      item.isRelation = ChangeItem.isRelation;
    }
  });
  return state;
}

export default function reducer(state = initialState, action = {}) {
  let __Result = { ...state };
  if (action.result) {      // 这里就是请求完成了
    Object.assign(__Result, { loading: false, loaded: true });
    __Result.Result = action.result;
  }
  if (action.error) {     // 请求完了之后出错信息
    Object.assign(__Result, { loading: false, loaded: false });
    __Result.Error = action.error;
  }

  const { StateName, result } = action;
  const { __CurrentSystemTimes } = result || {};
  if (__CurrentSystemTimes) {
    __TEMP_SERVICES_SYSTEM_TIEM = __CurrentSystemTimes;
  }
  __Result.CurrentSystemTimes = __TEMP_SERVICES_SYSTEM_TIEM;
  __Result.SystemTimes = __TEMP_SERVICES_SYSTEM_TIEM;
  switch (action.type) {
    case UpdateObjectCopy:
      __Result = __ProcessUpdateObjectCopy(state, action);
      break;
    case __DeleteStateByFields:
      __Result = __ProcessDeleteStateByFields(state, action);
      break;
    case SetNavbarIsShow:                                                             // 导航条是否显示
      __Result.IsHideNavBar = !!action.IsShow;
      break;
    case DictStatusName:                                                              // 状态字典 
      __Result.DictStatusName = Utility.constItem.Status.StatusName;
      break;
    case OnSetContent:
      __Result[action.Key] = action.Value;
      break;
    case EditPageSliderInfo:                                                             // 页面是否切换滑动方向
      const PageSliderInfo = __Result.PageSliderInfo || {};
      PageSliderInfo.IsReturn = action.IsReturn;
      __Result.PageSliderInfo = PageSliderInfo;
      break;
    case Load:                                                                         // 加载
      __Result.loading = true;
      break;
    case LoadSuccess:                                                                 // 加载成功
      __Result.data = action.result;
      break;
    case NbTitleInfo:                                                                     // 修改标题,是否显示返回按键
      __Result.Title = action.Title || '默认标题';
      __Result.IsShowBackArrow = action.IsShowBackArrow ? action.IsShowBackArrow : false;
      break;
    case NbTitleEdit:                                                                    // 修改标题
      __Result.Title = action.Title || '默认标题';
      break;
    case UrlParamsEdit:                                                                  // url 参数
      __Result.UrlParams = action.query;
      break;
    case LoadFail:                                                                       // 加载失败
      break;
    case __DELETE:
      break;
    case __POST:
    case __PUT:
      if (StateName) {
        __Result[StateName] = result;
      }
      break;
    case __GET:
      __Result = __ProcessRequestByGet(state, action);
      break;
    case __UpdateTime:
      __Result.__Times++;
      break;
    case ClearContentSuccess:
      __Result[action.Key] = null;                                               // 清空信息
      break;
    case __UpdateListRelationState:
      __Result = __UpdateRelationList(state, action);
      break;
    default:
  }
  return __Result;
}

function __RequestProcess(method, StateName, api, args) {
  const __Method = { get: __GET, post: __POST, put: __PUT, del: __DELETE };
  return {
    types: [Load, __Method[method] || __GET, LoadFail],
    promise: (client) => client[method || 'get'](api, args),
    Condition: args,
    StateName
  };
}

/**
 * post保存接口调用方法。
 * 
 * @export
 * @param {any} StateName 
 * @param {any} Api 
 * @param {any} Args {params:{}:data:{}} 
 * @returns 
 */
export function onApiPost(StateName, Api, Args) {
  return __RequestProcess('post', StateName, Api, Args);
}

/**
 * put方法，修改方法操作。
 * @export
 * @param {any} StateName 
 * @param {any} Api 
 * @param {any} Args 
 * @returns 
 */
export function onApiPut(StateName, Api, Args) {
  return __RequestProcess('put', StateName, Api, Args);
}

/**
 * 删除
 * 
 * @export
 * @param {any} Api 
 * @param {any} Args 
 * @returns 
 */
export function onApiDelete(Api, Args) {
  return __RequestProcess('del', null, Api, Args);
}

/**
 * 获取
 * 
 * @export
 * @param {any} StateName 
 * @param {any} Api 
 * @param {any} Args 
 * @returns 
 */
export function onApiGet(StateName, Api, Args) {
  return __RequestProcess('get', StateName, Api, Args);
}

/**
 * 删除List的数据.
 * 
 * @export
 * @param {any} StateName 
 * @param {any} Fields [{Key:'SourceId',Value:123},...] or {Key:'SourceId',Value:123}
 * @returns 
 */
export function onDeleteByFields(StateName, Fields) {
  return { type: __DeleteStateByFields, StateName, Fields };
}

/**
 * 清空信息
 * @param {key} string
 * @param value
 * @returns
 */
export function onClearContent(key) {
  return { type: ClearContentSuccess, Key: key };
}

/**
 * 改变(更新)关联或取消关联
 * 
 * @export
 * @param {any} StateName 
 * @param {any} ChangeItem 数据列表中被改变的某项item对象  {isRelation: 0}
 * @returns 
 */
export function onUpdateListRelationState(StateName, ChangeItem) {
  return { type: __UpdateListRelationState, StateName, ChangeItem };
}

export function onUpdateRedux() {
  return { type: __UpdateTime };
}

/**
 * 保存信息到 store里面去。
 * @param key
 * @param value
 * @returns {{type: string, Key: *, Value: *}}
 */
export function onSetContent(key, value) {
  return { type: OnSetContent, Key: key, Value: value };
}

/**
 * 页面滑动切换
 * @param row
 * @returns {{type: string, IsReturn: boolean}}
 */
export function onPageSliderInfo(row) {
  const { IsReturn } = row || {};
  return {
    type: EditPageSliderInfo,
    IsReturn: (IsReturn || false),
  };
}

/**
 * 修改导航条信息，标题，是否显示返回按钮
 * @param row
 * @returns {{type: string, Title: *, IsShowBackArrow: (*|boolean)}}
 */
export function onNavBarTitleInfo(row) {
  return { type: NbTitleInfo, Title: row.Title, IsShowBackArrow: row.IsShowBackArrow };
}

/**
 * 修改标题
 * @param row
 * @returns {{type: string, Title: *}}
 */
export function onNavBarTitleEdit(row) {
  return { type: NbTitleEdit, Title: row.Title };
}

/**
 * 保存当前当前url参数
 * @param row
 * @returns {{type: string, query: *}}
 */
export function onUrlParamsEdit(row) {
  return { type: UrlParamsEdit, query: row };
}

export function onUpdateObjectCopy(StatusName, Condition, NewObj) {
  return { type: UpdateObjectCopy, StatusName, Condition, NewObj };
}
