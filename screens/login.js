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
    SafeAreaView,
    ScrollView,
    Dimensions,
    ImageBackground
  } from 'react-native';
  import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import '../globalVariables';
import Checkforupdates from '../service/checkforupdates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () =>{
    // console.log(useNavigation().navigate());
    // console.log(global.config.GL_XML_DATA);
    const [isRotating, setRotation] = useState(true);
    const { width, height } = Dimensions.get('window');
    const [fadeAnim] = useState(new Animated.Value(isRotating ? 1 : 1));
    const [imageValue,setImageValue]=useState(["https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/IKS_M9zyw8_wDN.png?updatedAt=1696489358428","https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/MinistryEducation_iJF1IMYa4.png?updatedAt=1696489357924","https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/klogo1_vaSIJOGr8U.png?updatedAt=1698841327291"]);
  const langCode=useRef("");
    // useEffect(()=>{
    //     // console.log('1232132133');
    // async function getXMLFromDevice(){
    //     const boardName=await Checkforupdates.getInstalledXMLData();
    //     const data=await Checkforupdates.getXMLFromDevice(boardName.name);
    //     global.config.GAME_DATA=global.config.GL_XML_DATA[global.config.GL_XML_DATA.length - 1];
    //     setImageValue(global.config.GAME_DATA);
    // }
    //  getXMLFromDevice()
    // },[imageValue.length]);
   
    const checkOnPress = ()=>{
        setRotation(!isRotating);
    }

    const scrollViewRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
  
    const handleScroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.x+"hello"+event.nativeEvent.layoutMeasurement.width)
      const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    //   console.log(page)
      setCurrentPage(page);
    };

    const initiateGame=async(name)=>{
        // alert(0)
        // await Checkforupdates.downloadXMLFile(name);
        await fetchAppLang(name);
    }
      const fetchAppLang = async (name) => {
      // console.log("asdsadasdas");
      // console.log(global.config.GAME_DATA)
      const boardName=await Checkforupdates.getInstalledXMLData(name);
    //   const data=await Checkforupdates.getXMLFromDevice(boardName.name);
      var localeLangCode = await AsyncStorage.getItem("gameBoard");
      // console.log(global.config.GAME_DATA.name)
      // console.log(global.config.GL_XML_DATA[0]);
      
    switch (localeLangCode) {
      
      case 'bn':
        // console.log();
        langCode.current=global.config.GAME_DATA.bn;
        global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'bn');
          global.config.GL_LANG_CODE='bn';
          global.config.GL_LANG_NAME='Bengali';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.bn;
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    
      case 'or':
        langCode.current=global.config.GAME_DATA.or;
        global.config.GL_LANG=langCode.current;
        // console.log("or");
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'or');
          global.config.GL_LANG_CODE='or';
          global.config.GL_LANG_NAME='Odia';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.or;
          global.config.POST_URL="https://buddhiyoga.in/site/or/wp-json/wp/v2/posts/";
          break;
      
      case 'mr':
        langCode.current=global.config.GAME_DATA.mr;
        global.config.GL_LANG=langCode.current;
          // console.log("mr");
            await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/mr/wp-json/wp/v2/posts/");
            await AsyncStorage.setItem("gameBoard", 'mr');
            global.config.GL_LANG_CODE='mr';
            global.config.GL_LANG_NAME='Marathi';
            global.config.BOARD_URL=global.config.GAME_DATA.boardImage.mr;
            global.config.POST_URL="https://buddhiyoga.in/site/mr/wp-json/wp/v2/posts/";
            break;
          
      case 'hi':
        langCode.current=global.config.GAME_DATA.hi;
        global.config.GL_LANG=langCode.current;

          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/hi/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hi'); 
          global.config.GL_LANG_CODE='hi';
          global.config.GL_LANG_NAME='Hindi';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.hi;
          global.config.POST_URL="https://buddhiyoga.in/site/hi/wp-json/wp/v2/posts/";
          break;
    
      case 'gu':
        langCode.current=global.config.GAME_DATA.gu;
        global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/gu/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'gu'); 
          global.config.GL_LANG_CODE='gu';
          global.config.GL_LANG_NAME='Gujarati';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.gu;
          global.config.POST_URL="https://buddhiyoga.in/site/gu/wp-json/wp/v2/posts/";
          break;
      case 'kn':
        langCode.current=global.config.GAME_DATA.kn;
        global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'kn'); 
          global.config.GL_LANG_CODE='kn';
          global.config.GL_LANG_NAME='Kannada';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.kn;
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'ta':
      langCode.current=global.config.GAME_DATA.ta;
      global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/ta/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'ta'); 
          global.config.GL_LANG_CODE='ta';
          global.config.GL_LANG_NAME='Tamil';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.ta;
          global.config.POST_URL="https://buddhiyoga.in/site/ta/wp-json/wp/v2/posts/";
          break;
    case 'te':
      langCode.current=global.config.GAME_DATA.te;
      global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'te'); 
          global.config.GL_LANG_CODE='te';
          global.config.GL_LANG_NAME='Telugu';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.te;
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
    case 'hu':
      langCode.current=global.config.GAME_DATA.hu;
      global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'hu'); 
          global.config.GL_LANG_CODE='hu';
          global.config.GL_LANG_NAME='Hungarian';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.hu;
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
      default:
        langCode.current=global.config.GAME_DATA.en;
        global.config.GL_LANG=langCode.current;
          await AsyncStorage.setItem("postUrl", "https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/");
          await AsyncStorage.setItem("gameBoard", 'en'); 
          global.config.GL_LANG_CODE='en';
          global.config.GL_LANG_NAME='English';
          global.config.BOARD_URL=global.config.GAME_DATA.boardImage.en;
          global.config.POST_URL="https://buddhiyoga.in/site/en/wp-json/wp/v2/posts/";
          break;
   }  
