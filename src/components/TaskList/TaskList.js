/**
 * create root 2017-08-15
 * 任务列表组件  (父组件传递过来的数据是单个月每天对应的数据集合)
 */
import React, { PropTypes, Component } from 'react';
import { Utility, GxIcon } from 'components';
const styles = require('./scss/TaskList.scss');

export default class TaskList extends Component {
  static propTypes = {
    TaskLists: PropTypes.array,                                           // 任务列表数组
    createTime: PropTypes.number,                                         // 月份时间
    TIndex: PropTypes.number,                                             // tab_index
  }

  constructor(props) {
    super(props);
    this.state = {
      IsNoDate: false,                                                    // 有无数据
      CurrentDay: '',                                                     // 当前日
      WeekDay: '',                                                        // 当前日对应的周
    };
  }

  componentWillMount() {
    this.__TaskListByDay();
  }

  componentDidMount() {
  }

  /**
   * 按照天处理每个月的任务列表集合
   * 
   * @memberof TaskList
   */
  __TaskListByDay() {
    const { TaskLists, TIndex } = this.props;
    if (!Utility.isArray(TaskLists)) {
      return [];
    }
    const dayOfMonth = [
      '31', '30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', '17',
      '16', '15', '14', '13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'
    ];
    const __formatDay = 'yyyy-MM-dd';
    const resultDay = [];
    let result = [];
    const currentTime = new Date().getTime();
    for (let i = 0; i < dayOfMonth.length; i++) {
      result = [];
      const item = dayOfMonth[i];
      for (let j = 0; j < TaskLists.length; j++) {
        const row = TaskLists[j];
        const __createTimeDay = Utility.$convertToDateByTimestamp(TIndex === 0 ? (row.deadline ? row.deadline : currentTime) : row.createTime, __formatDay) + '';
        const day = __createTimeDay.slice(-2);
        if (item === day) {
          result.push(row);
        }
      }
      if (result.length !== 0) {
        resultDay.push(result);
      }
    }
    return resultDay;
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

  /**
   * 更新渲染
   */
  __UpdateRender() {
    this.setState({ _Index: this.state._Index++ });
  }

  /**
   * 任务列表 (按月-日排列)
   * @param {*} styles 
   */
  __BuildTaskListHtml() {
    const { TIndex } = this.props;
    const list1 = this.__TaskListByDay();
    if (!Utility.isArray(list1)) {
      return null;
    }
    const __formatDay = 'yyyy-MM-dd';
    let currentDay;
    let weekDay;
    const currentTime = new Date().getTime();
    return list1.map((list, index) => {
      if (list && list.length !== 0) {
        const listOne = list[0] || [];
        const { createTime, deadline } = listOne || {};
        const __day = Utility.$convertToDateByTimestamp(TIndex === 0 ? (deadline ? deadline : currentTime) : createTime, __formatDay) + '';
        weekDay = Utility.$convertToDateByWeekDay(__day);
        currentDay = __day.slice(-2);
      }
      // 如果这一天是这个月的最后一天, 这一天的最后一条不显示border
      // if (list.length === 1) {
      //   IsHideTwo = !IsHideTwo;
      // }
      const _key = TIndex === 0 ? 'month_deadline_list_item' : 'month_create_time_list_item';
      return (
        <div className={styles.listDayContainer} key={_key + index}>
          <div className={styles.left}>
            <div className={styles.upLeft}>
              <div className={styles.upSpace}></div>
              <div className={styles.dateContainer}>{currentDay}</div>
            </div>
            <div className={styles.weekContainer}>{weekDay}</div>
          </div>
          <div className={styles.right}>
            {this.__BuildTaskListDayHtml(list)}
          </div>
        </div>
      );
    });
  }

  /**
   * 遍历每天的任务列表HTMl
   * 如果这一天是这个月的最后一天, 这一天的最后一条不显示border
   * @param {any} list 
   * @returns 
   * @memberof TaskList
   */
  __BuildTaskListDayHtml(list) {
    const listDay = this.__TaskListByDay();
    const { TIndex } = this.props;

    if (!Utility.isArray(listDay)) {
      return null;
    }
    if (!Utility.isArray(list)) {
      return null;
    }
    let numPeople = 0;
    let ccPeople = 0;
    const __formatDay = 'yyyy年MM月dd hh : mm';
    let IsHide = false;
    const lastDay = listDay[listDay.length - 1];
    if (list.uuid === lastDay.uuid) {
      IsHide = !IsHide;
    }
    const { Task } = Utility.constItem.UrlItem;
    return list.map((item, index) => {
      const { content, deadline, label, scope, userId, fromUserTrueName, uuid, extTaskUser, extCcUser, fromUser, status, extTaskExtension } = item || {};
      if (extTaskUser || extTaskUser.length) {
        numPeople = extTaskUser.length;
      }
      if (extCcUser || extCcUser.length) {
        ccPeople = extCcUser.length;
      }
      let type = false;
      type = extTaskUser.some((row) => {
        const { taskUser } = row || {};
        return fromUser === taskUser;
      });
      
      const __day = Utility.$convertToDateByTimestamp(deadline, __formatDay) + '';
      const _key = TIndex === 0 ? 'day_deadline_list_item' : 'day_create_time_list_item';
      return (
        <div className={styles.taskListContainer} key={_key + index}
          onClick={this.__HandlerGoToPage.bind(this, Task, { taskId: uuid })}>
          <div className={styles.lineCss + ' ' + (!!IsHide && index === list.length - 1 ? styles.hideLine : '')} ref="leftLine"></div>
          <div className={styles.iconContainer}>
            <GxIcon IconType={!!type && userId === fromUser ? 'iconHeighLight' : 'iconAssemblage'} IsHidePadding />
          </div>
          <div className={styles.dayTaskContainer + ' ' + (!!type && userId === fromUser ? styles.anteCss : '')}>
            <div className={styles.content}>{content}</div>
            {label && label !== '' &&
              <div className={styles.midium}>
                <div className={styles.senderIcon}>
                  <GxIcon IconType="iconTaskLabel" IsHidePadding />
                  <div className={styles.span}>标签</div><span>:</span>
                </div>
                <div className={styles.labelContainer}>{this.__LabelStyle(label)}</div>
              </div>}
            {__day && __day !== '' &&
              <div className={styles.senderContainer + ' ' + styles.deadlineCss}>
                <div className={styles.senderIcon}>
                  <GxIcon IconType="iconTime" IsHidePadding />
                  <div className={styles.span}>截止时间</div><span>:</span>
                </div>
                <div className={styles.sender}>{__day}</div>
              </div>}
            <div className={styles.resiverContainer}>
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
            <div className={styles.senderContainer}>
              <div className={styles.senderIcon}>
                <GxIcon IconType="iconSender" IsHidePadding />
                <div className={styles.span}>发送人</div><span>:</span>
              </div>
              <div className={styles.sender}>{fromUserTrueName ? fromUserTrueName : '无'}</div>
            </div>
            <div className={styles.senderContainer}>
              <div className={styles.senderIcon}>
                <GxIcon IconType="iconCopySender" IsHidePadding />
                <div className={styles.span}>抄送人</div><span>:</span>
              </div>
              <div className={styles.sender}>
                {
                  Utility.isArray(extCcUser) ?
                    <div className={styles.userContainer}>{this.__HtmlResiver(extCcUser)}{ccPeople > 3 ? <span>等{ccPeople}人</span> : ''}</div>
                    : '无'
                }
              </div>
            </div>
            <div className={styles.statusContainer}>
              {this.__HandlerStatusHtml(status, extTaskExtension)}
            </div>
          </div>
        </div>
      );
    });
  }

  /**
   * 标签样式
   * 
   * @param {any} label 
   * @returns 
   * @memberof TaskList
   */
  __LabelStyle(label) {
    if (!label || label === '') {
      return null;
    }
    const result = label.split(',');
    if (!Utility.isArray(result)) {
      return null;
    }
    // const __label = [];
    const __result = result.slice(0);
    // const restArr = result.slice(3);
    // for (let i = 0; i < __result.length; i++) {
    //   const item = result[i];
    //   switch (item) {
    //     case '紧急':
    //       __label.unshift(<div className={styles.oneStatus} key={'one_status'}>紧急</div>);
    //       break;
    //     case '重要':
    //       __label.unshift(<div className={styles.twoStatus} key={'two_status'}>重要</div>);
    //       break;
    //     case '普通':
    //       __label.unshift(<div className={styles.threeStatus} key={'three_status'}>普通</div>);
    //       break;
    //     default:
    //       __label.push(<div className={styles.threeStatus} key={'three_status' + i}>{item}</div>);
    //       break;
    //   }
    // }
    // if (Utility.isArray(restArr)) {
    //   __label.push(<div className={styles.restCss}>{this.__RestLabelStyle(restArr)}</div>);
    // }
    return __result.map((item, index) => {
      return (
        <div className={styles.otherlabel + ' ' + (item === '紧急' ? styles.urgency : (item === '重要' ? styles.importantCss : ''))} key={index}>
          <div className={styles.otherCss}>{item}</div>
        </div>);
    });
  }

  /**
   * 除去 (紧急,重要,普通)之外的标签样式
   * 
   * @param {any} result 
   * @returns 
   * @memberof TaskList
   */
  __RestLabelStyle(result) {
    if (!Utility.isArray(result)) {
      return null;
    }
    return result.map((row, index) => {
      return (
        <div className={styles.otherlabel} key={index}>
          <div className={styles.otherCss}>{row}</div>
        </div>);
    });
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
    // const __extTaskUser = extTaskUser.slice(0, 3);
    return extTaskUser.slice(0, 3).map(item => item.taskUserName).join(',');
    // return __extTaskUser.map((user, index) => {
    //   const { taskUserName, taskUser } = user || {};
    //   return (
    //     <span className={styles.userNameCss} key={taskUser + index}>{taskUserName + (index !== __extTaskUser.length - 1 ? '、' : '')}</span>
    //   );
    // });
  }

  /**
   * 状态HTMl
   * 
   * @param {any} status 
   * @param {any} extTaskExtension 
   * @returns 
   * @memberof TaskList
   */
  __HandlerStatusHtml(status, extTaskExtension) {
    if (!status) {
      return null;
    }
    // startNumber
    const { finishedNumber } = extTaskExtension || {};
    const _status = status.toLocaleLowerCase();
    switch (_status) {
      case 'start':
        return (
          <div className={styles.blueCss}>
            <span className={styles.publicCSS}>未处理</span>
            { /* startNumber !== 0 ? <span className={styles.private}>({startNumber}人完成)</span> : '' */}
          </div>
        );
      case 'received':
        return (
          <div className={styles.blueCss}>
            <span className={styles.publicCSS}>进行中</span>
            {finishedNumber !== 0 ? <span className={styles.private}>({finishedNumber}人完成)</span> : ''}
          </div>
        );
      case 'refuse':
        return (
          <div className={styles.blueCss}>
            <span className={styles.publicCSS}>已拒绝</span>
            { /* refuseNumber !== 0 ? <span className={styles.private}>({refuseNumber}人拒绝)</span> : '' */}
          </div>
        );
      case 'finished':
        return (
          <div className={styles.greenCss}>
            <span className={styles.publicCSS}>已完成</span>
            {finishedNumber !== 0 ? <span className={styles.private}>({finishedNumber}人完成)</span> : ''}
          </div>);
      case 'over':
        return (
          <div className={styles.greenCss}>
            <span className={styles.publicCSS}>已关闭</span>
          </div>
        );
      default:
        return null;
    }
  }

  /**
   * 跳转
   * @param {*} url 
   * @param {*} params 
   */
  __HandlerGoToPage(url, params) {
    Utility.toPage(url, params);
  }

  render() {
    const __formatDay = 'yyyy年MM月dd';
    const { createTime } = this.props;
    const __yearMonth = Utility.$convertToDateByTimestamp(createTime, __formatDay) + '';
    const yearMonth = __yearMonth.slice(0, 8);
    return (
      <div className={styles.taskListCss}>
        <div className={styles.yearMonthCss}>{yearMonth}</div>
        {
          this.__BuildTaskListHtml()
        }
      </div>
    );
  }
}
