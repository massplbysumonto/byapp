import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Zoomin from './zoomin';
function Postsheader({navigation}){

    return(
        <View style={{width:"100%",height:"5%",marginVertical:0,paddingVertical:3,flexDirection:"row",backgroundColor:"#b79972"}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-evenly"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                 <Icon name="arrow-left" size={25} color="#000"/>
            </TouchableWithoutFeedback>
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{width:"50%",height:'100%'}} resizeMode="center"/>
                {/* <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                 <Zoomin/>
            </TouchableWithoutFeedback> */}
            </View>
        </View>
        
        
    )
}

export default Postsheader;