import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Zoomin from './zoomin';
function Postsheader({navigation,increaseFont,decreaseFont,postID}){

    return(
        <View style={{width:"100%",height:"7%",borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.25)',marginVertical:0,paddingVertical:10,flexDirection:"row",backgroundColor:"#D5C0A4"}}>
           <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-between"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                 {/* <Icon name="arrow-left" size={23}  color="#000" style={{paddingHorizontal:10,}} /> */}
            <Image  source={require("../assets/other/backs.png")} style={{flex: 1, aspectRatio:2.28,
                 resizeMode:"contain"}} />
            </TouchableWithoutFeedback>
            <View style={{width:"70%"}}>
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{flex: 1, aspectRatio:2.8,
                 resizeMode:"contain"}} />
             </View>
             </View>
             
        </View>
        
        
    )
}

export default Postsheader;