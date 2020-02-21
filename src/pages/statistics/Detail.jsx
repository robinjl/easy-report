import Taro, { Component } from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import { queryDailyReports } from '../../common/services';
import { Loading } from '../../components';
import './statistics.less';

export default class StatisticDetail extends Component {
  state = {
    loading: false,
    data: []
  };
  componentDidMount() {
    const { time } = this.$router.params;
    queryDailyReports({ time }).then(response => {
      if (response && Array.isArray(response) && response.length) {
        const data = response.sort((a, b) => a.weight - b.weight);
        this.setState({
          data
        });
      }
    });
  }

  render() {
    const { loading, data } = this.state;
    const { time } = this.$router.params;
    if (loading) {
      return <Loading />;
    }
    return (
      <ScrollView scrollX className="table">
        <View>
          <Text>日期：{time}</Text>
        </View>
        <View className="row">
          <View className="table-cell">序号</View>
          <View className="table-cell">姓名</View>
          <View className="table-cell">今日工作计划</View>
          <View className="table-cell">今日工作内容</View>
          <View className="table-cell">明日工作计划</View>
          <View className="table-cell">工作成果</View>
          <View className="table-cell">待解决问题</View>
        </View>
        {data.map(
          (
            {
              real_name,
              plan_of_today,
              working_of_today,
              plan_of_tomorrow,
              output,
              unresolved
            },
            index
          ) => (
            <View key={index} className="row">
              <View className="table-cell">{index + 1}</View>
              <View className="table-cell">{real_name}</View>
              <View className="table-cell">{plan_of_today}</View>
              <View className="table-cell">{working_of_today}</View>
              <View className="table-cell">{plan_of_tomorrow}</View>
              <View className="table-cell">{output}</View>
              <View className="table-cell">{unresolved}</View>
            </View>
          )
        )}
      </ScrollView>
    );
  }
}
