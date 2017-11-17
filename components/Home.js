import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'HackPacker',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/icons/home.png')}
        style={[sharedStyles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  onPressChangeMoney () {
    let { navigate } = this.props.navigation;

    navigate('CurrencyExchange');
  }

  onPressMovies () {
    let { navigate } = this.props.navigation;

    navigate('Movies');
  }

  onPressRates () {
    let { navigate } = this.props.navigation;

    navigate('ExchangeRates');
  }

  render () {
    return (
      <View style={sharedStyles.container}>
        <Text style={styles.title}>HackPacker</Text>
        <View style={[styles.buttonContainer, sharedStyles.topMargin]}>
          <Image source={require('../images/fade.png')} style={styles.buttonImage} />
          <TouchableHighlight onPress={this.onPressChangeMoney.bind(this)}>
            <Text style={styles.button}>Change Money</Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.buttonContainer, sharedStyles.topMargin]} >
          <TouchableOpacity onPress={this.onPressRates.bind(this)}>
            <Image
              source={require('../images/fade.png')}
              style={styles.buttonImage}
              transform={[{ rotate: '180deg' }]}
              />
            <Text style={styles.button}>View Rates</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: palette.grey,
    backgroundColor: 'transparent',
    // color: palette.white,
    color: palette.black,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'relative',
    height: 45,
    backgroundColor: palette.grey,
    borderRadius: 3,
  },
  buttonImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    opacity: 0.2,
  },
  title: {
    backgroundColor: 'transparent',
    color: palette.pink,
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: palette.grey,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
});
