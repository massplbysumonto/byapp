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
import Profile from './screens/profile';
import Aboutus from './screens/aboutus';
 

const App = (props)=> {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
    
  function DrawerRoutes(){
    return(
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home" 
    screenOptions={{headerShown:false,
      drawerStyle:{},
      drawerItemStyle:{borderBottomWidth:1,width:"100%",marginTop:30,paddingTop:10, },
       drawerType:'front',

      }}>
      <Drawer.Screen name="Home" component={Game} />
      <Drawer.Screen name="Profile" component={Profile}/>
      <Drawer.Screen name="About us" component={Aboutus}/>
      <Drawer.Screen name="Contact us" component={Contact}/>
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
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
 export default App;
 