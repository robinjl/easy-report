import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtForm } from 'taro-ui';
import PropTypes from 'prop-types';
import { IS_FORM_PRODUCTION } from '../../common/env';
import FormItem from './FormItem';
import './form.less';

export default class DynamicForm extends Component {
  static propTypes = {
    elements: PropTypes.array.isRequired,
    submitBtnTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  static defaultProps = {
    elements: [],
    submitBtnTitle: '提交',
    onSubmit: () => {},
    loading: false
  };

  componentDidMount() {
    // 表单字段初始值
    const { elements } = this.props;
    for (let elem of elements) {
      this.setState({
        [elem.key]: elem.initValue
      });
    }
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
    return value;
  };

  handleSubmit = () => {
    const { elements } = this.props;
    const params = {};
    // 表单必填项及正则验证
    for (let elem of elements) {
      const { key, label, pattern, required } = elem;
      const value = this.state[key];
      if (IS_FORM_PRODUCTION && required) {
        if (!value || !value.trim()) {
          Taro.showToast({
            icon: 'none',
            title: `请填写${label}`
          });
          break;
        } else if (pattern && !pattern.test(value)) {
          Taro.showToast({
            icon: 'none',
            title: `请填写正确的${label}`
          });
          break;
        }
      }
      params[key] = value;
    }

    // 这里的判断比较脆弱
    if (Object.keys(params).length === elements.length) {
      this.props.onSubmit(params);
    }
  };

  render() {
    const { elements, submitBtnTitle, loading } = this.props;
    return (
      <AtForm className="form-container">
        {elements.map(item => {
          const { key, label, required, ...rest } = item;
          return (
            <View className="form-control" key={key}>
              <Text className="form-label">
                {label}
                {required ? (
                  <Text className="required">{'（必填）'}</Text>
                ) : null}
              </Text>
              <FormItem
                onChange={value => this.handleChange(key, value)}
                value={this.state[key]}
                name={key}
                {...rest}
              />
            </View>
          );
        })}
        <Button
          type="primary"
          loading={loading}
          onClick={this.handleSubmit}
          className="form-control"
        >
          {submitBtnTitle}
        </Button>
      </AtForm>
    );
  }
}
