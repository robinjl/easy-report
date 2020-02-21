import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtFab } from 'taro-ui';
import { queryDailyReports } from '../../../common/services';
import { queryCurrentUser } from '../../../common/utils';
import { Loading } from '../../../components';
import '../reports.less';

export default class DailyList extends Component {
  state = {
    loading: false,
    data: []
  };
  componentDidMount() {
    queryCurrentUser().then(({ id }) =>
      queryDailyReports({id}).then(response => {
        this.setState({
          data: response
        });
      })
    );
  }

  onButtonClick = id => {
    const url =
      typeof id === 'number'
        ? `/pages/reports/daily/info?id=${id}`
        : '/pages/reports/daily/create';
    Taro.navigateTo({
      url
    });
  };

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <View>
        <AtList>
          {data.map(item => (
            <AtListItem
              title={item.time}
              note={`今日工作内容：${item.working_of_today}`}
              arrow="right"
              onClick={() => this.onButtonClick(item.id)}
            />
          ))}
        </AtList>

        <View className="float-btn">
          <AtFab onClick={this.onButtonClick}>
            <Text className="at-fab__icon at-icon at-icon-edit"></Text>
          </AtFab>
        </View>
      </View>
    );
  }
}
