/**
 * Created by root on 2017/1/12.
 */
import React, { Component, PropTypes } from 'react';
import { Utility, ApiInfo } from 'components';
import { connect } from 'react-redux';
import * as CommonActions from 'redux/modules/reduxCommon';
@connect(
  state => ({
    Title: state.Common.Title,                                             // 标题
    UrlParams: state.Common.UrlParams,                                     // URL参数
  }),
  { ...CommonActions })
export default class PeopleTaskList extends Component {
  static propTypes = {
    Title: PropTypes.string,                                            // 标题
    UrlParams: PropTypes.object,                                        // url 参数
    PeopleTaskList1: PropTypes.array,
    onItemClick: PropTypes.func,
    IsShowLoadingComplete: PropTypes.bool,
    aboutUrl: PropTypes.func,
    aboutNextPage: PropTypes.func,
    onApiPost: PropTypes.func,
    onApiDelete: PropTypes.func,
    onSetContent: PropTypes.func,
    onUpdatePeople: PropTypes.func,
    onApiPut: PropTypes.func,
    dataSource: PropTypes.bool,
    type: PropTypes.string,
    isDealt: PropTypes.string,
    explan: PropTypes.string,
    role: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      PeopleList: props.PeopleTaskList1 || [],
      delepeo: {},
      isAuth: false,
      PeopleInfo: {},
      delesenpeo: {},
    };

