import React, { Component, PropTypes } from 'react';
import { Utility, ActionSheet, ActionsSheet, ConfirmModel, LoadingModel, DatePicker, ToastModel, NoResources, PreviewModel } from 'components';
import { connect } from 'react-redux';
import * as CommonActions from 'redux/modules/reduxCommon';

@connect(
  state => ({
    IsShowBackArrow: state.Common.IsShowBackArrow,
    UrlParams: state.Common.UrlParams,
    CurrentPagePathInfo: state.Common.PathInfo,
  }),
  { ...CommonActions })

/**
 * 导航条
 */
export default class NavBar extends Component {
  static propTypes = {
    IsShowBackArrow: PropTypes.bool,                                 // 是否显示返回按键
    Title: PropTypes.string,                                         // 标题
    UrlParams: PropTypes.object,                                     // url 参数
    CurrentPagePathInfo: PropTypes.object,                           // 当前页面url信息
    IsWeiXin: PropTypes.bool,                                        // 微信
    onNavBarTitleInfo: PropTypes.func.isRequired,                    // 导航条信息
    onUrlParamsEdit: PropTypes.func,                                 // 获取url参数
    onNavBarTitleEdit: PropTypes.func,                               // 修改标题
    onHandlerRight: PropTypes.func,                                  // 右边事件
    onGetUserInfo: PropTypes.func,                                   // 获取用户信息
    // onTabsFooterInfo: PropTypes.func,                                // 是否显示tabsTooter
    onPageSliderInfo: PropTypes.func,                                // 页面滑动
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      __Index: 0,
      IsOpenDate: false,                                         // 是否打开日期组件
      CurrentSelectDate: new Date(),                             // 当前选中的日期
      IsShowTime: false,                                         // 是否显示时间
      ShowModelLoading: '',                                      // 加载
      ShowModelConfirm: '',                                      // 确定和取消
      ShowModelActionSheet: '',                                  // 弹出信息
      ShowModelToast: '',                                        // 弹出提示框信息
      ShowModelActions: '',                                      // 弹出确认提示框
      asContent: '',                                             // 内容
      asTitle: '',                                               // 标题
      asButtons: [],                                             // 按钮集合
      // RightType: Utility.constItem.NavBarRightType.NBDefault,    // 导航右边
      DialogList: [],                                            // 对话窗体列表
      isBackClose: false,                                        // 点击左侧返回是否关闭页面

    };
  }

  componentWillMount() {
    // 初始化加载事件
    this.__InitEmit();
    // 初始化监听路由事件
    this.__InitRouteListen();
    // 设置上下文件
    Utility.setContent(Utility.constItem.Context, this.context);
    // 获取用户信息
    if (Utility.isFunction(this.props.onGetUserInfo)) {
      this.props.onGetUserInfo();
    }
  }

  componentDidMount() {
    this.state.IsWeiXin = Utility.isWeiXin();
    this.state.isMount = true;
    if (window.GoCom) {
      window.GoCom.maxWindow();
    }
  }

  componentWillUnmount() {
    try {
      const { __IComCloseBtnInterval, __IntervalNBDefault, __IntervalNBMenu, __IntervalNBIcon } = this.state;
      clearInterval(__IComCloseBtnInterval);
      clearTimeout(__IComCloseBtnInterval);
      clearInterval(__IntervalNBDefault);
      clearInterval(__IntervalNBMenu);
      clearInterval(__IntervalNBIcon);
      clearTimeout(__IntervalNBDefault);
      clearTimeout(__IntervalNBMenu);
      clearTimeout(__IntervalNBIcon);
      delete this.state.isMount;
      this.state.isUnmount = true;
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * 更新页面信息
   *
   * @memberOf NavBar
   */
  __UpdateRender() {
    if (!!this.state.isMount) {
      this.setState({ __Index: this.state.__Index++ });
    }
  }

  /**
   * 初始化监听路由事件
   * @private
   */
  __InitRouteListen() {
    try {
      if (!this.context.router || !this.context.router.listen) {
        return;
      }
      const { onUrlParamsEdit } = this.props;
      const __self = this;
      this.context.router.listen((obj) => {
        // 关闭弹窗体
        Utility.$emit(Utility.constItem.Events.ShowModel.OnConfirmHide);
        Utility.$showNoResourceHide();
        delete __self.state.nMenuItem;
        onUrlParamsEdit(obj.query);
        const __IsReturn = __self.__UpdateTitle(obj);
        if (__IsReturn) {
          return;
        }
        let __PathItem = Utility.getContent(Utility.constItem.SaveUrlPath);
        if (obj.action === 'POP') {
          this.showBackButton(false);
          if (Utility.isArray(__PathItem)) {
            __PathItem.pop();
            Utility.setContent(Utility.constItem.SaveUrlPath, __PathItem, true);
          } else {
            __self.__CloseWebView();
          }
          return;
        }

        Utility.setContent(Utility.constItem.IsStopSlidePageAnimation, false);
        Utility.$emit(Utility.constItem.Events.OnEditPageSliderInfo, { IsReturn: false });

        if (__PathItem === null || !Utility.isArray(__PathItem)) {
          __PathItem = [];
        }
        __PathItem.push(obj);
        Utility.setContent(Utility.constItem.SaveUrlPath, __PathItem, true);
        __self.showBackButton(true);
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * 更新标题
   * @param options
   * @returns {boolean}
   * @private
   */
  __UpdateTitle(options) {
    const { pathname } = options || {};
    if (!pathname) {
      return false;
    }
    const __PathName = pathname.toLowerCase();
    const __Obj = Utility.constItem.UrlTitle;
    const __UrlTitle = __Obj[__PathName] || __Obj['/' + __PathName];
    const { Title, Index, IsShowTab } = __UrlTitle || {};
    const __AppPage = { IsShowTab };
    if (Title) {
      __AppPage.Title = Title;
    }
    __AppPage.IsReturn = (options.action === 'POP');

    Utility.$emit(Utility.constItem.Events.OnEditPageSliderInfo, __AppPage);

    if (Index > 0) { // 顶级页面。
      Utility.removeContent(Utility.constItem.SaveUrlPath, true);
      this.showBackButton(false);
      this.__IsStop();
      return true;
    }
    // 次级页面
    return false;
  }

  __CloseWebView() {
    const { GoCom } = window || {};
    const { closeWindow } = GoCom || {};
    if (closeWindow) {
      console.log('关闭窗体。');
      closeWindow();
    }
  }

  /**
   * 后退操作
   */
  __HandlerGoBack() {
    const { isBackClose } = this.state;
    if (isBackClose) {
      this.state.isBackClose = false;
      this.__CloseWebView();
      return;
    }
    const __PathItem = Utility.getContent(Utility.constItem.SaveUrlPath);
    if (__PathItem === null || !Utility.isArray(__PathItem) || __PathItem.length === 0) {
      this.showBackButton(false);
      this.__IsStop();
      this.__CloseWebView();
      return;
    }
    if (__PathItem.length === 0) {
      this.showBackButton(false);
    }
    Utility.setContent(Utility.constItem.SaveUrlPath, __PathItem, true);
    Utility.$emit(Utility.constItem.Events.OnEditPageSliderInfo, { IsReturn: true });
    // 添加一个回调,以区分是按钮后退还是箭头后退
    this.context.router.goBack();
  }

  /**
   * 停止动画切换界面
   *
   * @memberOf NavBar
   */
  __IsStop() {
    setTimeout(() => {
      Utility.setContent(Utility.constItem.IsStopSlidePageAnimation, true);
    }, 500);
  }

  /**
   * 显示返回箭头
   * @param isShow
   */
  showBackButton() {
    this.props.onNavBarTitleInfo({ IsShowBackArrow: true, Title: this.props.Title });
  }

  /**
   * 初始化事件
   * @private
   */
  __InitEmit() {
    const __this = this;
    Utility.$on(Utility.constItem.Events.OnGoBack, () => {
      __this.__HandlerGoBack();
    });
    Utility.$on(Utility.constItem.Events.OnEditLeftAction, (args) => {
      __this.state.isBackClose = args;
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[1], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[400], (err, body) => {
      Utility.$actionSheet(body ? body.message : (err ? err.message : ''));
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[401], (err, body) => {
      if (body && body.code === 804) {
        console.log(err, body);
      } else {
        let msg = '服务器处理错误，请重试！';
        if (body && body.message) {
          msg = body.message;
        }
        Utility.$actionSheet(msg);
      }
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[402], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[403], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[404], (err, body) => {
      if (body && body.message) {
        Utility.$showNoResource();
        // Utility.$actionSheet(body.message);
        return;
      }
      Utility.$actionSheet('接口[' + body.path + ']方法未找到');
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[405], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[406], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[407], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[408], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[409], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[411], (err, body) => {
      Utility.$emit(Utility.constItem.Events.ShowModel.OnActionSheet, {
        Title: __this.props.Title,
        Content: { Content: body.message || '用户登录过期' }
      });
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[500], (err, body) => {
      const { msg } = body || {};
      Utility.$actionSheet('服务器处理错误' + (msg ? '[' + msg + ']' : ''));
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[501], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[502], (err, body) => {
      console.log(err, body);
    });
    Utility.$on(Utility.constItem.Events.HttpStatus[503], (err, body) => {
      console.log(err, body);
    });

    Utility.$on(Utility.constItem.Events.OnNoResources, (isNoResources) => {
      __this.state.IsNoResources = isNoResources;
    });

    const __ClearComponent = () => {
      delete __this.state.IsShowPreview;
      delete __this.state.PreviewInfo;
      __this.__UpdateRender();
    };

    const {
      OnActionSheet, OnConfirm, OnLoading, OnLoadingHide, OnActionSheetHide, OnConfirmHide, OnShowDialog, 
      OnShowDialogClose, OnShowDialogHide, OnShowToast, OnToastHide, OnShowActions, OnActionsHide,
      OnPreviewModel, OnPreviewModelHide
    } = Utility.constItem.Events.ShowModel;

    Utility.$on(OnPreviewModel, (args) => {
      __this.state.IsShowPreview = true;
      __this.state.PreviewInfo = args;
      __this.__UpdateRender();
    });
    Utility.$on(OnPreviewModelHide, () => {
      __ClearComponent();
    });

    /**
     * 弹出消息窗体
     */
    Utility.$on(OnActionSheet, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelActionSheet: Utility.constItem.ShowModel.ActionSheet,
        asContent: args.ContentInfo,
        asTitle: args.Title || __this.props.Title,
        asButtons: args.Buttons,
        asOptions: args.Options,
        asToPage: args.ToPage || {}
      });
      __this.__UpdateRender();
    });

    /**
     * 关闭弹出消息窗体
     */
    Utility.$on(OnActionSheetHide, (args) => {
      const { goComActionSheet } = __this.refs;
      if (!goComActionSheet) {
        return;
      }
      goComActionSheet.__HandlerClose();
      setTimeout(() => {
        __this.state.ShowModelActionSheet = '';
        __this.__UpdateRender();
        const { callBack } = args || {};
        if (callBack) {
          callBack();
        }
      }, 200);
    });

    /**
     * 弹出确认--取消窗体
     */
    Utility.$on(OnConfirm, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelConfirm: Utility.constItem.ShowModel.Confirm,
        cmTitle: args.Title || __this.props.Title,
        cmContent: args.Content,
        cmOkButton: args.okButton,
        cmCancelButton: args.cancelButton,
        cmOptions: args.Options,
      });
      __this.__UpdateRender();
    });

    /**
    * 弹出提示窗体
    */
    Utility.$on(OnShowToast, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelToast: Utility.constItem.ShowModel.Toast,
        ToastContent: args.content,
        ToastcmIconType: args.IconType,
      });
      __this.__UpdateRender();
    });

    /**
    * 关闭提示窗体
    */
    Utility.$on(OnToastHide, (args) => {
      const times = parseInt(args || 0, 0);
      setTimeout(() => {
        if (__this.state.ShowModelToast === '') {
          return;
        }
        __this.state.ShowModelToast = '';
        if (args && args.disMissCallback && Utility.isFunction(args.disMissCallback)) {
          args.disMissCallback();
        }
        __this.__UpdateRender();
      }, times === 0 ? 10 : times);
    });

    /**
    * 弹出删除等动作确认窗体
    */
    Utility.$on(OnShowActions, (args) => {
      __this.state = Object.assign(__this.state || {}, {
        ShowModelActions: Utility.constItem.ShowModel.Actions,
        ActionsTitle: args.ActionsTitle,
        ActionsButtons: args.ActionsButtons,
      });
      __this.__UpdateRender();
    });

    /**
    * 关闭删除等动作确认窗体
    */
    Utility.$on(OnActionsHide, (args) => {
      const times = parseInt(args || 0, 0);
      setTimeout(() => {
        if (__this.state.ShowModelToast === '') {
          return;
        }
        __this.state.ShowModelToast = '';
        __this.__UpdateRender();
      }, times === 0 ? 10 : times);
    });

    /**
     * 弹出加载窗体
     */
    Utility.$on(OnLoading, () => {
      __this.state = Object.assign(__this.state || {}, { ShowModelLoading: Utility.constItem.ShowModel.Loading, lmContent: '正在处理...' });
      __this.__UpdateRender();
    });

    /**
     * 关闭弹出的确认--取消窗体
     */
    Utility.$on(OnLoadingHide, (args) => {
      if (__this.state.ShowModelLoading === '') {
        return;
      }
      const times = parseInt(args || 0, 0);
      setTimeout(() => {
        if (__this.state.ShowModelLoading === '') {
          return;
        }
        __this.state.ShowModelLoading = '';
        __this.__UpdateRender();
      }, times === 0 ? 10 : times);
    });

    /**
     * 关闭弹出确认窗体
     */
    Utility.$on(OnConfirmHide, () => {
      __this.state.ShowModelConfirm = '';
      __this.__UpdateRender();
    });

    /**
     * 打开弹出窗体
     */
    Utility.$on(OnShowDialog, (args) => {
      const { DialogList } = __this.state;
      DialogList.push(Object.assign(args || {}, { DialogIndex: DialogList.length + 1 }));
      __this.state.DialogList = DialogList;
      __this.__UpdateRender();
    });


    /**
     * 关闭弹出窗体
     *
     * times 判断当前关闭窗体的 索引号，是否和 DialogList 里的DialogIndex一致。不一致的话，就不关闭窗体。
     * 如果times为  undefined 说是主动关闭的，直接关闭窗体了。
     */
    Utility.$on(OnShowDialogHide, (times) => {
      const { DialogList } = __this.state;
      if (DialogList.length === 0) {
        return;
      }

      const __index = DialogList[DialogList.length - 1].DialogIndex;
      if (!times || Number(times) === __index) {
        Utility.$emit(OnShowDialogClose + '_' + __index);
      }
      setTimeout(() => {
        if (!times || (Number(times) === __index)) {
          DialogList.pop();
          __this.state.DialogList = DialogList;
          __this.__UpdateRender();
        }
      }, times || 200);
    });

    // /**
    //  * 修改导航条右边
    //  */
    // Utility.$on(Utility.constItem.Events.OnEditNavBarRight, (type, options) => {
    //   const { NBButton, NBIcon, NBMenu, NBDefault } = Utility.constItem.NavBarRightType;
    //   switch (type) {
    //     case NBButton:
    //       __this.state = Object.assign(__this.state || {}, {
    //         RightType: type, nBtnColor: options.Color, nBtnGbColor: options.BgColor,
    //         nBtnText: options.Text, nBtnClick: options.onClick, IsShowMenu: false
    //       });
    //       __this.__UpdateRender();
    //       break;
    //     case NBIcon: // 显示图标 (添加，搜索图标)
    //       __this.state.__IntervalNBIcon = setInterval(() => {
    //         const IsConfigComplate = Utility.getContent(Utility.constItem.InitIComConfigComplete);
    //         if (!!IsConfigComplate) {
    //           clearInterval(__this.state.__IntervalNBIcon);
    //           let __CallBackFuncName = '';
    //           switch (options.Icon) {
    //             case Utility.constItem.Status.IComMenuIcon.Add:
    //               window.AddAddIconFunc = options.onClick;
    //               __CallBackFuncName = 'AddAddIconFunc';
    //               // 显示关闭按钮
    //               // console.log('显示关闭按钮');
    //               // Utility.$emit(Utility.constItem.IComAPI.WebViewShowCloseBtn);
    //               break;
    //             case Utility.constItem.Status.IComMenuIcon.Search:
    //               window.AddSearchIconFunc = options.onClick;
    //               __CallBackFuncName = 'AddSearchIconFunc';
    //               break;
    //             default:
    //               __CallBackFuncName = 'void';
    //               window.void = () => { };
    //               break;
    //           }

    //           Utility.$emit(Utility.constItem.IComAPI.WebViewSetOptionMenu, { iconId: options.Icon, onClick: __CallBackFuncName }, () => { console.log('处理成功'); }, () => { console.log('处理失败'); });
    //         }

    //         const __TimeoutCount = __this.state.__TimeoutCount + 1;
    //         __this.state.__TimeoutCount = __TimeoutCount;
    //         if (__TimeoutCount >= 10) {
    //           __this.state.__TimeoutCount = 0;
    //           clearInterval(__this.state.__IntervalNBIcon);
    //         }
    //       }, 500);
    //       __this.state = Object.assign(__this.state || {}, { RightType: type, nIcon: options.Icon, nIconClick: options.onClick, IsShowMenu: false });
    //       __this.__UpdateRender();
    //       break;
    //     case NBMenu:    // 显示菜单
    //       const __IntervalNBMenu = setInterval(() => {
    //         const IsConfigComplate = Utility.getContent(Utility.constItem.InitIComConfigComplete);
    //         if (!!IsConfigComplate) {
    //           clearInterval(__IntervalNBMenu);
    //           window.AddMenuIconFunc = this.__HandlerShowMenu.bind(this);
    //           Utility.$emit(Utility.constItem.IComAPI.WebViewSetOptionMenu, { iconId: 2, onClick: 'AddMenuIconFunc' }, () => { console.log('处理成功'); }, () => { console.log('处理失败'); });

    //           // 隐藏关闭按钮
    //           // console.log('隐藏关闭按钮');
    //           // Utility.$emit(Utility.constItem.IComAPI.WebViewHideCloseBtn);
    //         }

    //         const __TimeoutCount = __this.state.__TimeoutCount + 1;
    //         __this.state.__TimeoutCount = __TimeoutCount;
    //         if (__TimeoutCount >= 10) {
    //           __this.state.__TimeoutCount = 0;
    //           clearInterval(__IntervalNBMenu);
    //         }
    //       }, 500);
    //       __this.state = Object.assign(__this.state || {}, { __IntervalNBMenu: __IntervalNBMenu, RightType: type, nMenuItem: options, IsShowMenu: false });
    //       __this.__UpdateRender();
    //       break;
    //     case NBDefault:   // 默认
    //       const __IntervalNBDefault = setInterval(() => {
    //         const IsConfigComplate = Utility.getContent(Utility.constItem.InitIComConfigComplete);
    //         if (!!IsConfigComplate) {
    //           clearInterval(__IntervalNBDefault);
    //           window.AddMenuIconFunc = this.__HandlerShowMenu.bind(this);
    //         }
    //         const __TimeoutCount = __this.state.__TimeoutCount + 1;
    //         __this.state.__TimeoutCount = __TimeoutCount;
    //         if (__TimeoutCount >= 10) {
    //           __this.state.__TimeoutCount = 0;
    //           clearInterval(__IntervalNBDefault);
    //         }
    //       }, 500);
    //       __this.state.__IntervalNBDefault = __IntervalNBDefault;
    //       __this.state.RightType = NBDefault;
    //       __this.state.IsShowMenu = false;
    //       __this.__UpdateRender();
    //       break;
    //     default:
    //       __this.state.RightType = NBDefault;
    //       __this.state.IsShowMenu = false;
    //       __this.__UpdateRender();
    //   }
    // });

    /**
     * 修改导航条右边
     */
    Utility.$on(Utility.constItem.Events.OnEditNavBarRight, (nbDirection, nbType, options) => {
      const { NBButton, NBIcon, NBMenu, NBDefault, NBIconList } = Utility.constItem.NavBarRightType;
      __this.state[nbDirection] = { nbDirection, nbType, options };
      let __Content = {};
      switch (nbType) {
        case NBButton:
          __Content = { nBtnColor: options.Color, nBtnGbColor: options.BgColor, nBtnText: options.Text, nBtnClick: options.onClick, IsShowMenu: false };
          __this.state = Object.assign(__this.state || {}, __Content);
          break;
        case NBIconList:
          __this.state.nIconList = options;
          break;
        case NBIcon: // 显示图标 (添加，搜索图标)
          __this.state = Object.assign(__this.state || {}, { nIcon: options.Icon, nIconClick: options.onClick, IsShowMenu: false }); break;
        case NBMenu: // 显示菜单
          __this.state = Object.assign(__this.state || {}, { nMenuItem: options, IsShowMenu: false });
          break;
        case NBDefault: // 默认
          __this.state[nbDirection] = NBDefault;
          __this.state.IsShowMenu = false;
          break;
        default:
          __this.state[nbDirection] = NBDefault;
          __this.state.IsShowMenu = false;
      }
      __this.__UpdateRender();
    });

    Utility.$on(Utility.constItem.Events.OnSetTitle, (args) => {
      const { title, onClick } = args;
      window.OnIComSetTitle = onClick || ((e) => { console.log(e); });
      Utility.$emit(Utility.constItem.IComAPI.WebViewSetTitle, { title: title, onClick: 'OnIComSetTitle' },
        () => {
          window.OnIComSetTitle = null;
          delete window.OnIComSetTitle;
          console.log('处理成功');
        }, () => {
          window.OnIComSetTitle = null;
          delete window.OnIComSetTitle;
          console.log('处理失败');
        });
    });

    /**
     * 打开日期控件
     */
    Utility.$on(Utility.constItem.Events.OnOpenDatePicker, (date, IsShowTime, onConfirm, onCancel) => {
      __this.state = Object.assign(__this.state || {}, {
        IsOpenDate: true,
        CurrentSelectDate: Utility.isDate(date) ? Utility.$convertToDateByString(date) : new Date(),
        IsShowTime: IsShowTime,
        onDatePickerConfirm: onConfirm,
        onDatePickerCancel: onCancel
      });
      __this.__UpdateRender();
    });
  }

  /**
   * 关闭弹出消息窗体事件
   *
   * @param {any} params
   *
   * @memberOf NavBar
   */
  handlerActionSheetClose(params) {
    this.state.ShowModelActionSheet = '';
    this.state.___other = params;
    this.__UpdateRender();
  }
  /**
   * 关闭确认窗体事件
   *
   * @param {any} params
   *
   * @memberOf NavBar
   */
  handlerActionsClose() {
    this.state.ShowModelActions = '';
    this.__UpdateRender();
  }
  /**
     * 菜单-->导航条左边添加图标
     * @param Icon
     * @param onClick
     */
  static $navBarLeftAddIcon(Icon, onClick) {
    this.$navBarEdit('LeftType', this.constItem.NavBarType.NBIcon, { Icon: Icon, onClick: onClick });
  }
  /**
   * 页面加载
   * @returns {*}
   * @private
   */
  __ShowLoading() {
    const isShow = this.state.ShowModelLoading;
    return isShow && isShow !== '' ? (<LoadingModel Content={this.state.lmContent || '正在载'} />) : null;
  }
  /**
   * 提示语
   * @returns 
   * @memberof NavBar
   */
  __ShowToast() {
    const isShow = this.state.ShowModelToast;
    return isShow && isShow !== '' ? (<ToastModel content={this.state.ToastContent || ''} IconType={this.state.ToastcmIconType} />) : null;
  }
  /**
   * 确定，取消
   * @returns {*}
   * @private
   */
  __ShowConfirm() {
    const { cmContent, cmOkButton, cmCancelButtonTitle, cmCancelButton, cmOkButtonTitle, cmOptions, cmTitle } = this.state;
    const isShow = this.state.ShowModelConfirm;
    return isShow && isShow !== '' ? (<ConfirmModel
      Title={cmTitle || ''}
      Content={cmContent || ''}
      Options={cmOptions}
      okButtonTitle={cmOkButtonTitle}
      cancelButtonTitle={cmCancelButtonTitle}
      okButton={cmOkButton}
      cancelButton={cmCancelButton}
    />) : null;
  }

  /**
   * 从下面弹出信息来
   * @returns {*}
   * @private
   */
  __ShowActionSheet() {
    const isShow = this.state.ShowModelActionSheet;
    return isShow && isShow !== '' ? (<ActionSheet ref="goComActionSheet"
      ContentInfo={this.state.asContent || {}} Title={this.state.asTitle}
      onClose={this.handlerActionSheetClose.bind(this)}
      Buttons={this.state.asButtons}
      Options={this.state.asOptions}
      ToPage={this.state.asToPage}
    />) : null;
  }

  /**
   * 删除确认提示窗
   * @returns 
   * @memberof NavBar
   */
  __ShowActions() {
    const isShow = this.state.ShowModelActions;
    return isShow && isShow !== '' ? (<ActionsSheet
      Title={this.state.ActionsTitle}
      onClose={this.handlerActionsClose.bind(this)}
      Buttons={this.state.ActionsButtons}
    />) : null;
  }
  /**
   * 引用第三方样式
   * @memberOf NavBar
   */
  __RequireStyle() {
    // ------------------------antd 蚂蚁金服组件类样式------------------------
    // 主样式
    require('antd/lib/style/index.css');
    // 按钮
    // require('antd/lib/button/style/index.css');
    // 输入
    require('antd/lib/input/style/index.css');
    // 时间
    // require('antd/lib/time-picker/style/index.css');
    // 选择
    // require('antd/lib/select/style/index.css');
    // 日期
    // require('antd/lib/date-picker/style/index.css');
    // 步骤条
    // require('antd/lib/steps/style/index.css');
    // 徽标数
    // require('antd/lib/badge/style/index.css');
    // require('antd/lib/tabs/style/index.css');
    // collapse
    // require('antd/lib/collapse/style/index.css');
    // col row
    // 栅格
    // require('antd/lib/layout/style/index.css');
    // Tag
    // require('antd/lib/tag/style/index.css');
    // slider
    // require('antd/lib/slider/style/index.css');
    // slider
    // require('antd/lib/tooltip/style/index.css');

    //
    require('./scss/NavBar.css');
    // ------------------------antd 蚂蚁金服组件类样式------------------------
  }

  // /**
  //  * 导航条--》右边按钮--》Button样式
  //  *
  //  * @returns 样式对象
  //  *
  //  * @memberOf NavBar
  //  */
  // __GetNBtnStyle() {
  //   const { nBtnColor, nBtnGbColor } = this.state;
  //   let __style = {};
  //   __style = Object.assign(__style, nBtnColor ? { color: nBtnColor } : {},
  //     nBtnGbColor ? { backgroundColor: nBtnGbColor } : {}
  //   );
  //   return __style;
  // }

  /**
   * 导航条--》右边按钮--》Button样式
   *
   * @returns 样式对象
   *
   * @memberOf NavBar
   */
  __GetNBtnStyle(options) {
    const { Color, BgColor, nBtnColor, nBtnGbColor } = options || this.state;
    let __style = {};
    __style = Object.assign(__style, (Color || nBtnColor) ? { color: (Color || nBtnColor) } : {},
      BgColor || nBtnGbColor ? { backgroundColor: BgColor || nBtnGbColor } : {}
    );
    return __style;
  }

  /**
   * 点击菜单事件
   * @private
   */
  __HandlerShowMenu() {
    this.state.IsShowMenu = !this.state.IsShowMenu;
    this.__UpdateRender();
  }

  /**
   * 点击按钮事件
   * @private
   */
  __HandlerRightButtonClick() {
    const { nBtnClick } = this.state;
    if (nBtnClick) {
      nBtnClick();
    }
    this.state.IsShowMenu = false;
    this.__UpdateRender();
  }

  /**
   * 点击icon事件
   * @private
   */
  __HandlerRightIconClick() {
    const { nIconClick } = this.state;
    if (nIconClick && Utility.isFunction(nIconClick)) {
      nIconClick();
    }
    this.state.IsShowMenu = false;
    this.__UpdateRender();
  }

  /**
   * 点击菜单里面某一项事件
   * @private
   */
  __HandlerRightMenuClick(row) {
    if (!row || !row.onClick) {
      return;
    }
    row.onClick(row);
    this.state.IsShowMenu = false;
    this.__UpdateRender();
  }

  /**
   * 隐藏菜单
   *
   * @memberOf NavBar
   */
  __HandlerHideMenu() {
    this.state.IsShowMenu = false;
    this.__UpdateRender();
  }

  /**
   * 生成导航条右边样式
   *
   * @param {any} styles
   * @returns
   *
   * @memberOf NavBar
   */
  __BuildRightTypeHtml(styles) {
    const { RightType, nIcon } = this.state;
    const { NBButton, NBIcon, NBMenu, NBDefault } = Utility.constItem.NavBarRightType;
    const { nbType, options } = RightType || {};
    const { Text, onClick } = options || {};

    let __Result = '';
    const __onClick = () => {
      if (onClick) {
        onClick();
      }
      this.state.IsShowMenu = false;
      this.__UpdateRender();
    };
    switch (nbType) {
      case NBButton:
        __Result = (
          <div className={styles.nbButton} style={this.__GetNBtnStyle(options)}
            onClick={() => { __onClick(); }}>{Text}</div>);
        break;
      case NBIcon:
        __Result = (<div className={styles.nbIcon} onClick={this.__HandlerRightIconClick.bind(this)}>
          <div style={nIcon ? { backgroundImage: 'url(' + nIcon + ')' } : {}}></div>
        </div>);
        break;
      case NBMenu:
        __Result = (<div className={styles.nbMenuInfo1} onClick={this.__HandlerShowMenu.bind(this)}>
          <div></div>
        </div>
        );
        break;
      case NBDefault:
        __Result = (<div className={styles.defaultIcon}>
          <div></div>
        </div>);
        break;
      default:
        __Result = (<div></div>);
        break;
    }
    return __Result;
  }

  /**
   * 点击确定，返回日期时间
   *
   * @param {datetime} value 返回的时间
   *
   * @memberOf NavBar
   */
  __HandlerDatePickerConfirm(value) {
    this.state.CurrentSelectDate = value;
    const { onDatePickerConfirm } = this.state;
    if (!Utility.isFunction(onDatePickerConfirm)) {
      return;
    }
    onDatePickerConfirm(value);
  }

  /**
   * 关闭日期控件
   *
   * @memberOf NavBar
   */
  __HandlerDatePickerCancel() {
    this.setState({ IsOpenDate: false });
    const { onDatePickerCancel } = this.state;
    if (!Utility.isFunction(onDatePickerCancel)) {
      return;
    }
    onDatePickerCancel();
  }

  __BuildDialogHTML() {
    const { DialogList } = this.state;
    if (!Utility.isArray(DialogList)) {
      return null;
    }
    return DialogList.map((item, index) => {
      // const {Title, Html, okButton, onCancel} = item;
      return (<ConfirmModel key={'navbar_dialog_' + index}
        {...item}
      >{item.Html}</ConfirmModel>);
    });
  }

  render() {
    const styles = require('./scss/NavBar.scss');
    this.__RequireStyle();
    const { IsOpenDate, IsShowTime, CurrentSelectDate, PreviewInfo, IsShowPreview, nMenuItem, IsShowMenu } = this.state;
    const { Title, IsShowBackArrow, IsWeiXin } = this.props;
    return (
      <div className={styles.navBarCss + ' ' + (!!IsWeiXin ? styles.isWeiXin : '')}>
        <div className={styles.subContent + ' ' + (!!IsWeiXin ? styles.isWeiXin1 : '')}>
          <div className={styles.left}>
            <div className={styles.imgCenter + ' ' + (!IsShowBackArrow ? styles.undisplay : '')}
              onClick={this.__HandlerGoBack.bind(this)}></div>
          </div>
          <div className={styles.center}>
            <div>{Title || '职得'}</div>
          </div>
          <div className={styles.right}>
            {
              this.__BuildRightTypeHtml(styles)
            }
          </div>
        </div>
        {
          nMenuItem &&
          <div className={styles.nbMenuInfo + ' ' + (IsShowMenu ? styles.showMenu : '')} onClick={this.__HandlerHideMenu.bind(this)}>
            <div className={styles.nbContent}>
              <div className={styles.nbMenuItem}>
                {
                  nMenuItem.map((row, index) => {
                    return (
                      <div key={'navbar_index_' + index} className={styles.nbItem}
                        onClick={this.__HandlerRightMenuClick.bind(this, row)}>{row.Text}</div>);
                  })
                }
              </div>
            </div>
          </div>
        }
        {
          !!IsOpenDate &&
          <DatePicker isShowTime={IsShowTime}
            value={!CurrentSelectDate ? new Date() : CurrentSelectDate}
            onConfirm={this.__HandlerDatePickerConfirm.bind(this)}
            onCancel={this.__HandlerDatePickerCancel.bind(this)} />
        }
        {this.__ShowConfirm()}
        {this.__ShowLoading()}
        {this.__ShowToast()}
        {this.__ShowActionSheet()}
        {this.__ShowActions()}
        {this.__BuildDialogHTML()}
        {!!IsShowPreview && <PreviewModel PreviewInfo={PreviewInfo} />}
        {!!this.state.IsNoResources && <div className={styles.noResources}><NoResources /></div>}
      </div>
    );
  }
}
