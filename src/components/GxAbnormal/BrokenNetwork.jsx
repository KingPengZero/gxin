import React, { PropTypes, Component } from 'react';
import { GxIcon, Utility } from 'components';

/**
 * <BrokenNetwork /> 断网
 * @export
 * @class BrokenNetwork
 * @extends {Component}
 */

export default class BrokenNetwork extends Component {
  static propTypes = {
    Title: PropTypes.string,                                           // 标题
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const styles = require('./scss/BrokenNetwork.scss');
    return (
      <div className={styles.brokenNetworkCss}>
        <div className={styles.background}>
          <div className={styles.container}>
            <div>
              <GxIcon IconType="iconBrokenNetWork" />
            </div>
            <div className={styles.txtContent}>
              <div>抱歉,您访问的页面已不在云端</div>
              <div>轻触屏幕重新加载。</div>
            </div>
            <div className={styles.closePage}>
              <div onClick={() => Utility.$platformApi.$closeWindow()}>关闭页面</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
