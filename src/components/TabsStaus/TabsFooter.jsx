/**
 * 底部Tab标签，试例如下：
 *
 *  <TabsFooter TabItems={[
 *         { Title: '即信速记', Status: 0, Url: Task },
 *         { Title: '即信看板', Status: 1, Url: Task },
 *         { Title: '即信一览', Status: 2, Url: Task },
 *         ]} SelectTabItem={0}/>
 */

import React, { Component, PropTypes } from 'react';
import { Utility } from 'components';
export default class TabsFooter extends Component {

  static propTypes = {
    TabItems: PropTypes.array,                           // Tabs数组对象
    IsSource: PropTypes.string,                          // 是否显示底部的tab栏
    SelectIndex: PropTypes.number,                       // 选中的Tab                       
  };

  constructor(props) {
    super(props);
    const { SelectIndex } = this.props;
    this.state = { CurrentSelectItem: SelectIndex || 0 };
  }

  /**
   * 选中当前的tab
   * 
   * @param {any} item 
   * @param {any} index 
   * @returns 
   * @memberof TabsFooter
   */
  __HandlerSelectItem(item, index) {
    // tab切换的时候isSource就丢了,需要传过去
    const { IsSource } = this.props;
    const { Url } = item || {};
    if (!Url) {
      return;
    }
    Utility.toPage(Url, { tabIndex: index, isSource: IsSource });
  }

  /**
   * TabHTML
   * 
   * @param {any} styles 
   * @returns 
   * @memberof TabsFooter
   */
  __TabsBuildHtml(styles) {
    const { TabItems } = this.props;
    if (!Utility.isArray(TabItems)) {
      return '';
    }
    const __Index = this.props.SelectIndex || 0;
    return TabItems.map((item, index) => {
      return (
        <div className={styles.tabContainer + ' ' + (__Index === index ? styles.select : '') + ' ' + (index === 1 ? styles.borderCss : '')}
          key={'tab_items_' + index}
          onClick={this.__HandlerSelectItem.bind(this, item, index)} >
          <div className={styles.itemCss + ' ' + (__Index === index ? styles.selectTitle : '')}>
            {item.Title}
          </div>
        </div>
      );
    });
  }


  render() {
    const styles = require('./scss/TabsFooter.scss');
    return (
      <div className={styles.tabFooterCss}>
        {
          this.__TabsBuildHtml(styles)
        }
      </div>
    );
  }

}
