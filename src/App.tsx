import {TamaguiProvider} from 'tamagui';
import config from '../tamagui.config';
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Home from './screens/Home';

// import {TamaguiProvider} from 'tamagui';

// import config from './tamagui.config';
// // import tamaguiConfig from './tamagui.config';

const App = () => {
  return (
    <TamaguiProvider config={config}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Home />
      </ScrollView>
    </TamaguiProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
