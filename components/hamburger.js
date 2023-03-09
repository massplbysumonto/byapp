import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function Hamburger({navigation,resetFunction,infoFunction}){
    // console.log(navigation);

    return(
        <View style={{width:"100%",height:"5%",marginVertical:0,paddingVertical:3,flexDirection:"row",backgroundColor:"#b79972"}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-evenly"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.toggleDrawer()}>
                <Icon name="bars" size={25} color="#000" />
            </TouchableWithoutFeedback>
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{width:"50%",height:'100%'}} resizeMode="center"/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"16%", marginLeft:90}}>
                {/* info icons */}
                <TouchableWithoutFeedback onPress={(e)=>{resetFunction(e)}}>
                    <Icon name="rotate-right" size={25} color="#000" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}}>
                    <Icon name="question" size={25} color="#000" />
                </TouchableWithoutFeedback>
            </View>
        </View>
        
        
    )
}

export default Hamburger;