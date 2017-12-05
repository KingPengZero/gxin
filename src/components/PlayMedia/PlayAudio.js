/**
 * Created by root on 2017/10/11.
 */
import React, { Component, PropTypes } from 'react';
import { GxIcon, Utility } from 'components';
export default class PlayAudio extends Component {
  static propTypes = {
    audioInfo: PropTypes.object,
    src: PropTypes.string,
    times: PropTypes.number,
    isSelf: PropTypes.bool,
    IsPlay: PropTypes.bool,
    onPlayAudio: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      isPlaying: false,
      isMuted: false,
      volume: 100,
      allTime: 0,
      currentTime: 0,
      times: 0,
    };
  }

  componentDidMount() {
    const audio = this.refs.audio;
    this.state.IsMount = true;
    audio.addEventListener('ended', () => {
      this.state.isPlaying = false;
      this.__UpdateRender();
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state.isPlaying !== nextState.isPlaying;
  }

  onPause() {
    const audioNode = this.refs.audio;
    this.state.isPlaying = false;
    audioNode.pause();
    audioNode.load();
    this.__UpdateRender();
  }

  onPlay(times) {
    const self = this;
    const playAudio = () => {
      const { audioInfo } = self.props;
      const audioNode = self.refs.audio;
      if (times === 1) {
        if (!audioNode.src) {
          audioNode.src = audioInfo.Url;
        }
        self.state.isPlaying = true;
        audioNode.load();
        audioNode.play();
        if (audioNode.currentTime === audioNode.duration) {
          audioNode.currentTime = 0;
          self.state.isPlaying = false;
        }
        self.__UpdateRender();
        return;
      }
      if (!self.state.isPlaying) {
        if (!audioNode.src) {
          audioNode.src = audioInfo.Url;
        }
        self.state.isPlaying = true;
        audioNode.load();
        audioNode.play();
        if (audioNode.currentTime === audioNode.duration) {
          audioNode.currentTime = 0;
          self.state.isPlaying = false;
        }
        self.__UpdateRender();
        // return;
      } else {
        self.state.isPlaying = false;
        audioNode.pause();
        audioNode.load();
        self.__UpdateRender();
      }
    };
    if (times === 1) {
      playAudio();
      return;
    }
    if (times === -1) {
      playAudio();
      return;
    }
    setTimeout(() => {
      playAudio();
    }, 20);
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __CurrentTempDate: new Date().getTime() });
    }
  }

  __HandlerPlayAudio() {
    if (!!this.state.isPlaying) {
      this.onPause();
      return;
    }
    const { onPlayAudio } = this.props;
    if (!Utility.isFunction(onPlayAudio)) {
      return;
    }
    onPlayAudio(this);
  }

  _IsSelfAudio(isSelf) {
    const _style = {};
    if (!!isSelf) {
      _style.justifyContent = 'flex-start';
      _style.flexDirection = 'row-reverse';
    }
    return _style;
  }

  /**
   * 分阶段显示语音的样式长度
   * 
   * @param {any} times 
   * @returns 
   * @memberof PlayAudio
   */
  __AudioLength(times) {
    const _style = {};
    if (times === 0) {
      _style.width = '30%';
    } else if (times > 0 && times <= 10) {
      _style.width = '35%';
    } else if (times > 10 && times <= 30) {
      _style.width = '40%';
    } else if (times > 30 && times <= 50) {
      _style.width = '45%';
    } else if (times > 50 && times <= 70) {
      _style.width = '50%';
    } else if (times > 70 && times <= 90) {
      _style.width = '55%';
    } else if (times > 90 && times <= 150) {
      _style.width = '60%';
    } else if (times > 150 && times <= 200) {
      _style.width = '65%';
    } else if (times > 200 && times <= 1000) {
      _style.width = '68%';
    } else if (times > 1000) {
      _style.width = '70%';
    }
    return _style;
  }


  millisecondToDate(time) {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }

  render() {
    const styles = require('./scss/PlayAudio.scss');
    const { times, isSelf, audioInfo } = this.props;
    const { Url } = audioInfo || {};
    const _srcImg = require('./img/personal_chat_others_bg@3x.png');
    const _selfImg = require('./img/personal_chat_own_bg@3x.png');
    const { isPlaying } = this.state;
    const _IconType = !!isSelf ? (!!isPlaying ? 'iconBlueWifiAnimation' : 'iconBlueWifi') : (!!isPlaying ? 'iconWhiteWifiAnimation' : 'iconWhiteWifi');
    return (
      <div className={styles.playAudioCss} style={this._IsSelfAudio(isSelf)} onClick={this.__HandlerPlayAudio.bind(this)} >
        <div className={styles.audioContainer + ' ' + (!!isSelf ? styles.selfAudioCss : styles.otherAudioCss)} style={this.__AudioLength(times)}>
          <img src={!!isSelf ? _selfImg : _srcImg} />
          <div className={styles.audioCss}>
            <audio ref="audio" preload="metadata" src={Url} ></audio>
          </div>
          <div className={styles.wifiCss + ' ' + (!!isSelf ? styles.isSelfWifi : styles.rightCss)}>
            <GxIcon IconType={_IconType} />
          </div>
        </div>
        <span className={styles.timeCount} >{!!isSelf ? '"' + times : times + '"'}</span>
      </div>
    );
  }
}
