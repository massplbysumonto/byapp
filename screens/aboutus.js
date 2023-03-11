import React from "react";
import { View,Text } from "react-native";
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
        <Hamburger navigation={navigation} resetFunction={resetGame} infoFunction={about}/>
        <View style={{backgroundColor: 'rgba(183,153,114,0.25)',height: '100%'}}>
           <Text>
            About Us
           </Text>
        </View>
        </>
    )
}
export default Aboutus;