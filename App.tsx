import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Card from './src/components/Card';
import {Memo} from '@legendapp/state/react';
import {ObservableObject, observable} from '@legendapp/state';
import {CountryCode} from './src/types/country.enum';
import {ClubCode} from './src/types/club.enum';
import {Player} from './src/types/player';

interface State {
  players: Player[];
  voteForM: number;
  voteForC: number;
}

const state: ObservableObject<State> = observable({
  players: [
    {id: 1, name: 'Messi', club: ClubCode.PAR, country: CountryCode.ARG},
    {id: 2, name: 'Ronaldo', club: ClubCode.MAN, country: CountryCode.POR},
  ],
  voteForM: 0,
  voteForC: 0,
});

function App(): JSX.Element {
  const playersData = state.players.get();

  // increase player vote
  const votePlayer = (id: number) => {
    id === 1
      ? state.voteForM.set(state.voteForM.get() + 1)
      : state.voteForC.set(state.voteForC.get() + 1);
  };

  const unvotePlayer = (id: number) => {
    id === 1
      ? state.voteForM.set(state.voteForM.get() - 1)
      : state.voteForC.set(state.voteForC.get() - 1);
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        <Text style={styles.sectionTitle}>Legend State Implementation</Text>
        <Text>Vote for the Best Football player in the world</Text>
        <Memo>
          {() => (
            <Text>
              Messi: {state.voteForC.get()} - {state.voteForM.get()}: Ronaldo
            </Text>
          )}
        </Memo>
        <View style={styles.sectionContainer}>
          {playersData.map(player => (
            <View key={player.id}>
              <Card
                player={player}
                votes={
                  player.id === 1 ? state.voteForM.get() : state.voteForC.get()
                }
                increaseVoteCount={() => votePlayer(player.id)}
                decreaseVoteCount={() => unvotePlayer(player.id)}
              />
            </View>
          ))}
        </View>
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
