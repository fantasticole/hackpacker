import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'HackPacker'
  };
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      text: null,
      view: 'default',
    };
  }
  fetchMovies () {
    this.setState({ isLoading: true })
    return setTimeout(() => {
      fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            text: this.formatMovies(responseJson.movies),
            view: 'movies',
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
  onPressChangeMoney () {
    this.setState({ view: 'money' });
  }
  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../images/pattern1.png')} style={styles.backgroundImage} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '80%',
          }}
        >
          <Text style={styles.text}>What are you here to do?</Text>
          <TouchableOpacity onPress={this.fetchMovies.bind(this)}>
            <Text style={styles.button}>Fetch Movies</Text>
          </TouchableOpacity>
          <TouchableHighlight onPress={this.onPressChangeMoney.bind(this)}>
            <Text style={styles.button}>Change Money</Text>
          </TouchableHighlight>
          {this.state.view === 'money' ?
            <TextInput
              style={styles.textInput}
              placeholder="What do you want?"
              onChangeText={(text) => this.setState({text})}
            /> :
            null
          }
          <View style={[styles.topMargin, {backgroundColor: '#fff'}]}>
            {this.state.isLoading === true ?
              <ActivityIndicator /> :
              null
            }
            {(this.state.view === 'movies' || this.state.view === 'money') && this.state.isLoading === false ?
              <Text style={{padding: 15, textAlign: 'center'}}>{this.state.text}</Text> :
              null
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    padding: 15,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontSize: 14,
  },
  topMargin: {
    marginTop: 30,
  },
});
