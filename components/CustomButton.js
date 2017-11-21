import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';

import { palette } from '../utils/palette';

export default class CustomButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = { pressStatus: false };
  }

  handleHideUnderlay () {
    this.setState({ pressStatus: false });
  }

  handleShowUnderlay () {
    this.setState({ pressStatus: true });
  }

  render () {
    return (
      <TouchableHighlight
        activeOpacity={1}
        onHideUnderlay={() => this.handleHideUnderlay()}
        onPress={this.props.onPress}
        onShowUnderlay={() => this.handleShowUnderlay()}
        style={ this.state.pressStatus ? styles.buttonPress : styles.button }
        underlayColor={palette.purple}
        >
        {this.props.children(this.state.pressStatus)}
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: palette.purple,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonPress: {
    borderColor: palette.purple,
    backgroundColor: palette.purple,
    borderWidth: 1,
    borderRadius: 10,
  },
});