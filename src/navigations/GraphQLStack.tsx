import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GraphQLScreen from '../screens/GraphQLScreen';
import ChapterScreen from '../screens/ChapterScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function GraphQLStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GraphQL"
        component={GraphQLScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chapter"
        component={ChapterScreen}
        options={({
          route: {
            params: {
              chapter: {number, title},
            },
          },
        }) => ({
          title: number ? `Chapter ${number}: ${title}` : title,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default GraphQLStack;
