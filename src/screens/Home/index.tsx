import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Memo, observer, useObservable} from '@legendapp/state/react';
import {ObservableObject} from '@legendapp/state';
import {CountryCode, ClubCode} from '../../types';
import {Player} from '../../types/player';
import {usePlayerVote} from '../../contexts/PlayerVoteContext';
import Card from '../../components/Card';
import ScoreCard from '../../components/ScoreCard';

interface State {
  players: Player[];
  voteForM: number;
  voteForC: number;
}

const Home = observer((): JSX.Element => {
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
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Legend State Implementation</Text>
        <Text>Vote for the Best Football player in the world</Text>
        <Memo>
          {() => (
            <Text style={styles.highlight}>
              Messi: {state.voteForC.get()} - {state.voteForM.get()}: Ronaldo
            </Text>
          )}
        </Memo>
        <View style={styles.sectionContainer}>
          {playersData.map(player => (
            <Card
              key={player.id}
              player={player}
              votes={player.id === 1 ? MVote.get() : CVote.get()}
              increaseVoteCount={() => votePlayer(player.id)}
              decreaseVoteCount={() => unvotePlayer(player.id)}
            />
          ))}
          <ScoreCard players={playersData} />
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {paddingHorizontal: 24},
  sectionContainer: {
    marginTop: 32,
    gap: 16,
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

export default Home;
