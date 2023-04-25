/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
 import Game from "./screens/game";
 import Login from "./screens/login";
 import Posts from "./screens/posts";
 import Contact from './screens/contact';
 import Hamburger from './components/hamburger';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from './screens/profile';
import Aboutus from './screens/aboutus';
 import Comment from './components/comment';

const App = (props)=> {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
    
  function DrawerRoutes(){
    return(
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home" 
    screenOptions={{headerShown:false,
      drawerStyle:{backgroundColor: '#D5C0A4'},
      drawerItemStyle:{borderBottomWidth:1,borderColor: 'rgba(0,0,0,0.4)',width:"100%", paddingVertical: 7,paddingHorizontal:5, marginHorizontal: 0,marginVertical: 0, },
       drawerType:'front',
       drawerActiveBackgroundColor: 'rgba(255,255,255,0.2)',
       drawerActiveTintColor: '#582c24',
       drawerInactiveTintColor: '#582c24',

      }}>
      <Drawer.Screen name="Home" component={Game} options={{
           drawerIcon: ({focused, size}) => (
            // <Icon name="question" size={25} color="#582c24" />   
            <Image source={require("./assets/other/home.png")} style={{width:'12.3%',height:'110%'}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name="Profile" component={Profile}  options={{
           drawerIcon: ({focused, size}) => (
            // <Icon name="question" size={25} color="#582c24" />   
            <Image source={require("./assets/other/register.png")} style={{width:'12.3%',height:'110%'}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name="About us" component={Aboutus}  options={{
           drawerIcon: ({focused, size}) => (
            // <Icon name="question" size={25} color="#582c24" />   
            <Image source={require("./assets/other/bookmark.png")} style={{width:'12.3%',height:'110%'}}/>
        
           ),
           
        }}/>
      <Drawer.Screen name="Contact us" component={Contact}  options={{
           drawerIcon: ({focused, size}) => (
            // <Icon name="question" size={25} color="#582c24" />   
            <Image source={require("./assets/other/messege.png")} style={{width:'12.3%',height:'110%'}}/>
        
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
        <Stack.Screen name="Game" component={DrawerRoutes} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Comment" component={Comment} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
 export default App;
 