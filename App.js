import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View
} from 'react-native';
import Expo from 'expo';

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
  state = {
    fontLoaded: false,
  }

  async componentDidMount () {
    await Expo.Font.loadAsync({
      'fontAwesome': require('./assets/fonts/fontawesome-webfont.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render () {
    if ( this.state.fontLoaded ) {
      return (
        <FadeInView duration={1000} style={styles.container}>
          <Image blurRadius={3} source={require('./images/pattern1.png')} style={[styles.image, styles.backgroundImage]} />
          <Image source={require('./images/fade.png')} style={[styles.image, styles.overlay]} />
          <HackPacker />
        </FadeInView>
      );
    }
    return ( <ActivityIndicator /> );
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
