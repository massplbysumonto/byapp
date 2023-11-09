import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Sound from "react-native-sound";
import '../globalVariables';


function Postsheader(props){

    return(
        <View style={{width:"100%",height:55,borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.25)',marginVertical:0,paddingVertical:10,flexDirection:"row",backgroundColor:"#D5C0A4"}}>
           <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-between"}}>
            <TouchableWithoutFeedback onPress={()=>{props.navigation.goBack()}}>
            <Image  source={require("../assets/other/backsla.png")} style={{flex: 1, aspectRatio:2.28,
                 resizeMode:"contain"}} />
            </TouchableWithoutFeedback>
            <View style={{width:"70%"}}>
                <Image  source={{uri: global.config.GAME_DATA.PageLogo}} style={{flex: 1, aspectRatio:2.8,
                 resizeMode:"contain"}} />
             </View>
             </View>
             
        </View>
        
        
    )
}

export default Postsheader;