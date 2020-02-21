import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './form.less';

const ErrorMessage = ({ message }) => (
  <View>
    <Text className="error-message">{message}</Text>
  </View>
);

export default ErrorMessage;
