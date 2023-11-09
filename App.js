import React,{useEffect, useRef} from 'react';
import './globalVariables';
import { Image } from 'react-native';
import Login from "./screens/login";
import Posts from "./screens/posts";
import Contact from './screens/contact';
import Comment from './components/comment';
import Share from './components/share';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './screens/profile';
import Aboutus from './screens/aboutus';
import Shop from './screens/shop';
import Language from './components/language';
import {NativeModules, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import chatGPT from './components/ChatGPT';
import{ SAVE_STATE } from '@env';
import DeviceInfo from "react-native-device-info";
import recentMoves from './components/recentMoves';
import Help from './components/Help';
import Setting from './screens/setting'
import Checkforupdates from './service/checkforupdates';
import LandingScreen from './screens/LandingPage';
import GameEngine from './screens/GameEngine';
import Game from './screens/game';
const App = (props)=> {

  useEffect(() => {
    // checkforupdates();
    // pushDatatoDB();
    // fetchAppLang();
    
  },[]);
  
  // const checkforupdates=async()=>{
  //   const xmlInfo= await Checkforupdates.downloadXMLFile();
  // }

  // const pushDatatoDB=()=>{
  //   var deviceID="";
  //   NetInfo.fetch().then(async (state) => {
  //     if(state.isConnected)
  //     {
  //       await DeviceInfo.getAndroidId().then(async(androidId) => {
  //         deviceID=androidId;
  //         await AsyncStorage.setItem('@deviceID', androidId);
  //       });
  //       const playerMove = await AsyncStorage.getItem('@bufferPlayerMove');
  //       if(playerMove!=null) {
  //     let data = {
  //           method: 'POST',
  //           credentials: 'same-origin',
  //           mode: 'same-origin',
  //           body: JSON.stringify({
  //             device:deviceID,
  //             playerMove:playerMove,
  //           }),
  //           headers: {
  //             'Accept':       'application/json',
  //             'Content-Type': 'application/json',
  //           },
  //         };
  //         let response=  fetch(SAVE_STATE,data)
  //           .then(response => response.json()) 
  //           .then(async(json) =>{
  //            if(json.code===200){
  //             await AsyncStorage.removeItem('@bufferPlayerMove');
  //           }
  //            else if(json.code===-919){
  //             console.error('Error');
  //            }
  //           })
  //         }
  //         else{
  //           console.log("playerMove :NULL");
  //         }
  //     }
  //     else{
  //     }
  //   });
  // }

  
  

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
    
  function DrawerRoutes(){
    return(
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home" 
    screenOptions={{headerShown:false,
      drawerStyle:{backgroundColor: '#D5C0A4'},
      drawerItemStyle:{borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.4)',width:"100%", paddingVertical: 7,paddingHorizontal:5, marginHorizontal: 0,marginVertical: 0 },
       drawerType:'front',
       drawerActiveBackgroundColor: 'rgba(255,255,255,0.2)',
       drawerActiveTintColor: '#582c24',
       drawerInactiveTintColor: '#582c24',
       drawerLabelStyle:{fontSize:24,lineHeight:30,width:"100%",height:"auto"}
      //  drawerContentStyle:{}

      }}>
      <Drawer.Screen name={global.config.GL_LANG[2]} component={GameEngine} options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/homela.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name={global.config.GL_LANG[3][0]} component={Profile}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/registerla.png")} style={{width:35,height:35,}}/>
        
           ),
           
        }}/>
        <Drawer.Screen  name={global.config.GL_LANG[4][0]} component={Shop}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/registerla.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name={global.config.GL_LANG[5]}  component={Aboutus}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/bookmark_1la.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name={global.config.GL_LANG[6]} component={Contact}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/messege1la.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
        <Drawer.Screen name={global.config.GL_LANG[7][0]} component={Setting}  options={{
           drawerIcon: ({focused, size}) => (
            <Image source={require("./assets/other/settingsla.png")} style={{width:35,height:35}}/>
        
           ),
           
        }}/>
    </Drawer.Navigator>
    )
  }
  return (
    <>
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
         <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
        />
        <Stack.Screen name="Game" component={DrawerRoutes} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="ChatGPT" component={chatGPT}/>
        <Stack.Screen name="recentMoves" component={recentMoves}/>
        <Stack.Screen name="Help" component={Help}/>
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Share" component={Share} />
        <Stack.Screen name="Language" component={Language} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
export default App;
 
