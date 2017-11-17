import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'HackPacker',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/icons/home.png')}
        style={[sharedStyles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  constructor (props) {
    super(props);
  }

  onPressChangeMoney () {
    let { navigate } = this.props.navigation;

    navigate('CurrencyExchange');
  }

  onPressMovies () {
    let { navigate } = this.props.navigation;

    navigate('Movies');
  }

  render () {
    return (
      <View style={sharedStyles.container}>
        <Text style={styles.title}>HackPacker</Text>
        <TouchableOpacity
          onPress={this.onPressMovies.bind(this)}
          style={sharedStyles.topMargin}
          >
          <Text style={styles.button}>Fetch Movies</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={this.onPressChangeMoney.bind(this)}
          style={sharedStyles.topMargin}
          >
          <Text style={styles.button}>Change Money</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  title: {
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
