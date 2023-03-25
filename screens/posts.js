import React,{useEffect,useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Card,
  ScrollView,
  Animated,
  TouchableOpacity,TouchableWithoutFeedback
} from 'react-native';

import PostsPictureComponent from '../components/PostsPictureComponent';
import PostsContentComponent from '../components/PostsContentComponent';
import {WP_URL_POST}  from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import Postsheader from '../components/postsheader';
import BlockInformation from '../components/blockInformation';


const Posts= (props,{navigation}) => {
  console.log(props)
    const [postList, setPostList] = React.useState([]);
    const [postId,setPostId] = React.useState(props.route.params.postId);
    const slideUpValue= new Animated.Value(0);
    const slideDownValue= new Animated.Value(1);    

    useEffect(()=>{
         getPosts();
        
         
         
    },[postId]);
    useEffect(()=>{
         if(postList.length >0){
          
        _start();
        _end();
         }
    })


    handleBackButtonClick= () => {
        console.log(props);
        props.navigation.goBack(null);
        return true;
      }
      
    
    async function getPosts() {
        try {
        console.log(WP_URL_POST+''+postId);
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
      const _start = async () => {
        console.log("hello")
        return Animated.parallel([
          Animated.timing(slideUpValue, {
    
            toValue: 1,
    
            duration: 500,
    
            useNativeDriver: true
    
          })
    
        ]).start();
    
      };
      const _end = async () => {
        console.log("hello")
        return Animated.parallel([
          Animated.timing(slideDownValue, {
    
            toValue: 0,
    
            duration: 500,
    
            useNativeDriver: true
    
          })
    
        ]).start();
    
      };

    return (<>
    <SafeAreaView style={styles.cardViewOverAll}>
            <View style={{backgroundColor:"#cfc19f"}}>
              <Postsheader navigation={props.navigation}/>
              
            {
            (postList.length>0) ?( 
              <View>
                <Animated.View

                style={{
      
                  transform: [
      
                    {
      
                      translateY: slideUpValue.interpolate({
      
                        inputRange: [0, 1],
      
                        outputRange: [600, 0]
      
                      })
      
                    }
      
                  ],
                }}
      
              >
                
                    <ScrollView contentInsetAdjustmentBehavior="automatic">
                        <PostsPictureComponent postId={15} subTitle={postList[0].excerpt.rendered} title={postList[0].title.rendered} imageUrl={postList[0].better_featured_image.media_details.sizes.large.source_url} />
                        <PostsContentComponent content={postList[0].content.rendered} />
                    </ScrollView>
                   
                
               
                 </Animated.View>
                 
                 </View>
                 
                 
            ):(<Animated.View style={{
      
              transform: [
  
                {
  
                  translateY: slideDownValue.interpolate({
  
                    inputRange: [0, 1],
  
                    outputRange: [600, 1]
  
                  })
  
                }
  
              ],
              width:"100%",
              height:"100%"
            }}>
              <SafeAreaView style={styles.screen}>
              <View >
              <Text>
                Loding ...
            </Text>
            </View>
            </SafeAreaView>
            </Animated.View>)
        }
        
          </View>
           <View style={{width:"100%",height:"40%",backgroundColor:"green"}}></View>
           </SafeAreaView>
    
    </>);

};

const styles = StyleSheet.create({
    screen:{
        
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
        height:"100%",
        backgroundColor: "#cfc19f"
    },
    cardViewOverAll:{
        width:"100%",
        height:"100%",
        backgroundColor:'#cfc19f'
        
        
    },
    cardView:{
        paddingTop:"10%",
        width:"75%",

    }
    }
    );


export default Posts;
