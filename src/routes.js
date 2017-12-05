import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App, Default, Task, EditTask, Execute, ExecutivePeople, NotFound, GmessageView, GmessageBoard, GmessageDealt, SearchPage,
  DealtEdit, TaskAssign, ToGMessage, SelectRemind, SelectLabel, SelectExecutePlan, SelectRepeatWay, SelectWorkWay,
  YesterdayDealt, TaskRelated, RelationTask, SearchSuJi
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App} >
      <IndexRoute component={Task} />
      { /* 首页        */} <Route path="default" component={Default} />
      { /* 任务        */} <Route path="task" component={Task} />
      { /* 即信一览     */} <Route path="gmessageview" component={GmessageView} />
      { /* 即信看板     */} <Route path="gmessageboard" component={GmessageBoard} />
      { /* 即信待办     */} <Route path="gmessagedealt" component={GmessageDealt} />
      { /* 待办编辑     */} <Route path="dealtedit" component={DealtEdit} />
      { /* 转即信       */} <Route path="togmessage" component={ToGMessage} />
      { /* 昨天即信     */} <Route path="yesterdaydealt" component={YesterdayDealt} />
      { /* 选择标签     */} <Route path="selectlabel" component={SelectLabel} />
      { /* 选择提醒     */} <Route path="selectremind" component={SelectRemind} />
      { /* 选择执行计划 */} <Route path="selectexecuteplan" component={SelectExecutePlan} />
      { /* 选择重复方式 */} <Route path="selectrepeatway" component={SelectRepeatWay} />
      { /* 选择工作方式 */} <Route path="selectworkway" component={SelectWorkWay} />
      { /* 编辑任务     */} <Route path="edittask" component={EditTask} />
      { /* 参与人       */} <Route path="executivepeople" component={ExecutivePeople} />
      { /* 执行         */} <Route path="execute" component={Execute} />
      { /* 搜索页面     */} <Route path="searchpage" component={SearchPage} />
      { /* 任务分配     */} <Route path="taskassign" component={TaskAssign} />
      { /* 任务关联     */} <Route path="taskrelated" component={TaskRelated} />
      { /* 相关事务     */} <Route path="relationtask" component={RelationTask} />
      { /* 速记搜索     */} <Route path="searchsuji" component={SearchSuJi} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
