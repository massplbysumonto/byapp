import React,{useState,useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Animated,
    Button,
    Easing,
    Text
  } from 'react-native';



const Login = () =>{
    
    useEffect(()=>{
        
    });
    let rotateValueHolder =  new Animated.Value(0);
    let lengthValueHolder = new Animated.Value(0);
    
    const startImageRotateFunction = () =>{
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder,{
            toValue: 1,
            duration: 6000,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start(()=> startImageRotateFunction())
    }

    const increaseLengthFunction = () =>{
        lengthValueHolder.setValue(0);
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 1,
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

    return(
        <View style={styles.screen}>
           
           
           <Animated.Image  style={[styles.logo,
           {transform : [{rotate:RotateData}]}
            ]}
            source={require("../assets/login/buddhiyoga_logo.png")}>
            </Animated.Image>
            <Animated.View style={[styles.logoShadow,viewLengthStyle]}
            >

            </Animated.View>
            <Button title='Google Login' onPress={increaseLengthFunction()}></Button>
        </View>
        
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
export default Login;