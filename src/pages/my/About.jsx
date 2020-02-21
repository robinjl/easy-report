import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import {PROJECT_NAME} from '../../common/constants';

function About() {
  const data = [
    {
      version: '1.0.0',
      content: ['新增功能：提交日报', '新增功能：日报统计'],
      date: '2020-02-24'
    }
  ];
  return (
    <View>
      <View style={{margin: 15}}>
        <Text>{PROJECT_NAME}</Text>
      </View>
      {data.map(({ version, content, date }) => {
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

export default About;
