import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Zoomin from './zoomin';
function Postsheader({navigation,increaseFont,decreaseFont}){

    return(
        <View style={{width:"100%",height:"5%",marginVertical:0,paddingVertical:3,flexDirection:"row",backgroundColor:"#b79972"}}>
           <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-between"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                 <Icon name="arrow-left" size={23}  color="#000" style={{paddingHorizontal:10,}} />
            </TouchableWithoutFeedback>
            <View style={{width:"70%"}}>
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{flex: 1, aspectRatio:2.8,
                 resizeMode:"contain"}} />
             </View>
             </View>
             <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"flex-end"}}>
                <TouchableWithoutFeedback onPress={(e)=>increaseFont()}>
                <View style={{width:"20%",}}>
                <Image  source={require("../assets/other/increase.png")} style={{flex: 1, aspectRatio:1,
                 resizeMode:"contain"}} />
                  </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>decreaseFont()}>
            <View style={{width:"30%"}}>
            <Image  source={require("../assets/other/decrease.png")} style={{flex: 1, aspectRatio:1,
                 resizeMode:"contain"}} />
                  </View>
            </TouchableWithoutFeedback>
            </View>
        </View>
        
        
    )
}

export default Postsheader;