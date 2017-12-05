/**
 * create root 2017-08-29
 * 相关事务项组件  
 */
import React, { PropTypes, Component } from 'react';
import { Utility, GxIcon } from 'components';
const styles = require('./scss/RelationItem.scss');

export default class RelationItem extends Component {
  static propTypes = {
    RelationInfo: PropTypes.object,                                           // 任务项数据
    IsRelation: PropTypes.bool,                                               // 是否选中
    onSelect: PropTypes.func,                                                 // 任务项数据
  }

  constructor(props) {
    super(props);
    this.state = {
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
   * 接受者
   * 
   * @param {any} extTaskUser 
   * @returns 
   * @memberof TaskList
   */
  __HtmlResiver(extTaskUser) {
    if (!extTaskUser && !Utility.isArray(extTaskUser)) {
      return null;
    }
    const __extTaskUser = extTaskUser.slice(0, 3);
    return __extTaskUser.map((user, index) => {
      const { taskUserName } = user || {};
      return (
        <span className={styles.userNameCss} key={'resiver_user_' + index}>{taskUserName + (index !== __extTaskUser.length - 1 ? '、' : '')}</span>
      );
    });
  }

  /**
   * 关联与取消关联
   * 
   * @returns 
   * @memberof RelationItem
   */
  __HandlerToggleRelation(ee) {
    this.__StopPropagation(ee);
    const { onSelect } = this.props;
    if (!Utility.isFunction(onSelect)) {
      return;
    }
    onSelect();
  }

  /**
   * 取消冒泡
   */
  __StopPropagation(ee) {
    if (ee && ee.stopPropagation) {
      ee.stopPropagation();
      ee.preventDefault();
    } else {
      window.event.cancelBubble = true;
    }
  }

  render() {
    const { RelationInfo } = this.props;
    const { content, extTaskUser, scope, isRelation, extCcUser } = RelationInfo || {};
    let numPeople = 0;
    let ccPeople = 0;
    if (extTaskUser || extTaskUser.length) {
      numPeople = extTaskUser.length;
    }
    if (Utility.isArray(extCcUser)) {
      ccPeople = extCcUser.length;
    }
    return (
      <div className={styles.relationItemCss}>
        <div className={styles.content}>
          {content}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.resiverContainer + ' ' + styles.hidePadding}>
            <div className={styles.resiverIcon}>
              <GxIcon IconType="iconRecipient" IsHidePadding />
              <div className={styles.span}>接收人</div><span>:</span>
            </div>
            <div className={styles.resiver}>
              {
                (scope === 'ALL') ? '全体成员' : Utility.isArray(extTaskUser) ?
                  <div className={styles.userContainer}>{this.__HtmlResiver(extTaskUser)}{numPeople > 3 ? <span>等{numPeople}人</span> : ''}</div>
                  : '无'
              }
            </div>
          </div>
          <div className={styles.relationBtn} onClick={this.__HandlerToggleRelation.bind(this)}>
            {isRelation === 0 ? <GxIcon IconType="iconRelationBlue" /> : ''}
            <span className={styles.relationCss + ' ' + (isRelation === 0 ? '' : styles.cancelCss)}>
              {isRelation === 0 ? '关联' : '取消关联'}
            </span>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.resiverContainer}>
            <div className={styles.resiverIcon}>
              <GxIcon IconType="iconCopySender" IsHidePadding />
              <div className={styles.span}>抄送人</div><span>:</span>
            </div>
            <div className={styles.resiver}>
              {
                Utility.isArray(extCcUser) ?
                  <div className={styles.userContainer}>{this.__HtmlResiver(extCcUser)}{ccPeople > 3 ? <span>等{ccPeople}人</span> : ''}</div>
                  : '无'
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
