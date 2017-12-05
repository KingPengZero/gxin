import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Utility, NavBar, TabsFooter } from 'components';
import config from '../../config';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';
import * as CommonActions from 'redux/modules/reduxCommon';
import 'antd/dist/antd.css';
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
const styles = require('./App.scss');

@connect(
  state => ({
    Title: state.Common.Title,                                          // 标题
    UrlParams: state.Common.UrlParams,                                  // URL参数
    DictStatusName: state.Common.DictStatusName,                        // 字典信息
    TabsFooterInfo: state.Common.TabsFooterInfo,                        // tabsTooter信息
    PageSliderInfo: state.Common.PageSliderInfo,                        // 页面滑动
  }),
  { ...CommonActions })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,                                // 子项
    user: PropTypes.object,                                               // 用户信息
    location: PropTypes.object,                                           // location信息
    Title: PropTypes.string,                                              // 标题
    UrlParams: PropTypes.object,                                          // url 参数
    TabsFooterInfo: PropTypes.object,                                     // tabsTooter信息
    PageSliderInfo: PropTypes.object,                                     // 页面滑动
    onAPIHomeConfig: PropTypes.func,                                      // 获取ICom配置信息
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const __IsShow = !!config.app.IsHideNavBar;
    this.state = { index: 0, Title: '', IsReturn: false, IsShow: false, IsWeiXin: __IsShow };
    // alert(Utility.isGocomPC());
    const { GmessageView, GmessageBoard, GmessageDealt } = Utility.constItem.UrlItem;
    const __TabItems = [
      { Title: '即信速记', Status: 0, Url: GmessageDealt },
      { Title: '即信看板', Status: 1, Url: GmessageBoard },
      { Title: '即信一览', Status: 2, Url: GmessageView },
    ];
    this.state.TabItems = __TabItems;
  }

  componentWillMount() {
    if (this.state.IsWeiXin) {
      Utility.removeContent(Utility.constItem.UserInfo, true);
      Utility.removeContent(Utility.constItem.SaveUserConfigInfo, true);
    }
    // 设置事件
    Utility.setContent(Utility.constItem.Event, event);
    const __self = this;
    Utility.$on(Utility.constItem.Events.OnEditNavBarTitle, (options) => {
      __self.state.Title = options.Title || '';
      __self.forceUpdate();
    });
    Utility.$on(Utility.constItem.Events.OnEditPageSliderInfo, (options) => {
      const { Title, IsReturn, IsShowTab } = options;
      if (Title) {
        __self.state.Title = Title;
      }
      __self.state.IsReturn = IsReturn || false;
      __self.state.IsShowTab = IsShowTab;

      __self.forceUpdate();
    });

    this.__SetRouterComponentEnterAndLeve();
    this.__getToken();

    window.addEventListener('scroll', this.__HandlerOnScroll.bind(this), true);
  }

  componentDidMount() {
    this.maxWindow();
    this.__getToken();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const _nextIsReturn = nextState.IsReturn;
    const _nextTitle = nextState.Title;
    const { Title, IsReturn } = this.state;
    const __Result = _nextIsReturn !== IsReturn || _nextTitle !== Title;
    return __Result;
  }

  getTransitionsName(isReturn) {
    const __tranName = {};
    if (isReturn) {
      __tranName.enter = styles.spEnterReturn;
      __tranName.enterActive = styles.spEnterActiveReturn;
      __tranName.leave = styles.spLeaveReturn;
      __tranName.leaveActive = styles.spLeaveActiveReturn;
      __tranName.appear = styles.spAppearReturn;
      __tranName.appearActive = styles.spAppearActiveReturn;
    } else {
      __tranName.enter = styles.spEnter;
      __tranName.enterActive = styles.spEnterActive;
      __tranName.leave = styles.spLeave;
      __tranName.leaveActive = styles.spLeaveActive;
      __tranName.appear = styles.spAppear;
      __tranName.appearActive = styles.spAppearActive;
    }
    return __tranName;
  }

  maxWindow() {
    const __self = this;
    if (window.GoCom) {
      window.GoCom.maxWindow();
    } else {
      setTimeout(() => {
        __self.maxWindow();
      }, 100);
    }
  }

  /**
   * 获取URL token
   * 
   * @memberof App
   */
  __getToken() {
    const { location } = this.props;
    const { query } = location || {};
    const { token } = query || {};
    const _key = 'gXin_Token';
    if (token) {
      Utility.setContent(_key, token, true);
    }
  }

  __SetRouterComponentEnterAndLeve() {
    const { children } = this.props; // .children.props.routes[0].childRoutes;
    const { props } = children || {};
    const { routes } = props || {};
    if (!Utility.isArray(routes)) {
      return;
    }
    const { childRoutes } = routes[0];
    if (!Utility.isArray(childRoutes)) {
      return;
    }
    const __KeyScroll = 'GOCOM_ROUTER_SCROLLTOP';
    const __onLeave = (args) => {
      const __Data = Utility.getContent(__KeyScroll) || {};
      __Data[args.toLocaleLowerCase()] = window.document.body.scrollTop;
      Utility.setContent(__KeyScroll, __Data);
    };
    const __onEnter = (args) => {
      const { location } = args;
      const { pathname } = location;
      const __Data = Utility.getContent(__KeyScroll);
      if (__Data && __Data[pathname] && __Data[pathname] > 0) {
        setTimeout(() => {
          window.document.body.scrollTop = __Data[pathname];
        }, 1000);
      }
    };
    childRoutes.forEach((r) => {
      r.onLeave = __onLeave.bind(r, r.path);
      r.onEnter = __onEnter.bind(r);
    });
    routes.forEach((r) => {
      r.onLeave = __onLeave.bind(r, r.path ? r.path : '/');
      r.onEnter = __onEnter.bind(r);
    });
  }

  __BuildHtml() {
    const { IsReturn } = this.state;
    const IsStop = Utility.getContent(Utility.constItem.IsStopSlidePageAnimation);
    const __timeout = !!IsStop ? 0 : 500;

    if (!!IsStop) {
      return this.props.children;
    }

    return (
      <ReactCSSTransitionGroup component="div"
        transitionName={!!IsStop ? 'demo' : this.getTransitionsName(!!IsReturn)}
        transitionAppear
        transitionAppearTimeout={__timeout}
        transitionEnterTimeout={__timeout}
        transitionLeaveTimeout={__timeout}>
        {
          React.cloneElement(this.props.children, { key: this.props.location.pathname })
        }
      </ReactCSSTransitionGroup>
    );
  }

  __HandlerOnScroll(ev) {
    Utility.$emit(Utility.constItem.Events.OnScrollEvent, ev);
  }


  render() {
    const { Title, IsWeiXin, IsShow, IsShowTab, TabItems } = this.state;
    const { location } = this.props;
    const { query } = location || {};
    const { tabIndex, isSource } = query || {};
    return (
      <div className={styles.app + ' ' + (IsShow ? styles.show : '')}>
        <Helmet {...config.app.head} title={Title} />
        <NavBar Title={Title} IsWeiXin={IsWeiXin} />

        <div className={!!IsWeiXin ? styles.isWeiXin : styles.appContent} ref="divAppMain">
          {
            this.__BuildHtml()
          }
        </div>

        {
          !!IsShowTab && isSource && isSource === 'true' &&
          <TabsFooter TabItems={TabItems} IsSource={isSource} SelectIndex={parseInt(tabIndex || 2, 0)} />
        }
      </div>
    );
  }
}
