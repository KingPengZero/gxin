import superagent from 'superagent';
import config from '../config';
import Utility from '../Common/Utility';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const _ApiUrl = config.ServerAPI + adjustedPath;
  return _ApiUrl;
}

export default class ApiClient {

  API = {
    TestDemo: '/gundamlist', // 测试
    /**
     * get 获取会议群组详情
     * -------------------------------------参入的参数---------------------------------------------
     * name(字段名称)       type(类型)   Required(是否是必须的)    description(描述)
     * token                String       true                     icome口令
     * pgIndex              int          false                    分页起始页
     * pgCount              int          false                    分页容量
     */
    TaskDetail: '/task/tasks/view/{0}',
    /**
    * 创建者修改会议状态
    * put
    * * -------------------------------------参入的参数---------------------------------------------
    * conId 会议Id  group_id    token
    */
    EditTask: '/task/tasks/edit/{0}',
    /**
     * 执行者修改会议状态
     * put
     * * -------------------------------------参入的参数---------------------------------------------
     * conId 会议Id  group_id    token
     */
    ExtEditTask: '/task/tasks/user/{0}',
    /**
    * 执行者修改会议状态list
    * get
    * * -------------------------------------参入的参数---------------------------------------------
    * conId 会议Id  group_id    token
    */
    ExtList: '/task/tasks/user/{0}',
    /**
    * 获取回复列表
    * get
    * * -------------------------------------参入的参数---------------------------------------------
    * conId     token
    */
    GetReplyList: '/task/tasks/reply',
    /**
    * 获取上下文列表
    * get
    * * -------------------------------------参入的参数---------------------------------------------
    * conId     token
    */
    GetContextList: '/task/tasks/context',

    /**
     * 通用的方法。
     */
    Common: {
      LoginInfo: '/login',
      /**
      * get 获取系统当前时间       httptoken
      * ----------------------------------------------------------------------------------
      * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述) 
      * token                string             否                        用户令牌
      * 
      */
      SystemTimes: '/systemTimes',
    },
    /**
     * 即信一览
     */
    Task: {
      /**
       * get 获取任务列表       httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * token                string             否                        用户令牌
       * pg_index             int                否                        页码                    
       * pg_count             int                否                        每页记录数量
       * 
       * @url /tasks?token=jsdkahskajdska&pg_index=0&pg_count=15
       */
      TaskLists: '/task/tasks',
      /**
       * get 历史记录       httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * token                string             否                        用户令牌
       * pg_index             int                否                        页码                    
       * pg_count             int                否                        每页记录数量
       * 
       * @url /tasks?token=jsdkahskajdska&pg_index=0&pg_count=6
       */
      HistoryList: '/task/tasks/search',
      /**
       * get 获取当前相关事务列表  httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * p_id                 long               否                        父任务ID
       * pg_index             int                否                        页码                    
       * pg_count             int                否                        每页记录数量
       * 
       * @url /tasks?token=jsdkahskajdska&pg_index=0&pg_count=15
       */
      Relationtask: '/task/tasksview',
      /**
       * get 获取全部相关事务列表  httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * p_id                 long               否                        父任务ID
       * pg_index             int                否                        页码                    
       * pg_count             int                否                        每页记录数量
       * 
       * @url /tasks?token=jsdkahskajdska&pg_index=0&pg_count=15
       */
      AllRelationtask: '/task/tasksview/all',
      /**
       * put 关联任务         httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * super_uuid           string             否                        父任务ID
       * child_uuid           string             否                        子任务ID                    
       * type	                int             否                        是否关联(0/1)
       * 
       * @url /tasks?token=jsdkahskajdska&pg_index=0&pg_count=15
       */
      Relation: '/task/tasks/relation',
      /**
       * get 
       * -------------------------------------------------------
       * 
       * @url /tasks/view/{id}
       */
      Detail: '/task/tasks/view/{0}',
      /**
       * 获取执行计划列表数据
       * get 
       * -------------------------------------------------------
       * 
       * @url task/tasks/execplans
       */
      Execplans: 'task/tasks/execplans'
    },
    /**
     * 即信看板
     */
    JXKB: {
      /**
       * get 我的统计       httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * token                string             否                        用户令牌
       * type                 string             否                        @wo/wo@                    
       * status               Array              否                        状态集合
       * 
       * @url
       */
      TaskTotal: '/task/tasks/total',
      /**
       * get 任务分配       httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * token                string             否                        用户令牌
       * status               Array              否                        状态集合
       * pg_index             int                否                        页码                    
       * pg_count             int                否                        每页记录数量
       * 
       * @url
       */
      TaskAssigns: '/task/tasks/look',
    },
    JXDB: {
      /**
       * 待办列表
       */
      ToDoList: '/todo/todo/list',
      /**
       * 一键存档
       */
      ToBackup: '/todo/tobackup',
      /**
       * 待办详情
       */
      Detail: '/todo/details/{0}',
      /**
       * 建立待办
       */
      Add: '/todo/create',
      /**
       * get 存档列表
       * 
       */
      BackupList: '/todo/backup/list',
      /**
       * POST 转G信
       * ------------------------
       * POST /todo/togxin/{id}
       */
      ToGxin: '/todo/togxin/{0}',
      /**
       * post 转G信--完成状态
       * -------------------------
       * POST /todo/tofinish/{id}
       */
      ToGxinFinish: '/todo/tofinish/{0}',
      /**
       * post  编辑 转G信
       * --------------------------------------------
       * id:
       * content:
       * @url /todo/edit2/{id}
       */
      ToGxinEdit: '/todo/edit2g/{0}',
      /**
       * post  编辑 转G信--完成状态
       * --------------------------------------------
       * @url /todo/edit2finish/{id}
       */
      ToGxinFinishEdit: '/todo/edit2finish/{0}',
      /**
       * get  速记详情上下文    httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * token                string             否                        用户令牌
       * todo_id              num                是                        任务ID
       * pg_index             int                否                        页码                    
       * pg_count             int                否                        每页记录数量
       * 
       * @url  /todo/tasks/context?todo_id=
       */
      GxinDetailContent: '/todo/tasks/context',
      /**
       * get  速记详情上下文    httptoken
       * ----------------------------------------------------------------------------------
       * name(字段名称)       type(类型)         Required(是否是必须的)     description(描述)    
       * token                string             否                        用户令牌
       * 
       * @url  /todo/labels
       */
      TodoLabels: '/todo/labels',
    },
    Schedule: {
      Add: '/schedule/create',
      /**
       * put 复制
       * -------------------------------------------------
       * 
       * @url /schedule/copy/{uuid}
       */
      Copy: '/schedule/copy/{0}',
    },
    Meeting: {
      /**
       * post  创建晨会
       * --------------------------------------------
       * @url //task/tasks/meeting/{group}
       */
      AddMeeting: '/task/tasks/meeting/{0}',
      /**
       * post 创建晨会子任务
       * ---------------------------------------
       * @example [
       *   {content: '任务1', execPlan: 'MORNING'},
       *   {content: '任务2', execPlan: 'MORNING'},
       *   ,...]
       */
      AddSubMeeting: '/task/tasks/meeting?uuid={0}',
      /**
       * put  编辑晨会
       * --------------------------------------------
       * @url //task/tasks/meeting/{group}
       */
      // EditMeeting: '/task/tasks/meeting/{0}',
      EditMeeting: '/task/tasks/edit/{0}',
      /**
       * get 查看晨会详情
       * --------------------------------------------
       * @url //task/tasks/meeting/{group}
       */
      MeetingDetail: '/task/tasks/meeting/{0}/new',
      /**
       * post 添加人员
       * --------------------------------------------
       * @url //task/tasks/{uuid}/user
       */
      AddPeople: '/task/tasks/{0}/user',
      /**
       * put 删除人员
       * --------------------------------------------
       * @url //task/tasks/{uuid}/user
       */
      deletePeople: '/task/tasks/{0}',
      /* get 获取列表
      * ----------------------------------------
      */
      MettingList: '/task/tasksmeeting',
      /**
       * put 修改状态。
       * -------------------------------------
       * id
       * token
       * status
       * /task/edit/{id}
       */
      UpdateMeetingStatus: '/task/tasks/edit/{0}',
      /**
       * put 修改状态。
       * -------------------------------------
       * /task/taskstifiers/{uuid}
       */
      Notifle: '/task/tasks/notifiers/{0}',
      /* get 创建子任务是否有权限
       * ----------------------------------------
       * token
       * uuid
       */
      YanzMeet: '/task/tasks/validation'

    }
  }

