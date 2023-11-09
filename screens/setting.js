import React from "react";
import { View,Text,StyleSheet,SafeAreaView, TouchableWithoutFeedback, Image } from "react-native";
import Hamburger from '../components/hamburger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from "../components/DropDown";
import RNRestart from 'react-native-restart';

function Setting({navigation}){
      const[audio,setAudio]=React.useState(true); //true for on, false for off

      React.useEffect(()=>{
        getAudio();
      },[audio]);

      const getAudio=async()=>{
        var audioSound=await AsyncStorage.getItem("audio");
        if(audioSound!==null || audioSound !==undefined)
          setAudio(JSON.parse(audioSound));
      }
      const _openAudioSetting = async()=>{
          await AsyncStorage.setItem("audio", JSON.stringify(!audio));          
          setAudio(!audio);
        }
      const _resetGame =async()=>{
        let gameName=global.config.GAME_DATA.name;
        await AsyncStorage.removeItem('@playerMove'+global.config.GAME_DATA.name);
        await AsyncStorage.setItem('@saveSate'+global.config.GAME_DATA.name,JSON.stringify(null));
        RNRestart.restart();
      }
        return(
            <> 
            <SafeAreaView>
            <Hamburger navigation={navigation}/>
            <View style={{flexDirection:"column",width:"100%"}}>
                <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: 'green',width: "100%", paddingVertical: 0,backgroundColor: '#fff', borderRadius: 5, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 0, elevation: 10, shadowColor: '#b79972',marginVertical: 5,marginTop:10}}>
                  <Text style={{width: '75%',fontSize: 16,color: '#594039', textTransform: 'capitalize',fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10,}}>{global.config.GL_LANG[7][1]}</Text>
                  <View style={{borderRadius: 4,flex: 1, backgroundColor: 'rgba(183,153,114,1)', padding: 0, justifyContent: 'center', flexDirection: "column", alignItems: 'center', width: '25%',}}>
                    <TouchableWithoutFeedback onPress={_openAudioSetting }>
                    {
                      audio ?
                      <Image style={{width: 75, height: 75}} source={require('../assets/other/sounds.png')}/>
                        :
                        <Image style={{width: 75, height: 75}} source={require('../assets/other/mutes.png')}/>
                    }                     
                    </TouchableWithoutFeedback>
                  </View>
            </View>
            <Dropdown/>
            <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: 'green',width: "100%", paddingVertical: 0,backgroundColor: '#fff', borderRadius: 5, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 0, elevation: 10, shadowColor: '#b79972',marginVertical: 5}}>
                  <Text style={{width: '75%',fontSize: 16,color: '#594039', textTransform: 'capitalize',fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 10,}}>{global.config.GL_LANG[7][3]}</Text>
                  <View style={{borderRadius: 4,flex: 1, backgroundColor: 'rgba(183,153,114,1)', padding: 0, justifyContent: 'center', flexDirection: "column", alignItems: 'center', width: '25%',}}>
                    <TouchableWithoutFeedback onPress={_resetGame}>                    
                    <Image source={require("../assets/other/reset1.png")} style={{width: 75, height: 75, opacity: 1}} />
                    </TouchableWithoutFeedback>
                  </View>
              </View>
              
            </View>
            </SafeAreaView>
            </>
        )

}
const styles = StyleSheet.create({
  headings :{
		marginVertical:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#594039',
	},
  mains:{
      alignItems: 'center',
      width:'100%',
      marginVertical: 45
  },
    textstyle:{
        fontSize:20,
        paddingTop:10,
        marginLeft:10,
        fontWeight:"bold",
        textAlign:'left',
        color:"black"
      },
})

export default Setting