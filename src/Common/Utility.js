import PlatformApi from './PlatformApi';

export default class Utility {
  static __Instance;

  constructor() {
    this._TempSaveContent = {};
    this.__ConstPrefix = 'WeiXinGoCom';
  }

  /**
   * 实例
   * @returns {*}
   */
  static instance() {
    if (this.__Instance === null || typeof this.__Instance === 'undefined') {
      this.__Instance = new this();
    }
    return this.__Instance;
  }

  static $platformApi = PlatformApi;

  /**
   * 常量
   * @type {{SaveUrlPath: string}}
   */
  static constItem = {
    PageSize: 10, // 每页大小数据
    CaptchaTimeout: 60,
    /**
     * 当前的上下文
     */
    Context: 'GxinContext',                                             // 当前页面的Context
    Token: 'gXin_Token',                                                // token 
    LoginApiInfo: 'gXin_LoginApiInfo',                                  // LoginApiInfo 
    ConfigInfo: 'gXin_ConfigInfo',                                      // config info 
    PageData: {
    },
    ReduxKey: {
      ManualInputModify: 'ManualInputModify',
    },
    NavBarRightType: { NBDefault: 'NBDefault', NBButton: 'NBButton', NBIcon: 'NBIcon', NBMenu: 'NBMenu', NBIconList: 'NBIconList', },
    /**
     * 事件
     */
    Event: 'onGoComEvent',                                               // 事件。
    Events: {
      HttpStatus: {
        1: 'onHttpStatus_GoCom_1',
        200: 'onHttpStatus_GoCom_200',                  // 处理成功
        400: 'onHttpStatus_GoCom_400',                  // 请求无效
        401: 'onHttpStatus_GoCom_401',                  // 未授权访问
        402: 'onHttpStatus_GoCom_402',
        403: 'onHttpStatus_GoCom_403',                  // 禁止访问
        404: 'onHttpStatus_GoCom_404',                  // 资源未找到
        405: 'onHttpStatus_GoCom_405',
        406: 'onHttpStatus_GoCom_406',
        407: 'onHttpStatus_GoCom_407',
        408: 'onHttpStatus_GoCom_408',
        409: 'onHttpStatus_GoCom_409',
        411: 'onHttpStatus_GoCom_411',                   // 登陆超时
        500: 'onHttpStatus_GoCom_500',                   // 服务器错误
        501: 'onHttpStatus_GoCom_501',
        502: 'onHttpStatus_GoCom_502',
        503: 'onHttpStatus_GoCom_503',
      },
      ShowModel: {
        OnActionSheet: 'onGoCom_ShowModel_ActionSheet',                            //
        OnLoading: 'onGoCom_ShowModel_Loading',                                    // 加载
        OnAlert: 'onGoCom_ShowModel_Alert',                                        // 弹出信息
        OnConfirm: 'onGoCom_ShowModel_Confirm',                                    // 确定--取消
        OnShowDialog: 'onGoCom_ShowModel_ShowDialog',                              // 打开对话框
        OnShowToast: 'onGoCom_ShowModel_ShowToast',                                // 提示框
        OnShowDialogHide: 'onGoCom_ShowModel_ShowDialogHide',                      // 隐藏对话框
        OnShowDialogClose: 'onGoCom_ShowModel_ShowDialogClose',                    // 关闭对话框
        OnActionSheetHide: 'onGoCom_ShowModel_ActionSheetHide',                    // 关闭
        OnLoadingHide: 'onGoCom_ShowModel_LoadingHide',
        OnConfirmHide: 'onGoCom_ShowModel_ConfirmHide',
        OnToastHide: 'onGoCom_ShowModel_ToastHide',                                // 隐藏提示框
        OnShowActions: 'onGoCom_ShowModel_ShowActions',                            // 确认提示框
        OnActionsHide: 'onGoCom_ShowModel_ActionsHide',                            // 隐藏确认提示框
        OnPreviewModel: 'onGoCom_ShowModel_PreviewModel',                          // 图片预览
        OnPreviewModelHide: 'onGoCom_ShowModel_PreviewModelHide',                  // 图片预览关闭
      },
      OnGoBack: 'onExodusEvent_GoBack',                                             // 页面退回事件
      OnEditNavBarTitle: 'onExodusEvent_EditNavBarTitle',                           // 修改导航条标题
      OnEditNavBarRight: 'onExodusEvent_EditNavBarRight',                           // 修改导航条右边
      OnEditPageSliderInfo: 'onExodusEvent_EditPageSliderInfo',                     // 页面切换
      OnOpenDatePicker: 'onExodusEvent_OnOpenDatePicker',                           // 打开日期控件
      OnKeyboard: 'onExodusEvent_Keyboard',                                         // 获取焦点键盘弹起;失去焦点键盘消失
      OnSetTitle: 'onExodusEvent_OnSetTitle',                                       // 修改导航条的标题
      OnEditLeftAction: 'onExodusEvent_OnEditLeftAction',
      OnScrollEvent: 'onGoCom_ScrollEvent',
      OnNotNetwork: 'onGoComNotNetwork',                                            // 无网
      OnNoResources: 'onGoComNoResources',                                          // 无资源
    },
    UserInfo: 'GoCom_UserInfo',                                                    // 用户信息
    SaveUserConfigInfo: 'GoCom_SaveUserConfigInfo',                                // 保存用户获取的配置信息
    SaveUrlPath: 'GoCom_SaveUrlPath',                                              // url保存地址
    /**
     * 所有接口常量
     */
    API: {
      UserInfo: 'GoCom_API_UserInfo',    // 用户信息
    },
    /**
     * 用户角色   
     */
    User: {
      User_Author: 'author',  // 创建者
      User_Executor: 'executor',  // 执行者
      User_Participant: 'normal',  // 无关人员
    },
    /**
     * 任务状态
     */
    Task: {
      Task_START: 'START', // 未处理
      Task_RECEIVED: 'RECEIVED', // 收到
      Task_FINISHED: 'FINISHED', // 完成
      Task_REFUSE: 'REFUSE', // 拒绝
      Task_OVER: 'OVER', // 结束
      Task_DELETE: 'DELETE', // 删除

      Task_START_RETURN: '未处理', // 未处理
      Task_RECEIVED_RETURN: '收到', // 收到
      Task_FINISHED_RETURN: '完成', // 完成
      Task_REFUSE_RETURN: '拒绝', // 拒绝
      Task_OVER_RETURN: '结束', // 结束
    },
    /**
    * url 列表
    */
    UrlItem: {
      GoBack: 'goBack',                                                    // 回退操作
      Default: 'default',                                                  // 首页-->商品列表
      ComponentDemo: 'componentdemo',                                      // 组件demo
      Task: 'task',                                                        // 任务
      GmessageView: 'gmessageview',                                        // 即信一览
      GmessageBoard: 'gmessageboard',                                      // 即信看板
      GmessageDealt: 'gmessagedealt',                                      // 即信待办
      DealtEdit: 'dealtedit',                                              // 即信待办编辑
      ToGMessage: 'togmessage',                                            // 即信待办编辑
      SearchPage: 'searchpage',                                            // 搜索
      EditTask: 'edittask',                                                // 编辑任务
      ExecutivePeople: 'executivepeople',                                  // 参与人员
      Execute: 'execute',                                                  // 执行
      TaskAssign: 'taskassign',                                            // 任务分配
      SelectLabel: 'selectlabel',                                          // 选择标签
      SelectRemind: 'selectremind',                                        // 选择提醒
      SelectExecutePlan: 'selectexecuteplan',                              // 选择执行方式
      SelectWorkWay: 'selectworkway',                                      // 选择工作方式
      SelectRepeatWay: 'selectrepeatway',                                  // 选择重复方式
      YesterdayDealt: 'yesterdaydealt',                                    // 昨日速记
      TaskRelated: 'taskrelated',                                          // 任务关联
      RelationTask: 'relationtask',                                        // 相关事务
      SearchSuJi: 'searchsuji',                                            // 搜索速记
    },
    UrlTitle: {
      '/default': { Title: '默认页面', Index: 0 },
      '/task': { Title: '任务', Index: 0 },
      '/edittask': { Title: '编辑', Index: 0 },
      '/gmessageview': { Title: '即信一览', Index: 1, IsShowTab: true },
      '/gmessageboard': { Title: '即信看板', Index: 1, IsShowTab: true },
      '/gmessagedealt': { Title: '即信速记', Index: 1, IsShowTab: true },
      '/dealtedit': { Title: '详情', Index: 0 },
      '/togmessage': { Title: '创建即信', Index: 0 },
      '/selectlabel': { Title: '选择标签', Index: 0 },
      '/selectremind': { Title: '选择提醒', Index: 0 },
      '/selectexecuteplan': { Title: '执行计划', Index: 0 },
      '/selectrepeatway': { Title: '重复方式', Index: 0 },
      '/selectworkway': { Title: '工作方式', Index: 0 },
      '/searchpage': { Title: '搜索', Index: 0 },
      '/executivepeople': { Title: '参与人员', Index: 0 },
      '/execute': { Title: '执行', Index: 0 },
      '/taskassign': { Title: '任务分配', Index: 0 },
      '/yesterdaydealt': { Title: '待办速记', Index: 0 },
      '/taskrelated': { Title: '任务关联', Index: 0 },
      '/relationtask': { Title: '相关事务', Index: 0 },
      '/searchsuji': { Title: '搜索', Index: 0 },
    },
    /**
     * 显示模式
     */
    ShowModel: {
      ActionSheet: 'GoComShowModelActionSheet',                      //
      Loading: 'GoComShowModelLoading',                              // 加载
      Alert: 'GoComShowModelAlert',                                  // 弹出信息
      Confirm: 'GoComShowModelConfirm',                              // 确定--取消
      Toast: 'GoComShowModelToast',
      Actions: 'GoComShowModelActions',                              // 确认提示
    },
    /**
     * 所有状态的
     */
    StateName: {
      gxDealt: 'gmessage_dealt',
      SelectExecutePlanType: 'GoCom_GXDB_EXECUTE_PLAN',
      SelectLabelType: 'GoCom_GXDB_LABEL_TYPE',
      SelectRemindType: 'GoCom_GXDB_REMIND_TYPE',
      SelectRepeatWay: 'GoCom_GXDB_REPEAT_WAY',
      SelectWorkWay: 'GoCom_GXDB_WORK_WAY',
      DealtDetail: 'GoCom_GXDB_DEALT_DETAIL',
      SelectEndDate: 'GoCom_GXDB_END_DATE',
    },
    StateInfo: {
      ExecutePlanType: [
        { id: 0, name: 'LIGTH', desc: '轻任务', extExecPlans: [], path: 'LIGTH', status: 1 },
        { id: 1, name: 'STANDARD', desc: '标准任务', extExecPlans: [], path: 'STANDARD', status: 1 },
        // { Id: 1, Title: '轻任务', Value: 'LIGTH' },
        // { Id: 2, Title: '标准任务', Value: 'STANDARD' },
        // { Id: 3, Title: '晨会', Value: 'MEETING' }
      ],
      LabelType: [
        { Id: 1, Title: '普通', BgStyle: '01' },
        { Id: 2, Title: '重要', BgStyle: '02' },
        { Id: 3, Title: '紧急', BgStyle: '03' }
      ],
      RemindType: [
        { Id: 0, Title: '不提醒', Value: 'NO' },
        { Id: 1, Title: '截止十五分钟前', Value: 'QUARTER' },
        { Id: 2, Title: '截止一小时前', Value: 'HOUR' },
        { Id: 3, Title: '截止三小时前', Value: 'THREEHOUR' },
      ],
      RepeatWay: [
        { Id: 1, Title: '不重复', Value: 'NO' },
        { Id: 2, Title: '每天重复', Value: 'DAY' },
        { Id: 3, Title: '每周重复', Value: 'WEEK' },
      ],
      WorkWay: [
        { Id: 1, Title: '无', Value: 'NO' },
        { Id: 2, Title: '多人合作', Value: 'TOGETHER' },
        { Id: 3, Title: '多人协作', Value: 'TEAM' },
      ]
    }
  }

