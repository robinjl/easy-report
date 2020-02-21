import Taro, {Component} from '@tarojs/taro';
import { AtToast } from 'taro-ui';
import PropTypes from 'prop-types';

export default class Toast extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['success', 'error']).isRequired
  };

  static defaultProps = {
    type: 'success'
  };

  state = {
    isOpened: false
  };

  open() {
    this.setState({
      isOpened: true
    });
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({
          isOpened: false
        });
        resolve();
      }, 700);
    });
  }

  render() {
    const { type } = this.props;
    const text = type === 'success' ? '操作成功' : '操作失败';
    return (
      <AtToast
        isOpened={this.state.isOpened}
        text={text}
        duration={0}
        type={type}
      />
    );
  }
}
