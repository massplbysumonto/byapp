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
 import game from "./screens/game";
 import home from "./screens/home";
 import login from "./screens/login";
 import Posts from "./screens/posts";
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
//  import HomeStack from './routes/homeStack';
const Stack = createNativeStackNavigator();
const App = (props)=> {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Login"
          component={login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="Game" component={game} />
        <Stack.Screen name="Posts" component={Posts} />
      </Stack.Navigator>
    </NavigationContainer>
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
 