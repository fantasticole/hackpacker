import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { sharedStyles } from '../utils/sharedStyles';

export default class SearchHistory extends React.Component {
  render () {
    return (
      <ScrollView style={{ maxHeight: 150, marginTop: 15 }}>
        {this.props.history.map((conversion, i) => (
          <View key={i} style={sharedStyles.table}>
            <Text style={styles.text}>{conversion.amount} {conversion.origin}</Text>
            <Text style={styles.text}>{conversion.converted} {conversion.target}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
});