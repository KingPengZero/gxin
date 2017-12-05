/**
 * Created by hcc on 2016-12-15.
 */

import React, {Component, PropTypes} from 'react';
import {} from 'components';
/**
 * 按钮
 */
export default class UploadButton extends Component {
  static propTypes = {
    Text: PropTypes.string,
    onSelectFile: PropTypes.func,
  };
  onClick = () => {
    const fileInput = this.refs.fileInput;
    fileInput.value = null;
    fileInput.click();
  };

  __onChange() {
    // const _sucess = (responseText) => {
    //   alert('sucess' + responseText);
    // };
    // const _fail = () => {
    //   alert('shibai');
    // };
    // const _pre = (per) => {
    //   console.info(per);
    // };
    const fileInput = this.refs.fileInput;
    const {onSelectFile} = this.props;
    onSelectFile(fileInput.value, fileInput.files[0]);
    const obj1 = fileInput.files;
    const obj2 = fileInput.type;
    console.info(obj1, obj2);
    fileInput.setAttribute('multiple', true);
    // Utility.uploadFile(fileInput.files[0], _sucess, _fail, _pre);
  }
  render() {
    const styles = require('./scss/UploadButton.scss');
    const {Text} = this.props;
    return (
      <div className={styles.uploadBtn} ref="UploadButton">
        <label className={styles.label} onClick={this.onClick}>{Text}</label>
        <input
          type="file" ref="fileInput" style={{ display: 'none', clip: 'rect(0 0 0 0)'}}
          onChange={this.__onChange.bind(this)}/>
      </div>
    );
  }
}
