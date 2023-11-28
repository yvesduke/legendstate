import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/constants';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

export default HorizontalLine;

const styles = StyleSheet.create({
  line: {
    backgroundColor: COLORS.GRAY,
    height: 1,
    elevation: 2,
    shadowColor: COLORS.DARK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
  },
});