    const { PeopleInfo, PeopleList } = this.state;
    PeopleList.forEach((item) => {
      const { taskUser } = item;
      PeopleInfo[taskUser] = item;
    });
  }

  componentWillReceiveProps(nextProps) {
    const { PeopleTaskList1, dataSource, type } = nextProps;
    if (dataSource) {
      this.setState({ isAuth: true });
    } else {
      this.setState({ isAuth: false });
    }
    this.state.PeopleInfo = {};
    if (Utility.isArray(PeopleTaskList1)) {
      PeopleTaskList1.forEach((people) => {
        if (type) {
          const { taskUser } = people;
          this.state.PeopleInfo[taskUser] = people;
        } else {
          const { taskUser } = people;
          this.state.PeopleInfo[taskUser] = people;
        }
      });
    }
    this.setState({ PeopleList: PeopleTaskList1 });
  }

  componentWillUnmount() {
    const { onSetContent } = this.props;
    onSetContent('senderPeo', this.state.PeopleList);
  }

  __getStatelist(styles, dataeArr) {
    if (!dataeArr || !dataeArr.extTaskUserHistories) {
      return null;
    }
    const _items = dataeArr.extTaskUserHistories.map((obj, index) => {
      return (
        <div className={styles.stateline} key={index}>
          <div className={styles.time}>{obj.createTime ? Utility.$convertToDateByTimestamp(obj.createTime, 'MM-dd HH:mm') : ''}</div>
          <div className={styles.state}>{this.__getState(obj.status)}</div>
        </div>
      );
    });
    return _items;
  }

  __getState(status) {
    let statusStr = '';
    if (!status) {
      return '';
    }
    switch (status) {
      case Utility.constItem.Task.Task_START:    // 未处理
        statusStr = '未处理';
        break;
      case Utility.constItem.Task.Task_RECEIVED:  // 收到
        statusStr = '已收到';
        break;
      case Utility.constItem.Task.Task_FINISHED:  // 完成
        statusStr = '已完成';
        break;
      case Utility.constItem.Task.Task_REFUSE:   // 拒绝
        statusStr = '已拒绝';
        break;
      case Utility.constItem.Task.Task_OVER:     // 结束
        statusStr = '已结束';
        break;
      default:
        break;
    }
    return statusStr;
  }

  __GetArticalList(styles) {
    const { type, explan } = this.props;
    let dataeArr = [];
    const { PeopleList, delepeo, isAuth, delesenpeo } = this.state;
    if (PeopleList) {
      dataeArr = PeopleList;
    }
    const _items = dataeArr.map((obj, index) => {
      return (
        <div className={styles.peopleContent} onClick={!isAuth ? this.__GetDialog.bind(this, obj) : () => {}} key={index}>
          {type ? <div className={styles.people}>
            {isAuth && <div className={styles.inputc}>
              <input type="checkbox" checked={delesenpeo[obj.taskUser] ? true : false} ref="Inputs" onClick={this.checkpeo.bind(this, obj)} />
            </div>}
            <div className={styles.icon} />
            <div className={styles.name}>{obj.taskUserName ? obj.taskUserName : ''}</div>
          </div> :
            <div className={styles.people}>
              {isAuth && <div className={styles.inputc}>
                <input type="checkbox" checked={delepeo[obj.taskUser] ? true : false} ref="Inputs" onClick={this.checkpeo.bind(this, obj)} />
              </div>}
              <div className={styles.icon} />
              <div className={styles.name}>{obj.taskUserName ? obj.taskUserName : ''}</div>
              {explan && explan !== 'MEETING' && <div className={obj.status === Utility.constItem.Task.Task_REFUSE ? styles.state2 : styles.state}>{this.__getState(obj.status)}</div>}
            </div>
          }
        </div>
      );
    });
    return _items;
  }
  
  /**
   * 点对点会话
   * 
   * @param {any} item 
   * @returns 
   * @memberof PeopleTaskList
   */
  __GetDialog(item) {
    // if (!item) {
    //   return;
    // }
    const { taskUser } = item || {};
    Utility.$platformApi.$openChat(taskUser, () => {}, () => {});
    // Utility.$platformApi.$showInfo(taskUser, () => { Utility.$alert(taskUser); }, () => { });
  }

  __HandlerSelectPeople() {
    const { PeopleList, PeopleInfo } = this.state;
    const { onUpdatePeople, onApiPost, UrlParams, type, isDealt, onSetContent } = this.props;
    const { taskId } = UrlParams;
    let pIdList = [];
    if (Utility.isArray(PeopleList)) {
      pIdList = PeopleList.map((item) => item.userId);
    }
    Utility.$platformApi.$selectUser(pIdList, true, (data) => {
      const { users } = data || {};

      if (isDealt === 'true') {
        users.forEach((user) => {
          const { userId, username } = user;
          const _obj = { taskUserName: username, taskUser: userId };
          if (!PeopleInfo[userId]) {
            PeopleInfo[userId] = _obj;
          }
        });
        const newData = Object.values(PeopleInfo);
        onSetContent('ChiocePeoles', newData);
        // Utility.$alert(JSON.stringify(newData));
        this.setState({ PeopleList: newData });
        if (onUpdatePeople) {
          onUpdatePeople(this.state.PeopleList);
        }
        return;
      }
      if (type) {
        users.forEach((userse) => {
          const { userId, username } = userse;
          const _objsen = { taskUserName: username, taskUser: userId };
          if (!PeopleInfo[userId]) {
            PeopleInfo[userId] = _objsen;
          }
        });
        const newDatasen = Object.values(PeopleInfo);
        onApiPost('SavesenInfo', Utility.format(ApiInfo.Meeting.AddPeople, taskId), { params: { type: 2 }, data: newDatasen }).then(() => {
          this.setState({ PeopleList: newDatasen });
          if (onUpdatePeople) {
            onUpdatePeople(this.state.PeopleList);
          }
        }, (err) => {
          Utility.$alert(JSON.stringify(err));
          Utility.$loadingHide();
        });
      } else {
        const __NewAddUserList = [];
        users.forEach((user) => {
          const { userId, username } = user;
          const _obj = { taskUserName: username, taskUser: userId };
          if (!PeopleInfo[userId]) {
            PeopleInfo[userId] = _obj;
            __NewAddUserList.push(PeopleInfo[userId]);
          }
        });
        const newData = Object.values(PeopleInfo);
        if (__NewAddUserList.length > 0) {
          onApiPost('SavepeoInfo', Utility.format(ApiInfo.Meeting.AddPeople, taskId), { params: { type: 1 }, data: __NewAddUserList }).then(() => {
            this.setState({ PeopleList: newData });
            if (onUpdatePeople) {
              onUpdatePeople(this.state.PeopleList);
            }
          }, (err) => {
            Utility.$alert(JSON.stringify(err));
            Utility.$loadingHide();
          });
        }
      }
    }, (err) => {
      Utility.$alert(JSON.stringify(err));
    });
  }
  /*
  * 删除接收人
  * */
  dele() {
    const { onApiDelete, UrlParams, onUpdatePeople, type } = this.props;
    const { taskId } = UrlParams;
    const { delepeo, PeopleInfo, delesenpeo } = this.state;
    const newDatas = Object.values(delepeo);
    const __newData = Object.values(PeopleInfo);
    const newSendPeo = Object.values(delesenpeo);
    if (type) {
      // if (newSendPeo.length === __newData.length) {
      //   Utility.$alert('不可全部删除');
      //   return;
      // }
      if (newSendPeo.length > 0) {
        newSendPeo.forEach((item) => {
          if (PeopleInfo[item.taskUser]) {
            delete PeopleInfo[item.taskUser];
          }
        });
      }
      const newDatasen = Object.values(PeopleInfo);
      const __Delesen = () => {
        if (newDatasen.length >= 0) {
          onApiDelete(Utility.format(ApiInfo.Meeting.deletePeople, taskId), { params: { type: 2 }, data: newSendPeo }).then(() => {
            this.setState({ PeopleList: newDatasen, delesenpeo: {}, PeopleInfo: this.state.PeopleInfo, bool: false });
            if (onUpdatePeople) {
              onUpdatePeople(this.state.PeopleList);
            }
          }, (err) => {
            Utility.$alert(JSON.stringify(err));
            Utility.$loadingHide();
          });
        }
      };
      Utility.$actionSheetBtns([{
        Title: '删除', onClick: () => {
          Utility.$actionSheetHide();
          setTimeout(() => {
            __Delesen();
          }, 200);
        }
      }]);
    } else {
      if (newDatas.length === __newData.length) {
        Utility.$alert('不可全部删除');
        return;
      }
      if (newDatas.length > 0) {
        newDatas.forEach((item) => {
          if (PeopleInfo[item.taskUser]) {
            delete PeopleInfo[item.taskUser];
          }
        });
      }
      const __dele = () => {
        if (newDatas.length > 0) {
          onApiDelete(Utility.format(ApiInfo.Meeting.deletePeople, taskId), { params: { type: 1 }, data: newDatas }).then(() => {
            this.setState({ PeopleList: Object.values(PeopleInfo), delepeo: {}, PeopleInfo: this.state.PeopleInfo, bool: false });
            if (onUpdatePeople) {
              onUpdatePeople(this.state.PeopleList);
            }
          }, (err) => {
            Utility.$alert(JSON.stringify(err));
            Utility.$loadingHide();
          });
        }
      };
      Utility.$actionSheetBtns([{
        Title: '删除', onClick: () => {
          Utility.$actionSheetHide();
          setTimeout(() => {
            __dele();
          }, 200);
        }
      }]);
    }
  }
  /*
  * 删除人数组
  * */
  checkpeo(obj) {
    const { type } = this.props;
    const { delepeo, delesenpeo } = this.state;
    if (type) {
      if (delesenpeo[obj.taskUser]) {
        delete delesenpeo[obj.taskUser];
      } else {
        delesenpeo[obj.taskUser] = obj;
      }
      this.setState({ delesenpeo: this.state.delesenpeo });
    } else {
      if (delepeo[obj.taskUser]) {
        delete delepeo[obj.taskUser];
      } else {
        delepeo[obj.taskUser] = obj;
      }
      this.setState({ delepeo: this.state.delepeo });
    }
  }
  render() {
    const styles = require('./scss/PeopleTaskList.scss');
    const { isAuth } = this.state;
    // const { explan } = this.props;
    let { IsShowLoadingComplete } = this.props;
    let { PeopleTaskList1 } = this.props;
    if (!PeopleTaskList1) {
      PeopleTaskList1 = [];
    }
    if (PeopleTaskList1.length === 0) {
      IsShowLoadingComplete = false;
    }
    return (
      <div className={styles.content}>
        <div className={styles.addpeo}>
          <div className={styles.centera} onClick={this.__HandlerSelectPeople.bind(this)}>+添加</div>
        </div>
        {this.__GetArticalList(styles)}
        {
          IsShowLoadingComplete ? <div className={styles.complateInfo}>内容全部加载完成</div> : ''
        }
        {isAuth && <div className={styles.filter}>
          <div className={styles.deleteb} onClick={this.dele.bind(this)}>删除</div>
        </div>}
      </div>
    );
  }
}
