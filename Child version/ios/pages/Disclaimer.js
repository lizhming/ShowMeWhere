'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Component,
  Dimensions,
  ListView,
  Navigator,
  AsyncStorage,
} = React;

var {
  width,
  height
} = Dimensions.get('window');
var ratio = 1;
if (width>600) {
  ratio = 1.5;
}

var childDark = '#496378';
var childLight = '#9DB7D5';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var grey = '#D3D3D3';

var disclaimer = require('../../data/disclaimer.json');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var DISCLAIMER = '@AsyncStorage:disclaimerAccepted';

class Disclaimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(disclaimer),
    };
  }

  render() {
    return(
      <Navigator
        renderScene={this.renderScene.bind(this)}
        navigator={this.props.navigator}
        navigationBar={
         <Navigator.NavigationBar style={styles.navBar}
             routeMapper={NavigationBarRouteMapper} />
        }
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Disclaimer
            </Text>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <View style={styles.contentContainer}>
            <ListView
              bounces={false}
              style={styles.list}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
            />
          </View>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.button}
              activeOpacity={0.5}
              onPress={this._acceptDisclaimer.bind(this)}>
            <Text style={styles.buttonText}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderRow(data) {
    return (
      <View style={{padding: 5}}>
        <Text style={styles.disclaimerText}>{data.text}</Text>
      </View>
    )
  }

  _acceptDisclaimer(data) {
    AsyncStorage.setItem(DISCLAIMER, 'true');
    this.props.navigator.push({
      id: 'Help',
      name: 'Help',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.navTitle}>
          Show me where - Child
        </Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: childLight
  },
  navButton: {
    color: 'white',
    margin: 10*ratio,
    fontFamily: 'Helvetica',
    fontSize: 14.333*ratio
  },
  navTitle: {
    color: 'white',
    margin: 10*ratio,
    fontFamily: 'AGBookRounded-Regular',
    fontSize: 17.199*ratio
  },
  main: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  title: {
    fontSize: 29.72*ratio,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica'
  },
  lineBreak: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: grey
  },
  darkLineBreak: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#a6a6a6'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10
  },
  list: {
    alignSelf: 'stretch',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  row: {
    margin: 3,
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  disclaimerText: {
    fontSize: 17.199*ratio,
    textAlign: 'left',
    fontFamily: 'Helvetica'
  },
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: childLight
  },
  button: {
    width: 90*ratio,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: childDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4
  },
  buttonText: {
    fontSize: 20.639*ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica'
  },
});

module.exports = Disclaimer;
