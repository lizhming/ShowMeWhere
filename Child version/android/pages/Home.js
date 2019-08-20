'use strict';
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  Dimensions,
  Navigator,
  Image,
  AsyncStorage,
} = React;

var {
  width,
  height
} = Dimensions.get('window');
var ratio = 1;
if (width>500) {
  ratio = 1.5;
}
var background = '#486478';

var DISCLAIMER = '@AsyncStorage:disclaimerAccepted';

class Home extends Component {
  constructor(props) {
    super(props);

    var route = this.props.navigator.state.routeStack[0];
    AsyncStorage.getItem(DISCLAIMER).then((value) => {
      if (value == 'true') {
        route.disclaimerAccepted = true;
        console.log('Recovered disclaimerAccepted state: "' + value + '". Disclaimer has been accepted.');
      } else if (value){
        route.disclaimerAccepted = false;
        console.log('Recovered disclaimerAccepted state: "' + value + '". Disclaimer has not been accepted.');
      }
      else {
        route.disclaimerAccepted = false;
        console.log('No saved disclaimer data found. Disclaimer has not been accepted.');
      }
    });

    this.state = {
      isLoading: false,
      splash: require('../../images/files/splash.png')
    };
  }

  componentDidMount() {
    setTimeout(
      () => { this._onEnd(); },
      2000
    );
  }

  render() {
    return(
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Image source={this.state.splash} resizeMode={Image.resizeMode.contain} />
        </View>
      </View>
    );
  }

  _onEnd(){
    var route = this.props.navigator.state.routeStack[0];
    if(route.disclaimerAccepted) {
      this._selectLanguage()
    } else {
      this._disclaimer()
    }
  }

  _disclaimer() {
    this.props.navigator.replace({
      id: 'Disclaimer',
      name: 'Disclaimer',
    });
  }

  _selectLanguage() {
    this.setState({
      disclaimerAccepted: 'true',
    })
    this.props.navigator.replace({
      id: 'Language',
      name: 'Language',
    });
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: width-60
  },
});

module.exports = Home;
