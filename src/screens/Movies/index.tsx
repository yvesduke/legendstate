import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import {usePopularMovies} from './hooks';
import styles from './styles';
import {Movie} from './api';
import {Loading} from '../../components';

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array: Movie[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const MoviesScreen = () => {
  const {data, error, isLoading, fetchNextPage, isFetching} =
    usePopularMovies();

  const [shuffledMovies, setShuffledMovies] = useState<Movie[] | []>([]);

  const handleEndReached = () => {
    if (!isFetching && !error) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    <Loading />;
  }

  useEffect(() => {
    const shuffleMovies = () => {
      if (data && shuffledMovies.length === 0) {
        // Shuffle the movies only when the screen starts
        setShuffledMovies(
          shuffleArray(data.pages.flatMap(page => page.results)),
        );
      }
    };

    shuffleMovies();

    return () => {
      // Cleanup or handle any necessary actions on component unmount
    };
  }, [data, shuffledMovies, isFetching, error, fetchNextPage]);

  return (
    <FlatList
      data={shuffledMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.views}>
          <Image
            style={styles.images}
            source={{
              uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}`,
            }}
          />
          <Text style={styles.titles}> {item.title}</Text>
          <Text style={styles.subTitle}>OverView: {item.overview}</Text>
          <Text style={styles.subTitle}>Release Date: {item.release_date}</Text>
          <Text style={styles.subTitle}>Vote Average: {item.vote_average}</Text>
          <Text style={styles.subTitle}>Vote Count: {item.vote_count}</Text>
        </View>
      )}
      onEndReachedThreshold={0.75}
      onEndReached={handleEndReached}
      ListFooterComponent={() => {
        if (isFetching) {
          return (
            <View style={styles.padding}>
              <ActivityIndicator size="large" />
            </View>
          );
        }
        return null;
      }}
    />
  );
};

export default MoviesScreen;
