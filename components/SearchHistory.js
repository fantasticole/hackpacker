import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

export default class SearchHistory extends React.Component {
  state = {
    componentHeight: 0,
    historyHeight: 0,
    showScroll: false,
  }

  getScrollHeight (event) {
    let { height } = event.nativeEvent.layout;

    console.log('componentHeight:', height)
    this.setState({ componentHeight: height })
  }

  checkHeight (event, index) {
    // only run if we haven't already decided to show the scroll
    // indicator and if we're looking at the last view added
    if (!this.state.showScroll && index === this.props.history.length - 1) {
      let { height } = event.nativeEvent.layout,
          historyHeight = this.state.historyHeight + height;

      console.log('index:', index)
      console.log('height:', height)
      console.log('historyHeight:', historyHeight)
      this.setState({
        historyHeight,
        showScroll: (historyHeight >= this.state.componentHeight)
      });
    }
  }

  render () {
    let historyStyles;

    if (this.state.showScroll) historyStyles = { backgroundColor: 'pink' };
    return (
      <ScrollView onLayout={(e) => this.getScrollHeight(e)} style={styles.history}>
        {this.props.history.map((conversion, i) => {
          return (
            <View key={i} style={styles.rowContainer}>
              <View onLayout={(e) => this.checkHeight(e, i)} style={[styles.table, i !== 0 ? styles.borderTop : null, historyStyles]}>
                <Text style={styles.text}>{conversion.amount} {conversion.origin}</Text>
                <Text style={styles.text}>{conversion.converted} {conversion.target}</Text>
              </View>
            </View>
          )
        }
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  borderTop: {
    borderColor: 'transparent',
    borderTopColor: palette.black,
    borderWidth: 1,
  },
  history: {
    marginTop: 25,
    marginBottom: 25,
    flex: 1,
  },
  rowContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: palette.white,
  },
  table: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
});