import Taro, { Component } from '@tarojs/taro';
import { AtList, AtListItem } from 'taro-ui';
import { Loading } from '../../../components';
import { readDailyReport } from '../../../common/services';

export default class DailyInfo extends Component {
  state = {
    loading: false,
    data: {}
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    const { id } = this.$router.params;
    readDailyReport(id).then(data => {
      this.setState({
        loading: false,
        data
      });
    });
  }

  config = {
    navigationBarTitleText: '日报详情'
  };

  render() {
    const { loading, data } = this.state;
    const {
      time,
      plan_of_today,
      working_of_today,
      plan_of_tomorrow,
      output,
      unresolved
    } = data;
    if (loading) {
      return <Loading />;
    }
    return (
      <AtList>
        <AtListItem title="日期" note={time} />
        <AtListItem title="今日工作计划" note={plan_of_today} />
        <AtListItem title="今日工作内容" note={working_of_today} />
        <AtListItem title="明日工作计划" note={plan_of_tomorrow} />
        <AtListItem title="工作成果" note={output} />
        <AtListItem title="待解决问题" note={unresolved} />
      </AtList>
    );
  }
}
