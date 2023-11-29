import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Loading} from '../../components';
import {gql, useQuery} from '@apollo/client';
import {NavigationProp} from '@react-navigation/native';
import {Chapter, RootStackParamList} from '../../navigations/types';

const CHAPTER_QUERY = gql`
  query Chapters {
    chapters {
      id
      number
      title
    }
  }
`;

interface ChapterItemProps {
  chapter: Chapter;
  onPress?: () => void;
}

interface GraphQLScreenProps {
  navigation: NavigationProp<RootStackParamList, 'GraphQL'>; // Replace with your actual screen name
}

const ChapterItem: React.FC<ChapterItemProps> = ({chapter, onPress}) => {
  const {title, number} = chapter;
  let header = '';
  let subHeader = '';

  if (number) {
    header = `Chapter ${number}`;
    subHeader = title;
  } else {
    header = title;
  }

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Text style={styles.header}>{header}</Text>
      {subHeader && <Text style={styles.subheader}>{header}</Text>}
    </Pressable>
  );
};

const GraphQLScreen: React.FC<GraphQLScreenProps> = ({navigation}) => {
  const {data, loading} = useQuery(CHAPTER_QUERY);
  console.log('chapter', data);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data.chapters}
        renderItem={({item}) => (
          <ChapterItem
            chapter={item}
            onPress={() => navigation.navigate('Chapter', {chapter: item})}
          />
        )}
        keyExtractor={chapter => chapter.id.toString()}
      />
    </SafeAreaView>
  );
};

export default GraphQLScreen;

const styles = StyleSheet.create({
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
  },
  subheader: {
    paddingTop: 10,
  },
});
