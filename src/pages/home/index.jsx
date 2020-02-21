import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './home.less';

export default class Home extends Component {
  config = {
    navigationBarTitleText: '主页'
  };

  handleClick(flag) {
    Taro.navigateTo({
      url: flag === 1 ? '/pages/reports/daily/list' : '/pages/reports/weekly/list'
    });
  }

  render() {
    return (
      <View className="container">
        <View onClick={this.handleClick.bind(this, 1)} className="btn">
          <Text className="text">日报</Text>
        </View>
        <View onClick={this.handleClick.bind(this, 2)} className="btn">
          <Text className="text">周报</Text>
        </View>
      </View>
    );
  }
}
