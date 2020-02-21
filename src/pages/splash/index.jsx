import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import logo from '../../assets/images/logo.png';
import { PROJECT_NAME } from "../../common/constants";
import './splash.less';

function Splash() {
  return (
    <View className='splash-container'>
      <Image src={logo} className='logo' />
      <Text>{PROJECT_NAME}</Text>
    </View>
  )
}

export default Splash;
