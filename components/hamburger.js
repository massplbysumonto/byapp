import React from "react";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function Hamburger({navigation,resetFunction,infoFunction}){

    return(
        <View style={{borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.25)',height: "7%",width:"100%",marginVertical:0,paddingVertical:10,flexDirection:"row",backgroundColor:'#D5C0A4'}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-evenly"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.toggleDrawer()}>
                <Icon name="bars" size={25} color="#582c24" />
            </TouchableWithoutFeedback>
                <Image  source={require("../assets/login/buddiyogaLogo.png")} style={{width:"50%",height:'100%'}} resizeMode="center"/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"15%"}}></View>
            
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"35%"}}>
                {/* info icons */}
                <TouchableWithoutFeedback onPress={(e)=>{resetFunction(e)}}>
                    <Icon name="rotate-right" size={25} color="#582c24" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}}>
                    <Icon name="question" size={25} color="#582c24" />
                </TouchableWithoutFeedback>
            </View>
        </View>
        
        
    )
}

export default Hamburger;