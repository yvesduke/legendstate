/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Card from './src/components/Card';
import {Memo} from '@legendapp/state/react';
import {observable} from '@legendapp/state';

const state = observable({
  players: [
    {id: 1, name: 'Messi', club: 'Paris', country: 'ARG'},
    {id: 2, name: 'Ronaldo', club: 'Manchester', country: 'POR'},
  ],
  voteForM: 0,
  voteForC: 0,
});

function App(): JSX.Element {
  const playersData = state.players.get();

  // const voteForM = () => state.voteForM.get();
  // const voteForC = () => state.voteForC.get(); // init value 9

  console.log(playersData, 'playersData');

  // increase player vote
  const voteForMessi = () => {
    console.log(state.voteForM.get(), 'before vote');

    // state.voteForM.set(state.voteForC.get() + 1);
    state.voteForM.set(state.voteForM.get() + 1);
    // Alert.alert(state.voteForC.get());
    // state.voteForM.set(voteForM + 1);

    console.log(state.voteForM.get(), 'after vote');
  };
  const voteForRonaldo = () => state.voteForC.set(state.voteForC.get() + 1);

  // decrease player vote
  const unVoteForMessi = () => {
    console.log(state.voteForM.get(), 'before unvote');

    // Use functional update to ensure you're working with the latest state
    state.voteForM.set(state.voteForM.get() - 1);

    console.log(state.voteForM.get(), 'after unvote');
  };

  const unVoteForRonaldo = () => state.voteForC.set(state.voteForC.get() - 1);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        <Text style={styles.sectionTitle}>Legend State Implementation</Text>
        <Text>Vote for the Best Football player in the world</Text>
        <Memo>
          {() => (
            <View>
              <Text>
                Messi: {state.voteForC.get()} - {state.voteForM.get()}: Ronaldo
              </Text>
            </View>
          )}
        </Memo>
        <View style={styles.sectionContainer}>
          {playersData.map(player => (
            <View key={player.id}>
              <Card
                player={player}
                increaseVoteCount={
                  player.id === 1 ? voteForMessi : voteForRonaldo
                }
                decreaseVoteCount={
                  player.id === 1 ? unVoteForMessi : unVoteForRonaldo
                }
              />
            </View>
          ))}
        </View>
        {/* <Card />*/}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
