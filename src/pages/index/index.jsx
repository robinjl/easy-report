import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton, AtTabBar } from 'taro-ui';
import './index.less';
import { queryCurrentUser } from '../../common/utils';

export default class Index extends Component {
  state = {
    current: 0
  };

  componentWillMount() {}

  componentDidMount() {
    // Taro.getStorage({
    //   key: 'userId',
    //   success: (res) => {
    //     this.setState({
    //       userId: res.data
    //     });
    //   }
    // });
    queryCurrentUser().then(response => {
      this.setState({
        userId: response.id
      });
    });

    // Taro.redirectTo({
    //   url: '/pages/home/index'
    // })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}


  onLogout() {
    Taro.navigateBack();
  }

  handleClick(value){
    this.setState({
      current: value
    })
  }

  config = {
    navigationBarTitleText: '首页',
  };

  render() {
    return (
      <View className="index">
        <Text>Hello world! {this.state.userId}</Text>
        <AtButton onClick={this.onLogout.bind(this)}>退出</AtButton>
        {/*<AtTabBar*/}
        {/*  tabList={[*/}
        {/*    { title: '主页', iconType: 'home' },*/}
        {/*    { title: '统计', iconType: 'file-generic'},*/}
        {/*    { title: '我的', iconType: 'user' }*/}
        {/*  ]}*/}
        {/*  onClick={this.handleClick.bind(this)}*/}
        {/*  current={this.state.current}*/}
        {/*  fixed*/}
        {/*/>*/}
      </View>
    );
  }
}
