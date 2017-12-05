/**
 * create root 2017-08-22
 * 任务列表项组件  
 */
import React, { PropTypes, Component } from 'react';
import { Utility, GxIcon } from 'components';
const styles = require('./scss/TaskItem.scss');

export default class TaskItem extends Component {
  static propTypes = {
    TaskItems: PropTypes.object,                                           // 任务项数据
  }

  constructor(props) {
    super(props);
    this.state = {
      IsNoDate: false,                                                    // 有无数据
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    this.setState({ _Index: this.state._Index++ });
  }

  /**
   * 跳转-搜索页面 搜索条件: userName && status: [RECEVIED,START]
   * @param {*} url 
   * @param {*} params 
   */
  __HandlerGoToPage(userName) {
    const obj = {};
    obj.userName = userName;
    obj.status = ['RECEVIED', 'START'];
    // Utility.toPage(url, params);
  }

  render() {
    const { TaskItems } = this.props;
    const { userName, goIng, unTreat } = TaskItems || {};
    let receivedNumber = 0;
    let startNumber = 0;
    if (Utility.isArray(goIng)) {
      receivedNumber = goIng[0].num;
    } else {
      receivedNumber = 0;
    }
    if (Utility.isArray(unTreat)) {
      startNumber = unTreat[0].num;
    } else {
      startNumber = 0;
    }
    return (
      <div className={styles.taskItemCss}>
        <div className={styles.leftPortrait}>
          <div className={styles.portrait}>
            <GxIcon IconType="iconTaskProtrait" IsHidePadding />
          </div>
          <div className={styles.userName}>{userName}</div>
        </div>
        <div className={styles.rightStatus}>
          <div className={styles.ing}>进行中:<span className={styles.private}>{receivedNumber}</span></div>
          <div className={styles.unTreat}>未处理:<span className={styles.private}>{startNumber}</span></div>
        </div>
      </div>
    );
  }
}
