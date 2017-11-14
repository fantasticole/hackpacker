import React from 'react';
import {
  Button,
  Image,
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
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image source={require('./images/pattern1.png')} style={styles.backgroundImage} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>HackPacker</Text>
          <Text style={styles.text}>What are you here to do?</Text>
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
    height: '100%',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    padding: 15,
    backgroundColor: '#fff',
    // paddingTop: 15,
    // paddingBottom: 15,
    // paddingLeft: 30,
    // paddingRight: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
    // resizeMode: 'cover', // or 'stretch'
  }
});
