/**
 * 职得 顶部tab栏组件
 * 
 * 顶部标签 示例如下:
 * < TopTab Items={[
 * {Title: '首页', Status: 1, onSelect: this._HandlerTopTabStatusSelect.bind(this), Url: HomePage},
 * {Title: '活动', Status: 2, onSelect: this._HandlerTopTabStatusSelect.bind(this), Url: HomePage},
 * {Title: '动态', Status: 3, onSelect: this._HandlerTopTabStatusSelect.bind(this), Url: HomePage},
 * {Title: '约吧', Status: 4, onSelect: this._HandlerTopTabStatusSelect.bind(this), Url: HomePage}
 * ]} 
 * SelectIndex ={0}/>
 */

import React, { Component, PropTypes } from 'react';
import { Utility } from 'components';
export default class TopTab extends Component {

  static propTypes = {
    Items: PropTypes.array,                   // 一组数组对象
    SelectIndex: PropTypes.number,           // 当前选中的索引 
    IsNotFill: PropTypes.bool,           //  
  };

  constructor(props) {
    super(props);
    const { SelectIndex } = this.props;
    this.state = { __Index: 0, CurrentSelectIndex: SelectIndex || 0 };
  }

  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __Index: this.state.__Index++ });
    }
  }

  /**
   * 选择项
   *
   * @param {any} row
   *
   * @memberOf TopTab
   */
  __HandlerCurrentSelect(row, index) {
    if (!row) {
      return;
    }
    if (Utility.isFunction(row.onSelect)) {
      row.onSelect(row, index);
    }
    const { Url } = row || {};
    if (Url) {
      Utility.toPage(Url);
      return;
    }
    this.state.CurrentSelectIndex = index;
    this.__UpdateRender();
  }

  /**
   * 生成项
   * 
   * @param {any} styles 
   * @returns 
   * 
   * @memberof TopTab
   */
  __BuildHtml(styles) {
    const { Items, IsNotFill } = this.props;
    if (!Items) {
      return '';
    }
    const __Index = this.state.CurrentSelectIndex || 0;
    return Items.map((row, index) => {
      return (
        <div key={index}
          className={styles.item + ' ' + (index === __Index ? styles.select : '') + ' ' + (!!IsNotFill ? styles.notFill : '')}
          onClick={this.__HandlerCurrentSelect.bind(this, row, index)}>
          <div>
            {row.Title}
          </div>
        </div>
      );
    });
  }

  render() {
    const styles = require('./scss/Tabs.scss');
    return (
      <div className={styles.topTabCss}>
        {this.__BuildHtml(styles)}
      </div>
    );
  }
} 
