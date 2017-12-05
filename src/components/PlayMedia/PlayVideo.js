/**
 * Created by root on 2017/10/11.
 */
import React, { Component, PropTypes } from 'react';
import { GxIcon, Utility } from 'components';
import VideoInfo from './VideoInfo';

export default class PlayVideo extends Component {
  static propTypes = {
    src: PropTypes.string,
    thumbUrl: PropTypes.string,
    times: PropTypes.number,
    children: PropTypes.any,
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
      // this.state.isPlay = false;
      // this.__UpdateRender();
    });
  }

  millisecondToDate(time) {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __CurrentTempDate: new Date().getTime() });
    }
  }

  __HandlerPlayvideo() {
    if (!!Utility.$isIOS()) {
      Utility.$showDialog(<VideoInfo src={this.props.src} />, '视频播放', () => {}, () => {}, { StyleName: 'fullStyle' });
      return;
    }
    const { videoCtrl } = this.refs;
    if (!this.state.isPlay) {
      videoCtrl.play();
      this.state.isPlay = true;
    } else { // pause video
      videoCtrl.pause();
      this.state.isPlay = false;
    }
    this.__UpdateRender();
  }

  render() {
    const styles = require('./scss/PlayVideo.scss');
    const { src, times, thumbUrl } = this.props;
    const _timeCount = times !== 0 ? this.millisecondToDate(times) : '00:00';
    const _srcImg = require('./img/default_pic@3x.png');
    const { isPlay } = this.state;
    return (
      <div className={styles.playVideoCss} >
        <div className={styles.videoContainer}>
          <img src={thumbUrl ? thumbUrl : _srcImg} ref="container" />
          <div className={styles.playBtnCss} onClick={this.__HandlerPlayvideo.bind(this)}>
            <GxIcon IconType="iconPlayBtn" />
          </div>
          <div className={styles.timeCount} >{_timeCount}</div>
          <div className={styles.divVideo + ' ' + (!!isPlay ? styles.playCss : styles.playHide)}>
            <div className={styles.closeVideo} onClick={this.__HandlerPlayvideo.bind(this)}>
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
        </div>
      </div>
    );
  }
}
/*
<video ref="videoCtrl" x5-video-player-type="h5" src={src}
          x5-video-orientation="portraint"
          webkit-playsinline x-webkit-airplay playsinline
          x5-video-player-fullscreen ></video>
        */
