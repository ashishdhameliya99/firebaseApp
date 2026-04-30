import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopTabBar from './src/navigation/TopTabBar';
import { color } from './src/utils/color';
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, View } from 'react-native';
import fontFamilies from './src/assets/fonts/font';
import { string } from './src/constants/string';
import { rf } from './src/constants/responsiveUI';

const App = () => {
  return (
    <SafeAreaProvider
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: color.orange,
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subTitle}>{string.subTitle}</Text>
      </View>
      <TopTabBar />
      <Toast />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  title: {
    fontFamily: fontFamilies.poppins.semiBold,
    color: color.white,
    textAlign: 'center',
    fontSize: rf(25),
  },
  subTitle: {
    fontFamily: fontFamilies.poppins.Regular,
    color: color.offWhite,
    textAlign: 'center',
    fontSize: rf(16),
  },
});
export default App;
