import {TamaguiProvider} from 'tamagui';
import appConfig from '../tamagui.config';
import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://971afb1f48c805f8280cce1649781f5d@o4506288086646784.ingest.sentry.io/4506288089333760',
});

const App = () => {
  return (
    <TamaguiProvider config={appConfig}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Home />
      </ScrollView>
    </TamaguiProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
