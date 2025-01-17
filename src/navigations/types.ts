export interface Chapter {
  __typename: string;
  id: number;
  number: number | null;
  title: string;
}

export type ChapterScreenParams = {
  chapter: Chapter;
  // other properties if any
};

export type RootStackParamList = {
  Chapter: ChapterScreenParams;
  GraphQL: undefined;
  // other screens and their params if any
};
