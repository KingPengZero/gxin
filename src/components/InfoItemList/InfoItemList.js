/**
 * Created by root on 2017/1/12.
 */
/**
 * 箭头
 * @example
 * <InfoItemList
 *    InfoItems = [
 *       {
 *      name: '执行计划',                              //左侧标题
 *      value: '轻任务',                               //右侧内容值
 *      onItemClick : {this.func.bind(this)},         //点击item事件
 *      showRight : true                             //显示向右箭头
 *     }
 *    ]
 *    />
 */
import React, { Component, PropTypes } from 'react';
import { GxIcon, Utility } from 'components';

export default class InfoItemList extends Component {
  static propTypes = {
    InfoItems: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  __itemClick(obj) {
    if (obj && obj.onItemClick && Utility.isFunction(obj.onItemClick)) {
      obj.onItemClick();
    }
  }

  __GetArticalList(styles) {
    let dataeArr = [];
    const { InfoItems } = this.props;
    if (InfoItems) {
      dataeArr = InfoItems;
    }
    if (!Utility.isArray(dataeArr)) {
      return null;
    }
    const _items = dataeArr.map((obj, index) => {
      const { value } = obj || {};
      return (
        <div className={index === dataeArr.length - 1 ? styles.item : styles.itemWithLine + ' ' + (value === 'nilaidawoya' ? styles.hideCss : '')}
          key={index} onClick={this.__itemClick.bind(this, obj)}>
          <div className={styles.itemCss}>
            <div className={styles.name}>{obj.name ? obj.name : ''}</div>
            <div className={obj.name === '标签' ? styles.labelSytle : (obj.showRight ? styles.value : styles.valueNoIcon)}>{value}</div>
            {obj.showRight && <div className={styles.icon}>
              <GxIcon IconType="iconRight" />
            </div>}
          </div>
        </div>
      );
    });
    return _items;
  }

  render() {
    const styles = require('./scss/InfoItemList.scss');
    return (
      <div className={styles.content}>
        {this.__GetArticalList(styles)}
      </div>
    );
  }
}
