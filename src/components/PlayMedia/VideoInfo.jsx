/**
 * Created by root on 2017/10/11.
 */
import React, { Component, PropTypes } from 'react';
import { Utility, GxIcon } from 'components';

export default class VideoInfo extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
    };
    this.video = null; // the html5 video
  }

  componentDidMount() {
    this.state.IsMount = true;

    const { videoCtrl } = this.refs;
    videoCtrl.addEventListener('ended', () => {
      Utility.$showDialogHide();
    });
    this.__HandlerPlayvideo();
  }

  __HandlerPlayvideo() {
    const { videoCtrl } = this.refs;
    if (!this.state.isPlay) {
      videoCtrl.play();
    } else { // pause video
      videoCtrl.pause();
    }
  }

  render() {
    const styles = require('./scss/VideoInfo.scss');
    const { src } = this.props;
    return (
      <div className={styles.videoInfoCss} >
        <div>
          <div className={styles.closeVideo} onClick={() => {
            Utility.$showDialogHide();
          }}>
            <div><GxIcon IconType="iconcloseVideo" /></div>
          </div>
          <video ref="videoCtrl" src={src}
            x5-video-player-type="h5"
            x5-video-orientation="portraint"
            webkit-playsinline
            x-webkit-airplay
            playsinline
            controls
            x5-video-player-fullscreen
          />

        </div>
      </div >
    );
  }
}
