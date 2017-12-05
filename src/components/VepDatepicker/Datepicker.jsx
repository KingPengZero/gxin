import React, { Component, PropTypes } from 'react';
import { Utility, VepNumberAddSubtract } from 'components';
/**
 * 按钮
 *
 * <VepDatepicker
 *              IsShowTime
 *              Format="yyyy-MM-dd hh:mm" DefaultValue="2017-01-01 12:34"
                onSelectDateTime={(value) => {console.log(value);}}
                onCancel={() => {console.log('取消');}} />
 */
export default class Datepicker extends Component {
  static propTypes = {
    Format: PropTypes.string,
    DefaultValue: PropTypes.string,
    IsShowTime: PropTypes.bool,
    onSelectDateTime: PropTypes.func,
    onCancel: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { DefaultValue } = props;
    this.state = {
      __index: 0,
      CurrentDate: Utility.$convertToDateByString(DefaultValue, true),
    };
  }


  /**
   * 选中的日期
   *
   * @param {any} isValid
   * @param {any} day
   *
   * @memberOf Datepicker
   */
  __HandlerSelectDay(isValid, day) {
    if (!!isValid) {
      this.state.CurrentDate.setDate(day);
      this.setState({ __index: this.state.__index++ });
    }
  }

  /**
   * 初始化天数
   *
   * @param {any} styles
   * @param {any} date
   * @returns
   *
   * @memberOf Datepicker
   */
  __BuildData(styles, date) {
    const __TempDate = date || new Date();
    //

    const __CurrentDate = new Date(__TempDate.getTime());
    // 今天
    const __Taday = __CurrentDate.getDate();
    // 当前月的头一天是星期几
    const __Day = new Date(__CurrentDate.getFullYear() + '/' + (__CurrentDate.getMonth() + 1) + '/1').getDay();// __CurrentDate.getDay();

    // 日，1，2，3，4，5，六
    //  0，1，2，3，4，5，6
    const __FirstRow = [];
    for (let i = 0; i < 7; i++) {
      __FirstRow.push(<div key={'datepiker_first_row_col_' + i}
        className={(i >= __Day ? styles.display : '') + ' ' +
          (__Taday === (i - __Day + 1) ? styles.taDay : '')}
        onClick={this.__HandlerSelectDay.bind(this, i >= __Day, i - __Day + 1)}>
        <div>
          {
            i >= __Day && (i - __Day + 1)
          }
        </div>
      </div>);
    }
    // 这个月的总天数
    const __Days = new Date(__CurrentDate.getFullYear(), __CurrentDate.getMonth() + 1, 0).getDate();
    // 剩余天数
    const __Days_SY = __Days - (7 - __Day);
    // 有几行。
    const __RowCount = (__Days_SY / 7) === 0 ? __Days_SY / 7 : (parseInt(__Days_SY / 7, 0) + 1);
    const __List = [__FirstRow];
    let __times = 7 - __Day;
    for (let j = 0; j < __RowCount; j++) {
      const __temp = [];
      for (let index = 0; index < 7; index++) {
        __times = __times + 1;
        __temp.push(<div key={'datepiker_row_' + j + '_col_' + index}
          className={(__times <= __Days ? styles.display : '') + ' ' +
            (__times <= __Days && __Taday === __times ? styles.taDay : '')}
          onClick={this.__HandlerSelectDay.bind(this, __times <= __Days, __times)}>
          <div>
            {
              __times <= __Days && __times
            }
          </div>
        </div>);
      }
      __List.push(__temp);
    }
    return __List.map((item, index) => {
      return (<div className={styles.row} key={'date_row_' + index}>
        {item}
      </div>);
    });
  }

