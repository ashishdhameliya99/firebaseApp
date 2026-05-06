import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigation';

const App = () => {
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
};

export default App;
