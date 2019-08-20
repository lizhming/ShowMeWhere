'use strict';
var React = require('react-native');
var BodyParts = require('./BodyParts');
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
  AlertIOS,
  Image,
  AsyncStorage
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
var childPiping = '#6f89a2';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var adultPiping = '#A68860';
var grey = '#D3D3D3';

var words = require('../../data/words.json');
var Sound = require('react-native-sound');
var leftArrow = require('../../images/files/leftarrow.png');

var NAME = '@AsyncStorage:name';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class InPain extends Component {
  constructor(props) {
    super(props);

    var route = props.navigator.state.routeStack[1];
    var id = route.language.id;

    var sound = {
      greeting: id + 'greeting.mp3',
      inPain: id + 'inpain.mp3',
      yes: id + 'yes.mp3',
      no: id + 'no.mp3',
    }

    var greeting = {
      english: words.greeting.english,
      translation: words.greeting[id]
    };

    this.state = {
      words: words,
      language: route.language,
      sound: sound,
      soundCompleted: true,
      greeting: greeting,
      name: '',
      painTranslation: words.pain[id]
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    AsyncStorage.getItem(NAME).then((value) => {
      if (value){
        var language = this.state.language;
        var greeting = this.state.greeting;
        var english = greeting.english.replace("MYNAME", value);
        var translation = '';
        if(language.id!="default"){
          translation = greeting.translation.replace("MYNAME", value);
        }
        var replace = {english: english, translation: translation}
        this.setState({
          name: value,
          greeting: replace
        });
      }
    });
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
    var hello = this.state.greeting;
    var name = (this.state.name == '') ?
      (<View style={{height: 1}}/>) :
      (<View style={{alignSelf: 'stretch'}}>
        <TouchableOpacity
            activeOpacity={0.5}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, {id: 'greeting'})}
            style={{alignSelf: 'stretch'}}>
          <Text style={styles.greeting1}>{hello.english}</Text>
          <Text style={styles.greeting2}>{hello.translation}</Text>
        </TouchableOpacity>
        <View style={styles.darkLineBreak}/>
        <View style={styles.lineBreak}/>
        <View style={{margin: 5*ratio}}/>
        <View style={styles.lineBreak}/>
        <View style={styles.darkLineBreak}/>
      </View>);

    var buttons = (language=='default') ?
      (<View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, true)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'yes'})}>
          <Text style={styles.buttonEnglishOnly}>
            {this.state.words.yes['english']}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, false)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'no'})}>
          <Text style={styles.buttonEnglishOnly}>
            {this.state.words.no['english']}
          </Text>
        </TouchableOpacity>
      </View>) :
      (<View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, true)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'yes'})}>
          <Text style={styles.buttonEnglish}>
            {this.state.words.yes['english']}
          </Text>
          <Text style={styles.piping}>|</Text>
          <Text style={styles.buttonTranslation}>
            {this.state.words.yes[language]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            activeOpacity={0.8}
            onPress={this._onButtonPressed.bind(this, false)}
            delayLongPress={200}
            onLongPress={this._playSound.bind(this, {id: 'no'})}>
          <Text style={styles.buttonEnglish}>
            {this.state.words.no['english']}
          </Text>
          <Text style={styles.piping}>|</Text>
          <Text style={styles.buttonTranslation}>
            {this.state.words.no[language]}
          </Text>
        </TouchableOpacity>
      </View>);

    return (
      <View style={styles.main}>
        <View style={styles.container}>
        {name}
          <TouchableOpacity
              activeOpacity={0.5}
              delayLongPress={150}
              onLongPress={this._playSound.bind(this, {id: 'inPain'})}
              style={styles.textContainer}>
            <Text style={styles.title}>
              {this.state.words.inPain.english}
            </Text>
            <Text style={styles.translation}>
              {this.state.words.inPain[language]}
            </Text>
          </TouchableOpacity>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          {buttons}
        </View>
      </View>
    );
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

  _onButtonPressed(inPain){
    if(inPain) {
      this.props.navigator.push({
        id: 'BodyParts',
        name: 'BodyParts',
        language: this.state.language,
        items: {},
        feels: {
          pain: {
            id: 'pain',
            english: 'Pain',
            translation: this.state.painTranslation
          },
        },
        bodyPartCounter: 0,
        feelingCounter: 1
      });
    } else {
      this.props.navigator.push({
        id: 'HowItFeels',
        name: 'HowItFeels',
        feels: {},
        feelingCounter: 0,
        language: this.state.language
      });
    }
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Image source={leftArrow} resizeMode={Image.resizeMode.contain} style={styles.leftArrow}/>
        <Text style={styles.backButton}>
          Back
        </Text>
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
          Show me where? Child
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
  backButton: {
    color: 'white',
    margin: 10*ratio,
    marginLeft: 0,
    fontFamily: 'Helvetica',
    fontSize: 14.333*ratio
  },
  leftArrow: {
    height: 20*ratio,
    width: 20*ratio,
  },
  navTitle: {
    color: 'white',
    margin: 10*ratio,
    fontSize: 17.199*ratio,
    fontFamily: 'AGBookRounded-Regular'
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
  left: {
    flex: 1
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  greeting1: {
    alignSelf: 'flex-start',
    margin: 15,
    marginBottom: 0,
    marginTop: 5,
    fontSize: 24.767*ratio,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  greeting2: {
    alignSelf: 'flex-start',
    margin: 15,
    marginBottom: 5,
    marginTop: 0,
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  translation: {
    fontSize: 24.767*ratio,
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
  buttonContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    flex: 1,
    paddingLeft: 15*ratio,
    paddingRight: 15*ratio
  },
  buttonEnglishOnly: {
    flex: 1,
    fontSize: 24.767*ratio,
    margin: 10,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  buttonEnglish: {
    flex: 1,
    fontSize: 24.767*ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  buttonTranslation: {
    flex: 1,
    fontSize: 24.767*ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  piping: {
    fontSize: 35.664*ratio,
    color: childPiping,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  button: {
    flexDirection: 'row',
    height: 45*ratio,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: childDark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: width-30*ratio,
    marginTop: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4
  },
});

module.exports = InPain;
