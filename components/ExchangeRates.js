import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Transitioner } from 'react-navigation';

import { currencies } from '../utils/currencies';
import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

export default class ExchangeRates extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'ExchangeRates',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/icons/currency.png')}
        style={[sharedStyles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  state = {
    isLoading: true,
    rates: null,
  }

  constructor (props) {
    super(props);
    this.formatList = this.formatList.bind(this);
  }

  componentDidMount () {
    return fetch('https://api.fixer.io/latest?base=USD')
      // .then((response) => console.log())
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('responseJson:', responseJson)
        this.setState({
          isLoading: false,
          rates: this.formatList(responseJson.rates),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  formatList (rateData) {
    let currencyCodes = Object.keys(rateData);

    return currencyCodes.map(code => ({
      code,
      country: currencies[code],
      rate: rateData[code],
    }))
  }

  render () {
    let today = new Date,
        date = today.toDateString();

    if (this.state.isLoading) {
      return (
        <View style={sharedStyles.container}>
          <View style={{backgroundColor: palette.white, padding: 15}}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }
    return (
      <View style={sharedStyles.container}>
        <View style={{backgroundColor: palette.white, padding: 15}}>
          <Text style={sharedStyles.heading}>1 USD on {date}:</Text>
          <ScrollView style={{height: '70%'}}>
            {this.state.rates.map(rate => (
              <View key={rate.code} style={sharedStyles.table}>
                <Text style={{flex: 1}}>{rate.rate}</Text>
                <Text style={{flex: 3}}>{rate.country}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
