import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import TabDemo from '../screens/tabdemo';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="tabdemo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="tabdemo" component={TabDemo} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
