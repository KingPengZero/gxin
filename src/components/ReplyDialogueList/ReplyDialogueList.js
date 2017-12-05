/**
 * 箭头
 * @example
 * <ReplyDialogueList
 *    ReplyDialogueList = [
 *     {
        userName: '胡崇崇',                              
        content: '轻任务',  
        userId: 'hucc@hh',                       
        time: '1300000000000000000',
        isContext: true,
        isOwn: false,
        contextlenght：6,
       }
 *    ]
 *    />
 */
import React, { Component, PropTypes } from 'react';
import { GxIcon, Utility, PlayAudio, PlayVideo } from 'components';
import { connect } from 'react-redux';
import * as CommonActions from 'redux/modules/reduxCommon';

const styles = require('./scss/ReplyDialogueList.scss');

@connect(
  state => ({
    Title: state.Common.Title,                                          // 标题
    UrlParams: state.Common.UrlParams,                                  // URL参数
    replyList: state.TaskManager.replyList,
    AudioData: state.Common.AudioData,
  }), { ...CommonActions })

export default class ReplyDialogueList extends Component {
  static propTypes = {
    replyDialogueList: PropTypes.array,
    IsShowLoadingComplete: PropTypes.bool,
    IsDealtEdit: PropTypes.bool,                                        // 速记编辑页面上下文显示
    contextList: PropTypes.array,
    UrlParams: PropTypes.object,
    onApiGet: PropTypes.func,                                           // Get请求
    onApiPost: PropTypes.func,                                          // post请求
  };
  constructor(props) {
    super(props);
    this.state = {
      lastView: null,
      IsBuy: false,
    };
  }

  componentDidMount() {
    const contentDiv = this.refs.contentDiv;
    if (contentDiv) {
      contentDiv.scrollTop = contentDiv.scrollHeight;
    }
  }

  componentWillReceiveProps() {
    this.state.lastView = null;
  }

  componentDidUpdate() {
    const contentDiv = this.refs.contentDiv;
    if (contentDiv) {
      contentDiv.scrollTop = contentDiv.scrollHeight;
    }
  }

  __itemClick(obj) {
    if (obj && obj.onItemClick && Utility.isFunction(obj.onItemClick)) {
      obj.onItemClick();
    }
  }

  __getTimeView(obj) {
    const lastView = this.state.lastView;
    if (!lastView) {
      return (
        <div className={styles.tips} >
          {obj.createTime ? Utility.$convertToDateByTimestamp(obj.createTime, 'HH:mm') : ''}
        </div>
      );
    } else if (lastView.createTime - obj.createTime >= 60000) {
      return (
        <div className={styles.tips} >
          {obj.createTime ? Utility.$convertToDateByTimestamp(obj.createTime, 'HH:mm') : ''}
        </div>
      );
    }
    return '';
  }

  __getTipsView(tips) {
    return (
      <div className={styles.tips} >
        {tips}
      </div>
    );
  }

  /**
   * 图片预览
   * 
   * @param {any} styles 
   * @returns 
   * @memberof PictureLayout
   */
  __PicturePreview(filesUrl) {
    console.log(filesUrl);
    const _url = [];
    if (filesUrl) {
      _url.push(filesUrl);
    }

    Utility.$previewModel({
      Urls: _url,
      Index: 0
    });
  }

  __getOthers(obj, index) {
    this.state.lastView = obj;
    const { contentType, url, thumbUrl, content, time, highlight } = obj || {};
    let IsHeightLight = false;
    if (contentType && contentType === 'text' && highlight === 1) {
      IsHeightLight = true;
    }
    let __Result = '';
    switch (contentType) {
      case 'voice':
        __Result = this.__PlayAudioHtml({ url, time, isSelf: false, obj, index });
        break;
      case 'image':
        __Result = this.__PreviewPictureHtml(url, thumbUrl);
        break;
      case 'text':
        __Result = this.__PreviewTextHtml(content);
        break;
      case '':
        __Result = this.__PreviewTextHtml(content);
        break;
      case null:
        __Result = this.__PreviewTextHtml(content);
        break;
      case undefined:
        __Result = this.__PreviewTextHtml(content);
        break;
      case 'video':
        __Result = this.__PlayVideoHtml(url, time, thumbUrl);
        break;
      default:
        break;
    }
    return (
      <div className={styles.item + ' ' + (!!IsHeightLight ? styles.heightLight : '')} key={index}>
        <div className={styles.headIcon} onClick={this.__GetDialog.bind(this, obj)}>
          <GxIcon IconType="headIcon35" />
        </div>
        <div className={styles.repley}>
          <div className={styles.replyName}> {obj.taskUserName ? obj.taskUserName : ''}</div>
          {__Result}
        </div>
      </div>
    );
  }


  /**
   * 点对点会话
   * 
   * @param {any} item 
   * @returns 
   * @memberof PeopleTaskList
   */
  __GetDialog(item) {
    const { taskUser } = item || {};
    Utility.$platformApi.$openChat(taskUser, () => { }, () => { });
  }

  __getOwns(obj, index, isSelf) {
    this.state.lastView = obj;
    const { contentType, url, thumbUrl, content, time, highlight } = obj || {};
    let IsHeightLight = false;
    if (contentType && contentType === 'text' && highlight === 1) {
      IsHeightLight = true;
    }
    let __Result = '';
    switch (contentType) {
      case 'voice':
        __Result = this.__PlayAudioHtml({ url, time, isSelf, obj, index });
        break;
      case 'image':
        __Result = this.__PreviewPictureHtml(url, thumbUrl);
        break;
      case 'text':
        __Result = this.__PreviewTextHtml(content);
        break;
      case '':
        __Result = this.__PreviewTextHtml(content);
        break;
      case null:
        __Result = this.__PreviewTextHtml(content);
        break;
      case undefined:
        __Result = this.__PreviewTextHtml(content);
        break;
      case 'video':
        __Result = this.__PlayVideoHtml(url, time, thumbUrl, isSelf);
        break;
      default:
        break;
    }
    return (
      <div className={styles.itemOwns + ' ' + (!!IsHeightLight ? styles.heightLight : '')} key={index}>
        <div className={styles.repley}>
          {__Result}
        </div>
        <div className={styles.headIcon}>
          <GxIcon IconType="headIcon35" />
        </div>
      </div>
    );
  }

