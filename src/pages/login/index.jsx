import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtForm, AtInput } from 'taro-ui';
import { PROJECT_NAME } from '../../common/constants';
import { login } from '../../common/services';
import { setCurrentUser } from '../../common/utils';
import './login.less';

export default class Login extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      username: '',
      password: '',
      loading: false
    };
  }

  config = {
    navigationBarTitleText: '登录'
  };

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  onSubmit() {
    const { username, password } = this.state;
    if (username && password) {
      this.setState({ loading: true });
      login({ username, password })
        .then(response => {
          this.setState({ loading: false });
          if (response && response.status === 1) {
            const { id, real_name } = response.data;
            setCurrentUser({ id, real_name });
            Taro.switchTab({
              // url: '/pages/home/index',
              url: '/pages/reports/daily/list'
            });
          } else {
            Taro.showToast({
              icon: 'none',
              title: response.msg
            });
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          Taro.showToast({
            icon: 'none',
            title: '服务器异常'
          });
        });
    }
  }

  render() {
    const { username, password, loading } = this.state;
    return (
      <View className="login-container">
        <View className="title">
          <Text>{PROJECT_NAME}</Text>
        </View>

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
            onConfirm={this.onSubmit.bind(this)}
          />
          <Button
            loading={loading}
            formType="submit"
            type="primary"
            className="submit-btn"
          >
            登 录
          </Button>
        </AtForm>
      </View>
    );
  }
}
