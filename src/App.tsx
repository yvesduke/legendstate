import {TamaguiProvider} from 'tamagui';
import appConfig from '../tamagui.config';
import {ScrollView, StyleSheet} from 'react-native';
import Home from './screens/Home';

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