  /**
   * 初始化页面信息
   * 
   * @static
   * @returns 
   * @memberof Utility
   */
  static $getInitPageTurning() {
    return { pg_index: 0, pg_count: this.constItem.PageSize, };
  }

  /**
   * 是否是数组
   * @param obj
   * @returns {boolean}
   */
  static isArray(obj) {
    if (!obj || !obj.length || obj.length === 0) {
      return false;
    }
    return Array.isArray(obj);
  }

  /**
   * 判断是否为空
   * true-为空;false-不为空
   * @param obj
   * @returns {boolean}
   */
  static isNull(obj) {
    return obj === null;
  }

  /**
   * 判断是否是微信打开的
   * @returns {boolean}
   */
  static isWeiXin() {
    try {
      const ua = window.navigator.userAgent.toLowerCase();
      const isWeiXin = ua.match(/micromessenger/i).indexOf('micromessenger');
      console.log(isWeiXin);
      return isWeiXin >= 0 ? true : false;
    } catch (ex) {
      return false;
    }
  }
  /**
    * 判断是否gocomPc打开的
    * @returns {boolean}
    */
  static isGocomPC() {
    try {
      // const ua = window.navigator.userAgent.toLowerCase();
      // const isWeiXin = ua.match(/micromessenger/i).indexOf('micromessenger');
      // alert(JSON.stringify(window.navigator));
      return '';
    } catch (ex) {
      return false;
    }
  }
  /**
   * 浏览器信息
   * @returns {Browser}
   */
  static browserInfo() {
    const _Browser = {
      versions: () => {
        const uu = window.navigator.userAgent;
        alert(uu);
        // const app = navigator.appVersion;
        return {
          trident: uu.indexOf('Trident') > -1,                                     // IE内核
          presto: uu.indexOf('Presto') > -1,                                       // opera内核
          webKit: uu.indexOf('AppleWebKit') > -1,                                 // 苹果、谷歌内核
          gecko: uu.indexOf('Gecko') > -1 && uu.indexOf('KHTML') === -1,           // 火狐内核
          mobile: !!uu.match(/AppleWebKit.*Mobile.*/),                            // 是否为移动终端
          ios: !!uu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),                        // ios终端
          android: uu.indexOf('Android') > -1 || uu.indexOf('Adr') > -1,           // android终端
          iPhone: uu.indexOf('iPhone') > -1,                                       // 是否为iPhone或者QQHD浏览器
          iPad: uu.indexOf('iPad') > -1,                                            // 是否iPad
          webApp: uu.indexOf('Safari') === -1,                                    // 是否web应该程序，没有头部与底部
          weixin: uu.indexOf('MicroMessenger') > -1,                             // 是否微信 （2015-01-22新增）
          qq: uu.match(/\sQQ/i) === ' qq'                                         // 是否QQ
        };
      },
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return _Browser;
  }

