import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  PlayerVoteProvider,
  usePlayerVote,
} from '../../contexts/PlayerVoteContext';
import {observer} from '@legendapp/state/react';
import {Player} from '../../types/player';
import Button from '../../components/Buttons/Button';
import {COLORS} from '../../assets/constants';
import {ButtonVariant} from '../../types/button.enum';

type PlayerId = Player['id'];

const AddVote = ({pId}: {pId: PlayerId}) => {
  const {CVote, MVote, handleAddVote, handleDecVote} = usePlayerVote();

  const RenderScore = observer(() => {
    return <Text>ctx: {pId === 1 ? MVote.get() : CVote.get()}</Text>;
  });
  return (
    <View style={styles.sectionContainer}>
      <Button small onPress={() => handleAddVote(pId === 1 ? 1 : 2)}>
        <Text style={styles.buttonText}>Add</Text>
      </Button>
      <Button
        variant={ButtonVariant.DANGER}
        small
        onPress={() => handleDecVote(pId === 1 ? 1 : 2)}>
        <Text style={styles.buttonText}>Dec</Text>
      </Button>
      <RenderScore />
    </View>
  );
};

export default AddVote;

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.LIGHT,
    fontWeight: 'bold',
  },
});
