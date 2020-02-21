import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtForm, AtButton } from 'taro-ui';
import PropTypes from 'prop-types';
import FormItem from './FormItem';
import './form.less';

export default class DynamicForm extends Component {
  static propTypes = {
    elements: PropTypes.array.isRequired,
    submitBtnTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    elements: [],
    submitBtnTitle: '提交',
    onSubmit: () => {}
  };

  handleChange = (id, value) => {
    this.setState({
      [id]: value
    });
    return value;
  };

  handleSubmit = () => {
    const { elements } = this.props;
    const params = {};
    elements.forEach(({ id, value }) => {
      params[id] = this.state[id] || value;
    });
    this.props.onSubmit(params);
  };

  render() {
    const { elements, submitBtnTitle } = this.props;
    return (
      <AtForm className="form-container">
        {elements.map(({ label, id, required, ...rest }, index) => (
          <View className="form-control" key={index}>
            <Text>
              {label}
              {required ? <Text className="required">{'（必填）'}</Text> : null}
            </Text>
            <FormItem
              onChange={value => this.handleChange(id, value)}
              value={this.state[id]}
              {...rest}
            />
          </View>
        ))}
        <AtButton
          type="primary"
          onClick={this.handleSubmit}
          className="form-control"
        >
          {submitBtnTitle}
        </AtButton>
      </AtForm>
    );
  }
}
