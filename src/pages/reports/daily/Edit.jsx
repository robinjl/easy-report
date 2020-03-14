import Taro, { Component } from '@tarojs/taro';
import {DynamicForm} from '../../../components';

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
        <DynamicForm
          elements={elements}
          onSubmit={this.handleSubmit.bind(this)}
          submitBtnTitle="提交"
        />
    );
  }
}
