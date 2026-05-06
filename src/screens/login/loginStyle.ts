import { StyleSheet } from 'react-native';
import { color } from '../../utils/color';
import fontFamilies from '../../assets/fonts/font';
import { wp } from '../../constants/responsiveUI';

export const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
  },

  container: {
    borderRadius: 20,
    backgroundColor: color.white,
  },

  label: {
    marginTop: 8,
    marginBottom: 6,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },

  or: {
    marginHorizontal: 10,
    color: '#888',
  },

  socialRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  forgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontFamily: fontFamilies.poppins.Regular,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    padding: 14,
    marginHorizontal: 5,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    height: wp(20),
    width: wp(20),
  },
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: fontFamilies.poppins.Regular,
  },
  forgotText: {
    fontFamily: fontFamilies.poppins.Regular,
    color: '#923016',
  },
  acLinkContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  linkText: {
    fontFamily: fontFamilies.poppins.Regular,
    color: '#923016',
  },
  dontHaveText: {
    fontFamily: fontFamilies.poppins.Regular,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: color.orange,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: color.white,
    fontFamily: fontFamilies.poppins.Regular,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
});
