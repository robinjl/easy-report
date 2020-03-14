import Taro, { Component } from '@tarojs/taro';
import { AtList, AtListItem } from 'taro-ui';
import { Loading, Empty } from '../../components';
import { queryDailyReportStatistics } from '../../common/services';
import { groupBy } from '../../common/utils';

export default class Statistics extends Component {
  state = {
    loading: false,
    data: []
  };

  componentDidMount() {
    queryDailyReportStatistics().then(response => {
      if (response && response.status === 1) {
        const { data } = response;
        const { total, list } = data;
        const groups = groupBy(list, 'time');
        // { '2020-02-20': 1, '2020-02-19': 2} => [{time: '2020-02-20', count: 1, total: 10}, ...]
        const formatData = Object.entries(groups).map(([key, value]) => ({
          time: key,
          count: value,
          total
        }));
        this.setState({ data: formatData });
      }
    });
  }

  config = {
    navigationBarTitleText: '日报统计'
  };

  onClick = time => {
    Taro.navigateTo({
      url: `/pages/statistics/detail?time=${time}`
    });
  };

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (data.length === 0) {
      return <Empty />;
    }
    return (
      <AtList>
        {data.map(item => {
          const { id, time, count, total } = item;
          return (
            <AtListItem
              key={id}
              title={time}
              note={`${count}/${total}`}
              arrow="right"
              onClick={() => this.onClick(time)}
            />
          );
        })}
      </AtList>
    );
  }
}
