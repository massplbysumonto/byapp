import React from "react";
import { View,Text,SafeAreaView } from "react-native";
import Hamburger from '../components/hamburger';
function Aboutus({navigation}){
    const resetGame=(e)=>{
        setGameState(1);
      }
      const about=(e)=>{
        alert("about game");
    
      }
    return (
        <>
        <SafeAreaView>
        <Hamburger navigation={navigation} resetFunction={resetGame} infoFunction={about}/>
        <View style={{backgroundColor: 'rgba(183,153,114,0.25)',height: '100%'}}>
           <Text>
            About Us
           </Text>
        </View>
        </SafeAreaView>
        </>
    )
}
export default Aboutus;