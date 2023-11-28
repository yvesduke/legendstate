import React from 'react';
import {TamaguiProvider} from 'tamagui';
import appConfig from '../tamagui.config';
import TabNavigation from './containers/TabNavigation';

const App = () => {
  return (
    <TamaguiProvider config={appConfig}>
      <TabNavigation />
    </TamaguiProvider>
  );
};

export default App;