//    console.log(useNavigation());
  }
  const image = {uri: '../assets/game/by_app_screen_bg.jpg'};

    return(
        <>
        {
            Object.keys(imageValue).length > 0 ?
  <>
    <SafeAreaView>
      <ImageBackground source={{uri: 'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/by_app_screen_bg1_GYuw8yxICX.jpg?updatedAt=1698830571014'}} resizeMode="cover">
        <ScrollView style={{}}>
              
          <View style={[styles.screen,{height: height,}]}>
            {/* <View style={{ width: '100%', alignItems: 'center',height:'100%', justifyContent:'center',}}> */}
            {/* <View style={{width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: 'auto', backgroundColor: 'red',}}></View> */}
            <View style={{width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: 'auto', marginTop: 50}}>
            <Image source={{uri:'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/buddhiyoga_logo_WsrHADUHv.png?updatedAt=1696489358030'}} style={{width:150,height:150,}} />
            </View>
              {/* <TouchableWithoutFeedback onPress={()=>checkOnPress()} style={{backgroundColor: 'grey'}}>
              <Animated.Image  style={styles.logo}
                source={{uri:'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/buddhiyoga_logo_WsrHADUHv.png?updatedAt=1696489358030'}}>
                </Animated.Image>
                </TouchableWithoutFeedback> */}
            <Animated.View style={{width: '100%',marginVertical: 0,flexDirection: "row", justifyContent: "space-evenly",alignItems: 'center',opacity:fadeAnim, flexWrap: 'wrap'}}>
          
            {/* <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: 300,
            borderRadius: 10,
            height: 'auto',
            paddingVertical: 12,
            marginVertical: 0}}
            >
                <View style={{backgroundColor:"red",width:"100%"}}>
                <Text style={{color: '#fff',fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>Start Game</Text>
                </View>
            </TouchableOpacity> */}
            
            
            {/* <TouchableWithoutFeedback onPress={async()=>await initiateGame("Buddhiyoga")}> */}
            <Link  onPress={async()=>await initiateGame("Buddhiyoga")} to={{screen:"LandingScreen",params: { gameName: 'Buddhiyoga' }}} style={{margin: 0, padding: 10,}}>
            <View style={{width:"auto",backgroundColor:"rgba(126,85,52,0.1)",borderRadius: 10,padding: 12,marginVertical: 0, borderColor: 'rgba(0,0,0,0.1)', borderWidth: 1}}>
            <Animated.Image  style={styles.logo1}
                source={{uri:'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/sarplogo_gFdaLOrJv.png?updatedAt=1697444058669'}}>
                </Animated.Image>
            
            </View>
            {/* <Text style={{color: '#fff',fontWeight: '700', textAlign: 'center',paddingHorizontal:10}}>Play</Text> */}
            </Link>
            {/* </TouchableWithoutFeedback> */}
            {/* <TouchableWithoutFeedback onPress={async()=>await initiateGame("99kapher")}> */}
            <Link  onPress={async()=>await initiateGame("99kapher")} to={{screen:"LandingScreen",params: { gameName: '99kapher' }}} style={{margin: 0, padding: 10}}>
            <View style={{width:"auto",backgroundColor:"rgba(126,85,52,0.1)",borderRadius: 10,padding: 12,marginVertical: 0, borderColor: 'rgba(0,0,0,0.1)', borderWidth: 1, height: 120}}>
              
            <Animated.Image  style={styles.logo}
                // source={{uri:'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/buddhiyoga_logo_MkwZ_fZNU0.png?updatedAt=1696499041905'}}
                source={{uri: 'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/logo_withmango&_withtext2_2Fx_HpiFn.png?updatedAt=1698830571319'}}
                
                >
                </Animated.Image>
            {/* <Text style={{color: '#fff',fontWeight: '700', textAlign: 'center',paddingHorizontal:10}}>Play</Text> */}
            </View>
            </Link>
           
           
            {/* </TouchableWithoutFeedback> */}
            
            </Animated.View >
          
            {/* </View> */}

            <View style={{ height: 'auto', width: '100%', marginBottom: 20,}}>
            <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{}}
          >
            {(imageValue).map((image, index) => (
                <>
              <View key={index} style={{alignItems: 'center', flexDirection: 'row', padding: 10, width: Dimensions.get('screen').width/3, justifyContent: 'center',}}>
              <Image key={index} source={{uri: image}} style={{ width: (index==2)? 100: 80, height: (index==2)? 32.5 : 80}}  />
              </View>
              </>
            ))}
          
            </ScrollView>
            {/* <View style={{alignItems: 'center', flexDirection: 'row',position:'relative', padding: 10, width: '100%', textAlign: 'center', justifyContent: 'center',}}>
              <Text style={{color:"black",position:'absolute',left:20}}>Developed by: </Text>
              <Image source={{uri: 'https://ik.imagekit.io/singh/BuddhiyogaMobileApplication/klogo_-E0X1zfCIv.png?updatedAt=1697087840624',}} style={{ width: 125 ,height: 52.5,}}  />
        
              </View> */}
            </View>
          </View>
              
        </ScrollView>
      </ImageBackground>
              
    </SafeAreaView>
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
        // backgroundColor: 'red',
        
       
        // opacity:0.7
    },
    logo:{
    width:100,
    height: 100,
    marginBottom:0,
    // backgroundColor: 'red'
   
    },
    logo1:{
      width:100,
      // backgroundColor: '#000',
      height: 100,
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
export default Login;