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
        <View>
            <Text>
                To buy the Buddhi Yoga game board and to learn more about ancient Indian board games, please contact us.
            </Text>
        </View>
        </>
    )
}
export default Aboutus;