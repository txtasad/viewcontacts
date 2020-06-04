import React from 'react';
import {Navigation} from 'react-native-navigation';
import {StatusBar, View, Image,Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const widths=width*0.6;
const TAG = 'APP JS';
export default class MainApp extends React.Component{
  static get options() {
    return {
      statusBar: {
        backgroundColor: '#fff',
        drawBehind: false
      },
      topBar: {
        background: {
          color: '#fff'
        },
        title: {
          text: 'My Dashboard'
        },
        largeTitle: {
          visible: true,
        },
        drawBehind: false,
        visible: false,
        animate: false
      }
    };
  }


  constructor(properties) {
    super(properties);
    this.state = {
      authMode: 0
    }
  }

  componentWillUnmount() {
  }


  componentDidMount() {

    // we can check authentication here, if the app is logged in already and a offline session exists
    //or if valid move to our dashboard
    setTimeout(()=>this.showMainScreen(),2000);
  }


  showMainScreen = () => {
    console.log(TAG, 'showMainScreen')
    Navigation.setRoot({
      root: {
        stack: {
          id: 'MyDashBoard',
          children: [
            {
              component: {
                name: 'navigation.playground.Screen1'
              }
            }
          ]
        }
      }
    });
  };


  render() {
    console.log('render App')
    StatusBar.setBarStyle('dark-content', true)
    return (
      <View style={{flexDirection: 'column', flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'#f4f4f4'}}>
        <Image source={require("./assets/images/myscoot.png")} style={{tintColor:'#4A90E2',alignItems: 'center',justifyContent: 'center',}}/>
      </View>
    )
  }
}
