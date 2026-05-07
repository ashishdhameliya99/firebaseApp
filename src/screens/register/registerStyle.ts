import { StyleSheet } from 'react-native';
import { color } from '../../utils/color';
import { wp } from '../../constants/ResponsiveUI';
import fontFamilies from '../../assets/fonts/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500',
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
