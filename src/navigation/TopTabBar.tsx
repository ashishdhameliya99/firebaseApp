import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Login from '../screens/Login';
import Register from '../screens/Register';

import { color } from '../utils/color';
import fontFamilies from '../assets/fonts/font';

const Tab = createMaterialTopTabNavigator();

function TopTabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: color.offWhite,
          borderRadius: 30,
          marginTop: '10%',
          marginHorizontal: 15,
          elevation: 5,
        },
        tabBarIndicatorStyle: {
          backgroundColor: color.white,
          height: '100%',
          borderRadius: 30,
          borderColor: color.offWhite,
          borderWidth: 5,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.poppins.Regular,
        },
      }}
    >
      <Tab.Screen name="Login" component={Login} options={{ title: 'LogIn' }} />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{ title: 'Sign Up' }}
      />
    </Tab.Navigator>
  );
}
export default TopTabBar;
