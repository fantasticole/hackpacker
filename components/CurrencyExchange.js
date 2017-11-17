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

import { currencies } from '../utils/currencies';
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
    amount: null,
    converted: null,
    origin: 'USD',
    target: 'GBP',
  }

  constructor (props) {
    super(props);
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  convertCurrency (amount) {
    let { origin, target } = this.state;
    console.log('amount:', amount)
    console.log('origin:', origin)
    console.log('target:', target)
    fetch(`https://finance.google.com/finance/converter?a=${amount}&from=${origin}&to=${target}`)
      .then((response) => {
        let html = response._bodyText,
            rateIndex = html.search("bld") + 4,
            rateString = html.slice(rateIndex, rateIndex + 15),
            rate = rateString.slice(0, rateString.indexOf(' '))
        console.log('rate:', `${rate} ${origin} for each ${target}`)
        if (rate === "OCTYPE") rate = null;
        this.setState({ converted: rate });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onTextChanged (text) {
    let amount = '',
        acceptableChars = '0123456789.';

    for (var i=0; i < text.length; i++) {
      if (acceptableChars.indexOf(text[i]) > -1 ) {
        amount = amount + text[i];
      }
    }
    console.log('state:', this.state);
    this.setState({ amount });
    this.convertCurrency(amount);
  }

  updateConversion (obj) {
    console.log('state:', this.state);
    console.log('obj:', obj);
    this.setState(obj);
    console.log('state:', this.state);
    // check the last time we updated the conversion
    // check if the conversion should update
    if (this.state.amount) this.convertCurrency(this.state.amount);
  }

  render () {
    let currencyOptions = Object.keys(currencies);

    return (
      <View style={sharedStyles.container}>
        <View style={styles.borderBottom}>
          <Text style={styles.heading}>FROM</Text>
        </View>
        <View style={sharedStyles.table}>
          <Text style={[styles.subheading, {flex: 1}]}>AMOUNT</Text>
          <Text style={[styles.subheading, {flex: 1}]}>CURRENCY</Text>
        </View>
        <View style={[sharedStyles.table, { height: 150, paddingTop: 35, overflow: 'hidden' }]}>
          <TextInput
            keyboardType='numeric'
            onChangeText={(text) => this.onTextChanged(text)}
            style={[styles.textInput, styles.text]}
            value = {this.state.amount}
          />
          <Picker
            style={{flex: 1, top: -88}}
            selectedValue={this.state.origin}
            onValueChange={(itemValue, itemIndex) => this.updateConversion({ origin: itemValue })}>
            {currencyOptions.map(opt => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
        <View style={styles.borderBottom}>
          <Text style={styles.heading}>TO</Text>
        </View>
        <View style={sharedStyles.table}>
          <Text style={[styles.subheading, {flex: 1}]}>AMOUNT</Text>
          <Text style={[styles.subheading, {flex: 1}]}>CURRENCY</Text>
        </View>
        <View style={[sharedStyles.table, { height: 150, paddingTop: 35, overflow: 'hidden' }]}>
          <Text style={[styles.text, styles.converted ]}>{this.state.converted}</Text>
          <Picker
            style={{flex: 1, top: -88}}
            selectedValue={this.state.target}
            onValueChange={(itemValue, itemIndex) => this.updateConversion({ target: itemValue })}>
            {currencyOptions.map(opt => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderBottom: {
    ...sharedStyles.borderBottom,
    margin: '25%',
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 5,
  },
  converted: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 12,
    textShadowColor: palette.white,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  heading: {
    ...sharedStyles.heading,
    paddingBottom: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  subheading: {
    padding: 15,
    fontSize: 16,
    color: palette.grey,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textShadowColor: palette.white,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    height: 50,    
  },
  text: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  textInput: {
    backgroundColor: palette.white,
    color: palette.grey,
    paddingLeft: 10,
  },
});
