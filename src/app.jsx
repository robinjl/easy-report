import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import { queryCurrentUser } from './common/utils';
import colors from './common/colors';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {
    setTimeout(this.redirect, 0);
  }

  redirect() {
    queryCurrentUser()
      .then(({ id }) => {
        if (id) {
          Taro.switchTab({
            // url: '/pages/home/index'
            url: '/pages/reports/daily/list'
          });
        } else {
          Taro.redirectTo({
            url: '/pages/login/index'
          });
        }
      })
      .catch(() => {
        Taro.redirectTo({
          url: '/pages/login/index'
        });
      });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      'pages/splash/index',
      'pages/login/index',
      'pages/home/index',
      'pages/reports/daily/list',
      'pages/reports/daily/create',
      'pages/reports/daily/edit',
      'pages/reports/daily/info',
      'pages/reports/weekly/list',
      'pages/statistics/index',
      'pages/statistics/detail',
      'pages/my/index',
      'pages/my/settings',
      'pages/my/about'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#108ee9',
      navigationBarTitleText: '日报小程序',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      textColor: colors.lightgrey, // 标签字体颜色
      selectedColor: '#108ee9', // 选中标签字体颜色
      list: [
        {
          // pagePath: 'pages/home/index',
          pagePath: 'pages/reports/daily/list',
          text: '主页',
          iconPath: 'assets/images/home_unselect.png',
          selectedIconPath: 'assets/images/home_select.png'
        },
        {
          pagePath: 'pages/statistics/index',
          text: '统计',
          iconPath: 'assets/images/statistics_unselect.png',
          selectedIconPath: 'assets/images/statistics_select.png'
        },
        {
          pagePath: 'pages/my/index',
          text: '我的',
          iconPath: 'assets/images/my_unselect.png',
          selectedIconPath: 'assets/images/my_select.png'
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return;
  }
}

Taro.render(<App />, document.getElementById('app'));
