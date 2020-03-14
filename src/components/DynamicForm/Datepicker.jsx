import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtCalendar, AtModal, AtModalContent, AtModalAction } from 'taro-ui';
import PropTypes from 'prop-types';
import './datepicker.less';

export default class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    onChange: () => {}
  };

  state = {
    isOpened: false,
    currentValue: this.props.value,
  };

  openModal = () => {
    this.setState({
      isOpened: true
    });
  };

  handleDatePicker = ({ value }) => {
    this.setState({
      tempValue: value
    });
  };

  closeModal = flag => {
    if (flag === 0) {
      this.setState({
        isOpened: false
      });
    } else {
      const value = this.state.tempValue;
      this.setState({
        isOpened: false,
        currentValue: value
      });
      this.props.onChange(value);
    }
  };

  render() {
    const { isOpened, currentValue } = this.state;
    return (
      <View>
        <View onClick={this.openModal}>
          <Text className="text">{currentValue}</Text>
        </View>
        <AtModal isOpened={isOpened}>
          <AtModalContent>
            <AtCalendar onDayClick={this.handleDatePicker} />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={() => this.closeModal(0)}>取消</Button>
            <Button onClick={() => this.closeModal(1)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}
