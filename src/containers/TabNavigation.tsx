import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import HookForm from '../screens/HookForm';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Legend" component={Home} />
        <Tab.Screen name="Form" component={HookForm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
