import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Card from './src/components/Card';
import {Memo, observer, useObservable} from '@legendapp/state/react';
import {ObservableObject} from '@legendapp/state';
import {CountryCode, ClubCode} from './src/types';
import {Player} from './src/types/player';
import {usePlayerVote} from './src/contexts/PlayerVoteContext';
import ScoreCard from './src/components/ScoreCard';

interface State {
  players: Player[];
  voteForM: number;
  voteForC: number;
}

const App = observer((): JSX.Element => {
  const state: ObservableObject<State> = useObservable({
    players: [
      {id: 1, name: 'Messi', club: ClubCode.PAR, country: CountryCode.ARG},
      {id: 2, name: 'Ronaldo', club: ClubCode.MAN, country: CountryCode.POR},
    ],
    voteForM: 0,
    voteForC: 0,
  });

  const playersData = state.players.get(); // destructure data from state

  // context api
  const {CVote, MVote} = usePlayerVote();

  const votePlayer = (id: number) => {
    if (id === 1) {
      state.voteForM.set(state.voteForM.get() + 1);
      MVote.set(MVote.get() + 1); // directly modifying context in place
    } else {
      CVote.set(CVote.get() + 1); // directly modifying context in place
      state.voteForC.set(state.voteForC.get() + 1);
    }
  };

  const unvotePlayer = (id: number) => {
    if (id === 1) {
      state.voteForM.set(state.voteForM.get() - 1);
      MVote.set(MVote.get() - 1);
    } else {
      CVote.set(CVote.get() - 1);
      state.voteForC.set(state.voteForC.get() - 1);
    }
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
                votes={player.id === 1 ? MVote.get() : CVote.get()}
                increaseVoteCount={() => votePlayer(player.id)}
                decreaseVoteCount={() => unvotePlayer(player.id)}
              />
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <ScoreCard players={playersData} />
        </View>
      </View>
    </SafeAreaView>
  );
});

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
