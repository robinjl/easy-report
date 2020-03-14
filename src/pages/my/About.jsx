import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

export default class About extends Taro.Component {
  config = {
    navigationBarTitleText: '关于'
  };

  render() {
    const data = [
      {
        version: '1.0.0',
        content: ['新增功能：提交日报', '新增功能：日报统计'],
        date: '2020-02-24'
      }
    ];

    return (
      <View>
        {data.map(edition => {
          const { version, content, date } = edition;
          return (
            <View key={version} className="at-article">
              <Text className="at-article__h2">{version}</Text>
              <View>
                {content.map((item, index) => (
                  <View key={index}>
                    <Text className="at-article__p">{item}</Text>
                  </View>
                ))}
              </View>
              <Text className="at-article__p">{date}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
