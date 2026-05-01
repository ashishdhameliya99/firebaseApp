import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopTabBar from './src/navigation/TopTabBar';

import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaProvider>
      <TopTabBar />
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
