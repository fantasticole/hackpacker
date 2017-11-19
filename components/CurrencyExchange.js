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
    pickFor: 'origin',
    target: 'GBP',
    showHistory: false,
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

  toggleHistory () {
    this.setState({ showHistory: !this.state.showHistory });
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

  renderHistory () {
    if (this.state.showHistory) return (<SearchHistory history={this.state.history} />);
  }

  renderToggle () {
    if (this.state.history.length) return (
      <View style={sharedStyles.table}>
        <Text style={[styles.text, styles.subheading, {flex: 5, textAlign: 'left'}]}>Show History</Text>
        <Switch style={{flex: 1}} onValueChange={() => this.toggleHistory()} value={this.state.showHistory} />
      </View>
    );
  }

  render () {
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
          <Text style={styles.heading}>{this.state.origin}</Text>
          <TouchableOpacity onPress={() => this.onPressChange('origin')}>
            <Text style={{backgroundColor: 'pink', fontFamily: 'fontAwesome'}}>{'\uf013'}</Text>
          </TouchableOpacity>
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
          <Text style={styles.heading}>{this.state.target}</Text>
          <TouchableOpacity onPress={() => this.onPressChange('target')}>
            <Text style={{backgroundColor: 'pink', fontFamily: 'fontAwesome'}}>{'\uf013'}</Text>
          </TouchableOpacity>
        </View>
        {this.renderToggle()}
        {this.renderHistory()}
        {this.renderCurrencyPicker()}
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
