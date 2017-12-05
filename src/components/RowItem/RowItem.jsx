/**
 * Created by admin on 2016-09-22.
 */
import React, { Component, PropTypes } from 'react';
import { Utility, GxIcon } from 'components';
const styles = require('./scss/RowItem.scss');

/**
 *<RowItem LeftTitle="左边" RightTitle="右边内容" />
 */
export default class RowItem extends Component {
  static propTypes = {
    LeftTitle: PropTypes.string,                                          // 标题
    RightTitle: PropTypes.string,                                         // 标题
    RightData: PropTypes.any,                                             // 标题
    RightIcon: PropTypes.string,                                          // 默认是一个向右的箭头
    FontSize: PropTypes.string,                                           // 字体大小
    HideTopLine: PropTypes.bool,
    HideBottomLine: PropTypes.bool,
    IsRightArrow: PropTypes.bool,                                        // 是否显示默认向右的箭头
    onSelect: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { } = Utility;
  }

  componentDidMount() {
  }
  __HandlerSelect() {
    const { onSelect } = this.props;
    if (Utility.isFunction(onSelect)) {
      onSelect();
    }
  }

  __GetFontSize(FontSize) {
    const _style = {};
    if (FontSize) {
      _style.fontSize = FontSize;
    }
    return _style;
  }

  render() {
    const { LeftTitle, RightIcon, RightTitle, RightData, HideTopLine, HideBottomLine, IsRightArrow, FontSize } = this.props;
    return (
      <div className={styles.rowItemCss} onClick={this.__HandlerSelect.bind(this)}>
        <div className={styles.item + ' ' + (!!HideBottomLine ? styles.hideBottom : '')
          + ' ' + (!!HideTopLine ? styles.hideTop : '')
        }>
          <div className={styles.left} style={this.__GetFontSize(FontSize)}>{LeftTitle}</div>
          <div className={styles.right}>
            <div className={styles.title}>{
              RightData ? RightData : RightTitle
            }</div>
            {!IsRightArrow ?
              <div className={styles.icon}>
                <GxIcon IconType={RightIcon || 'iconRight'} />
              </div> : ''
            }
          </div>
        </div>
      </div>
    );
  }
}
