import React, { PropTypes, Component } from 'react';
import { GxIcon } from 'components';

/**
 * <NoResources /> 没资源
 * @export
 * @class NoResources
 * @extends {Component}
 */

export default class NoResources extends Component {
  static propTypes = {
    Title: PropTypes.string,                                           // 标题
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    const styles = require('./scss/NoResources.scss');
    return (
      <div className={styles.noResourcesCss}>
        <div className={styles.background}>
          <div className={styles.container}>
            <div>
              <GxIcon IconType="iconNoResources" />
            </div>
            <div className={styles.txtContent}>
              <div>抱歉,您访问的任务已不存在.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
