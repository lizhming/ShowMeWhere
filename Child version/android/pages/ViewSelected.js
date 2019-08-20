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
  ListView,
  Alert,
  Navigator,
  Image,
  Dimensions
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

class ViewSelected extends Component {
  constructor(props) {
    super(props);

    var length = props.navigator.state.routeStack.length;
    var route = props.navigator.state.routeStack[length-1];
    var items = route.items;
    var id = route.language.id;

    var sound = {
      where: id + 'showmewhere.mp3',

      back: id + 'back.mp3',
      bottom: id + 'bottom.mp3',
      chest: id + 'chest.mp3',
      ear: id + 'ear.mp3',
      elbow: id + 'elbow.mp3',
      eyes: id + 'eyes.mp3',
      groin: id + 'groin.mp3',
      hand: id + 'hand.mp3',
      fingers: id  + 'fingers.mp3',
      knee: id + 'knee.mp3',
      lowerArm: id + 'lowerarm.mp3',
      lowerLeg: id + 'lowerleg.mp3',
      mouth: id + 'mouth.mp3',
      neck: id + 'neck.mp3',
      nose: id + 'nose.mp3',
      plaster: id + 'plaster.mp3',
      shoulder: id + 'shoulder.mp3',
      thigh: id + 'thigh.mp3',
      toes: id + 'toes.mp3',
      tummy: id + 'tummy.mp3',

      boysPrivates: id + 'boysprivates.mp3',
      girlsPrivates: id + 'girlsprivates.mp3',
      head: id + 'head.mp3',

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
      nofeel: id + 'cannotfeel.mp3',
      drowsy: id + 'drowsy.mp3',
      sick: id + 'sick.mp3',
      pain: 'none.mp3'
    };

    var images = {
      back: require('../../images/BackThumbnail.png'),
      bottom: require('../../images/BottomThumbnail.png'),
      chest: require('../../images/ChestThumbnail.png'),
      ear: require('../../images/EarThumbnail.png'),
      elbow: require('../../images/ElbowThumbnail.png'),
      eyes: require('../../images/EyesThumbnail.png'),
      groin: require('../../images/GroinThumbnail.png'),
      hand: require('../../images/HandThumbnail.png'),
      fingers: require('../../images/FingersThumbnail.png'),
      knee: require('../../images/KneeThumbnail.png'),
      lowerArm: require('../../images/LowerArmThumbnail.png'),
      lowerLeg: require('../../images/LowerLegThumbnail.png'),
      mouth: require('../../images/MouthThumbnail.png'),
      neck: require('../../images/NeckThumbnail.png'),
      nose: require('../../images/NoseThumbnail.png'),
      plaster: require('../../images/PlasterThumbnail.png'),
      shoulder: require('../../images/ShoulderThumbnail.png'),
      thigh: require('../../images/ThighThumbnail.png'),
      toes: require('../../images/ToesThumbnail.png'),
      tummy: require('../../images/TummyThumbnail.png'),
      boysPrivates: require('../../images/child/BoysPrivatesThumbnail.png'),
      girlsPrivates: require('../../images/child/GirlsPrivatesThumbnail.png'),
      head: require('../../images/child/HeadThumbnail.png')
    };


    var feelingData = route.feels;

    this.state = {
      dataSource: ds.cloneWithRows(items),
      words: words,
      items: items,
      bodyPartCounter: route.bodyPartCounter,
      feelingCounter: route.feelingCounter,
      language: route.language,
      images: images,
      feels: ds.cloneWithRows(feelingData),
      feelingData: feelingData,
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
    var language = this.state.language;
    var feelingCounterText = (this.state.feelingCounter == 1) ? (this.state.feelingCounter + ' item selected') : (this.state.feelingCounter + ' items selected');
    var bodyPartCounterText = (this.state.bodyPartCounter == 1) ? (this.state.bodyPartCounter + ' item selected') : (this.state.bodyPartCounter + ' items selected');

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.languageTitle}>Language: </Text>
              <Text style={styles.languageValue}>{language.name}</Text>
            </Text>
          </View>
          <View style={styles.lineBreak}/>
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.title}>Feeling: </Text>
              <Text style={styles.languageValue}>{feelingCounterText}</Text>
            </Text>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <ListView
            style={styles.feelingList}
            dataSource={this.state.feels}
            renderRow={this._renderFeeling.bind(this)}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.border} />}
          />
          <View style={styles.lineBreak}/>
          <View style={styles.darkLineBreak}/>
          <View style={styles.textContainer}>
            <Text>
              <Text style={styles.title}>Where: </Text>
              <Text style={styles.languageValue}>{bodyPartCounterText}</Text>
            </Text>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <ListView
            style={styles.bodyPartList}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.border} />}
          />
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
          </View>
        </View>
      </View>
    );
  }

  _renderFeeling(data) {
    var language = this.state.language.id;
    var defaultStyle = (language=='default') ? (styles.bodyPartEnglishOnly) : (styles.bodyPart);
    return (
      <View style={styles.row}>
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.navRow}
            onPress={this._selectFeeling.bind(this, data)}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, data)}>
          <View style={styles.left}>
            <Text style={defaultStyle}>{data.english}</Text>
            <Text style={styles.translation}>{data.translation}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _selectFeeling(data) {
    var id = data.id;
    if(id!=='pain'){
      Alert.alert(
        data.english,
        this.state.words.alerts.remove + '?',
        [
          {text: 'Cancel'},
          {text: 'OK', onPress: () => this._removeFeeling(data)}
        ]
      );
    }
  }

  _removeFeeling(data) {
    var feelingData = this.state.feelingData;
    var counter = this.state.feelingCounter;

    var id = data.id;
    if(feelingData[id]){
      delete feelingData[id];
      counter = counter - 1;
    }

    this.setState({
      feelingData: feelingData,
      feelingCounter: counter,
      feels: ds.cloneWithRows(feelingData),
    });

    this.props.navigator.replaceAtIndex(
      {
        id: 'HowItFeels',
        name: 'HowItFeels',
        feelingCounter: counter,
        feels: feelingData,
        language: this.state.language,
      }, 2, null
    );

    this.props.navigator.replacePrevious(
      {
        id: 'BodyParts',
        name: 'BodyParts',
        items: this.state.items,
        bodyPartCounter: this.state.bodyPartCounter,
        feelingCounter: counter,
        language: this.state.language,
        feels: feelingData
      }
    );
  }

  _renderRow(data) {
    var language = this.state.language.id;
    var id = data.id;
    var image = this.state.images[id];
    var defaultStyle = (language=='default') ? (styles.bodyPartEnglishOnly) : (styles.bodyPart);
    return (
      <View style={styles.row}>
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.navRow}
            onPress={this._selectBodyPart.bind(this, data)}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, data)}>
          <View style={styles.left}>
            <Text style={defaultStyle}>{data.english}</Text>
            <Text style={styles.translation}>{data.translation}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={image}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _selectBodyPart(data) {
    Alert.alert(
      data.english,
      this.state.words.alerts.remove + '?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this._removeItem(data)}
      ]
    );
  }

  _removeItem(data) {
    var counter = this.state.bodyPartCounter;
    var items = this.state.items;

    var id = data.id;
    if(items[id]){
      delete items[id];
      counter = counter - 1;
    }

    this.setState({
      bodyPartCounter: counter,
      items: items,
      dataSource: ds.cloneWithRows(items),
    });

    this.props.navigator.replacePrevious(
      {
        id: 'BodyParts',
        name: 'BodyParts',
        items: items,
        bodyPartCounter: counter,
        feelingCounter: this.state.feelingCounter,
        language: this.state.language,
        feels: this.state.feels
      }
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
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  languageTitle: {
    paddingRight: 5,
    fontFamily: 'Roboto-Bold',
    fontSize: 20.639*ratio,
    color: 'black'
  },
  languageValue: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20.639*ratio,
    color: 'black'
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Regular',
    fontSize: 20.639*ratio,
    color: 'black'
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 2,
    paddingTop: 2,
  },
  navRow: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bodyPartEnglishOnly: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  bodyPart: {
    fontSize: 20.639*ratio,
    color: 'black',
    fontFamily: 'Roboto-Bold',
    marginTop: 5
  },
  translation: {
    fontSize: 20.639*ratio,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    marginBottom: 5
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
  feelingList: {
    alignSelf: 'stretch',
    flex: 2,
    backgroundColor: '#f2f2f2'
  },
  bodyPartList: {
    alignSelf: 'stretch',
    flex: 3,
    backgroundColor: '#f2f2f2'
  },
  row: {
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    marginLeft: 5,
    flex: 1,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: grey,
    margin: 2*ratio
  },
  image: {
    width: 75*ratio,
    height: 75*ratio,
    margin: 2
  },
  border: {
    height: 1,
    backgroundColor: grey,
    alignSelf: 'stretch'
  },
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

module.exports = ViewSelected;
