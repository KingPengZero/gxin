/**
 * Created by hcc on 2016-12-15.
 */

import React, {Component, PropTypes} from 'react';
import {} from 'components';
/**
 * 按钮
 */
export default class RadusButton extends Component {
  static propTypes = {
    Text: PropTypes.string,
    onClick: PropTypes.func,
  };
  onClick = () => {
    const click = this.props.onClick;
    if (click) {
      click();
    }
  };
  render() {
    const styles = require('./scss/RadusButton.scss');
    const {Text} = this.props;
    return (
      <div className={styles.button} onClick = {this.onClick.bind(this)}>
        {Text}
      </div>
    );
  }
}
