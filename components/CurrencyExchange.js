import React from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Transitioner } from 'react-navigation';

import { currencies } from '../utils/currencies';
import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

import CurrencyPicker from './CurrencyPicker';
import SearchHistory from './SearchHistory';

export default class CurrencyExchange extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'CurrencyExchange',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/icons/arrows.png')}
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
    pickFor: 'origin',
    target: 'GBP',
    showPicker: false,
  }

  constructor (props) {
    super(props);
    this.convertCurrency = this.convertCurrency.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateConversion = this.updateConversion.bind(this);
    this.delay = 0;
  }

  convertCurrency (amount, origin, target) {
    console.log('this.delay 0:', this.delay)
    clearTimeout(this.delay);
    this.delay = setTimeout(() => this.fetchData(amount, origin, target), 700);
    console.log('this.delay:', this.delay)
  }

  fetchData (amount, origin, target) {
    console.log('hi!')
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

  onPressChange (pickFor) {
    this.setState({
      pickFor,
      showPicker: true,
    });
  }

  onTextChanged (text, currency) {
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

  updateConversion (value) {
    let { amount, origin, pickFor, target } = this.state;

    if (pickFor === 'origin') origin = value;
    else target = value;
    // set origin or target currency on the state
    this.setState({
      [pickFor]: value,
      showPicker: false,
    });
    // only update conversion if we have an amount to convert
    if (amount) this.convertCurrency(amount, origin, target);
  }

  renderCurrencyPicker () {
    let { pickFor, showPicker } = this.state;

    if (showPicker) {
      if (pickFor === 'origin') {
        return (
          <CurrencyPicker updateConversion={this.updateConversion} value={this.state.origin} />
        )
      }
      return (
        <CurrencyPicker updateConversion={this.updateConversion} value={this.state.target} />
      )
    }
  }

  render () {
    return (
      <View style={sharedStyles.container}>
        <View style={sharedStyles.table}>
          <View style={styles.currencyHeader}>
            <Text style={styles.heading}>{this.state.origin}</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.onPressChange('origin')}>
              <Text style={styles.gear}>{'\uf013'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.arrow}>{'\uf061'}</Text>
          <View style={styles.currencyHeader}>
            <Text style={styles.heading}>{this.state.target}</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.onPressChange('target')}>
              <Text style={styles.gear}>{'\uf013'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={sharedStyles.table}>
          <TextInput
            keyboardType='numeric'
            onChangeText={(text) => this.onTextChanged(text, 'amount')}
            style={styles.textInput}
            value={this.state.amount}
          />
          <TextInput
            keyboardType='numeric'
            onChangeText={(text) => this.onTextChanged(text, 'converted')}
            style={styles.textInput}
            value={this.state.converted}
          />
        </View>
        <SearchHistory history={this.state.history} />
        {this.renderCurrencyPicker()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    fontFamily: 'fontAwesome',
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 4,
  },
  button: {
    marginLeft: 5,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 4,
    height: 20,
    marginTop: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: palette.grey,
    shadowOpacity: 0.5,
    backgroundColor: palette.purple,
    borderColor: palette.beige,
    borderWidth: 1,
  },
  currencyHeader: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 24,
  },
  gear: {
    color: palette.beige,
    fontFamily: 'fontAwesome',
    fontSize: 12,
  },
  heading: {
    ...sharedStyles.heading,
    paddingBottom: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  textInput: {
    height: 40,
    fontSize: 14,
    backgroundColor: palette.grey,
    color: palette.white,
    paddingLeft: 10,
    marginTop: 30,
    width: '45%',
  },
});
