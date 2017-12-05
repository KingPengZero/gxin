import React, { Component, PropTypes } from 'react';
import { Utility } from 'components';
/** 
 * 按钮
 *
 * <GxButton Text = "确定"  onClick = {this.handlerOnClick.bind(this)}/>
 */
export default class GxButton extends Component {
  static propTypes = {
    Text: PropTypes.string,
    style: PropTypes.object,
    IsSelect: PropTypes.bool,
    onClick: PropTypes.func,
  };

  /**
   * 点击回调事件
   * @private
   */
  __HandlerOnClick() {
    const { onClick } = this.props;
    if (!Utility.isFunction(onClick)) {
      return;
    }
    onClick();
  }

  render() {
    const styles = require('./scss/GxButton.scss');
    const { Text, IsSelect, style } = this.props;
    return (
      <div className={styles.buttonCss} ref="GxButton">
        <button style={style} className={styles.btn + ' ' + (!!IsSelect ? styles.selectCss : '')}
          onClick={this.__HandlerOnClick.bind(this)}> {Text || 'button'}</button>
      </div>
    );
  }
}
