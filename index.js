/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Sentry} from '@sentry/react-native';
// import * as Sentry from '@sentry/react-native';

// Sentry.init({
//   dsn: 'https://971afb1f48c805f8280cce1649781f5d@o4506288086646784.ingest.sentry.io/4506288089333760',
// });

Sentry.init({
  dsn: 'https://971afb1f48c805f8280cce1649781f5d@o4506288086646784.ingest.sentry.io/4506288089333760',
});

AppRegistry.registerComponent(appName, () => App);
