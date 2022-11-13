/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
//  import { createStackNavigator } from "react-navigation-stack";
//  import { createAppContainer } from "react-navigation";
 import Game from "./screens/game";
 import Home from "./screens/home";
 import Login from "./screens/login";
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
//  import HomeStack from './routes/homeStack';

const App = (props)=> {
  return (
    <Login />
  );
};
 
//  const screens=createStackNavigator({
 
//    Game:{
  
//        screen:Game
//    },
//    Home:{
 
//        screen:Home
//    },
 
//  });
 
//  const App=createAppContainer(screens);
 
//  const styles = StyleSheet.create({
//    container:{
//      flex:1,
//      alignContent:"center",
//      justifyContent:"center"
//    }
//  });
 
 export default App;
 