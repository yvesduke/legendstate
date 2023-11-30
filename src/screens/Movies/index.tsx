import React from 'react';
import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import {usePopularMovies} from './hooks';

const MoviesScreen = () => {
  const {data, error, isLoading, fetchNextPage, isFetching} =
    usePopularMovies();

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

  const movies = data?.pages.flatMap(page => page.results) || [];

  return (
    <FlatList
      data={movies}
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
