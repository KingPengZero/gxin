/**
 * Created by root on 2017/1/12.
 */
/**
 * 箭头
 * @example
 * <ReplyList
 *    replyList = [
 *       {
 *      name: '执行计划',                              //左侧标题
 *      content: '轻任务',                               //右侧内容值
 *      time: '1300000000000000000'
 *     }
 *    ]
 *    />
 */
import React, { Component, PropTypes } from 'react';
import { GxIcon, Utility } from 'components';

export default class ReplyList extends Component {
  static propTypes = {
    replyList: PropTypes.array,
    IsShowLoadingComplete: PropTypes.bool,
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
    const { replyList } = this.props;
    if (replyList) {
      dataeArr = replyList;
    }
    const _items = dataeArr.map((obj, index) => {
      return (
        <div className={styles.item} key={index}>
          <div className={styles.headIcon}>
            <GxIcon IconType="headIconSmall" />
          </div>
          <div className={styles.replyContent}>
            <div className={styles.nametime}>
              <div className={styles.name}>{obj.taskUserName ? obj.taskUserName : ''}</div>
              <div className={styles.valueNoIcon}>{obj.createTime ? Utility.$convertToDateByTimestamp(obj.createTime, 'MM-dd HH:mm') : ''}</div>
            </div>
            <div className={styles.reply}>{obj.content ? obj.content : ''}</div>
            {index === dataeArr.length - 1 ? '' : <div className={styles.line}/>}
          </div>
        </div>
      );
    });
    return _items;
  }
  render() {
    const styles = require('./scss/ReplyList.scss');
    let { IsShowLoadingComplete } = this.props;
    const { replyList } = this.props;
    let show = false;
    if (replyList && replyList.length > 0) {
      show = true;
    }else {
      IsShowLoadingComplete = false;
    }
    return (
      <div>
      <div className={show ? styles.content : ''}>
        {this.__GetArticalList(styles)}
      </div>
       {
          IsShowLoadingComplete ? <div className={styles.complateInfo}>内容全部加载完成</div> : ''
        }
      </div>
    );
  }
}
