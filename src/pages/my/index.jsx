import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtList, AtListItem, AtAvatar } from 'taro-ui';
import { queryCurrentUser } from '../../common/utils';
import icon_about from '../../assets/images/icon_about.png';
import icon_setting from '../../assets/images/icon_setting.png';
import './my.less';

export default class My extends Component {
  componentDidMount() {
    queryCurrentUser().then(({ id, real_name }) => {
      this.setState({
        id,
        real_name
      });
    });
  }

  config = {
    navigationBarTitleText: '我的'
  }


  onClick = route =>
    Taro.navigateTo({
      url: `/pages/my/${route}`
    });

  onLogout() {
    Taro.clearStorage();
    Taro.redirectTo({
      url: '/pages/login/index'
    });
  }

  render() {
    const { id, real_name } = this.state;
    return (
      <View className="my-container">
        <View className="header">
          <AtAvatar circle></AtAvatar>
          <View className="name">
            <Text>{real_name}</Text>
          </View>
        </View>

        <AtList>
          <AtListItem
            title="设置"
            arrow="right"
            thumb={icon_setting}
            onClick={() => this.onClick('settings')}
          />
          <AtListItem
            title="关于"
            arrow="right"
            thumb={icon_about}
            onClick={() => this.onClick('about')}
          />
        </AtList>

        <Button
          type="primary"
          onClick={this.onLogout.bind(this)}
          className="logout-btn"
        >
          退出
        </Button>
      </View>
    );
  }
}
