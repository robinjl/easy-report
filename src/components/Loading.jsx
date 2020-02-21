import Taro from '@tarojs/taro';
import { AtToast } from 'taro-ui';

const Loading = () => <AtToast isOpened status="loading" duration={0} text="加载中..." />;

export default Loading;
