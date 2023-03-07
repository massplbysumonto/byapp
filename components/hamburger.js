import React from "react";
import { Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function Hamburger(){
    // const myIcon = ;
    return(
        <View style={{width:"100%",height:"5%",marginVertical:0,paddingVertical:3,flexDirection:"row"}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-evenly"}}>
            <Icon name="bars" size={25} color="#000" />
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{width:"50%",height:'100%'}} resizeMode="center"/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"16%", marginLeft:90}}>
                {/* info icons */}
                <Icon name="rotate-right" size={25} color="#000" />
                <Icon name="question" size={25} color="#000" />
            </View>
        </View>
        
        
    )
}

export default Hamburger;