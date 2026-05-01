/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import StackScreen from './src/navigation/StackNavigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => StackScreen);
