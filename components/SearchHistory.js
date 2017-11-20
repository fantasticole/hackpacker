import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { palette } from '../utils/palette';
import { sharedStyles } from '../utils/sharedStyles';

export default class SearchHistory extends React.Component {
  state = {
    componentHeight: 0,
    historyHeight: 0,
    showScroll: false,
    scroll: 0,
  }

  getScrollHeight (event) {
    let { height } = event.nativeEvent.layout;

    this.setState({ componentHeight: height })
  }

  checkHeight (event, index) {
    // only run if we haven't already decided to show the scroll
    // indicator and if we're looking at the last view added
    if (!this.state.showScroll && index === this.props.history.length - 1) {
      let { height } = event.nativeEvent.layout,
          historyHeight = this.state.historyHeight + height;

      this.setState({
        historyHeight,
        showScroll: (historyHeight >= this.state.componentHeight)
      });
    }
  }

  handleScroll (event) {
    let scrollNumber = event.nativeEvent.contentOffset.y
    console.log('scroll:', scrollNumber)
    this.setState({ scroll: scrollNumber });
    console.log('this.state.scroll:', this.state.scroll)
  }

  scrollToTop () {
    this.refs.scroll.scrollTo({ y: 0, animated: true });
  }

  scrollToBottom () {
    this.refs.scroll.scrollToEnd({ animated: true });
  }

  renderArrows () {
    if (this.state.showScroll) {
      return (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => this.scrollToTop()}>
            <Text style={[styles.arrow, { top: 5 }]}>{'\uf176'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.scrollToBottom()}>
            <Text style={[styles.arrow, { top: this.state.componentHeight - 30 }]}>{'\uf175'}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    let historyStyles;

    if (this.state.showScroll) historyStyles = { backgroundColor: palette.white };
    return (
      <View onLayout={(e) => this.getScrollHeight(e)} style={[styles.historyContainer, historyStyles]}>
        <ScrollView onScroll={(e) => this.handleScroll(e)} scrollEventThrottle={0} ref='scroll'>
          {this.props.history.map((conversion, i) => {
            return (
              <View key={i} style={styles.rowContainer}>
                <View onLayout={(e) => this.checkHeight(e, i)} style={[styles.table, i !== 0 ? styles.borderTop : null]}>
                  <Text style={styles.text}>{conversion.amount} {conversion.origin}</Text>
                  <Text style={styles.text}>{conversion.converted} {conversion.target}</Text>
                </View>
              </View>
            )
          })}
        </ScrollView>
        {this.renderArrows()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    fontFamily: 'fontAwesome',
    textAlign: 'center',
    fontSize: 14,
    color: palette.navy,
    backgroundColor: 'transparent',
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    right: 2,
  },
  borderTop: {
    borderColor: 'transparent',
    borderTopColor: palette.black,
    borderWidth: 1,
  },
  historyContainer: {
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