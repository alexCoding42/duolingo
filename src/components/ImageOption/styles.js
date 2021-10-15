import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  optionContainer: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: 'lightgrey',
    borderRadius: 10,
    width: '48%',
    height: '48%',
    alignItems: 'center',
    padding: 10,
  },
  selectedContainer: {
    backgroundColor: '#81D5FE',
    borderColor: '#DDF4FE'
  },
  optionImage: {
    width: '100%',
    flex: 1,
  },
  optionText: {
    fontWeight: 'bold',
    color: 'black'
  },
  selectedText: {
    color: '#40BEF7',
    fontWeight: 'bold'
  }
});

export default styles;