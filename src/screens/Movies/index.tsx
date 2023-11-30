import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import {usePopularMovies} from './hooks';

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = array => {
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

  const [shuffledMovies, setShuffledMovies] = useState([]);

  useEffect(() => {
    if (data) {
      // Shuffle the movies when the data changes
      setShuffledMovies(shuffleArray(data.pages.flatMap(page => page.results)));
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {(error as Error).message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shuffledMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={{margin: 16}}>
          <Image
            style={{width: '100%', height: 250}}
            source={{
              uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}`,
            }}
          />
          <Text>{item.title}</Text>
          <Text>{item.overview}</Text>
          <Text>{item.release_date}</Text>
        </View>
      )}
      onEndReachedThreshold={0.75}
      onEndReached={() => {
        if (!isFetching && !error) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={() => {
        if (isFetching) {
          return (
            <View style={{paddingVertical: 20}}>
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
