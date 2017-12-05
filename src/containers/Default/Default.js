/**
 * Created by admin on 2016-09-21.
 */
import React, { Component, PropTypes } from 'react';
import { Utility, DefHref, Scroll } from 'components';
import { connect } from 'react-redux';
import * as CommonActions from 'redux/modules/reduxCommon';

@connect(
  state => ({
    Title: state.Common.Title,                                          // 标题
    UrlParams: state.Common.UrlParams,                                 // URL参数
    IComConfig: state.Common.IComConfig,                                // 配置信息
  }),
  { ...CommonActions })
export default class Default extends Component {
  static propTypes = {
    Title: PropTypes.string,                                              // 标题
    UrlParams: PropTypes.object,                                         // url 参数
    IComConfig: PropTypes.object,                                        // 配置信息
  };

  constructor(props) {
    super(props);

    this.state = { RefreshComplete: true, NextDataComplete: true, UA: navigator.userAgent };
    this.state.ScrollData = [];
  }

  componentDidMount() {
    const { } = Utility;
    this.state.IsMount = true;
    this.__HandlerRefresh();
  }

  componentWillUnmount() {
    delete this.state.IsMount;
  }

  __InitScrollData(pageIndex) {
    const _size = 10;
    for (let i = pageIndex * _size; i < (pageIndex + 1) * _size; i++) {
      this.state.ScrollData.push({ id: i + 1 });
    }

    setTimeout(() => {
      this.state.NextDataComplete = true;
      this.state.RefreshComplete = true;
      this.__UpdateRender();
    }, 3000);
  }

  __HandlerNextPage() {
    this.state.ScrollPageSize++;
    this.state.NextDataComplete = false;
    this.__UpdateRender();
    this.__InitScrollData(this.state.ScrollPageSize);
  }

  __HandlerRefresh() {
    this.state.ScrollPageSize = 0;
    this.state.ScrollData = [];
    this.state.RefreshComplete = false;
    this.__UpdateRender();
    this.__InitScrollData(this.state.ScrollPageSize);
  }

  /**
   * 更新渲染
   */
  __UpdateRender() {
    if (!!this.state.IsMount) {
      this.setState({ __CurrentTempDate: new Date().getTime() });
    }
  }
  __HandlerBtn() {
    Utility.$actionSheetBtns([
      {
        Title: 'button1', onClick: () => {
          console.log('--------btn1------');
          Utility.$actionSheetHide();
        }
      },
      {
        Title: 'button1', onClick: () => {
          console.log('--------btn1------');
          Utility.$actionSheetHide();
        }
      }
    ]);
  }
  render() {
    const styles = require('./scss/Default.scss');
    const { RefreshComplete, NextDataComplete, ScrollData } = this.state;
    return (
      <div className={styles.defaultCss}>
        <button onClick={this.__HandlerBtn.bind(this)}>弹出button groups</button>
        <DefHref />

        <div className={styles.scroll}>
          <Scroll RefreshComplete={RefreshComplete} NextDataComplete={NextDataComplete}
            onRefresh={this.__HandlerRefresh.bind(this)}
            onNextData={this.__HandlerNextPage.bind(this)}
          >
            {
              ScrollData.map((row, index) => <div key={index} className={styles.row}>{row.id}</div>)
            }
          </Scroll>
        </div>
      </div>
    );
  }
}

