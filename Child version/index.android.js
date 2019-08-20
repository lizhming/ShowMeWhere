'use strict';
var React = require('react-native');
var Home = require('./android/pages/Home');
var Disclaimer = require('./android/pages/Disclaimer');
var Help = require('./android/pages/Help');
var Language = require('./android/pages/Language');
var InPain = require('./android/pages/InPain');
var HowItFeels = require('./android/pages/HowItFeels');
var BodyParts = require('./android/pages/BodyParts');
var ViewSelected = require('./android/pages/ViewSelected');

var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Component,
  Navigator,
  BackAndroid
} = React;

var navigator;

React.BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
});

class SMW_Child extends Component {
  render() {
    return (
      <Navigator
          ref={(nav) => { navigator = nav; }}
          initialRoute={{id: 'Home', name: 'Home'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Home') {
      return (
        <Home
          navigator={navigator} />
      );
    }
    if (routeId === 'Disclaimer') {
      return (
        <Disclaimer
          navigator={navigator} />
      )
    }
    if (routeId === 'Help') {
      return (
        <Help
          navigator={navigator} />
      );
    }
    if (routeId === 'Language') {
      return (
        <Language
          navigator={navigator} />
      );
    }
    if (routeId === 'InPain') {
      return (
        <InPain
            navigator={navigator} />
      );
    }
    if (routeId === 'HowItFeels') {
      return (
        <HowItFeels
          navigator={navigator} />
      );
    }
    if (routeId === 'BodyParts') {
      return (
        <BodyParts
          navigator={navigator} />
      );
    }
    if (routeId === 'ViewSelected') {
      return (
        <ViewSelected
            navigator={navigator} />
      );
    }
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('SMW_Child', () => SMW_Child);
