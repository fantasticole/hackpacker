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

import CustomButton from './CustomButton';

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
          <CustomButton onPress={() => this.onPressChangeMoney()}>
            {pressStatus => (
                <Text style={ pressStatus ? styles.textPress : styles.text }>Change Money</Text>
              )
            }
          </CustomButton>
        </View>
        <View style={[styles.buttonContainer, sharedStyles.topMargin]} >
          <CustomButton onPress={() => this.onPressRates()}>
            {pressStatus => (
                <Text style={ pressStatus ? styles.textPress : styles.text }>View Rates</Text>
              )
            }
          </CustomButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    height: 45,
  },
  text: {
    textAlign: 'center',
    margin: 10,
    color: palette.purple,
  },
  textPress: {
    textAlign: 'center',
    margin: 10,
    color: palette.white,
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
