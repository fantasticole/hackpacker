import React from 'react';
import {
  Image,
  Picker,
  ScrollView,
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
    history: [],
    converted: null,
    // set default currencies so that convertCurrency has
    // currencies to convert immediately, since otherwise
    // these are only set once currencies are selected
    origin: 'USD',
    target: 'GBP',
  }

  constructor (props) {
    super(props);
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  convertCurrency (amount, origin, target) {
    // get origin and target currencies from state
    // convert current amount
    fetch(`https://finance.google.com/finance/converter?a=${amount}&from=${origin}&to=${target}`)
      .then((response) => {
        let html = response._bodyText,
            rateIndex = html.search("bld") + 4,
            rateString = html.slice(rateIndex, rateIndex + 15),
            converted = rateString.slice(0, rateString.indexOf(' '));
        // account for if the rate returned is not a number
        // TODO: account for all non-number situations
        if (converted === "OCTYPE") converted = null;
        // set the converted number on the state
        this.setState({ converted });
        this.setState({
          history: this.state.history.concat({
            amount,
            converted,
            origin,
            target,
          }),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onTextChanged (text) {
    let amount = '',
        acceptableChars = '0123456789.',
        { origin, target } = this.state;

    // only keep numbers and acceptable punctuation inputs
    for (var i=0; i < text.length; i++) {
      if (acceptableChars.indexOf(text[i]) > -1 ) {
        amount = amount + text[i];
      }
    }
    // set the amount entered on the state
    this.setState({ amount });
    // use the amount entered in convertCurrency since the state
    // might not update quickly enough for the function to use
    // the correct amount
    this.convertCurrency(amount, origin, target);
  }

  updateConversion (stateKey, value) {
    let { amount, origin, target } = this.state;

    if (stateKey === 'origin') origin = value;
    else target = value;
    // set origin or target currency on the state
    this.setState({ [stateKey]: value });
    // only update conversion if we have an amount to convert
    if (amount) this.convertCurrency(amount, origin, target);
  }

  render () {
    let currencyOptions = Object.keys(currencies);

    return (
      <View style={[sharedStyles.container, { marginTop: 65 }]}>
        <View style={styles.borderBottom}>
          <Text style={styles.heading}>FROM</Text>
        </View>
        <View style={sharedStyles.table}>
          <Text style={[styles.subheading, {flex: 1}]}>AMOUNT</Text>
          <Text style={[styles.subheading, {flex: 1}]}>CURRENCY</Text>
        </View>
        <View style={[sharedStyles.table, { height: 100, paddingTop: 30, overflow: 'hidden' }]}>
          <TextInput
            keyboardType='numeric'
            onChangeText={(text) => this.onTextChanged(text)}
            style={[styles.textInput, styles.text]}
            value = {this.state.amount}
          />
          <Picker
            style={{flex: 1, top: -88}}
            selectedValue={this.state.origin}
            onValueChange={(itemValue, itemIndex) => this.updateConversion('origin', itemValue)}>
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
        <View style={[sharedStyles.table, { height: 100, paddingTop: 30, overflow: 'hidden' }]}>
          <Text style={[styles.text, styles.converted ]}>{this.state.converted}</Text>
          <Picker
            style={{flex: 1, top: -88}}
            selectedValue={this.state.target}
            onValueChange={(itemValue, itemIndex) => this.updateConversion('target', itemValue)}>
            {currencyOptions.map(opt => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
        {this.state.history.length ? 
          <ScrollView style={{ maxHeight: 150, marginTop: 15 }}>
            {this.state.history.map((conversion, i) => (
              <View key={i} style={sharedStyles.table}>
                <Text style={[styles.text, {flex: 1}]}>{conversion.amount} {conversion.origin}</Text>
                <Text style={[styles.text, {flex: 1}]}>{conversion.converted} {conversion.target}</Text>
              </View>
            ))}
          </ScrollView> :
          null
        }
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
