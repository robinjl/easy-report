import Taro from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtInput, AtTextarea, AtIcon } from 'taro-ui';
import classnames from 'classnames';
import colors from '../../common/colors';
import './form.less'

const FormItem = ({ type, name, value, onChange }) => {
  if (type === 'input') {
    return <AtInput name={name} value={value} onChange={onChange} />;
  } else if (type === 'textarea') {
    return (
      <AtTextarea
        count
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    );
  } else if (type === 'date') {
    return (
      <Picker
        mode="date"
        value={value}
        onChange={event => onChange(event.detail.value.replace(/\//g, '-'))}
      >
        <View className={classnames('at-input', 'picker')}>
          <View>{value ? value : '请选择'}</View>
          <AtIcon value="chevron-right" size="25" color={colors.mediumgrey} />
        </View>
      </Picker>
    );
  }
};

export default FormItem;
