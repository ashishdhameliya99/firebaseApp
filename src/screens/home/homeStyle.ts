import { StyleSheet } from 'react-native';
import { color } from '../../utils/color';
import fontFamilies from '../../assets/fonts/font';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamilies.poppins.bold,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: color.orange,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: color.white,
    fontFamily: fontFamilies.poppins.Regular,
  },
});
