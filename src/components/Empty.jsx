import Taro  from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import '../global.less'

export default function Empty(){
  return (
    <View className='center'>
      <Text>暂无数据</Text>
    </View>
  )
}