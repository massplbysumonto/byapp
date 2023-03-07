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
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 

const App = (props)=> {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
    
  function DrawerRoutes(){
    return(
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home" screenOptions={{
      title: 'Home',
      drawerIcon: ({focused, size}) => (
       <Image
       source={require('./assets/login/buddiyogaLogo.png')}></Image>
      ),
       headerShown:false
   }}>
      <Drawer.Screen name="Home" component={Game} />
      <Drawer.Screen name="Home1" component={Posts}/>
      {/* <Drawer.Screen name="ProfileManagement" component={Profile} /> get a physical board about contact registration acknowledgement*/}
    </Drawer.Navigator>
    )
  }

  return (
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
  );
};
 export default App;
 