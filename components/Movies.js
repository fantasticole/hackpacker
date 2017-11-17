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
import { sharedStyles } from '../utils/sharedStyles';

export default class Movies extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Movies',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/icons/camera.png')}
        style={[sharedStyles.icon, {tintColor: tintColor}]}
      />
    ),
  }

  state = {
    isLoading: true,
    text: null,
  }

  conponentDidMount () {
    console.log('fetch!')
    return setTimeout(() => {
      fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            text: this.formatMovies(responseJson.movies).bind(this),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);
  }
  
  formatMovies (movieData) {
    let movieString = movieData.reduce((str, movie) => {
      return str + `${movie.title}, ${movie.releaseYear}` + '\n'
    }, '');
    return movieString;
  }

  render () {
    return (
      <View style={sharedStyles.container}>
        <View style={[sharedStyles.topMargin, {backgroundColor: palette.white, padding: 15}]}>
          {this.state.isLoading === true ?
            <ActivityIndicator /> :
            <Text style={styles.text}>{this.state.text}</Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 15,
    textAlign: 'center',
  },
});
