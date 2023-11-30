import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/constants';

interface BoxProps {
  color?: string;
}

const Box: React.FC<BoxProps> = ({color = COLORS.GREEN}) => {
  return (
    <View style={[styles.box, {backgroundColor: color}]}>
      <Text style={styles.text}>ms</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
