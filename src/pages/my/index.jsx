import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtButton, AtAvatar } from 'taro-ui';
import { queryCurrentUser } from '../../common/utils';
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
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
            onClick={() => this.onClick('settings')}
          />
          <AtListItem
            title="关于"
            arrow="right"
            thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
            onClick={() => this.onClick('about')}
          />
        </AtList>

        <AtButton
          type="primary"
          onClick={this.onLogout.bind(this)}
          className="logout-btn"
        >
          退出
        </AtButton>
      </View>
    );
  }
}
