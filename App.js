import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      text: null,
      view: 'default',
    };
  }
  fetchMovies () {
    this.setState({ isLoading: true })
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        // let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          text: this.formatMovies(responseJson.movies),
          view: 'movies',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  formatMovies (movieData) {
    // let movieString = movieData.reduce((str, movie) => {
    //   return str + `${movie.title}, ${movie.releaseYear}` + '\n'
    // }, '');
    // return movieString;
    let movies = movieData.map(movie => {
      return (<Text key={movie.title} style={styles.movie}>{movie.title}, {movie.releaseYear}</Text>);
    });
    return (
      <View style={{height: '100%', width: '100%'}}>{movies}</View>
    )
  }
  onPressChangeMoney () {
    // alert('Change Money, baby!');
    this.setState({ view: 'money' });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./images/pattern1.png')} style={styles.backgroundImage} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '80%',
          }}
        >
          <Text style={styles.text}>HackPacker</Text>
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
              // onSubmitEditing={alert(this.state.text)}
            /> :
            null
          }
          <View style={[styles.topMargin, {backgroundColor: 'pink'}]}>
            {this.state.isLoading === true ?
              <ActivityIndicator /> :
              null
            }
            {(this.state.view === 'movies' || this.state.view === 'money') && this.state.isLoading === false ?
              <Text style={{backgroundColor: 'yellow', padding: 5}}>{this.state.text}</Text> :
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
    // resizeMode: 'cover', // or 'stretch'
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
    marginTop: 20,
  },
  movie: {
    flex: 1,
    // textAlign: 'center',
  },
  text: {
    padding: 15,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    backgroundColor: '#fff',
    paddingLeft: 5,
  },
  topMargin: {
    marginTop: 30,
  },
});
