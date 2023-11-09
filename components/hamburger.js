import React,{useState, useEffect} from "react";
// import { isDebugBundle } from 'expo/build/launch/withExpoRoot';
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import '../globalVariables';

function Hamburger({navigation,infoFunction,resetStatus,magicStatus,howtoplayFunction, debugMode}){
    // const inDebugMode = __DEV__ || isDebugBundle();
    
    return(
        <View style={{borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.25)',height: 55,width:"100%",marginVertical:0,paddingVertical:10,flexDirection:"row",backgroundColor:'#D5C0A4', justifyContent: 'space-between'}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"flex-start"}}>
            <TouchableWithoutFeedback onPress={()=>navigation.toggleDrawer()}>
                <Icon name="bars" size={25} color="#582c24" style={{paddingHorizontal:10, marginHorizontal: 10}} />
            </TouchableWithoutFeedback>
            <View style={{}}>
                <Image source={{uri: global.config.GAME_DATA.PageLogo}} style={{width: 115, height: global.config.GAME_DATA.name == 'Buddhiyoga' ? 40 : 22}} />
        </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"10%"}}></View>
            {
                resetStatus &&
            
            <View style={{flexDirection:"row",justifyContent:"space-evenly",width:"40%",alignItems: 'center'}}>
                {/* info icons */}
                <TouchableWithoutFeedback onPress={(e)=>{navigation.navigate(global.config.GL_LANG[7][0])}}>
                <Image source={require("../assets/other/settingsla.png")} style={{width: 35, height: 35, opacity: 1}} />
                </TouchableWithoutFeedback>
                {
                    magicStatus ?
                    <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}}>
                    <Image source={require("../assets/other/magic.png")} style={{width: 45, height: 45, opacity: 1}} />
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={(e)=>{infoFunction(e)}} disabled>
                    <Image source={require("../assets/other/magic.png")} style={{width: 45, height: 45, opacity: 0.4}} />
                    </TouchableWithoutFeedback>
                }
                
                <TouchableWithoutFeedback onPress={(e)=>{howtoplayFunction(e)}}>
                <Image source={require("../assets/other/helpc.png")} style={{width: 35, height: 35}} />
                </TouchableWithoutFeedback>
                {/* {inDebugMode && 
                <>
                  <TouchableWithoutFeedback onPress={()=>{debugMode()}}>
                  <Image source={require("../assets/other/helpc.png")} style={{width: 35, height: 35}} />
                  </TouchableWithoutFeedback>
                </>} */}
            </View>
            }
            {
                !resetStatus &&
                <View style={{flexDirection:"row",justifyContent:"flex-end",width:"40%",alignItems: 'center'}}>
                 <TouchableWithoutFeedback onPress={(e)=>{navigation.goBack()}}>
                    <Image source={require("../assets/other/homela.png")} style={{width: 35, height: 35,right:20}} />
                </TouchableWithoutFeedback>
                    </View>
            }
        </View>
        
        
    )
}

export default Hamburger;