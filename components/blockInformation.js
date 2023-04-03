import React,{useState,useEffect} from "react";
import { Animated,View,Text, TouchableWithoutFeedback ,Easing,TouchableOpacity,ScrollView} from "react-native";
import { forwardRef } from "react";
import {WP_URL_POST}  from '@env';
import RenderHtml from 'react-native-render-html';


const BlockInformation = ({excerpt,quote,postId,navigation}) => {
    console.log(excerpt);
    // console.log(postId);
    const [isRotating, setRotation] = useState(true);
    const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [postList, setPostList] = React.useState([]);
    useEffect(()=>{
       if(isRotating==true)
       {
        stopincreaseLengthFunction();
       }
       else
       {
        increaseLengthFunction();
       }
    },[isRotating]);
    useEffect(()=>{
        getPosts();
         
   },[postId]);

   function getText(html){
    return html.replace(/<[^>]+>/g, '');
}

   const tagsStyles = {
    body: {
      color: 'black',
      backgroudColor:'#F2D997',
      fontSize: 13,
     adjustsFontSizeToFit:true,
     paddingHorizontal:10,
     ellipsizeMode:'tail', 
     numberOfLines: 2
    },
    a: {
      color: 'green'
    }
    };

    async function getPosts() {
        try {
        // console.log(WP_URL_POST+''+postId);
        let response = await fetch(
            WP_URL_POST+''+postId,
        );
        let responseJson = await response.json();
        postlist=responseJson;
        setPostList([postlist])
        
        return responseJson;
        } catch (error) {
        console.error(error);
        }
       
      }

    const increaseLengthFunction = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }

    const stopincreaseLengthFunction = () =>{
        
        Animated.AnimatedInterpolation
        Animated.timing(lengthValueHolder,{
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false 
        }).start();
    }

    const lengthData = lengthValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: ['15%','30%']
    });

    const zIndex = lengthValueHolder.interpolate({
        inputRange: [0,1],
        outputRange: [0,-2]
    });

    const viewLengthStyle={
        height: lengthData
    }

    const checkOnPress = ()=>{
        setRotation(!isRotating);
    }

return(
    
    <TouchableWithoutFeedback onPress={()=>checkOnPress()}>
        
    <Animated.View style={[{width:"100%", backgroundColor:"#b79972",borderTopLeftRadius: 15,borderTopRightRadius: 15,borderColor:"black"},viewLengthStyle]}>
    
    {(postList.length>0 && isRotating==false)?(
        <>
             <TouchableWithoutFeedback onPress={()=>changePage()}>
            <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",alignSelf:"center"}}>
                click here know more
            </Text>
            </TouchableWithoutFeedback>
            
             {/* <RenderHtml
                source={{
                html: postList[0].excerpt.rendered
                }}
                tagsStyles={tagsStyles}
                justifyContent="center"
                ellipsizeMode='tail' 
                numberOfLines={2}
            /> */}

            <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',
        backgroudColor:'#F2D997',
        fontSize: 13,
        justifyContent:"center",
        alignContent:"center",
        alignSelf:"center",
       adjustsFontSizeToFit:true}}
       numberOfLines={4} ellipsizeMode='tail'
       >{getText(postList[0].excerpt.rendered)}</Text>
           
            </>
            
        ):(<Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',
        backgroudColor:'#F2D997',
        fontSize: 13,
        justifyContent:"center",
        alignContent:"center",
        alignSelf:"center",
       adjustsFontSizeToFit:true}}>
                {excerpt}
        </Text>)}
        
    </Animated.View>
    
    </TouchableWithoutFeedback>
)
function changePage ()
{
  navigation.navigate('Posts',{postId:postId})
}

}

export default BlockInformation;