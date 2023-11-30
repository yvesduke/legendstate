import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Loading} from '../../components';
import {Chapter, RootStackParamList} from '../../navigations/types';
import {RouteProp} from '@react-navigation/native';

const SECTIONS_QUERY = gql`
  query Sections($id: Int!) {
    chapter(id: $id) {
      sections {
        number
        title
      }
    }
  }
`;

interface Section {
  number: number;
  title: string;
}

interface SectionItemProps {
  chapter: Chapter;
  section: Section;
}

type ChapterScreenRouteProp = RouteProp<RootStackParamList, 'Chapter'>;

interface ChapterScreenProps {
  route: ChapterScreenRouteProp;
}

const SectionItem: React.FC<SectionItemProps> = ({chapter, section}) => (
  <View style={styles.item}>
    <Text style={styles.header}>
      {chapter.number}.{section.number}: {section.title}
    </Text>
  </View>
);

const ChapterScreen: React.FC<ChapterScreenProps> = ({route}) => {
  const chapterId = route.params.chapter.id;
  const {data, loading, error} = useQuery(SECTIONS_QUERY, {
    variables: {id: chapterId},
  });
  console.log('data: ', data);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error('Error loading section:', error);
    return (
      <View style={styles.centered}>
        <Text style={styles.header}>{error.stack}</Text>
      </View>
    );
  }

  const {
    chapter: {sections},
  } = data;

  if (sections.length === 1) {
    return (
      <View style={styles.centered}>
        <Text>No Section</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sections}
      renderItem={({item}) => (
        <SectionItem section={item} chapter={route.params.chapter} />
      )}
      keyExtractor={section => section.number.toString()}
      initialNumToRender={15}
    />
  );
};

export default ChapterScreen;

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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