  /**
   * 翻月操作，上一个月，或下一个月
   *
   * @param {any} value
   *
   * @memberOf Datepicker
   */
  __HandlerUpdateDate(type, value) {
    const { CurrentDate } = this.state;
    if (type === 'year') {
      const newYear = CurrentDate.getFullYear() + value;
      CurrentDate.setFullYear(newYear);
    } else {
      const newMonth = CurrentDate.getMonth() + value;
      CurrentDate.setMonth(newMonth);
    }
    this.setState({ CurrentDate: CurrentDate });
  }

  /**
   * 重置操作
   *
   * @memberOf Datepicker
   */
  __HandlerReset() {
    const { DefaultValue } = this.props;
    this.state.CurrentDate = Utility.$convertToDateByString(DefaultValue, true);
    this.setState({ __index: this.state.__index++ });
  }
  /**
   * 取消操作
   *
   * @returns
   *
   * @memberOf Datepicker
   */
  __HandlerCancel() {
    const { onCancel } = this.props;
    if (!Utility.isFunction(onCancel)) {
      Utility.$dialogHide();
      return;
    }
    onCancel();
  }

  /**
   * 点击确定，返回日期。
   *
   * @returns
   *
   * @memberOf Datepicker
   */
  __HandlerSubmit() {
    const { onSelectDateTime, Format } = this.props;
    if (!Utility.isFunction(onSelectDateTime)) {
      return;
    }
    onSelectDateTime(Utility.formatDate(Format || 'yyyy-MM-dd', this.state.CurrentDate));
  }


  __HandlerUpdateHoursOrMinutes(type, value) {
    if (type === 0) {
      this.state.CurrentDate.setHours(value);
    } else {
      this.state.CurrentDate.setMinutes(value);
    }
    this.setState({ __index: this.state.__index++ });
  }
  render() {
    const styles = require('./scss/Datepicker.scss');
    const { CurrentDate } = this.state;
    const _Hour = CurrentDate.getHours();
    const _Minute = CurrentDate.getMinutes();
    const { Format, IsShowTime } = this.props;
    return (
      <div className={styles.datepickerCss} >
        <div className={styles.header}>
          <div className={styles.previous} onClick={this.__HandlerUpdateDate.bind(this, 'year', -1)}>{'<<'}</div>
          <div className={styles.previous} onClick={this.__HandlerUpdateDate.bind(this, 'month', -1)}>{'<'}</div>
          <div className={styles.date}>时间{Utility.formatDate(Format || 'yyyy-MM-dd', CurrentDate)}</div>
          <div className={styles.next} onClick={this.__HandlerUpdateDate.bind(this, 'month', 1)}>{'>'}</div>
          <div className={styles.next} onClick={this.__HandlerUpdateDate.bind(this, 'year', 1)}>{'>>'}</div>
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <div>日</div>
            <div>一</div>
            <div>二</div>
            <div>三</div>
            <div>四</div>
            <div>五</div>
            <div>六</div>
          </div>
          <div className={styles.dateList}>
            {this.__BuildData(styles, CurrentDate)}
          </div>
          {
            !!IsShowTime && <div className={styles.timeInfo}>
              <div className={styles.hour}>
                <div>时间：</div>
                <VepNumberAddSubtract DefaultValue={_Hour} MaxValue={23} MinValue={0} Width="50px"
                  onGetValue={this.__HandlerUpdateHoursOrMinutes.bind(this, 0)} />
              </div>

              <div className={styles.minute}>
                <div>分钟：</div>
                <VepNumberAddSubtract DefaultValue={_Minute} MaxValue={59} MinValue={0} Width="50px"
                  onGetValue={this.__HandlerUpdateHoursOrMinutes.bind(this, 2)} />
              </div>
            </div>
          }
        </div>
        <div className={styles.footer}>
          <div className={styles.reset} onClick={this.__HandlerReset.bind(this)}><span>重置</span></div>
          <div className={styles.submti} onClick={this.__HandlerSubmit.bind(this)}><span>确定</span></div>
          <div className={styles.cancel} onClick={this.__HandlerCancel.bind(this)}><span>取消</span></div>
        </div>
      </div>
    );
  }
}
