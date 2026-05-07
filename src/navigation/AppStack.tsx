import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home/Home';
import AddItem from '../screens/home/AddItem';
import Favorite from '../screens/favorite/Favorite';
import SaveDraft from '../screens/saveDraft/SaveDraft';
import TodoGraph from '../components/TodoGraph';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="SaveDraft" component={SaveDraft} />
      <Stack.Screen name="TodoGraph" component={TodoGraph} />
    </Stack.Navigator>
  );
};

export default AppStack;
