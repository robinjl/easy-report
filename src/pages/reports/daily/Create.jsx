import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { DynamicForm, Toast } from '../../../components';
import { createDailyReport } from '../../../common/services';
import { formatDate, queryCurrentUser } from '../../../common/utils';

export default class DailyCreate extends Component {
  handleSubmit(params) {
    queryCurrentUser().then(({ id }) => {
      createDailyReport({ ...params, user: id }).then(response => {
        if (response && response.id) {
          this.successToast.open().then(() => {
            Taro.navigateBack();
          });
        } else {
          this.errorToast.open();
        }
      });
    });
  }
  render() {
    const elements = [
      {
        id: 'time',
        label: '日期',
        type: 'date',
        showCurrentDate: true,
        value: formatDate(),
        required: true
      },
      {
        id: 'plan_of_today',
        label: '今日工作计划',
        type: 'input',
        required: true
      },
      {
        id: 'working_of_today',
        label: '今日工作内容',
        type: 'input',
        required: true
      },
      {
        id: 'plan_of_tomorrow',
        label: '明日工作计划',
        type: 'input',
        required: true
      },
      {
        id: 'output',
        label: '工作成果',
        type: 'input'
      },
      {
        id: 'unresolved',
        label: '待解决问题',
        type: 'textarea'
      }
    ];
    return (
      <View>
        <DynamicForm
          elements={elements}
          onSubmit={this.handleSubmit.bind(this)}
          submitBtnTitle="提交"
        />
        <Toast type={'success'} ref={ref => (this.successToast = ref)} />
        <Toast type={'error'} ref={ref => (this.errorToast = ref)} />
      </View>
    );
  }
}
