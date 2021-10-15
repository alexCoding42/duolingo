import React from 'react';
import { Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Button = ({ text, onPress, disabled }) => {
  return (
    <Pressable
      style={[styles.container, disabled ? styles.disabledContainer : {}]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onPress: () => {},
  disabled: false,
};

export default Button;
