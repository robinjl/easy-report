import Taro from '@tarojs/taro';
import { AtInput, AtTextarea } from 'taro-ui';
import DatePicker from './Datepicker';

const FormItem = ({ type, value, onChange }) => {
  switch (type) {
    case 'date':
      return <DatePicker onChange={onChange} value={value} />;
    case 'input':
      return (
        <AtInput
          // title={label}
          type="text"
          value={value}
          onChange={onChange}
        />
      );
    case 'textarea':
      return (
        <AtTextarea
          count
          // placeholder={label}
          value={value}
          onChange={event => onChange(event.target.value)}
        />
      );
    default:
      return null;
  }
};

export default FormItem;
