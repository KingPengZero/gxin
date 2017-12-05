import React, { Component, PropTypes } from 'react';
import { Utility, GxIcon } from 'components';

/**
 * 搜索工具条
 * <GxSearchBar  SearchIcon="xx"
 *               Title = "姓名/手机/邮件"
 *               onSearch={this.__HandlerSearch.bind(this)}
 *               IsToPage 当这个属性存在的时候，就相当于一个 button 页面进行跳转操作，关联的事件是 onClick
 *               onClick = {this.__HandlerToPage.bind(this)}/>
 */

export default class Searchbar extends Component {
  static propTypes = {
    SearchIcon: PropTypes.string,                      // 搜索图标
    Title: PropTypes.string,                           // 搜索内容
    IsToPage: PropTypes.bool,                          // 是否跳转
    IsSearchBtn: PropTypes.bool,                       // 是否搜索按钮
    IsHideCancel: PropTypes.bool,                      // 是否隐藏取消
    IsAppend: PropTypes.bool,                          // 
    ShowIcondDlete: PropTypes.bool,                    // 是否显示删除图标
    IsFocus: PropTypes.bool,                           // 是否聚焦
    onClick: PropTypes.func,                           // 点击事件
    onSearch: PropTypes.func,                          // 搜索事件
    onCancel: PropTypes.func,                          // 取消事件
    onChange: PropTypes.func,                          // 取消事件
    onClickText: PropTypes.func,                          // 取消事件
  };

  constructor(props) {
    super(props);
    this.state = {
      IsBeginSearch: false,                           // 模拟点击div显示搜索框
    };
  }

  componentDidMount() {
    this.state.IsMount = true;
    const { IsFocus } = this.props;
    if (!!IsFocus) {
      this.__SetFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { Title, IsAppend } = this.props;
    const nTitle = nextProps.Title;
    if (!!IsAppend) {
      if (Title !== nTitle) {
        // 
        const { txtSearchKey } = this.refs;
        if (!txtSearchKey) {
          return;
        }
        txtSearchKey.value = nTitle;
      }
    }
  }

  componentWillUnmount() {
    delete this.state.IsMount;
  }

  /**
   * 搜索回调
   * 
   * @param {any} key 
   * @returns 
   * @memberof Searchbar
   */
  __HandlerCallbackOnSelect(key) {
    const { onSearch } = this.props;
    if (!Utility.isFunction(onSearch)) {
      return;
    }
    setTimeout(() => {
      onSearch(key);
    }, 0);
  }

  /**
   * 点击div显示搜索框
   * IsToPage是true 跳转页面
   * 
   * @returns 
   * @memberof Searchbar
   */
  __HandlerEnterSearch() {
    const { IsToPage, onClick } = this.props;
    if (IsToPage) {
      if (onClick) {
        onClick();
      }
    } else {
      this.setState({ IsBeginSearch: true });
      const { txtSearchKey } = this.refs;
      if (!txtSearchKey) {
        return;
      }
      txtSearchKey.focus();
    }
  }


  /**
   * refs具有自动聚焦事件
   * @memberof
   */
  __SetFocus() {
    const { txtSearchKey } = this.refs;
    if (txtSearchKey) {
      txtSearchKey.focus();
    }
  }

  /**
   * onChange的时候开始搜索
   * 
   * @param {any} event 
   * @memberof Searchbar
   */
  __HandlerOnChange(event) {
    const __key = event.target.value;
    const { onChange } = this.props;
    // if (!!IsHideCancel) {
    // this.__HandlerCallbackOnSelect(__key);
    // }
    if (onChange) {
      onChange(__key);
    }
  }

  /**
   * 搜索-操作
   * 
   * @memberof Searchbar
   */
  __HandlerSearchBtn() {
    const { txtSearchKey } = this.refs;
    let key;
    if (txtSearchKey) {
      key = txtSearchKey.value;
    }
    const { onSearch } = this.props;
    if (!Utility.isFunction(onSearch)) {
      return;
    }
    setTimeout(() => {
      onSearch(key);
    }, 0);
  }

  /**
   * 清空内容并获取焦点
   * 
   * @memberof Searchbar
   */
  __HandlerClearInputKey() {
    this.refs.txtSearchKey.value = '';
    this.refs.txtSearchKey.focus();
  }

  /**
   * value
   * 
   * @memberof Searchbar
   */
  __GetValue(value) {
    this.refs.txtSearchKey.value = value || '';
  }

  render() {
    const styles = require('./scss/Searchbar.scss');
    const { Title, SearchIcon, ShowIcondDlete, IsHideCancel, IsFocus, onClickText } = this.props;
    let _iconSearch = 'iconMagnifyingGlass';
    if (SearchIcon) {
      _iconSearch = SearchIcon;
    }
    return (
      <div className={styles.searchBarCss}>
        <div className={styles.searchBar}>
          <div className={styles.icon1}>
            <GxIcon IconType={_iconSearch} />
          </div>
          <div className={styles.inputKey} onClick={this.__HandlerEnterSearch.bind(this)}>
            <input type="text" ref="txtSearchKey" placeholder={Title} autoFocus={!!IsFocus}
              onChange={this.__HandlerOnChange.bind(this)}
              onFocus={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (onClickText) {
                  onClickText(e.target.value);
                }
              }}
            />
          </div>
          <div className={styles.iconDelete}>
            {
              !!ShowIcondDlete &&
              <div className={styles.img} onClick={this.__HandlerClearInputKey.bind(this)}>
                <GxIcon IconType="icondelete" />
              </div>
            }
            {!IsHideCancel ? <div className={styles.content} onClick={this.__HandlerSearchBtn.bind(this)}>搜索</div> : ''}
          </div>
        </div>
      </div>
    );
  }
}
