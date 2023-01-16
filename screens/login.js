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
  } from 'react-native';
  import { Link } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { handImage } from 'react-native-gesture-handler';




const login = () =>{
    const [isRotating, setRotation] = useState(true);
    const [rotateValueHolder,setRotateHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [fadeAnim] = useState(new Animated.Value(isRotating ? 0 : 1));
    useEffect(()=>{
       if(isRotating==true)
       {
        startImageRotateFunction();
        stopincreaseLengthFunction();
        fadeOutView()
       }
       else
       {
        stopImageRotateFunction();
        increaseLengthFunction();
        fadeInView();
       }
    },[isRotating]);
    
    const startImageRotateFunction = () =>{
       
        Animated.timing(rotateValueHolder,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start()

    }
    const stopImageRotateFunction = () =>{
        Animated.timing(rotateValueHolder,{
            toValue: 0,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).stop();
    }

    const increaseLengthFunction = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const fadeInView = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(fadeAnim,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const fadeOutView = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(fadeAnim,{
            toValue: 0,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const stopincreaseLengthFunction = () =>{
        
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 0,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }
    const RotateData = rotateValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','360deg']
    });
    const lengthData = lengthValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['10%','90%']
    });
    const viewLengthStyle={
        width: lengthData
    }

    const checkOnPress = ()=>{
        setRotation(!isRotating);
    }

    return(
        <>
        <View style={styles.screen}>
           
           <TouchableWithoutFeedback onPress={()=>checkOnPress()}>
           <Animated.Image  style={[styles.logo,
           {transform : [{rotate:RotateData}]}
            ]}
            source={require("../assets/login/buddhiyoga_logo.png")}>
            </Animated.Image>
            </TouchableWithoutFeedback>
            {/* </TouchableWithoutFeedback> */}
            
            <Animated.View style={[styles.logoShadow,viewLengthStyle]}
            >

            </Animated.View>

            
            
            {/* <Animated.View style={{marginTop:50,opacity:fadeAnim}}>
                <Button title='Start New Game'></Button>
                <Button title='About the Game'>About Us</Button>
            </Animated.View> */}
         <Animated.View style={{width: 300,marginVertical: 15,flexDirection: "row", justifyContent: "center",alignItems: 'center',opacity:fadeAnim,}}>
        <Link to={{screen:"Game"}}>
        <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: 300,
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 12,
        marginVertical: 0}}><Text style={{color: '#fff',lineheight: 30,fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>Start New Game</Text>
        </TouchableOpacity>
        </Link>
        </Animated.View >
        
     {/* <Animated.View style={{width: 300,marginVertical: 15,flexDirection: "row", justifyContent: "center",alignItems: 'center',opacity:fadeAnim}}>
          <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: 300,
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 12,
        marginVertical: 0}}><Text style={{color: '#fff',lineheight: 40,fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>About the Game</Text></TouchableOpacity>
        </Animated.View >

        <Animated.View style={{width: 300,marginVertical: 15,flexDirection: "row", justifyContent: "center",alignItems: 'center',opacity:fadeAnim}}>
        <Link to={{screen:"Posts", params:{postId:15} }} >
          <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: 300,
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 12,
        marginVertical: 0}}><Text style={{color: '#fff',lineheight: 40,fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>Posts</Text></TouchableOpacity>
        </Link>
        </Animated.View > */}
                
            
        </View>
        </>
    )   
}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
        height:"100%",
        backgroundColor: "#F2D997",
        opacity:0.5
    },
    logo:{
    width:300,
    height: 300,
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
export default login;