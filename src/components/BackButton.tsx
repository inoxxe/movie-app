import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icons from './Icons';
import {COLORS} from '../utils/constants';

type Props = {
  style?: ViewStyle;
  onPress?: () => void;
};

const BackButton = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[props.style, styles.button]}>
      <Icons.Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL} />
      {/* Icon color */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export default BackButton;