  __getOtherItem(obj, index) {
    const contextList = this.props.contextList || [];
    return (
      <div ref={'audio_other_' + index} className={styles.div} key={'get_other' + index}>
        {this.__getTimeView(obj)}
        {this.__getOthers(obj, index)}
        {contextList.length - 1 === index ? this.__getTipsView('以上是任务相关信息') : ''}
      </div>
    );
  }

  __getOwnItem(obj, index, isSelf) {
    const contextList = this.props.contextList || [];
    return (
      <div className={styles.div} key={'get_own' + index}>
        {this.__getTimeView(obj)}
        {this.__getOwns(obj, index, isSelf)}
        {contextList.length - 1 === index ? this.__getTipsView('以上是任务相关信息') : ''}
      </div>
    );
  }

  __GetArticalList() {
    let dataeArr = [];
    const { replyDialogueList, contextList } = this.props;
    if (contextList) {
      dataeArr = contextList;
    }
    if (replyDialogueList) {
      dataeArr = dataeArr.concat(replyDialogueList);
    }
    const {
      UrlParams
    } = this.props;
    const userId = UrlParams.userId;
    const _items = dataeArr.map((obj, index) => {
      const isSelf = userId === obj.taskUser ? true : false;
      return userId === obj.taskUser ? this.__getOwnItem(obj, index, isSelf) : this.__getOtherItem(obj, index);
    });
    return _items;
  }

  __PreviewTextHtml(content) {
    return (
      <div className={styles.replyContent}>
        {content ? content : ''}
      </div>
    );
  }

  __PreviewPictureHtml(url, thumbUrl) {
    const defaultImg = require('./img/icon-default-img@3x.png');
    return (
      <div onClick={this.__PicturePreview.bind(this, url)} className={styles.defaultImgCss} >
        <img src={thumbUrl ? thumbUrl : defaultImg} alt="图片预览" />
      </div>
    );
  }
  // { url, time, isSelf, obj, index }
  __PlayAudioHtml({ url, time, isSelf, obj, index }) {
    const { Url } = this.state;
    return (
      <div className={styles.audioContainer}>
        <PlayAudio ref={'pAudio_' + index} src={Url}
          times={time !== 0 ? Number(time) : 0}
          isSelf={isSelf}
          audioInfo={obj}
          onPlayAudio={this.__HandlerPlayAudio.bind(this, url, obj)} />
      </div>
    );
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __CurrentTempDate: new Date().getTime() });
    }
  }

  __StopOtherAudio() {
    Object.keys(this.refs).filter((key) => key.indexOf('pAudio_') >= 0).forEach((ref) => {
      this.refs[ref].onPause();
    });
  }

  async __HandlerPlayAudio(url, row, source) {
    const { IsBuy } = this.state;
    if (!!IsBuy) {
      Utility.$actionSheet('正在处理中,请稍后...');
      return;
    }
    const { onApiPost } = this.props;
    this.__StopOtherAudio();
    if (!url || !Utility.isFunction(onApiPost)) {
      return;
    }
    const playSource = (times) => {
      if (source) {
        source.onPlay(times);
      }
    };
    if (row.Url) {
      playSource();
      return;
    }
    this.state.IsBuy = true;
    // https://172.20.95.91:9710/audios/52d6f194-d614-4df1-a05f-fa86b28d77a9.amr
    const index = url.lastIndexOf('\/');
    const res = url.substring(index + 1, url.length);
    const _fileNmae = res.substring(0, res.length - 4);
    const params = {};
    params.filename = _fileNmae;
    const httpServer = 'http://172.20.95.91:9910/tranformat-web.php';
    try {
      const result = await onApiPost('AudioData', httpServer, { isSelfUrl: true, data: params });
      if (!result) {
        return;
      }
      row.Url = 'http://172.20.95.91:9910/audios/' + _fileNmae + '.mp3';
      this.state.Url = row.Url;
      playSource();
      setTimeout(() => {
        playSource(1);
      }, 1000);
      const _timeout = 2000;
      setTimeout(() => {
        this.state.IsBuy = false;
      }, _timeout);
      // this.__UpdateRender();
    } catch (ex) {
      this.state.IsBuy = false;
      // this.__UpdateRender();
    }
  }

  __PlayVideoHtml(url, time, thumbUrl, isSelf) {
    return (
      <div className={styles.videoContainer} style={this.__IsSelfVideo(isSelf)}>
        <PlayVideo src={url} times={Number(time)} thumbUrl={thumbUrl} />
      </div>
    );
  }

  __IsSelfVideo(isSelf) {
    const _style = {};
    if (!!isSelf) {
      _style.justifyContent = 'flex-end';
    }
    return _style;
  }

  render() {
    const { replyDialogueList, contextList, IsDealtEdit } = this.props;
    let show = false;
    if (replyDialogueList || contextList) {
      show = true;
    }
    return (
      <div className={styles.replydialogListCss}>
        <div className={show ? styles.content : ''} ref="contentDiv">
          {!!IsDealtEdit && <div>{this.__getTipsView('以下是任务相关消息')}</div>}
          {this.__GetArticalList(styles)}
        </div>
      </div>
    );
  }
}
