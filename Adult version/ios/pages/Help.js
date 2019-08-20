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
  TextInput,
  LinkingIOS
} = React;

var Swiper = require('react-native-swiper');
var {
  width,
  height
} = Dimensions.get('window');
var ratio = 1;
if ( width > 600 ) {
  ratio = 1.5;
}

var childDark = '#496378';
var childLight = '#9DB7D5';
var adultDark = '#896d49';
var adultLight = '#C2A278';
var grey = '#D3D3D3';

var NAME = '@AsyncStorage:name';

class Help extends Component {
  constructor(props) {
    super(props);

    var help = [
      { id: "page1",
        title: "Personalise App",
        line1: "Hello, my name is: ",
        line2: "Enter your name to enable a personalised greeting in your patient's language."},
      { id: "page2",
        title: "Getting Started",
        line1: "Show me where? is used for finding the site of pain or injury in people with verbal disability or those unable to speak English.",
        line2: "For further information visit:",
        line3: "www.cardiffandvaleuhb.wales.nhs.uk/show-me-where"},
      { id: "page3",
        title: "Select Language",
        line1: "English and an additional language may be selected.",
        line2: "Text will be translated into the chosen language.",
        line3: "Press and hold text to activate translation audio."},
      { id: "page4",
        title: "Patient Selection",
        line1: "Swipe left or right to navigate through body parts.",
        line2: "Indicate patient selection by tapping the checkbox.",
        line3: "Press 'Results' to view all selections that have been made."},
      { id: "page5",
        title: "Other Information",
        line1: "Show me where? is endorsed by Cardiff and Vale University Health Board.",
        line2: "Copyright Cardiff and Vale UHB 2011",
        line3: ""},
    ];

    this.state = {
      help: help
    }
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    AsyncStorage.getItem(NAME).then((value) => {
      if (value){
        this.setState({text: value});
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
    var help = this.state.help;
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Swiper style={styles.wrapper}
              dot={<View style={{backgroundColor: '#999999', width: 6, height: 6, borderRadius: 3, marginLeft: 6, marginRight: 6, marginBottom: 20}} />}
              activeDot={<View style={{backgroundColor: 'black', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4, marginBottom: 20}} />}
              paginationStyle={{bottom: 50,}}
              loop={false}>
            {help.map((data) => this._renderPage(data))}
          </Swiper>
          <View style={styles.bottomPadding}/>
        </View>
      </View>
    );
  }

  _renderPage(data) {
    var lines = (<View style={styles.textContainer2}>
          <Text style={styles.content}>{data.line1}</Text>
          <Text style={styles.content}>{data.line2}</Text>
          <Text style={styles.content}>{data.line3}</Text>
        </View>);
    switch(data.id) {
      case "page1":
        lines = (<View style={styles.textContainer2}>
          <Text style={styles.content}>{data.line1}</Text>
          <TextInput style={styles.textBox}
            onChangeText={(text) =>
              {this.setState({text})
              AsyncStorage.setItem(NAME, text)}}
            autoCapitalize={'words'}
            maxLength={20}
            selectionColor={adultLight}
            underlineColorAndroid={adultDark}
            value={this.state.text}/>
          <Text style={styles.content}>{data.line2}</Text>
        </View>);
        break;
      case "page2":
        lines = (<View style={styles.textContainer2}>
            <Text style={styles.content}>{data.line1}</Text>
            <Text style={styles.content}>{data.line2}</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._PressURL.bind(this)}>
              <Text style={styles.URL}>{data.line3}</Text>
            </TouchableOpacity>
          </View>);
        break;
    }

    return (
      <View style={styles.container} key={data.id}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.darkLineBreak}/>
        <View style={styles.lineBreak}/>
        {lines}
      </View>
    )
  }

  _PressURL(){
    var url='http://www.cardiffandvaleuhb.wales.nhs.uk/show-me-where';
    LinkingIOS.openURL(url);
  }

  _saveName() {
    var text = this.state.text;
    AsyncStorage.setItem(NAME, text);
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            var route = navigator.parentNavigator.state.routeStack[0];
            if(route.id == 'Disclaimer'){
              navigator.parentNavigator.replacePrevious({
                id: 'Language',
                name: 'Language',
              });
            }
            navigator.parentNavigator.pop()
          }}>
        <Text style={styles.navButton}>
          Close
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
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
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'flex-start',
  },
  textContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  textContainer2: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
  },
  title: {
    fontSize: 29.72*ratio,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Helvetica',
  },
  lineBreak: {
    height: 1,
    width: width,
    backgroundColor: grey
  },
  darkLineBreak: {
    height: 1,
    width: width,
    backgroundColor: '#a6a6a6'
  },
  content: {
    color: 'black',
    fontSize: 24.767*ratio,
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'Helvetica',
  },
  URL: {
    color: adultDark,
    fontSize: 24.767*ratio,
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'Helvetica',
    textDecorationLine: 'underline',
  },
  bottomPadding: {
    height: 20,
    flex: 1
  },
  textBox: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50*ratio,
    borderWidth: 4*ratio,
    borderColor: grey,
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 24.767*ratio,
    textAlign: 'center',
    color: adultDark
  },
});

module.exports = Help;
