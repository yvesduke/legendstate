import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RedLightGame from '../../components/RedLightGame';

const RedLightGreenLightScreen = () => {
  return (
    <SafeAreaView style={styles.body}>
      <RedLightGame />
    </SafeAreaView>
  );
};

export default RedLightGreenLightScreen;

const styles = StyleSheet.create({
  body: {flex: 1},
});