  /**
   * 是否IOS系统
   *
   * @static
   * @returns
   *
   * @memberOf Utility
   */
  static $isIOS() {
    try {
      const u = navigator.userAgent;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      return isIOS;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  /**
   * 解析URL地址
   * @method __ParseURL
   * @param {string} url 完整的URL地址
   * @return {object} 自定义的对象
   * @example
   *  用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
   * myURL.file='index.html'
   * myURL.hash= 'top'
   * myURL.host= 'abc.com'
   * myURL.query= '?id=255&m=hello'
   * myURL.params= Object = { id: 255, m: hello }
   * myURL.path= '/dir/index.html'
   * myURL.segments= Array = ['dir', 'index.html']
   * myURL.port= '8080'
   * yURL.protocol= 'http'
   * myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
   */
  static parseURL(url) {
    const ae = document.createElement('a');
    ae.href = url;
    return {
      source: url,
      protocol: ae.protocol.replace(':', ''),
      host: ae.hostname,
      port: ae.port,
      query: ae.search,
      params: (() => {
        const ret = {};
        const seg = ae.search.replace(/^\?/, '').split('&');
        const len = seg.length;
        let ii = 0;
        let ss;
        for (; ii < len; ii++) {
          if (!seg[ii]) {
            continue;
          }
          ss = seg[ii].split('=');
          ret[ss[0]] = ss[1];
        }
        return ret;
      })(),
      file: (ae.pathname.match(/\/([^\/?#]+)$/i) || [''])[1],
      hash: ae.hash.replace('#', ''),
      path: ae.pathname.replace(/^([^\/])/, '/$1'),
      relative: (ae.href.match(/tps?:\/\/[^\/]+(.+)/) || [''])[1],
      segments: ae.pathname.replace(/^\//, '').split('/')
    };
  }
  /**
   * 获取android版本
   *
   * @static
   * @returns
   *
   * @memberOf Utility
   */
  static $androidVersion() {
    const userAgent = navigator.userAgent;
    // const index = userAgent.indexOf('Android');
    if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
      const num = userAgent.substr(userAgent.indexOf('Android') + 8, 3);
      return { type: 'Android', version: num };
    }
  }

  /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * @method __FormatDate
   * @param fmt
   * @param date
   * @return {*}
   * @example
   *  Utility.FormatDate('yyyy-MM-dd hh:mm:ss.S',new Date());
   * @constructor
   */
  static formatDate(fmt, date) {
    if (!date) {
      return '';
    }
    let __this = new Date();
    let _fmt = fmt || 'yyyy-MM-dd HH:mm:ss.S';
    if (date !== null) {
      if (Date.parse(date)) {
        __this = date;
      } else {
        try {
          __this = new Date(date);
        } catch (ex) {
          __this = new Date();
        }
      }
    }
    const oo = {
      'M+': __this.getMonth() + 1, // 月份
      'd+': __this.getDate(), // 日
      'D+': __this.getDate(), // 日
      'H+': __this.getHours(), // 小时
      'h+': __this.getHours(), // 小时
      'm+': __this.getMinutes(), // 分
      's+': __this.getSeconds(), // 秒
      'q+': Math.floor((__this.getMonth() + 3) / 3), // 季度
      'S': __this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(_fmt)) {
      /(y+)/.exec(_fmt);
      // const aa = /(y+)/.test(_fmt);
      // if (aa) {
      const fmt1 = _fmt.replace(RegExp.$1, (__this.getFullYear() + '').substr(4 - RegExp.$1.length));
      _fmt = fmt1;
      // }
    }
    for (const kk in oo) {
      if (new RegExp('(' + kk + ')').test(fmt)) {
        _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (oo[kk]) : (('00' + oo[kk]).substr(('' + oo[kk]).length)));
      }
    }
    return _fmt;
  }

  /**
   * 打印输出日志
   * @method __PrintLog
   * @param {object} args 内容
   * @private
   */
  static printLog(args) {
    //  return;
    try {
      let __callmethod = '';
      try {
        throw new Error();
      } catch (ex) {
        // console.log(e.stack);
        __callmethod = ex.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, '');
      }

      const _curDate = new Date();
      const _aa = _curDate.toLocaleDateString() + ' ' + _curDate.toLocaleTimeString() + '.' + _curDate.getMilliseconds();
      console.log('--begin->', _aa, ' call method :', __callmethod);
      const __content = JSON.stringify(args);
      console.log(__content);
    } catch (ex) {
      console.log('---------输出日志，传入的内容传为JSON出现在异常--------------');
      console.log(ex);
      console.log('---------输出日志，内容为下--------------');
      console.log(args);
    }
  }

  /**
   * 判断输入的是否是手机号
   * @method __PhonePattern
   * @param {number} phone 手机号
   * @return {boolean} true 成功；false 失败
   * @example
   *  Utility.PhonePattern('13000100100');
   * @private
   */
  static PhonePattern(phone) {
    const ex = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
    return ex.test(phone);
  }

  /**
   * 密码验证
   * @method __PasswordPattern
   * @param {string} password 密码
   * @return {boolean} true 成功；false 失败
   * @private
   */
  static PasswordPattern(password) {
    // test('/^[_0-9a-z]{6,16}$/i');
    const ex = /^[_0-9a-zA-Z]{6,25}$/;
    return ex.test(password);
  }

  /**
   * 是否含有中文（也包含日文和韩文）
   * @method __IsChineseChar
   * @param {string} str 要判断的内容
   * @return {boolean} true:成功;false:失败.
   * @private
   */
  static IsChineseChar(str) {
    const regu = '^[\u4e00-\u9fa5]+$';
    const re = new RegExp(regu);
    return re.test(str);
  }

  /**
   * 设置内容,这里主要是用来存放临时数据的。
   * @method _SetContent
   * @param key  键值，用于下次的时候获取内容用的。其实就是 _TempSaveContent的属性名称。
   * @param content 要存储的内容
   * @param isSaveLocalStorage 是否保存到本地存储里面
   * @param IsUser 根据用户uid 来获取缓存里的数据。
   * @private
   */
  static setContent(key, content, isSaveLocalStorage, IsUser) {
    try {
      const self = this.instance();
      if (isSaveLocalStorage) {
        let __Content = content;
        if (IsUser) {
          const __UserInfo = self._TempSaveContent[this.constItem.API.UserInfo];
          if (typeof __UserInfo !== 'undefined' && __UserInfo !== null) {
            __Content = {};
            __Content[__UserInfo.member_id] = content;
          }
        }
        __Content = JSON.stringify(__Content);
        // __content = CryptoJS.AES.encrypt(__Content, __key);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, __Content);
        }
      }
      self._TempSaveContent[key] = content;
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * 删除指定字段值。
   * @method __RemoveContent
   * @param key
   * @return {null}
   * @private
   */
  static removeContent(key, IsRemoveLocalStorage) {
    try {
      const __self = this.instance();
      if (key === null || typeof key === 'undefined') {
        return;
      }
      if (__self._TempSaveContent.hasOwnProperty(key)) {
        delete __self._TempSaveContent[key];
      }

      if (IsRemoveLocalStorage && typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (ex) {
      this.printLog(ex.toString());
    }
  }

  /**
   * 获取内容，
   * @method _GetContent
   * @param key 健名称。其实就是 _TempSaveContent的属性名称。
   * @return {*} 返回内容
   * @private
   */
  static getContent(key, IsUser) {
    try {
      let __Content = null;
      const __self = this.instance();
      if (__self._TempSaveContent.hasOwnProperty(key)) {
        __Content = __self._TempSaveContent[key];
        return __Content;
      }
      if (typeof window === 'undefined') {
        return null;
      }
      if (__Content === null || typeof __Content === 'undefined') {
        const _value = window.localStorage.getItem(key);
        if (_value !== null && _value !== '' && typeof _value !== 'undefined') {
          const __JSONValue = JSON.parse(_value);
          __self._TempSaveContent[key] = JSON.parse(_value);
          if (IsUser) {
            if (__self._TempSaveContent.hasOwnProperty(this.constItem.API.UserInfo)) {
              const __UserInfo = __self._TempSaveContent[this.constItem.API.UserInfo];
              if (__JSONValue.hasOwnProperty(__UserInfo.member_id)) {
                __self._TempSaveContent[key] = __JSONValue[__UserInfo.member_id];
              } else {
                __self._TempSaveContent[key] = null;
              }
            } else {
              __self._TempSaveContent[key] = null;
            }
          }
          __Content = __self._TempSaveContent[key];
        }
      }

      return __Content;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  /**
   * 判断是否是函数
   * @param func 判断函数对象
   * @returns {boolean} true:成功，false:失败。
   */
  static isFunction(func) {
    if (func !== null && typeof func !== 'undefined' && func.constructor.name === 'Function') {
      return true;
    }
    return false;
  }

  /**
  * 判断是否未定义
  * @param obj 判断对象
  * @returns {boolean} true:成功，false:失败。
  */
  static isUndefined(obj) {
    if (typeof obj === 'undefined') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否定义。
   * @param obj 判断对象
   * @return {boolean} true:成功，false:失败。
   */
  static isDefined(obj) {
    if (typeof obj !== 'undefined') {
      return true;
    }
    return false;
  }

  /**
   * 判断是否是日期类型
   *
   * @static    * @param {any} obj  判断对象
   * @returns {boolean} true: 是日期，false:不是日期。
   * @example
   *        Utility.isDate('abcadfa')  ---> false
   *        Utility.isDate(new Date()) ---> true
   *        Utility.isDate('2013年10月10日') ---> true
   * @memberOf Utility
   */
  static isDate(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '') {   // 判断是不是 undefined,或 null
      return false;
    }
    const __isDate = obj.constructor.name === 'Date';  // 如果传入的就是日期
    if (__isDate) {
      return true;
    }
    try {
      return (new Date(obj.replace('年', '-').replace('月', '-').replace('日', ''))).constructor.name === 'Date';
    } catch (ex) {
      return false;
    }
  }

  /**
    * 将一个 对象转成url参数与&分开
    *
    * @param params 参数对象
    * @param split 分割符
    * @returns {*}
    * @example {a:a,b:b,c:c,e:e}
    * a=a&b=b&c=c&e=e
    */
  static $convertToUrlParams(params, options) {
    const { split, notFields } = options || {};
    if (this.isUndefined(params) || params === null) {
      return '';
    }
    const __KeyValue = [];
    const self = this;
    const __JSONValue = (value) => {
      try {
        let __JValue;
        if (value === null) {
          return '';
        }
        const { constructor } = value;
        if (typeof constructor === 'undefined' || constructor === null) {
          return '';
        }
        switch (value.constructor.name) {
          case 'Object':
            __JValue = '{' + this.$convertToUrlParams(value) + '}';
            break;
          case 'Array':
            __JValue = JSON.stringify(value);
            break;
          default:
            __JValue = value;
        }
        return __JValue;
      } catch (ex) {
        console.log(ex.message);
        return value || '';
      }
    };
    Object.keys(params).forEach((key) => {
      const __value = params[key];
      if (self.isDefined(__value) && __value !== '') {
        if (key.toLowerCase() !== 'IsExistsNextData'.toLowerCase()) {
          if (notFields) {
            if (notFields.indexOf(key) === -1) {
              __KeyValue.push(key + '=' + __JSONValue(__value));
            }
          } else {
            __KeyValue.push(key + '=' + __JSONValue(__value));
          }
        }
      }
    });
    return __KeyValue.join(split ? split : '&');
  }

  /**
   * 将 map对象 转成 key-value 数组对象
   * @param row
   * @returns {Array}
   */
  static convertMapToObject(row) {
    if (this.isUndefined(row) || this.isNull(row) || row === '') {
      return [];
    }
    const __Array = [];
    Object.keys(row).forEach((key) => {
      const __obj = {};
      __obj.key = key;
      __obj.value = row[key];
      __Array.push(__obj);
    });
    return __Array;
  }

  /**
   * 解析状态数据
   * @param state 状态
   * @param fieldName 字段名称
   * @param action 行为
   * @returns {*}
   */
  static parseStateMoreData(state, fieldName, action) {
    if (typeof action.result === 'undefined') {
      return state;
    }
    if (Utility.isUndefined(state[fieldName]) || state[fieldName] === null) {
      state[fieldName] = {};
    }
    const __Condition = action.Condition || {};
    const __pgIndex = __Condition.page || 0;
    const __pgCount = __Condition.size || this.constItem.PageSize;
    const __Result = action.result;
    __Condition.IsExistsNextData = !action.result.last;
    if (__pgIndex !== 0 && Utility.isArray(state[fieldName].List)) {
      state[fieldName].List = state[fieldName].List.concat(__Result);
    } else {
      state[fieldName].List = __Result;
    }
    __Condition.page = __Condition.IsExistsNextData ? (__pgIndex + 1) : __pgIndex;
    __Condition.pgCount = __pgCount;
    state[fieldName].Condition = __Condition;
    return state;
  }
  /**
     * 解析状态数据
     * @param state 状态
     * @param fieldName 字段名称
     * @param action 行为
     * @returns {*}
     */
  static parseStateMoreData2(state, fieldName, action) {
    if (typeof action.result === 'undefined') {
      return state;
    }
    if (Utility.isUndefined(state[fieldName]) || state[fieldName] === null) {
      state[fieldName] = {};
    }
    const __Condition = action.Condition || {};
    const __pgIndex = __Condition.pg_index || 0;
    const __pgCount = __Condition.pg_count || this.constItem.PageSize;
    const __Result = action.result.content;
    if (__pgIndex !== 0 && Utility.isArray(state[fieldName].List)) {
      state[fieldName].List = state[fieldName].List.concat(__Result);
    } else {
      state[fieldName].List = __Result;
    }
    // const __totalCount = state[fieldName].List.length || 1;
    __Condition.IsExistsNextData = !action.result.last;
    __Condition.pg_index = __Condition.IsExistsNextData ? (__pgIndex + 1) : __pgIndex;
    __Condition.size = __pgCount;
    state[fieldName].Condition = __Condition;
    return state;
  }
  /**
   * 页面跳转
   * @param url 要跳转的页面。
   * @param params 参数
   */
  static toPage(url, params) {
    try {
      const __context = this.getContent(this.constItem.Context);
      if (this.isUndefined(url) || url === '' || this.isUndefined(__context) || this.isUndefined(__context.router)) {
        return;
      }
      this.$loadingHide();
      const router = __context.router;

      if (url === this.constItem.UrlItem.GoBack) {
        this.$emit(this.constItem.Events.OnGoBack, { url: url, params: params });
        return;
      }
      const __pathname = '/' + url;
      router.push({ pathname: __pathname, query: Object.assign(params || {}, { _timestamp: new Date().getTime() }) });
    } catch (ex) {
      console.log(ex.toString());
    }
  }

  /**
   * 任务界面
   * @param url 要跳转的页面。
   * @param params 参数
   */
  static toTask(argument) {
    try {
      const {
        conId,
        filing_id,
        content
      } = argument;

      const taskUrl = '/tools/task/addtaskpost?';
      // const taskHttp = 'http://172.20.54.73:13000' + taskUrl;
      // const local = document.location.origin + '/';
      const taskHttp = document.location.origin + taskUrl;
      const local = document.location.origin + '/tools/meeting/';
      const localHost = local + this.constItem.UrlItem.Memorandum;
      const localReturnObj = {
        conId: conId,
        filing_id: filing_id,
        is_from_task: true,
      };
      console.log(localHost + '?' + Utility.$convertToUrlParams(localReturnObj));
      const localHttp = encodeURIComponent(localHost + '?' + Utility.$convertToUrlParams(localReturnObj));
      const taskObj = {
        Name: content,
        Description: content
      };
      console.log(JSON.stringify(taskObj));
      const taskStr = encodeURIComponent(this.base64Encode(JSON.stringify(taskObj)));
      const token = encodeURIComponent(this.getToken());
      const groupId = encodeURIComponent(this.getGroupId());
      const taskParam = {
        return_url: localHttp,
        task_data: taskStr,
        token: token,
        group_id: groupId
      };
      const finalUrl = taskHttp + Utility.$convertToUrlParams(taskParam);
      console.log(Utility.$convertToUrlParams(taskParam));
      console.log(finalUrl);
      window.location.href = finalUrl;
    } catch (ex) {
      console.log(ex.toString());
    }
  }

  static base64Encode(input) {
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let chr1 = '';
    let chr2 = '';
    let chr3 = '';
    let enc1 = '';
    let enc2 = '';
    let enc3 = '';
    let enc4 = '';
    let i = 0;
    const _input = this._utf8_encode(input);
    while (i < _input.length) {
      chr1 = _input.charCodeAt(i++);
      chr2 = _input.charCodeAt(i++);
      chr3 = _input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  static _utf8_encode(str) {
    const _str = str.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < _str.length; n++) {
      const c = _str.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  // public method for decoding
  static base64Decode(input) {
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;
    const _input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < _input.length) {
      enc1 = _keyStr.indexOf(_input.charAt(i++));
      enc2 = _keyStr.indexOf(_input.charAt(i++));
      enc3 = _keyStr.indexOf(_input.charAt(i++));
      enc4 = _keyStr.indexOf(_input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this._utf8_decode(output);
    return output;
  }

  // private method for UTF-8 decoding
  static _utf8_decode(utftext) {
    let string = '';
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c1 = utftext.charCodeAt(i + 1);
        c2 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
        i += 3;
      }
    }
    return string;
  }

  /**
   * base64转换成object
   * 
   * @param {any} data 
   * @returns 
   * @memberof Utility
   */
  static $base64Transcoding(data) {
    if (!data) {
      return null;
    }
    // private property  
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    // public method for decoding  
    let output = '';
    let chr1 = '';
    let chr2 = '';
    let chr3 = '';
    let enc1 = '';
    let enc2 = '';
    let enc3 = '';
    let enc4 = '';
    let i = 0;
    const __data = data.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < data.length) {
      enc1 = _keyStr.indexOf(__data.charAt(i++));
      enc2 = _keyStr.indexOf(__data.charAt(i++));
      enc3 = _keyStr.indexOf(__data.charAt(i++));
      enc4 = _keyStr.indexOf(__data.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    let string = '';
    let j = 0;
    let c = 0;
    let c2 = 0;
    let c3 = 0;
    while (i < output.length) {
      c = output.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        j++;
      } else if ((c > 191) && (c < 224)) {
        c2 = output.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        j += 2;
      } else {
        c2 = output.charCodeAt(i + 1);
        c3 = output.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return output;
  }

  /**
   * 格式化
   * @example
   * sprintf('Latitude: %s, Longitude: %s, Count: %d', 41.847, -87.661, 'two')
   * Expected output: Latitude: 41.847, Longitude: -87.661, Count: 0
   * @returns {*}
   */
  static sprintf() {
    const args = arguments;
    const string = args[0];
    let __index = 1;
    return string.replace(/%((%)|s|d)/g, (mm) => {
      // m is the matched format, e.g. %s, %d
      let val = null;
      if (mm[2]) {
        val = mm[2];
      } else {
        val = args[__index];
        // A switch statement so that the formatter can be extended. Default is %s
        switch (mm) {
          case '%d':
            val = parseFloat(val);
            if (isNaN(val)) {
              val = 0;
            }
            break;
          default:
            break;
        }
        __index++;
      }
      return val;
    });
  }

  /**
   * 格式化
   * @example
   * format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
   * ASP is dead, but ASP.NET is alive! ASP {2}
   * @param format
   * @returns {*}
   */
  static format(format) {
    const args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] !== 'undefined'
        ? args[number] : match;
    });
  }

  /**
   * 事件处理
   * @param eventName 事件名称
   * @param param1     参数名称1
   * @param param2     参数名称2
   * @param param3     参数名称3
   * @param param4     参数名称4
   * @param param5     参数名称5
   * @param param6     参数名称6
   * @param param7     参数名称7
   * @param param8     参数名称8
   * @param param9     参数名称9
   */
  static $emit(eventName, param1, param2, param3, param4, param5, param6, param7, param8, param9) {
    if (this.isUndefined(eventName)) {
      return;
    }
    const event = this.getContent(this.constItem.Event);
    if (this.isUndefined(event) || event === null) {
      return;
    }
    if (!this.isFunction(event.emit)) {
      return;
    }
    event.emit(eventName, param1, param2, param3, param4, param5, param6, param7, param8, param9);
  }

  /**
   * 添加事件
   * @param eventName  {string}  事件名称
   * @param callBack  {function} 回调的方法名称
   */
  static $on(eventName, callBack) {
    if (this.isUndefined(eventName)) {
      return;
    }
    const event = this.getContent(this.constItem.Event);
    if (this.isUndefined(event) || event === null) {
      return;
    }
    if (!this.isFunction(event.on)) {
      return;
    }
    event.on(eventName, callBack);
  }

  static $removeEvent(eventName, callback) {
    if (this.isUndefined(eventName)) {
      return;
    }
    const event = this.getContent(this.constItem.Event);
    if (this.isUndefined(event) || event === null) {
      return;
    }
    if (!this.isFunction(event.removeListener)) {
      return;
    }
    event.removeListener(eventName, callback);
  }

  /**
   * 弹出Toast信息
   * @param Content 弹出显示内容
   * @param IconType  弹出显示的图标   必须为Dxicon 声明的；
   * @constructor
   */
  static $showToast(content, IconType, disMissCallback, duration) {
    this.$emit(this.constItem.Events.ShowModel.OnShowToast, {
      content: content, IconType: IconType
    });
    let time = 500;
    if (duration) {
      time = duration;
    }
    setTimeout(() => {
      this.$emit(this.constItem.Events.ShowModel.OnToastHide, {
        disMissCallback: disMissCallback
      });
    }, time);
  }
  /**
   * 弹出删除确认提示窗 
   * @param ActionsTitle 
   * @param ActionsButtons 
   * @constructor
   */
  static $showActions(ActionsTitle, ActionsButtons) {
    this.$emit(this.constItem.Events.ShowModel.OnShowActions, {
      ActionsTitle: ActionsTitle, ActionsButtons: ActionsButtons
    });
  }
  /**
     * 弹出信息
     * @param content 弹出显示内容
     * @param ToPage 弹出来，页面跳转到下一个页面 {Url: Utility.constItem.UrlItem.Login, Options: {}}
     * @constructor
     */
  static $actionSheet(Content, Title, ToPage) {
    this.$emit(this.constItem.Events.ShowModel.OnActionSheet, {
      Title: Title, ContentInfo: { Content: Content }, ToPage: ToPage
    });
  }

  /**
   * 
   * 
   * @static
   * @param {any} Buttons [{Title:'btn1',FunName:()=>{}},{}...]
   * @param {any} IsHideCancel 默认不用填写
   * @memberof Utility
   */
  static $actionSheetBtns(Buttons, IsHideCancel) {
    this.$emit(this.constItem.Events.ShowModel.OnActionSheet, { Buttons, Options: { IsHideCancel } });
  }

  static $actionSheetHide(callback) {
    this.$emit(this.constItem.Events.ShowModel.OnActionSheetHide, { callBack: callback });
  }

  /**
   * 确定，取消窗体
   * @param Message 信息内容
   * @param okButton 点击确定事件
   * @param Title 弹出窗体上的标题 (可空)
   * @param onCancel 点击取消事件  (可空)
   */
  static $confirm(Message, okButton, Title, onCancel, options) {
    this.$emit(this.constItem.Events.ShowModel.OnConfirm,
      { Title: Title, Content: Message, okButton: okButton, onCancel: onCancel, Options: options }
    );
  }

  static $showDialog(Html, Title, okButton, onCancel, Options) {
    this.$emit(this.constItem.Events.ShowModel.OnShowDialog, {
      Title: Title, Html: Html, okButton: okButton, onCancel: onCancel, isShowAction: true, Options:
      Object.assign(Options || {}, { IsHideCancel: true, IsHideOk: true })
    });
  }

  static $showDialogHide(args) {
    this.$emit(this.constItem.Events.ShowModel.OnShowDialogHide, args);
  }

  static $showDialogConfirm(msg, Title, okButton, onCancel) {
    let _title = Title;
    let _okButton = okButton;
    if (this.isFunction(Title)) {
      _title = '提示';
      _okButton = Title;
    }
    this.$emit(this.constItem.Events.ShowModel.OnShowDialog,
      { Content: msg, Title: _title, okButton: _okButton, onCancel: onCancel, Options: { cancelBtnTitle: '取消', onBtnTitle: '确定' } }
    );
  }

  static $alert(msg, title) {
    let _title = title;
    let _okButton;
    if (this.isFunction(title)) {
      _title = '提示';
      _okButton = title;
    }
    this.$emit(this.constItem.Events.ShowModel.OnShowDialog,
      { Content: msg, Title: _title, okButton: _okButton, Options: { IsHideOk: true, cancelBtnTitle: '知道了' } }
    );
  }

  /**
   * 打开加载动画
   */
  static $loading() {
    this.$emit(this.constItem.Events.ShowModel.OnLoading);
  }

  /**
   * 关闭加载动画
   */
  static $loadingHide() {
    this.$emit(this.constItem.Events.ShowModel.OnLoadingHide);
  }


  /**
   * 去空格
   * @param value
   * @returns {*}
   */
  static $trim(value) {
    if (typeof value !== 'undefined') {
      return value.replace(/(^\s*)|(\s*$)/g, '');
    }
    return '';
  }

  /**
   * 去右边空格
   * @param value
   * @returns {*}
   */
  static $trimRight(value) {
    if (typeof value !== 'undefined') {
      return value.replace(/(\s*$)/g, '');
    }
    return '';
  }

  /**
   * 去左边空格
   * @param s
   * @returns {*}
   */
  static $trimLeft(value) {
    if (typeof value !== 'undefined') {
      return value.replace(/(^\s*)/g, '');
    }
    return '';
  }

  /**
   * 条件设置，主要翻页用的
   * @param row
   * @returns {{}}
   */
  static $conditionSetPageIndexAndPageSize(row) {
    const condition = {};
    Object.assign(condition, row || {});
    if (!condition.pg_index) {
      condition.pg_index = 0;
    }
    if (!condition.pg_count) {
      condition.pg_count = Utility.constItem.PageSize;
    }
    return condition;
  }

  /**
   * 打开日期控件
   *
   * @static    * @param {datetime} currentDate 当前时间
   * @param {boolean} isShowTime 是否显示时间
   * @param {Function} ok  点击确定按钮事件-->这里可以获取到返回的日期
   * @param {Function} cancel 取消按钮事件
   *
   * @example
   *    // 打开日期
   *    Utility.$openDatePicker(new Date(),false,(date)=>{console.log(date);},()=>{ // cancel todo });
   *    // 打开日期和时间
   *    Utility.$openDatePicker(new Date(),true,(date)=>{console.log(date);},()=>{ // cancel todo });
   *    // 传入日期
   *    Utility.$openDatePicker('2013-10-10',false,(date)=>{console.log(date);},()=>{// cancel todo });
   *    // 传入日期和时间
   *    Utility.$openDatePicker('2010-10-10 12:20,true,(date)=>{console.log(date);},()=>{ // cancel todo });
   *    // 传入值，如果是null 或 '' 默认为当前时间
   *    Utility.$openDatePicker('',false,(date)=>{console.log(date);},()=>{// cancel todo });
   *
   * @memberOf Utility
   */
  static $openDatePicker(currentDate, isShowTime, ok, cancel) {
    this.$emit(this.constItem.Events.OnOpenDatePicker, currentDate, isShowTime, ok, cancel);
  }

  /**
   * 将日期转为时间戳
   *
   * @static    * @param {any} date
   * @returns
   *
   * @memberOf Utility
   */
  static $convertToTimestamp(date) {
    if (typeof date === 'undefined' || date === null || date === '') {
      return 0;
    }
    if (this.isDate(date)) {
      return date.constructor.name === 'Date' ? date.getTime() : new Date(date.replace('年', '-').replace('月', '-').replace('日', '').replace(/-/g, '/')).getTime();
    }
    return 0;
  }

  /**
   * 将时间戳转为日期类型
   *
   * @static    * @param {number} value
   * @returns
   * @example
   *    Utility.$convertToDateByTimestamp('1478131200000') -> 2016-11-03
   *    Utility.$convertToDateByTimestamp('1478131200000','yyyy年MM月dd日') -> 2016年11月03日
   * @memberOf Utility
   */
  static $convertToDateByTimestamp(value, format) {
    if (this.$isNumber(value)) {
      const __date = new Date(parseInt(value, 0));
      return this.formatDate(format || 'yyyy-MM-dd', __date);
    }
    return '';
  }

  /**
   * 字符串转为日期类型
   *
   * @static    * @param {string} value 日期
   * @returns Date 或为 null
   * @example
   *  Utility.$convertToDateByString('2013-10-10');
   * @memberOf Utility
   */
  static $convertToDateByString(value) {
    if (this.isDate(value)) {
      return value.constructor.name === 'Date' ? value : new Date(value.replace('年', '-').replace('月', '-').replace('日', ''));
    }
    return null;
  }

  /**
   * 字符串日期转化为周几
   *
   * @static    * @param {string} value 日期
   * @returns Date 或为 null
   * @example
   *  Utility.$convertToDateByWeekDay('2013-10-10');
   * @memberOf Utility
   */
  static $convertToDateByWeekDay(value) {
    let week;
    let _date;
    if (value) {
      _date = new Date(value);
    }
    const day = _date.getDay();
    switch (day) {
      case 0:
        week = '周日';
        break;
      case 1:
        week = '周一';
        break;
      case 2:
        week = '周二';
        break;
      case 3:
        week = '周三';
        break;
      case 4:
        week = '周四';
        break;
      case 5:
        week = '周五';
        break;
      case 6:
        week = '周六';
        break;
      default:
        break;
    }
    if (new Date().toDateString() === new Date(value).toDateString()) {
      week = '今日';
    }
    return week;
  }

  /**
   * 状态转换，将状态转为对应显示的名称
   *
   * @static    * @param {object} obj 对象
   * @param {string} status 状态
   * @returns 返回状态对应的名称
   *
   * @memberOf Utility
   */
  static $statusConvert(obj, status) {
    if (this.isUndefined(obj) || obj === null || obj === '') {
      return this.isUndefined(status) ? '' : status;
    }
    if (this.isUndefined(status)) {
      return '';
    }
    const __Value = obj[status];
    return __Value ? __Value : status;
  }

  /**
   * @param value
   * @returns {*}
   */
  static $isNumber(value) {
    if (typeof value === 'undefined' || value === null || value === '') {
      return false;
    }
    return /^\+?[0-9]\d*$/.test(value);
  }

  /**
   * 格式化数字
   *
   * @static
   * @param {any} number
   * @returns
   *
   * @example Utility.$formatNumber(10000) ==> 10,000
   * @memberOf Utility
   */
  static $formatNumber(number) {
    if (!this.$isNumber(number)) {
      return number;
    }
    const __value = this.$trim(number);
    return String(__value).split('').reverse().join('').replace(/(\d{3})(?=[^$])/g, '$1,').split('').reverse().join('');
  }

  /**
   * 判断是否为空
   *
   * @static
   * @param {string} value 要判断的值
   * @returns true:是 ; false:否
   *
   * @memberOf Utility
   */
  static $isEmpty(value) {
    if (!value) {
      return true;
    }
    const __value = this.$trim(value);
    if (__value === '') {
      return true;
    }
    return false;
  }
  /**
   * 递归获取当前元素里面的所有 textarea,input 控件
   *
   * @static
   * @param {element} parentDiv 元素
   * @returns
   *
   * @memberOf Utility
   */
  static getCtrl(parentElement) {
    if (!parentElement) {
      return [];
    }
    const { HTMLTextAreaElement, HTMLInputElement } = window;
    if (parentElement instanceof HTMLTextAreaElement || parentElement instanceof HTMLInputElement) {
      return [parentElement];
    }
    const { childNodes } = parentElement;
    if (!childNodes) {
      return [];
    }
    let __CtrlList = [];
    for (let i = 0; i < childNodes.length; i++) {
      const __Result = this.getCtrl(childNodes[i]);
      if (__Result.length > 0) {
        __CtrlList = __CtrlList.concat(__Result);
      }
    }
    return __CtrlList;
  }

  /**
   * 给元素添加获取焦点和失败焦点事件
   *
   * @static
   * @param {any} ctrl
   * @returns
   *
   * @memberOf Utility
   */
  static __ElementFocusOrBlur(ctrl) {
    const __self = this;
    if (!ctrl) {
      return;
    }
    ctrl.addEventListener('focus', (ee) => {
      __self.$emit(__self.constItem.Events.OnKeyboard, true, ee);
    });
    ctrl.addEventListener('blur', (ee) => {
      __self.$emit(__self.constItem.Events.OnKeyboard, false, ee);
    });
  }

  /**
   * 主要是针对android手机
   * 判断输入框是否获取焦
   *
   * @static
   * @param {element} pageObj
   * @param {react} __React
   * @returns
   *
   * @memberOf Utility
   */
  static $keyboardEvent(pageObj, __React) {
    try {
      const __react = __React || window.React;
      if (!__react || !__react.findDOMNode) {
        return;
      }
      const { version } = Utility.$androidVersion() || {};
      if (!version) {
        return;
      }
      const __CtrlList = this.getCtrl(__react.findDOMNode(pageObj));
      if (__CtrlList.length === 0) {
        return;
      }
      for (let i = 0; i < __CtrlList.length; i++) {
        this.__ElementFocusOrBlur(__CtrlList[i]);
      }
    } catch (ex) {
      this.$actionSheet(ex.message);
    }
  }

  static $clone(obj) {
    if (!obj) {
      return null;
    }
    const __temp = {};
    Object.keys(obj).forEach((key) => {
      if (key !== 'IsExistsNextData' && key !== '_timestamp') {
        __temp[key] = obj[key] ? obj[key].toString() : '';
      }
    });
    return __temp;
  }

  /**
   * 后退操作
   *
   * @static
   *
   * @memberOf Utility
   */
  static $goBack(times) {
    this.toPage(this.constItem.UrlItem.GoBack, { times: times });
  }

  /**
   * 判断是否未定义
   * @param obj 判断对象
   * @returns {boolean} true:成功，false:失败。
   */
  static isInvalid(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '' || obj === {}) {
      return true;
    }
    return false;
  }

  /**
   * 返回token
   * @param obj 判断对象
   * @returns {boolean} true:成功，false:失败。
   */
  static getToken() {
    // return 'biz_token_e87e4c38a51cb42d858825c2a9459aa9';
    const _key = 'GOCOM_TOKEN_KEY';
    const token = this.getContent(_key);
    return token;
  }

  static setToken(token) {
    const _key = 'GOCOM_TOKEN_KEY';
    this.setContent(_key, token, true);
  }

  static setTaskDetail(taskDetail) {
    const _key = 'GOCOM_TASKDETAIL_KEY';
    this.setContent(_key, taskDetail, true);
  }

  static getTaskDetail() {
    const _key = 'GOCOM_TASKDETAIL_KEY';
    return this.getContent(_key);
  }
  static removeTaskDetail() {
    const _key = 'GOCOM_TASKDETAIL_KEY';
    this.removeContent(_key, true);
  }
  static getGroupId() {
    // return 'wp_AAA';
    const _key = 'GOCOM_GROUP_ID';
    const groupId = this.getContent(_key);
    return groupId;
  }

  static setGroupId(group_id) {
    const _key = 'GOCOM_GROUP_ID';
    this.setContent(_key, group_id, true);
  }

  /**
   * 没资源
   * @param {any} data 
   * @returns 
   * @memberof Utility
   */
  static $showNoResource() {
    this.$emit(this.constItem.Events.OnNoResources, true);
  }

  /**
   * 隐藏没资源
   * @param {any} data 
   * @returns 
   * @memberof Utility
   */
  static $showNoResourceHide() {
    this.$emit(this.constItem.Events.OnNoResources, false);
  }

  /**
   * 菜单-->导航条左边添加按键
   * @param Text
   * @param onClick
   * @param Color
   * @param BgColor
   */
  static $navBarLeftAddButton(Text, onClick, Color, BgColor) {
    this.$navBarEdit('RightType', this.constItem.NavBarRightType.NBButton, { Text: Text, onClick: onClick, Color: Color, BgColor: BgColor });
  }

  /**
   * 菜单-->导航条左边添加图标
   * @param Icon
   * @param onClick
   */
  static $navBarLeftAddIcon(Icon, onClick) {
    this.$navBarEdit('LeftType', this.constItem.NavBarRightType.NBIcon, { Icon: Icon, onClick: onClick });
  }

  /**
   * 菜单-->导航条右边添加图标
   * @param Icon
   * @param onClick
   */
  static $navBarRightAddIcon(Icon, onClick) {
    this.$navBarEdit('RightType', this.constItem.NavBarRightType.NBIcon, { Icon: Icon, onClick: onClick });
  }

  /**
   * 菜单-->导航条右边添加图标列表
   * @param Options [{icon:'',onClick:()=>{}}]
   */
  static $navBarRightAddIconList(Options) {
    this.$navBarEdit('RightType', this.constItem.NavBarRightType.NBIconList, Options);
  }

  /**
   * 菜单-->添加菜单
   * [{Text:'菜单1',onClick:onClick},{Text:'菜单2',onClick:onClick},...]
   * @param MenuItem
   */
  static $navBarRightAddMenuItem(MenuItem) {
    this.$navBarEdit('LeftType', this.constItem.NavBarRightType.NBMenu, MenuItem);
  }

  /**
   * 菜单-->导航条右边添加按键
   * @param Text
   * @param onClick
   * @param Color
   * @param BgColor
   */
  static $navBarRightAddButton(Text, onClick, Color, BgColor) {
    this.$navBarEdit('RightType', this.constItem.NavBarRightType.NBButton, { Text: Text, onClick: onClick, Color: Color, BgColor: BgColor });
  }

  static $navBarEdit(nbDirection, nbType, options) {
    this.$emit(this.constItem.Events.OnEditNavBarRight, nbDirection || 'RightType', nbType, options);
  }

  /**
  * 图片预览
  * 
  * @static
  * @param {any} previewInfo  {Url:''}
  * @memberof Utility
  */
  static $previewModel(previewInfo) {
    this.$emit(this.constItem.Events.ShowModel.OnPreviewModel, previewInfo || {});
  }

  static $previewModelHide() {
    this.$emit(this.constItem.Events.ShowModel.OnPreviewModelHide);
  }

  // Check if the element belongs to a video element
  // only accept <source />, <track />,
  // <MyComponent isVideoChild />
  // elements
  static isVideoChild(c) {
    if (c.props && c.props.isVideoChild) {
      return true;
    }
    return (c.type === 'source' || c.type === 'track');
  }

}
