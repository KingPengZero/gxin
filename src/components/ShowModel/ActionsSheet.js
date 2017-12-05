/**
 * Created by admin on 2016-08-16.
 */
import React, { Component, PropTypes } from 'react';
import { Utility } from 'components';
/**
 * 箭头
 * @example
 * <ActionsSheet
 *    Title = '标题'                                                                --------1> 不能为空
 *                  }
 *    Buttons = [                                                                   --------3> 可以为空
 *                {
 *                  Title: '测试按键1',                                              --------3> ------1> 按钮内容
 *                  funName: this.handlerButton1ClickEvent.bind(this)               --------3> ------2> 按键事件
 *                },
 *                {Title: '测试按键2', funName: this.handlerButton2ClickEvent.bind(this)}
 *              ]
 *    onClose = {this.handlerClose.bind(this)}                                      --------4> 可以为空
 *    />
 */
export default class ActionsSheet extends Component {
  static propTypes = {
    Title: PropTypes.string,
    Buttons: PropTypes.array,
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ IsShowAction: true });
    }, 50);
  }

  __HandlerClose() {
    this.setState({ IsShowAction: false });
    const {onClose} = this.props;
    if (Utility.isFunction(onClose)) {
      onClose();
    }
  }

  handlerButton(item) {
    if (Utility.isFunction(item.funName)) {
      item.funName(item);
    }
    this.__HandlerClose();
  }

  render() {
    const styles = require('./scss/ActionsSheet.scss');
    const {Title, Buttons} = this.props;
    const {IsShowAction} = this.state;

    let __ButtonItem = '';
    if (Buttons && Buttons.length > 0) {
      __ButtonItem = Buttons.map((item, __index) => {
        return (<div key={'actionSheet_button_index_' + __index} className={styles.buttons}>
          <div className={item.red ? styles.contentred : styles.content} onClick={this.handlerButton.bind(this, item)}>{item.Title}</div>
        </div>);
      });
    }
    return (
      <div className={styles.content} ref="exoudsActionsSheet">
        <div className={styles.background} onClick={this.__HandlerClose.bind(this)}></div>
        <div className={styles.leilong + ' ' + (!!IsShowAction ? styles.showAction : '')}>
          <div className={styles.subLeiLong}>
            <div className={styles.title} >{Title}</div>
             {__ButtonItem}
             <div className={styles.splitLine}></div>
            <div className={styles.cancel} onClick={this.__HandlerClose.bind(this)}>取消</div>
          </div>
        </div>
      </div>
    );
  }
}
