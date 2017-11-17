import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './components/Home';
import Welcome from './components/Welcome';

const HackPacker = StackNavigator({
  Welcome: { screen: Welcome },
  Home: { screen: Home },
});

export default class App extends React.Component {
  render() {
    return <HackPacker />;
  }
}