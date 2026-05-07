import { StyleSheet } from 'react-native';
import { color } from '../../utils/color';
import fontFamilies from '../../assets/fonts/font';
import { hp, rf, wp } from '../../constants/ResponsiveUI';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamilies.poppins.bold,
    flex: 1,
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
  buttonTextSticky: {
    textAlign: 'center',
    color: color.white,
    fontSize: rf(30),
    fontFamily: fontFamilies.poppins.Regular,
  },
  headerUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    width: '100%',
  },
  stickyButton: {
    position: 'absolute',
    bottom: hp(70),
    right: wp(10),
    width: wp(60),
    height: hp(60),
    borderRadius: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    gap: hp(10),
    paddingHorizontal: wp(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
