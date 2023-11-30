// App.tsx

import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TamaguiProvider} from 'tamagui';
import appConfig from '../tamagui.config';
import TabNavigation from './containers/TabNavigation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={appConfig}>
        <TabNavigation />
      </TamaguiProvider>
    </QueryClientProvider>
  );
};

export default App;
