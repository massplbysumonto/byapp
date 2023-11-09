import React,{useState,useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Animated,
    Button,
    Easing,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    ImageBackground
  } from 'react-native';
  import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import '../globalVariables';
import Checkforupdates from '../service/checkforupdates';

const LandingScreen = (props) =>{
    const [isRotating, setRotation] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(isRotating ? 1 : 1));
    const [imageValue,setImageValue]=useState([]);

    useEffect(()=>{
    async function getXMLFromDevice(){
        const boardName=await Checkforupdates.getInstalledXMLData(props.route.params.gameName);
        global.config.GAME_DATA=global.config.GL_XML_DATA[global.config.GL_XML_DATA.length - 1];
        setImageValue(global.config.GAME_DATA);
    }
     getXMLFromDevice()
    },[imageValue.length]);
   
    const checkOnPress = ()=>{
        setRotation(!isRotating);
    }

    return(
        <>
        {
            Object.keys(imageValue).length > 0 ?
            <>
            <ImageBackground source={{uri: 'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/by_app_screen_bg1_GYuw8yxICX.jpg?updatedAt=1698830571014'}} resizeMode="cover" style={styles.screen}>
                <View style={{width: '100%', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', height: 'auto',marginTop: 70}}>
                <Image source={{uri:imageValue.gameLogo[0]}} style={{width:150,height:150}} />
                </View>
                <TouchableWithoutFeedback onPress={()=>checkOnPress()}>
                <Animated.Image  style={props.route.params.gameName==="Buddhiyoga"?styles.srlogo:styles.logo}
                    source={{uri:imageValue.gameLogo[1]}}>
                    </Animated.Image>
                </TouchableWithoutFeedback>
                <Animated.View style={{width: '100%',marginVertical: 0,flexDirection: "row", justifyContent: "center",alignItems: 'center',opacity:fadeAnim, marginBottom: 70}}>
                <Link to={{screen:"Game"}}>
                <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: Dimensions.get('screen').width-65,
                borderRadius: 10,
                height: 'auto',
                paddingVertical: 12,
                marginVertical: 0}}><Text style={{color: '#fff',fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>Play</Text>
                </TouchableOpacity>
                </Link>
                </Animated.View >
            </ImageBackground>
        </>
        :
        <View>
            <Text style={{color:"black"}}>{imageValue.length}</Text>
        </View>
        }
        </>
    )   
}
const styles = StyleSheet.create({
    screen:{


        alignItems:"center",
        alignContent: 'space-between',
        justifyContent:'space-between',
        flexDirection: 'column',
        width:"100%",
        height:"100%",
        flex: 1,
        // marginVertical: 70,
        backgroundColor: 'red'
       
        // opacity:0.7
    },
    logo:{
    width:120,
    height: 120,
    marginBottom:0,
   
    },
    srlogo:{
      width: 294,
    //   backgroundColor: '#000',
      height: 103,
      marginBottom:0,
     
      },
    
    logoShadow:{
        height: 2,
        backgroundColor: "black",
        opacity:0.5,
        shadowOffset: { width: 2, height: 6 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 15, 
    }
});
export default LandingScreen;