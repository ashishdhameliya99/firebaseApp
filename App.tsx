import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigation';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1021574425223-j7e9arqqmu85utu85q5cb44279gso0p5.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
};

export default App;
