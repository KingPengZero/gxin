/**
 * 职得首页顶部 轮播组件  上下滚动 2017/5/24
 */
import React, { Component, PropTypes } from 'react';
import { Utility, ZdIcon, ZdRollingData } from 'components';

export default class Carousel extends Component {
  static propTypes = {
    DataList: PropTypes.array,                       // 数据列表
    onClick: PropTypes.func,                         // 点击事件
  }
  constructor(props) {
    super(props);
    this.state = {
      CarouselArray: [],                             // 用于轮播的数组 结构-->[[1,2],[3,4],...]
      IsAdd: false,
    };
  }

  componentWillMount() {
  }
  /**
   * 开始轮播
   */
  componentDidMount() {
    this.state.IsMount = true;
    const { DataList } = this.props;
    this.__ConvertArraySec(DataList);
    this.__SetInterval();
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.CarouselArray !== nextProps.DataList) {
      this.__ConvertArraySec(nextProps.DataList);
    }
  }

  componentWillUnmount() {
    delete this.state.IsMount;
    clearInterval(this.state.Interval);
  }

  /**
  * 鼠标悬浮时候  停止轮播 
  * 
  * @memberOf Carousel
  */
  __HandlerMouseOver() {
    clearInterval(this.state.Interval);
  }

  /**
   * 鼠标离开开始轮播
   */
  __HandlerMouseOut() {
    // this.__SetInterval();
  }

  /**
   * 轮播切换
   */
  __NextData() {
    const { CarouselArray } = this.state;
    const __shift = CarouselArray.shift();    // 获取第一个过元素
    CarouselArray.push(__shift);
    this.state.CarouselArray = CarouselArray;
    this.state.IsAdd = false;
    this.__UpdateRender();
    setTimeout(() => {
      this.state.IsAdd = true;
      this.__UpdateRender();
    }, 200);
  }

  /**
   * 点击轮播项目 进入详情页
   * 
   * public enum ZdDataHotSourceEnum {  activity(1),//热门活动   topic(2),//热门话题   share(3),//优质内容  shareUsers(4),//分享最多的人 self(0);//自定义
   *
   * SourceFrom 取值
   *  @param {any} item 
   * @returns  
   * @memberof Carousel
   */
  __HandlerClick(item) {
    if (!item) {
      return;
    }
    const { SubjectDetail, ActivityDetailPage, CustomTopicDetails } = Utility.constItem.UrlItem;
    switch (item.SourceFrom) {
      case 'activity':
        this.__HandlerGoToPage(ActivityDetailPage, { activity_id: item.SourceId });
        break;
      case 'topic':
        this.__HandlerGoToPage(SubjectDetail, { SourceId: item.SourceId });
        break;
      case 'share':
        this.__HandlerGoToPage(CustomTopicDetails, { SourceId: item.SourceId });
        break;
      case 'self':
        Utility.setContent(Utility.constItem.SavePageInfo.CustomDetails, item);
        this.__HandlerGoToPage(CustomTopicDetails, { Title: item.Title, Content: item.Content });
        break;
      default:
        break;
    }
  }

  /**
  * 跳转
  * @param {*} url 
  * @param {*} params 
  */
  __HandlerGoToPage(url, params) {
    Utility.toPage(url, params);
  }

  /**
   * 开始轮播
   */
  __SetInterval() {
    const { CarouselArray } = this.state;
    if (Utility.isArray(CarouselArray) && CarouselArray.length > 1) {
      this.state.Interval = setInterval(this.__NextData.bind(this), 3000);
    }
  }

  /**
   * 转换数组方法2 (若原数组长度为基数 则新数组最后一组也为2个值)
   * 将数据列表 两两分组 组成新数组 
   * 例:原数组[1,2,3,4,5] 转变后[[1,2],[3,4],[5,1 第一个数据]]
   */
  __ConvertArraySec(DataList) {
    if (!Utility.isArray(DataList)) {
      return;
    }
    const newArray = [];
    let doubleArray = [];
    const _Length = DataList.length;
    if (DataList.length > 1) {
      if (_Length % 2 !== 0) {    // 数组个数为奇数 就把第一个元素push进去
        DataList.push(DataList[0]);
      }
      // 将原数组两两分组 组成新数组
      for (let i = 0; i < DataList.length; i++) {
        if (doubleArray && doubleArray.length === 2) {
          doubleArray = [];
        }
        doubleArray.push(DataList[i]);
        if (doubleArray && doubleArray.length === 2) {
          newArray.push(doubleArray);
        }
      }
    } else if (DataList.length === 1) {
      doubleArray.push(DataList[0]);
      newArray.push(doubleArray);
    }

    if (newArray.length > 1) {
      this.state.IsAdd = true;
    }
    this.state.CarouselArray = newArray;
    this.__UpdateRender();
    // if (newArray.length > 1) {
    // this.__SetInterval();
    // }
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ _Index: new Date().getTime() });
    }
  }

  /**
   * 轮播内容
   */
  __BuildHtml(styles) {
    const { CarouselArray, IsAdd } = this.state;
    if (!CarouselArray || !CarouselArray.length || CarouselArray.length === 0 || !CarouselArray[0]) {
      return null;
    }
    const __self = this;
    return CarouselArray.map((sub, inde) => {
      return (
        <div className={styles.ZdRollingDataBox + ' ' + (IsAdd ? styles.animation : '')} key={'Carousel_Array' + ' ' + inde}>
          {
            sub.map((item, index) => {
              return (
                <div className={styles.ZdRollingData} key={'ZdRolling_Data' + index}>
                  <ZdRollingData LabelText={item.LabelName} RightText={item.Title}
                    onClick={__self.__HandlerClick.bind(__self, item)} />
                </div>
              );
            })
          }
        </div>
      );
    });
  }
  render() {
    const styles = require('./scss/Carousel.scss');
    // const { IsAdd } = this.state;
    return (
      <div className={styles.carouselCss}>
        <div className={styles.iconTV}>
          <ZdIcon IconType="iconTV" />
        </div>
        <div className={styles.contentList}>
          <div className={styles.items}>
            {
              this.__BuildHtml(styles)
            }
          </div>

          <div onClick={() => {
            this.__NextData();
          }}> next page</div>
        </div>
      </div >
    );
  }
}
