import React,{useState,useEffect} from "react";
import {WP_URL_COMMENT}  from '@env';
import { Animated,View,Text,Image, TouchableWithoutFeedback ,Easing,TouchableOpacity,ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const Comment = (props,{navigation}) => {
    console.log(props)
    const [postId,setPostId] = React.useState(props.route.params.postId);
    const [postList, setPostList] = React.useState([]);
    useEffect(()=>{
        getComments();
   },[postId]);

   async function getComments() {
    try {
    console.log(WP_URL_COMMENT+''+postId);
    let response = await fetch(
        WP_URL_COMMENT+'?post='+postId,
    );
    let responseJson = await response.json();
    postlist=responseJson;
    console.log(postlist);
    setPostList([postlist])
    
    return responseJson;
    } catch (error) {
    console.error(error);
    }
   
  } 

return(
    <View style={{width:"100%",height:"5%",marginVertical:0,paddingVertical:3,flexDirection:"row",backgroundColor:"#b79972"}}>
    <View style={{flexDirection:"row", alignItems:"center",width:"50%", justifyContent:"space-between"}}>
     <TouchableWithoutFeedback onPress={()=>props.navigation.goBack()}>
          <Icon name="arrow-left" size={23}  color="#000" style={{paddingHorizontal:10,}} />
     </TouchableWithoutFeedback>
     <View style={{width:"70%"}}>
         <Text style={{fontSize:20,fontWeight:"bold"}}>Comment</Text>
      </View>
      </View>
 </View>
)

}

export default Comment;