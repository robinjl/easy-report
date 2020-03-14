import Taro from '@tarojs/taro';
import { AtInput, AtTextarea } from 'taro-ui';
import DatePicker from './Datepicker';

const FormItem = ({ type, name, value, onChange }) => {
  if (type === 'input') {
    return (
      <AtInput
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  } else if (type === 'textarea') {
    return (
      <AtTextarea
        count
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    );
  } else if (type === 'date') {
    return <DatePicker onChange={onChange} value={value} />;
  }
};

export default FormItem;
