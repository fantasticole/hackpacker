import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';

import { palette } from './utils/palette';

import Home from './components/Home';
import CurrencyExchange from './components/CurrencyExchange';
import ExchangeRates from './components/ExchangeRates';
import FadeInView from './components/FadeInView';

const HackPacker = TabNavigator(
  // screens
  {
    Home: { screen: Home },
    CurrencyExchange: { screen: CurrencyExchange },
    ExchangeRates: { screen: ExchangeRates },
  },
  // config
  {
    animationEnabled: true,
    lazy: true, // lazily render tabs
    // order: ['Home', 'CurrencyExchange', 'Movies'], // order of tabs
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      activeTintColor: palette.pink,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: palette.white,
      },
    tabBarPosition: 'bottom',
    },
  }
);

export default class App extends React.Component {
  render () {
    return (
      <FadeInView duration={1000} style={styles.container}>
        <Image blurRadius={3} source={require('./images/pattern1.png')} style={[styles.image, styles.backgroundImage]} />
        <Image source={require('./images/fade.png')} style={[styles.image, styles.overlay]} />
        <HackPacker />
      </FadeInView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'repeat',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    resizeMode: 'cover',
  },
});
