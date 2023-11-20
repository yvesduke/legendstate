import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const Card = props => {
  const {player, increaseVoteCount, decreaseVoteCount} = props;

  return (
    <View style={styles.cardContainer}>
      {/* <Text style={styles.cardTitle}>Welcome to the Card</Text> */}
      <Text style={styles.cardText}>{player.name}</Text>
      <Text style={styles.cardText}>{player.country}</Text>
      <Text style={styles.cardText}>{player.club}</Text>
      <TouchableOpacity
        style={styles.voteButton}
        onPress={() => increaseVoteCount(player.id)}>
        <Text style={styles.buttonText}>Vote</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.unvoteButton}
        onPress={() => decreaseVoteCount(player.id)}>
        <Text style={styles.buttonText}>Unvote</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4, // Android elevation for shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  voteButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  unvoteButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Card;
