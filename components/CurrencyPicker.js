import React from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { currencies } from '../utils/currencies';
import { palette } from '../utils/palette';

export default class CurrencyPicker extends React.Component {
  state = {
    currency: this.props.value,
  }

  submitCurrency () {
    this.props.updateConversion(this.state.currency);
  }

  render () {
    let currencyOptions = Object.keys(currencies);

    return (
      <View style={styles.view}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.currency}
          onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}>
          {currencyOptions.map(opt => (
            <Picker.Item key={opt} label={opt} value={opt} />
          ))}
        </Picker>
        <TouchableOpacity onPress={() => this.submitCurrency()}>
          <Text style={styles.button}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.purple,
    padding: 10,
    textAlign: 'center',
  },
  view: {
    // backgroundColor: palette.white,
    width: '125%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowColor: palette.white,
    shadowOpacity: 0.2,
  }
});