import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../assets/constants';
import {observer} from '@legendapp/state/react';
import {usePlayerVote} from '../contexts/PlayerVoteContext';
import {Player} from '../types/player';
import HorizontalLine from './HorizontalLine';
import AddVote from '../controller/AddVote';

interface ScoreCardProp {
  players: Player[];
}

const ScoreCard: React.FC<ScoreCardProp> = observer(({players}) => {
  const {CVote, MVote} = usePlayerVote();

  const RenderScore = observer(({p}: {p: Player}) => {
    return (
      <Text testID={p.name + '-sc-vote'} style={styles.cardTitle}>
        {p.id === 1 ? MVote.get() : CVote.get()}
      </Text>
    );
  });
  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.sectionHeader]}>
        <Text style={[styles.cardTitle, {marginBottom: 0}]}>Score Card</Text>
      </View>

      <HorizontalLine />

      <View style={styles.sectionContainer}>
        {players.map(p => (
          <View key={p.id} style={styles.sectionRow}>
            <Text style={styles.cardTitle}>{p.name}</Text>
            <AddVote pId={p.id} />
            <RenderScore p={p} />
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.LIGHT,
    borderRadius: 8,
    elevation: 4, // Android elevation for shadow
    shadowColor: COLORS.DARK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionContainer: {
    padding: 16,
    gap: 8,
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: COLORS.GREEN,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScoreCard;
