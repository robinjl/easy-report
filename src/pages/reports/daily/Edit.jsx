import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import DynamicForm from '../../../components/Form/DynamicForm';

export default class DailyEdit extends Component {
  handleSubmit() {
    // api create or update
  }
  render() {
    const elements = [
      {
        type: 'input',
        label: '今日工作计划',
        required: true,
        name: 'plan-of-today',
        value: '',
      },
      {
        type: 'textarea',
        label: '今日工作内容',
        name: 'working-of-today',
        value: ''
      }
    ];
    return (
      <View>
        <DynamicForm
          elements={elements}
          onSubmit={this.handleSubmit.bind(this)}
          submitBtnTitle="提交"
        />
      </View>
    );
  }
}
