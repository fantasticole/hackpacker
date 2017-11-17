import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Transitioner } from 'react-navigation';

import { palette } from '../utils/palette';

export default class Welcome extends React.Component {
  static navigationOptions = {
    title: 'HackPacker',
  };

  state = {
    isLoading: true,
  }

  componentDidMount () {
    let { navigate } = this.props.navigation;

    this.setState({ isLoading: false });
    setTimeout(() => navigate('Home'), 3000);
  }

  render () {
    if (this.state.isLoading) {
      return <ActivityIndicator />
    }
    return (
      <View style={styles.container}>
        <Image source={require('../images/pattern1.png')} style={[styles.image, styles.backgroundImage]} />
        <Image source={require('../images/fade.png')} style={[styles.image, styles.overlay]} />
        <View
          style={{
            flex: 1,
            paddingTop: '15%',
            width: '80%',
          }}
        >
          <Text style={styles.text}>HackPacker</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'repeat',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    resizeMode: 'cover',
  },
  text: {
    backgroundColor: 'transparent',
    color: palette.pink,
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: palette.navy,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
});
