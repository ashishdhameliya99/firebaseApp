import { StyleSheet } from 'react-native';
import { hp, wp } from '../../constants/ResponsiveUI';
import { color } from '../../utils/color';
import fontFamilies from '../../assets/fonts/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
  },

  input: {
    width: '100%',
    height: hp(50),
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 8,
    paddingHorizontal: wp(15),
    backgroundColor: color.liteWhite,
    marginBottom: hp(10),
    fontFamily: fontFamilies.poppins.Regular,
  },

  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: color.liteWhite,
    height: 50,
  },

  codeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    height: 50,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
    fontFamily: fontFamilies.poppins.Regular,
  },

  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },

  favText: {
    fontFamily: fontFamilies.poppins.Regular,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
});
