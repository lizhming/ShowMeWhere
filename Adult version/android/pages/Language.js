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
  Image,
} = React;

var {
  width,
  height
} = Dimensions.get('window');
var ratio = 1;
if (width>500) {
  ratio = 1.5;
}
var childDark = '#496378';
var childLight = '#9DB7D5';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var grey = '#D3D3D3';

var languages = require('../../data/languages.json');
var leftArrow = require('../../images/files/leftarrow.png');
var Sound = require('react-native-sound');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Language extends Component {
  constructor(props) {
    super(props);

    var sound = {
      arabic: 'arabiclanguage.mp3',
      bengali: 'bengalilanguage.mp3',
      polish: 'polishlanguage.mp3',
      somali: 'somalilanguage.mp3',
      urdu: 'urdulanguage.mp3',
      welsh: 'welshlanguage.mp3',
    }

    this.state = {
      dataSource: ds.cloneWithRows(languages),
      soundCompleted: true,
      sound: sound
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
    var english = {"name": "English Only", "english": "English Only", "translation": "", "id": "default"};
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Language Selection
            </Text>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <View style={{alignSelf: 'stretch'}}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.whiteRow}
                onPress={this._selectLanguage.bind(this, english)}
                delayLongPress={200}
                onLongPress={this._playSound.bind(this, english)}>
              <Text style={styles.listEnglish}>English Only</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lineBreak}/>
          <View style={styles.darkLineBreak}/>
          <View style={styles.textContainer}>
            <Text style={styles.additional}>
              Or choose an additional language
            </Text>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <ListView
            bounces={false}
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.border} />}
          />
        </View>
      </View>
    );
  }

  _renderRow(data) {
    var rowStyle = data.shading ? styles.greyRow : styles.whiteRow;
    var pipingStyle = data.shading ? styles.whitePiping : styles.greyPiping;
    return (
      <View>
        <TouchableOpacity
            activeOpacity={0.5}
            style={rowStyle}
            onPress={this._selectLanguage.bind(this, data)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, data)}>
          <Text style={styles.listEnglish}>{data.english}</Text>
          <Text style={pipingStyle}>|</Text>
          <Text style={styles.listTranslation}>{data.translation}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _playSound(data) {
    if(this.state.soundCompleted){
      var id = data.id;
      var name = this.state.sound[id];
      var sound = new Sound(name, Sound.MAIN_BUNDLE, (error) => {
        if (!error){ // loaded successfully
          if(sound.isLoaded()){
            this.setState({soundCompleted: false});
            sound.play((success) => {
              this.setState({soundCompleted: true});
              sound.release();
            });
          }
        }
      });
    }
  }

  _selectLanguage(data) {
    this.props.navigator.push({
      id: 'InPain',
      name: 'InPain',
      language: data
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigator.parentNavigator.push({
              id: 'Help',
              name: 'Help',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom
            });
          }
        }>
        <Text style={styles.navButton}>
          Help
        </Text>
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.navTitle}>
          Show me where? Adult
        </Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: adultLight
  },
  navButton: {
    color: 'white',
    margin: 10*ratio,
    fontFamily: 'Roboto-Regular',
    fontSize: 14.333*ratio
  },
  navTitle: {
    color: 'white',
    marginTop: 10*ratio,
    marginBottom: 10*ratio,
    textAlign: 'center',
    fontSize: 17.199*ratio,
    fontFamily: 'AG Book Rounded Regular',
  },
  main: {
    flex: 1,
    paddingTop: 55,
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
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold'
  },
  additional: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold'
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
  list: {
    alignSelf: 'stretch',
    flex: 1,
  },
  whiteRow: {
    flexDirection: 'row',
    height: 45*ratio,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    paddingTop: 3,
    paddingBottom: 3,
  },
  greyRow: {
    flexDirection: 'row',
    height: 45*ratio,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f3f3f3',
    paddingTop: 3,
    paddingBottom: 3,
  },
  listEnglish: {
    flex: 4,
    fontSize: 24.767*ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: adultDark,
    fontWeight: 'bold'
  },
  listTranslation: {
    flex: 4,
    fontSize: 24.767*ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: adultDark
  },
  whitePiping: {
    fontSize: 35.664*ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: 'white',
    marginBottom: 7*ratio
  },
  greyPiping: {
    fontSize: 35.664*ratio,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: '#f3f3f3',
    marginBottom: 7*ratio
  },
  border: {
    height: 1,
    backgroundColor: grey,
    alignSelf: 'stretch'
  },
});

module.exports = Language;
