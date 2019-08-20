'use strict';
var React = require('react-native');
var ViewSelected = require('./ViewSelected');
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
  Image,
  AlertIOS,
  Navigator,
} = React;
var PageControl = require('react-native-page-control');

var {
  width,
  height
} = Dimensions.get('window');
var imageWidth = width*0.8;
var ratio = 1;
var heightDiff = 200;
if ( width > 600 ) {
  ratio = 1.5;
  heightDiff = 240;
}

var childDark = '#496378';
var childLight = '#9DB7D5';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var grey = '#D3D3D3';
var green = '#00bf00';

var words = require('../../data/words.json');
var Sound = require('react-native-sound');
var leftArrow = require('../../images/files/leftarrow.png');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class BodyParts extends Component {
  constructor(props) {
    super(props);

    var routeLength = props.navigator.state.routeStack.length;
    var route = props.navigator.state.routeStack[routeLength-1];
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
    }

    var images = {
      back: require('../../images/Back.png'),
      bottom: require('../../images/Bottom.png'),
      chest: require('../../images/Chest.png'),
      ear: require('../../images/Ear.png'),
      elbow: require('../../images/Elbow.png'),
      eyes: require('../../images/Eyes.png'),
      groin: require('../../images/Groin.png'),
      hand: require('../../images/Hand.png'),
      fingers: require('../../images/Fingers.png'),
      knee: require('../../images/Knee.png'),
      lowerArm: require('../../images/LowerArm.png'),
      lowerLeg: require('../../images/LowerLeg.png'),
      mouth: require('../../images/Mouth.png'),
      neck: require('../../images/Neck.png'),
      nose: require('../../images/Nose.png'),
      plaster: require('../../images/Plaster.png'),
      shoulder: require('../../images/Shoulder.png'),
      thigh: require('../../images/Thigh.png'),
      toes: require('../../images/Toes.png'),
      tummy: require('../../images/Tummy.png'),
      boysPrivates: require('../../images/child/BoysPrivates.png'),
      girlsPrivates: require('../../images/child/GirlsPrivates.png'),
      head: require('../../images/child/Head.png')
    };

    var translations = require('../../data/bodyParts.json');

    var bodyParts = [
      { id: 'head',
        english: 'Head',
        translation: translations.head[id]},
      { id: 'ear',
        english: 'Ear',
        translation: translations.ear[id]},
      { id: 'eyes',
        english: 'Eyes',
        translation: translations.eyes[id]},
      { id: 'nose',
        english: 'Nose',
        translation: translations.nose[id]},
      { id: 'mouth',
        english: 'Mouth',
        translation: translations.mouth[id]},
      { id: 'neck',
        english: 'Neck',
        translation: translations.neck[id]},
      { id: 'chest',
        english: 'Chest',
        translation: translations.chest[id]},
      { id: 'tummy',
        english: 'Tummy',
        translation: translations.tummy[id]},
      { id: 'back',
        english: 'Back',
        translation: translations.back[id]},
      { id: 'shoulder',
        english: 'Shoulder',
        translation: translations.shoulder[id]},
      { id: 'elbow',
        english: 'Elbow',
        translation: translations.elbow[id]},
      { id: 'lowerArm',
        english: 'Lower Arm',
        translation: translations.lowerArm[id]},
      { id: 'hand',
        english: 'Hand',
        translation: translations.hand[id]},
      { id: 'fingers',
        english: 'Fingers',
        translation: translations.fingers[id]},
      { id: 'groin',
        english: 'Groin',
        translation: translations.groin[id]},
      { id: 'boysPrivates',
        english: 'Boys Privates',
        translation: translations.boysPrivates[id]},
      { id: 'girlsPrivates',
        english: 'Girls Privates',
        translation: translations.girlsPrivates[id]},
      { id: 'bottom',
        english: 'Bottom',
        translation: translations.bottom[id]},
      { id: 'thigh',
        english: 'Thigh',
        translation: translations.thigh[id]},
      { id: 'knee',
        english: 'Knee',
        translation: translations.knee[id] },
      { id: 'lowerLeg',
        english: 'Lower Leg',
        translation: translations.lowerLeg[id]},
      { id: 'toes',
        english: 'Toes',
        translation: translations.toes[id]},
      { id: 'plaster',
        english: 'Plaster',
        translation: translations.plaster[id]},
    ];

    var bodyPartCount = 0;
    if (Object.keys(route.items).length !== 0) {
      bodyPartCount = Object.keys(route.items).length;
    }
    var feelingCount = route.feelingCounter;
    if (Object.keys(route.feels).length !== 0) {
      feelingCount = Object.keys(route.feels).length;
    }

    this.state = {
      dataSource: ds.cloneWithRows(bodyParts),
      bodyParts: bodyParts,
      images: images,
      words: words,
      bodyPartCounter: bodyPartCount,
      feelingCounter: feelingCount,
      items: route.items,
      language: route.language,
      feels: route.feels,
      sound: sound,
      soundCompleted: true,
      tick: require('../../images/files/tick.png'),
    };
  }


  onScroll(event){
    var offsetX = event.nativeEvent.contentOffset.x;
    var currentpage = Math.floor((offsetX - width / 2) / width) + 1;
    this.setState({
      currentPage: currentpage
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
    var counterText = this.state.bodyPartCounter == 1 ? this.state.bodyPartCounter + ' item' : this.state.bodyPartCounter + ' items';
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.navRow}>
              <TouchableOpacity
                  activeOpacity={0.5}
                  delayLongPress={150}
                  onLongPress={this._playSound.bind(this, {id: 'where'})}
                  style={styles.left}>
                <Text style={styles.title}>
                  {this.state.words.where.english}
                </Text>
                <Text style={styles.translation}>
                  {this.state.words.where[language]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.darkLineBreak}/>
          <View style={styles.lineBreak}/>
          <ListView
            onScroll={this.onScroll.bind(this)}
            initialListSize={5}
            horizontal={true}
            pagingEnabled={true}
            bounces={false}
            decelerationRate={0}
            showsHorizontalScrollIndicator={true}
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.border} />}
          />
          <View style={styles.lineBreak}/>
          <PageControl style={{height: 7, padding: 10, alignSelf: 'stretch', alignItems: 'center', backgroundColor: '#f2f2f2'}}
            numberOfPages={23}
            currentPage={this.state.currentPage}
            hidesForSinglePage={true}
            pageIndicatorTintColor='#999999'
            indicatorSize={{width:5, height:5}}
            indicatorStyle={{marginLeft: 2.5, marginRight: 2.5}}
            currentIndicatorStyle={{width:7, height:7, borderRadius: 3.5, marginLeft: 1.5, marginRight: 1.5}}
            currentPageIndicatorTintColor='black' />
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.button}
                onPress={() => AlertIOS.alert(
                  words.alerts.restartTitle,
                  words.alerts.restartText,
                  [
                    {text: 'Cancel'},
                    {text: 'OK', onPress: () => navigator.parentNavigator.popToTop()}
                  ]
                )}>
              <Text style={styles.buttonText}>
                Restart
              </Text>
            </TouchableOpacity>
            <View
              style={styles.counter}>
              <Text style={styles.counterText}>{counterText}</Text>
            </View>
            <TouchableOpacity style={styles.button}
                activeOpacity={0.5}
                onPress={this._viewList.bind(this)}>
              <Text style={styles.buttonText}>
                Results
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderRow(data) {
    var images = this.state.images;
    var items = this.state.items;
    var language = this.state.language.id;
    var bodyPart = <View/>;
    var tick = items[data.id] ?
      (<TouchableOpacity style={styles.box}
            activeOpacity={0.5}
            onPress={this._selectBodyPart.bind(this, data)}>
        <Image style={styles.tick} resizeMode={Image.resizeMode.contain} source={this.state.tick}/>
      </TouchableOpacity>)
      : (<TouchableOpacity style={styles.box}
            activeOpacity={0.5}
            onPress={this._selectBodyPart.bind(this, data)}/>);
    var defaultStyle = (language=='default') ? (styles.bodyPartEnglishOnly) : (styles.bodyPart);

    /* Check if item has an image:
    May cause app to break if fetching
    an image that does not exist */
    if (images[data.id]) {
      bodyPart = (<Image source={images[data.id]} resizeMode={Image.resizeMode.cover} style={styles.image}/>)
    } else {
      bodyPart = (<View style={styles.imageContainer}>
        <Text style={styles.imageText}>No Image</Text>
      </View>)
    }

    return (
      <View style={styles.row}>
        <View style={{flex: 1}}/>
        <TouchableOpacity style={{justifyContent: 'center', width: width-99*ratio}}
            activeOpacity={0.8}
            delayLongPress={150}
            onLongPress={this._playSound.bind(this, data)}>
          {bodyPart}
        </TouchableOpacity>
        <View style={{flex: 1}}/>
        <View style={styles.lineBreak}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', margin: 5*ratio, marginLeft: 18*ratio, marginRight: 18*ratio}}>
          <TouchableOpacity style={{justifyContent: 'center', width: width-99*ratio, marginTop: 5, marginBottom: 5}}
              key={data.id}
              activeOpacity={0.5}
              delayLongPress={150}
              onLongPress={this._playSound.bind(this, data)}>
            <Text style={defaultStyle}>{data.english}</Text>
            <Text style={styles.bodyPartTranslation}>{data.translation}</Text>
          </TouchableOpacity>
          {tick}
        </View>
      </View>
    );
  }

  _selectBodyPart(data) {
    var id = data.id;
    var counter = this.state.bodyPartCounter;
    var items = this.state.items;
    var bodyParts = this.state.bodyParts;

    if(items[id]){
      delete items[id];
      counter = counter - 1;
    } else {
      counter = counter + 1;
      items[id] = data;
    }

    this.setState({
      dataSource: ds.cloneWithRows(bodyParts),
      bodyPartCounter: counter,
      items: items,
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

  _viewList() {
    var data = this.state.items;
    var sound = {};
    for(var id in data){
      sound[id] = this.state.sound[id];
    }
    this.props.navigator.push({
      id: 'ViewSelected',
      name: 'ViewSelected',
      language: this.state.language,
      items: this.state.items,
      bodyPartCounter: this.state.bodyPartCounter,
      feelingCounter: this.state.feelingCounter,
      feels: this.state.feels,
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Image source={leftArrow} resizeMode={Image.resizeMode.cover} style={styles.leftArrow}/>
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
  right: {
    paddingTop: 4,
    alignItems: 'center',
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
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  translation: {
    fontSize: 24.767*ratio,
    color: 'black',
    fontFamily: 'Helvetica'
  },
  bodyPartEnglishOnly: {
    fontSize: 24.767*ratio,
    color: 'black',
    paddingTop: 5*ratio,
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica'
  },
  bodyPart: {
    fontSize: 20.639*ratio,
    color: 'black',
    paddingTop: 5*ratio,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica'
  },
  bodyPartTranslation: {
    fontSize: 20.639*ratio,
    color: 'black',
    paddingBottom: 5,
    alignSelf: 'flex-start',
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
  list: {
    width: width,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  row: {
    width: width,
    height: height-heightDiff,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth-100*ratio,
    height: imageWidth-100*ratio,
    backgroundColor: 'white',
    marginBottom: 15,
    margin: 10,
  },
  image: {
    flexDirection: 'row',
    width: imageWidth-100*ratio,
    height: imageWidth-100*ratio,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignSelf: 'center',
    margin: 5,
  },
  imageText: {
    color: 'black',
    fontSize: 20.639*ratio,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    alignSelf: 'center'
  },
  box: {
    width: 50*ratio,
    height: 50*ratio,
    borderWidth: 4*ratio,
    marginLeft: 5*ratio,
    borderColor: grey,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  tick: {
    alignSelf: 'center',
    height: 40*ratio,
    width: 40*ratio,
  },
  border: {
    height: 1,
    marginTop: 10,
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4
  },
  buttonText: {
    fontSize: 20.639*ratio,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Helvetica'
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
    fontFamily: 'Helvetica'
  },
});

module.exports = BodyParts;
