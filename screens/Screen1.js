import React from "react";
import {Navigation} from 'react-native-navigation';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Text,
  Dimensions, TextInput, FlatList, StatusBar, Linking,
} from 'react-native'

import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import {Button, Flex, Provider, WingBlank, Modal,List} from '@ant-design/react-native';


import {TitleOptions} from "../utils/Constants";

import Toast from 'react-native-simple-toast';


import { connect } from 'react-redux';
import { addCat,deleteCat,addAll } from '../actions/act';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';


const TAG = 'MyDashboard';


const width = Dimensions.get('window').width;
const widths=width-50
const widthHalf=widths/2


class Screen1 extends React.Component {

  constructor(props) {
    super(props)
    console.log("csk->","constructor")
  }

  state = {
    catAddition:false,
    refreshing: false,
    sortby:""
  }


  static get options() {
    return Screen1.getDefaultOptions()
  }

  static getDefaultOptions() {
    const options = JSON.parse(JSON.stringify(TitleOptions));
    options.topBar.title.text = 'My Dashboard';
    options.topBar.largeTitle.fontSize = 36;
    return options
  }

  componentDidMount() {
    console.log("csk->","componentDidMount")
    this.props.addAll(
      [
        {name:"asad",phone:"9679198961",type:"home"},
        {name:"saad",phone:"9540154319",type:"home"}
      ]
    )

    // PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //   {
    //     'title': 'Contacts',
    //     'message': 'This app would like to view your contacts.',
    //     'buttonPositive': 'Please accept'
    //   }
    // ).then(()=>this.getList() )
  }

  setErrorState() {
    this.setState({
      error: true,
      refreshing: false
    })
  }


  _onRefresh = () => {
    //this.setState({refreshing: true, error: false});
  }



  toggleModal =() => {
        let m = this.state.catAddition
        // this.setState({
        //     catAddition: !m,
        // });
    }

    getList = () => {
      Contacts.getAll((err, contacts) => {
          if (err) {
              console.log("csk->",err);
          } else {
              console.log("csk->",contacts);
          }
      })
  }

  openWap= (con) =>{
      let url = 'whatsapp://send?text=' + "hii from myscoot" + '&phone=91' + con;
      Linking.openURL(url).then((data) => {
        console.log('WhatsApp Opened');
      }).catch(() => {
        alert('Make sure Whatsapp installed on your device');
      })
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    const {error} = this.state
    if (error) {
      return (
        <View style={{flexDirection: 'column', flex: 1,justifyContent:'center',alignItems:'center'}}>
          <Text>Something Went Wrong!</Text>
        </View>
      )
    }
    return (

      <Provider locale={enUS}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{marginTop:15,backgroundColor:'#fff'}}>
            {this.renderFilters()}
          </View>
          <ScrollView contentContainerStyle={[styles.scrollViewStyle]}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }>
            <View style={{flexDirection: 'column'}}>

              {this.renderFlatList()}
            </View>
          </ScrollView>
          <WingBlank style={[styles.bottomNav]}>
            <Flex>
              <Flex.Item style={{alignItems: 'center',justifyContent: 'center'}}>
                  <TouchableOpacity onPress={this.toggleModal}>
                <Image source={require("../assets/images/contacts.png")} style={{tintColor:'#4A90E2',alignItems: 'center',justifyContent: 'center'}}/>
                  </TouchableOpacity>
              </Flex.Item>

              <Flex.Item style={{alignItems: 'center',justifyContent: 'center'}}>
                <TouchableOpacity onPress={()=>{
                    Toast.showWithGravity('Settings!', Toast.SHORT, Toast.BOTTOM)
                  this.showScreen2();
                }}>
                  <Image source={require("../assets/images/settings.png")}/>

                </TouchableOpacity>
              </Flex.Item>

            </Flex>

