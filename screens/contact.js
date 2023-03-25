import React from "react";
import { View,Text,SafeAreaView } from "react-native";
import Hamburger from '../components/hamburger';
function Contact({navigation}){
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
        <View style={{backgroundColor: 'rgba(183,153,114,0.25)', height: '100%'}}>
            <Text>
                To buy the Buddhi Yoga game board and to learn more about ancient Indian board games, please contact us.
            </Text>
        </View>
        </SafeAreaView>
        </>
    )
}
export default Contact;