  ErrorCode = {
    '200': '请求成功',
    '400': '请求参数错误',
    '401': '未授权',
    '403': '禁止访问',
    '404': '请求资源未找到',
    '500': '服务器内部错误',
    '11001': '数据源不存在',
  }

  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { isSelfUrl, params, data } = {}) => new Promise((resolve, reject) => {
        // const __path_index = path.indexOf('/todo/');
        // const __newPath = 'http://172.20.95.41:11509' + path;
        // const request = superagent[method](__path_index >= 0 ? __newPath : formatUrl(path));
        const request = superagent[method](!!isSelfUrl ? path : formatUrl(path));
        const token = Utility.getContent(Utility.constItem.Token);
        const _p = Object.assign({}, params || {}, {
          token: token
        });
        request.query(_p);
        if (isSelfUrl) {
          request.type('form');
          request.accept('application/json');
        }
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        /**
         * 错误处理及提示
         *
         * @param {any} err
         */
        function __ProcessError(err, body, __req) {
          try {
            Utility.$loadingHide();
            if (err.status) {
              if (Utility.constItem.Events.HttpStatus[err.status]) {
                // 删除loading
                if (err.status === 400 && Utility.constItem.Events.HttpStatus[__req.status]) {
                  Utility.$emit(Utility.constItem.Events.HttpStatus[__req.status], err, body);
                } else {
                  Utility.$emit(Utility.constItem.Events.HttpStatus[err.status], err, body);
                }
              }
            } else if (!!err.crossDomain) {
              Utility.$actionSheet('与服务器连接中断...');
            } else if (err.message && err.message !== '') {
              Utility.$actionSheet(err.message);
            }
          } catch (ex) {
            console.log(ex);
          }
        }

        function __SendRequest(_request) {
          _request.end((err, Request) => {
            const { body } = Request || {};
            if (err) {
              __ProcessError(err, body, Request);
              reject(body || err);      // reject-->拒绝; resolve-->解决
            } else {
              if (!body) {
                Utility.$emit(Utility.constItem.Events.HttpStatus[Request.status],
                  { status: Request.status, msg: '处理成功' }, Request);
              }
              resolve(body);
            }
          });
        }

        try {
          // 获取用户信息
          const __ConfigInfo = Utility.getContent(Utility.constItem.SaveUserConfigInfo);
          if (__ConfigInfo) {
            const { Authorization } = __ConfigInfo;
            if (Authorization) {
              request.header.Authorization = Authorization;
            }
            __SendRequest(request);
          } else {
            __SendRequest(request);
          }
        } catch (ex) {
          console.log(ex);
        }
      }));
  }
  empty() {
  }
}
