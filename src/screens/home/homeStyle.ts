import { StyleSheet } from 'react-native';
import { color } from '../../utils/color';
import fontFamilies from '../../assets/fonts/font';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  infoBox: {
    marginBottom: 15,
  },

  label: {
    color: '#888',
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
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
});
