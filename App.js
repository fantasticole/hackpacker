import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends React.Component {
  onPressChangeMoney () {
    alert('Change Money, baby!');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>HackPacker</Text>
        <Text>What are you here to do?</Text>
        <Button
          onPress={this.onPressChangeMoney}
          style={styles.button}
          title="Change Money"
          accessibilityLabel="Learn more about this purple button"
        />
        <TouchableOpacity onPress={this.onPressChangeMoney}>
          <Text style={styles.button}>Change Money</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
