import {TamaguiProvider} from 'tamagui';
import appConfig from '../tamagui.config';
import React from 'react';
import TabNavigation from './containers/TabNavigation';

const App = () => {
  return (
    <TamaguiProvider config={appConfig}>
      <TabNavigation />
    </TamaguiProvider>
  );
};

export default App;
