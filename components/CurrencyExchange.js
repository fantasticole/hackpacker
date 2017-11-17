import React from 'react';
import {
  Image,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Transitioner } from 'react-navigation';

import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

export default class CurrencyExchange extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'CurrencyExchange',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/icons/currency.png')}
        style={[sharedStyles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  state = {
    currency: null,
  }

  render () {
    return (
      <View style={sharedStyles.container}>
        <Text style={styles.text}>ENTER AMOUNT</Text>
        <TextInput
          keyboardType='numeric'
          onChangeText={(text) => this.setState({text})}
          style={[styles.textInput, sharedStyles.topMargin]}
        />
        <Text style={styles.text}>CURRENCY</Text>
        <Picker
          selectedValue={this.state.currency}
          onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
          <Picker.Item label="COP" value="cop" />
          <Picker.Item label="USD" value="usd" />
          <Picker.Item label="GBP" value="gbp" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 15,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textShadowColor: palette.white,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  textInput: {
    height: 40,
    backgroundColor: palette.black,
    color: palette.white,
    paddingLeft: 10,
    fontSize: 14,
  },
});
