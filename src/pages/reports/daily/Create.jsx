import Taro, { Component } from '@tarojs/taro';
import { DynamicForm } from '../../../components';
import { createDailyReport } from '../../../common/services';
import { formatDate, queryCurrentUser } from '../../../common/utils';

export default class DailyCreate extends Component {
  state = {
    loading: false
  }

  config = {
    navigationBarTitleText: '新建日报'
  }

  handleSubmit(params) {
    queryCurrentUser().then(({ id }) => {
      this.setState({loading: true})
      createDailyReport({ ...params, user: id }).then(response => {
        this.setState({loading: false})
        if (response && response.id) {
         Taro.showToast({
           icon: 'success',
           title: '新建成功'
         });
         this.timer = setTimeout(()=>Taro.navigateBack(), 1500);
        } else {
          Taro.showToast({
            icon: 'none',
            title: '新建失败'
          });
        }
      });
    });
  }
  render() {
    const elements = [
      {
        key: 'time',
        label: '日期',
        type: 'date',
        initValue: formatDate(),
        required: true
      },
      {
        key: 'plan_of_today',
        label: '今日工作计划',
        type: 'input',
        required: true
      },
      {
        key: 'working_of_today',
        label: '今日工作内容',
        type: 'input',
        required: true
      },
      {
        key: 'plan_of_tomorrow',
        label: '明日工作计划',
        type: 'input',
        required: true
      },
      {
        key: 'output',
        label: '工作成果',
        type: 'input'
      },
      {
        key: 'unresolved',
        label: '待解决问题',
        type: 'textarea'
      }
    ];
    return (
        <DynamicForm
          elements={elements}
          onSubmit={this.handleSubmit.bind(this)}
          submitBtnTitle="提交"
          loading={this.state.loading}
        />
    );
  }
}
