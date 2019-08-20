'use strict';
var React = require('react-native');
var ViewSelected = require('./ViewSelected');
var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Component,
  Dimensions,
  Image,
  Alert,
  Navigator,
  ListView
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

var words = require('../../data/words.json');
var backArrow = require('../../images/files/backarrow.png');
var Sound = require('react-native-sound');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class HowItFeels extends Component {
  constructor(props) {
    super(props);

    var route = props.navigator.state.routeStack[2];
    var id = route.language.id;

    var sound = {
      howyoufeel: id + 'howyoufeel.mp3',

      numb: id + 'numb.mp3',
      hot: id + 'hot.mp3',
      cold: id + 'cold.mp3',
      tingling: id + 'tingling.mp3',
      pinsneedles: id + 'pinsneedles.mp3',
      badtaste: id + 'badtaste.mp3',
      ache: id + 'ache.mp3',
      cramps: id + 'cramps.mp3',
      itchy: id + 'itchy.mp3',
      faint: id + 'faint.mp3',
      dizzy: id + 'dizzy.mp3',
      eyeproblems: id + 'eyeproblems.mp3',
      nofeel: id + 'cannotFeel.mp3',
      drowsy: id + 'drowsy.mp3',
      sick: id + 'sick.mp3',
    }

    var translations = require('../../data/feelings.json');

    var feelingData = {
      hot: {
        id: 'hot',
        english: 'Hot',
        translation: translations.hot[id]
      },
      cold: {
        id: 'cold',
        english: 'Cold',
        translation: translations.cold[id]
      },
      numb: {
        id: 'numb',
        english: 'Numb',
        translation: translations.numb[id]
      },
      tingling: {
        id: 'tingling',
        english: 'Tingling',
        translation: translations.tingling[id]
      },
      pinsneedles: {
        id: 'pinsneedles',
        english: 'Pins and needles',
        translation: translations.pinsneedles[id]
      },
      badtaste: {
        id: 'badtaste',
        english: 'Bad taste',
        translation: translations.badtaste[id]
      },
      ache: {
        id: 'ache',
        english: 'Ache',
        translation: translations.ache[id]
      },
      cramps: {
        id: 'cramps',
        english: 'Cramps',
        translation: translations.cramps[id]
      },
      sick: {
        id: 'sick',
        english: 'Sick',
        translation: translations.sick[id]
      },
      itchy: {
        id: 'itchy',
        english: 'Itchy',
        translation: translations.itchy[id]
      },
      drowsy: {
        id: 'drowsy',
        english: 'Drowsy',
        translation: translations.drowsy[id]
      },
      faint: {
        id: 'faint',
        english: 'Faint',
        translation: translations.faint[id]
      },
      dizzy: {
        id: 'dizzy',
        english: 'Dizzy',
        translation: translations.dizzy[id]
      },
      eyeproblems: {
        id: 'eyeproblems',
        english: 'Eye problems',
        translation: translations.eyeproblems[id]
      },
      nofeel: {
        id: 'nofeel',
        english: 'Cannot feel anything',
        translation: translations.nofeel[id]
      },
    };

    if(id=='somali'){
      delete feelingData['pinsneedles'];
      delete feelingData['sick'];
    }
    if(id=='polish'){
      delete feelingData['pinsneedles'];
    }

    var feelingCount = route.feelingCounter;
    if (Object.keys(route.feels).length !== 0) {
      feelingCount = Object.keys(route.feels).length;
    }

    this.state = {
      dataSource: ds.cloneWithRows(feelingData),
      language: route.language,
      soundCompleted: true,
      tick: require('../../images/files/tick.png'),
      feels: route.feels,
      words: words,
      sound: sound,
      feelingData: feelingData,
      feelingCounter: feelingCount
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
    var language = this.state.language.id;
    var loading = this.state.loading;
    var words = this.state.words;
    var button = Object.keys(this.state.feels).length != 0 ? (
        <TouchableOpacity style={styles.button}
            onPress={this._bodyParts.bind(this)}>
          <Text style={styles.buttonText}>
            Where
          </Text>
        </TouchableOpacity>
      ) : (
        <View/>
      );

    var feelingData = this.state.feelingData;
    var feels = this.state.feels;
    var counterText = '';
    if(this.state.feelingCounter !== 0){
      counterText = this.state.feelingCounter == 1 ? this.state.feelingCounter + ' item' : this.state.feelingCounter + ' items';
    }

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.navRow}>
              <TouchableOpacity
                  activeOpacity={0.5}
                  delayLongPress={150}
                  onLongPress={this._playSound.bind(this, {id: 'howyoufeel'})}
                  style={styles.left}>
                <Text style={styles.title}>
                  {words.howYouFeel.english}
                </Text>
                <Text style={styles.translation}>
                  {words.howYouFeel[language]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'stretch'}}>
            <ListView
              bounces={false}
              decelerationRate={0}
              showsVerticalScrollIndicator={true}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.lineBreak} />}
            />
          </View>
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.button}
                onPress={() => Alert.alert(
                  words.alerts.restartTitle,
                  words.alerts.restartText,
                  [
                    {text: 'Cancel'},
                    {text: 'OK', onPress: () => navigator.parentNavigator.popToTop()}
                  ]
                )}
                onLongPress={this._playSound.bind(this, {id: 'restart'})}>
              <Text style={styles.buttonText}>
                Restart
              </Text>
            </TouchableOpacity>
            <View
              style={styles.counter}>
              <Text style={styles.counterText}>{counterText}</Text>
            </View>
            {button}
          </View>
        </View>
      </View>
    );
  }

  _renderRow(data) {
    var feels = this.state.feels;
    var id = data.id;
    var checkbox = (feels[id]) ?
      (<TouchableOpacity
          activeOpacity={0.5}
          onPress={this._selectFeeling.bind(this, data)}
          style={styles.box}>
        <Image style={styles.tick} resizeMode={Image.resizeMode.contain} source={this.state.tick}/>
       </TouchableOpacity>) :
      (<TouchableOpacity
          activeOpacity={0.5}
          onPress={this._selectFeeling.bind(this, data)}
          style={styles.box}/>);
    var language = this.state.language;
    var defaultStyle = (language.id == 'default') ? (styles.feelingEnglishOnly) : (styles.feeling);

    return (
      <View style={styles.row}>
        <TouchableOpacity
            activeOpacity={0.5}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, data)}
            style={styles.left}>
          <Text style={defaultStyle}>{data.english}</Text>
          <Text style={styles.feelingTranslation}>{data.translation}</Text>
        </TouchableOpacity>
        {checkbox}
      </View>
    )
  }

  _selectFeeling(data) {
    var id = data.id;
    var counter = this.state.feelingCounter;
    var feels = this.state.feels;
    var feelingData = this.state.feelingData;

    if(feels[id]){
      delete feels[id];
      counter = counter - 1;
    } else {
      feels[id] = data;
      counter = counter + 1;
    }

    this.setState({
      feels: feels,
      dataSource: ds.cloneWithRows(feelingData),
      feelingCounter: counter
    });
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

  _bodyParts() {
    this.props.navigator.push({
      id: 'BodyParts',
      name: 'BodyParts',
      language: this.state.language,
      items: {},
      bodyPartCounter: 0,
      feelingCounter: this.state.feelingCounter,
      feels: this.state.feels
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Image source={backArrow} resizeMode={Image.resizeMode.contain} style={styles.navButton}/>
      </TouchableOpacity>
    );
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
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  navRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold'
  },
  translation: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left'
  },
  feelingEnglishOnly: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left'
  },
  feeling: {
    fontSize: 20.639*ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold'
  },
  feelingTranslation: {
    fontSize: 20.639*ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left'
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
    flex: 1
  },
  row: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  box: {
    width: 50*ratio,
    height: 50*ratio,
    borderWidth: 4*ratio,
    borderColor: grey,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tick: {
    height: 40*ratio,
    width: 40*ratio,
    alignSelf: 'center',
  },
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: adultLight
  },
  button: {
    width: 90*ratio,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: adultDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 3
  },
  buttonText: {
    fontSize: 20.639*ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular'
  },
  counter: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterText: {
    color: 'white',
    fontSize: 17.199*ratio,
    backgroundColor: 'transparent',
    fontFamily: 'Roboto-Regular'
  },
});

module.exports = HowItFeels;
