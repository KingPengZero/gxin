import React, {
    Component,
    PropTypes
} from 'react';

class MyTag extends Component {

    static propTypes = {
      IsVoice: PropTypes.bool,
    };

    constructor(props) {
      super(props);
    }

    render() {
      const styles = require('./scss/MyTag.scss');
      const {
          IsVoice
      } = this.props;
      return (
          <div className={IsVoice ? styles.voice : styles.normal}>{IsVoice ? '转声音' : '转任务'}</div>
      );
    }
}

export default MyTag;
