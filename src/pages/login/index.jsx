import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtMessage } from 'taro-ui';
import './login.less';
import { PROJECT_NAME } from '../../common/constants';
import { login } from '../../common/services';
import { setCurrentUser } from '../../common/utils';

export default class Login extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  onSubmit(event) {
    const { username, password } = this.state;
    if (username && password) {
      login({ username, password })
        .then(response => {
          if (response && response.status === 1) {
            const { id, real_name } = response.data;
            setCurrentUser({ id, real_name });
            Taro.navigateTo({
              url: '/pages/home/index'
            });
          } else {
            Taro.atMessage({
              message: response.msg,
              type: 'warning'
            });
          }
        })
        .catch(() => {
          Taro.atMessage({
            message: '服务器异常',
            type: 'error'
          });
        });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <View className="login-container">
        <View className="center">
          <View className="title">
            <Text>
              {PROJECT_NAME}
              <Text className="version">Beta</Text>
            </Text>
          </View>

          <AtMessage />

          <AtForm onSubmit={this.onSubmit.bind(this)}>
            <AtInput
              name="username"
              title="账号"
              type="text"
              placeholder=""
              value={username}
              onChange={this.handleChange.bind(this, 'username')}
            />
            <AtInput
              name="password"
              title="密码"
              type="password"
              placeholder=""
              value={password}
              onChange={this.handleChange.bind(this, 'password')}
            />
            <AtButton formType="submit" type="primary" className="submit-btn">
              登 录
            </AtButton>
          </AtForm>
        </View>
      </View>
    );
  }
}
