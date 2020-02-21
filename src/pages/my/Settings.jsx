import Taro from '@tarojs/taro';
import {View, Text} from '@tarojs/components';

function Settings(){
  return (
    <View style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <Text>设置页面</Text>
    </View>
  )
}

export default Settings;
