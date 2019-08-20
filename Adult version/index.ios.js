'use strict';
var React = require('react-native');
var Home = require('./ios/pages/Home');
var Disclaimer = require('./ios/pages/Disclaimer');
var Help = require('./ios/pages/Help');
var Language = require('./ios/pages/Language');
var InPain = require('./ios/pages/InPain');
var HowItFeels = require('./ios/pages/HowItFeels');
var BodyParts = require('./ios/pages/BodyParts');
var ViewSelected = require('./ios/pages/ViewSelected');


var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Component,
  Navigator
} = React;

class SMW_Adult extends Component {
  render() {
    return (
      <Navigator
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
      )
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

AppRegistry.registerComponent('SMW_Adult', () => SMW_Adult);
