import React from 'react';
import { Animated } from 'react-native';

export default class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    let duration = this.props.duration || 3000;

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration,
      }
    ).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View style={[this.props.style, { opacity: fadeAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