          </WingBlank>
        </View>
      </Provider>
    );
  }


  renderFilters=()=>{
    const style=[styles.blockStyle]
    const styleA=[styles.blockStyle,styles.blockActive]
    let na=this.state.sortby==="nameA"?styleA:style;
    let nd=this.state.sortby==="nameD"?styleA:style;
    console.log("csk->",this.state.sortby,na)
    return(
        <View style={{ width : '100%', flexDirection:'column', backgroundColor: '#fff'}}>
          <View style={{flexDirection:'row',justifyContent:"flex-start",alignItems:"flex-start",marginLeft:18,marginBottom:2}}>
            <Text style={{color:"#969BA9"}}>Sort</Text>
          </View>

          <View style={{flexDirection:'row',justifyContent:"center",marginLeft:5,marginRight:5}}>

            <View style={na}>
              <TouchableOpacity onPress={()=>{
                this.setSortBy("nameA")
              }}>
              <Text style={{color:'#9690DF'}}>Name</Text>
              <Text style={{color:'#9690DF'}}>Ascending</Text>
              </TouchableOpacity>
              </View>

            <View style={nd}>
              <TouchableOpacity onPress={()=>this.setSortBy("nameD")}>
              <Text style={{color:'#FFC66B'}}>Name</Text>
              <Text style={{color:'#FFC66B'}}>Descending</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        )
  }



  renderFlatList(){


    let dataOrders=[]
        if(this.state.sortby==="")
          dataOrders=this.props.cats;
    else if(this.state.sortby==="nameD" && this.props.cats!==[])
      dataOrders=this.props.cats.reverse()
    else
      dataOrders=this.props.cats.sort(this.sortComparison)

    if(dataOrders===null || dataOrders===undefined || dataOrders.length===0) {
      return (

                <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:15}}>
                  <Text style={{fontSize:20}}>No Contacts Available!</Text>
                </View>
      )
    }




    else {
      return (
        <FlatList
            data={dataOrders}
            renderItem={({item,index})=>{
              console.log(TAG, 'item', item);
              return this.tasksCardContent(item,index)
            }}
            keyExtractor={(item)=>item.name}
            style={{paddingTop : 12}}
        >
        </FlatList>
    )}
  }


  tasksCardContent({name,phone,type},i) {
    if (name===null || phone===undefined || type===null) {
      return this.getErrorStateForCards()
    }

    return (
        <View style={[styles.cardStyle,{flex:1, flexDirection: 'column',backgroundColor:'#fff'}]}>

         <View style={{flexDirection:'row',flex:1,marginTop:16}}>
            <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#9690DF',marginLeft:2,fontSize:14}}> Name</Text>
            </View>
             <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
               <Text style={{color:'#24A588',fontSize:14,alignItems:'center',justifyContent:'center'}}>Number</Text>
            </View>

             <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
             <Text style={{color:'#9690DF',fontSize:14}}> Msg</Text>
            </View>
          </View>


          <View style={{flexDirection:'row',flex:1,marginTop:16,alignContent:'center',alignItems:'center',marginBottom:16}}>

          <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#969BA9',marginLeft:2,fontSize:16}}> {name} </Text>
            </View>

              <View style={{flex:0.4,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#31132E',fontSize:16}}> {phone} </Text>
              </View>
              <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
             <TouchableOpacity onPress={
                 ()=>{
                   let n=phone.length
                   let con = phone.substring(n-10,n)
                   console.log("csk->",con)
                   this.openWap(con)
               }}>
                 <Image source={require("../assets/images/whatsapp.png")} style={{width:32,height:32}}/>
                 </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems:'center',justifyContent:'center',width:'90%',height:1.5,borderWidth:1,borderRadius:1, borderColor:'#D4D5DA80'}}/>

          </View>
    )
  }


  sortComparison=(a,b)=>{
    let valA,valB;
    if(this.state.sortby==="nameA")
    {
      valA=a.name.toLowerCase()
      valB=b.name.toLowerCase()
    }else if(this.state.sortby==="colorA")
    {
      valA=a.color.toLowerCase()
      valB=b.color.toLowerCase()
    }else if(this.state.sortby==="breedA")
    {
      valA=a.breed.toLowerCase()
      valB=b.breed.toLowerCase()
    }

    if (valA < valB) //sort string ascending
      return -1
    if (valA > valB)
      return 1
    return 0
  }

  setSortBy=(key)=>{
    if(this.state.sortby===key){
      this.setState({sortby:""})
    }
    else{
      this.setState({sortby:key})
    }
  }


  showScreen2 = () => {
    console.log(TAG, 'showScreen2')
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.playground.Screen2',
        options: {
          topBar: {
            title: {
              text: "Settings"
            }
          }
        }
      }
    });
  }

  //end
}
const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 18,
    marginBottom: 16,
    height: 100,
    flexDirection: 'row',
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#DCDCDC',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
      android: {
        elevation: 8,
        borderRadius: 16,
        backgroundColor: '#f1f1f1',

      },
    }),

  },
  blockStyle: {
    marginHorizontal: 12,
    marginBottom: 16,
    width:widthHalf,
    flexDirection: 'row',
    justifyContent:"space-around",
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#DCDCDC',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
      android: {
        padding:4,
        elevation: 3,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1CAD0',

      },
    }),

  },
  blockActive:{
    backgroundColor:'#EBECEF',
    borderColor:'#472C44'
  },

  bottomNav:{
    height:70,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 36,

    marginLeft:-1,
    marginRight:-1,
    backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center'
  },
  submit:{
    padding:5,
    backgroundColor:'#fff',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FFCCBA',
    marginLeft:17,
    marginRight:17,
    marginBottom: 8
  },
  submitText:{
    color:'#F78765',
    textAlign:'center',
  },
  redBox:{backgroundColor:'#FF5D5D20',padding:4,borderRadius:4,marginLeft:8},
  redBoxText:{color:'#FF5D5D',fontSize:11},
  grayBox:{backgroundColor:'#969BA920',padding:4,borderRadius:4,marginLeft:8},
  grayBoxText:{color:'#969BA9',fontSize:11},
});


const mapStateToProps = (state) => {
  console.log("csk-> state",state);
  return {
    cats: state.catReducer.catList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name,phine,type) => dispatch(addCat(name,phine,type)),
    addAll: (contacts) => dispatch(addAll(contacts)),
    delete: (cat) => dispatch(deleteCat(cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen1);
