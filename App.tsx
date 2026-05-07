import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigation';
import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './src/hooks/themeContext';

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <RootNavigator />
            <Toast />
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </PaperProvider>
  );
}
