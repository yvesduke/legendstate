import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import HookForm from '../screens/HookForm';
import MoviesScreen from '../screens/Movies';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Legend" component={Home} />
        <Tab.Screen name="Form" component={HookForm} />
        <Tab.Screen
          name="Movies"
          component={MoviesScreen}
          options={{headerShown: true}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
