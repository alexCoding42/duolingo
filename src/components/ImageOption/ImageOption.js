import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const ImageOption = ({ image, text, isSelected, onPress }) => (
  <Pressable onPress={onPress} style={[styles.optionContainer, isSelected ? styles.selectedContainer : {}]}>
    <Image
      style={styles.optionImage}
      resizeMode='contain'
      source={{
        uri: image,
      }}
    />
    <Text style={isSelected ? styles.selectedText : styles.optionText}>{text}</Text>
  </Pressable>
);

ImageOption.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
}

ImageOption.defaultProps = {
  text: 'Default',
  isSelected: true,
  onPress: () => {},
}

export default ImageOption;
