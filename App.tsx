import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigation';
import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
};

export default App;
