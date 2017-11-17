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
        source={require('../images/icons/arrows.png')}
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
    fetch('https://finance.google.com/finance/converter?a=1&from=AED&to=AZN')
      .then((response) => {
        let html = response._bodyText,
            rateIndex = html.search("bld") + 4,
            rateString = html.slice(rateIndex, rateIndex + 15),
            rate = rateString.slice(0, rateString.indexOf(' '))
        // console.log('response:', response)
        // let responseHTML = document.createElement("html");
        // responseHTML.innerHTML = response;

        // rate = response._bodyText.search("bld");
        // console.log('html:', html)
        // console.log('rateString:', rateString)
        console.log('rate:', `${rate} AZN for each AED`)
      })
      .catch((error) => {
        console.error(error);
      });
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
          <Text style={styles.heading}>1 USD on {date}:</Text>
          <ScrollView style={{height: '70%'}}>
            {this.state.rates.map(rate => (
              <Text key={rate.code}>{rate.country}: {rate.rate}</Text>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    paddingBottom: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
