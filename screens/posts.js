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
  TouchableOpacity
} from 'react-native';

import PostsPictureComponent from '../components/PostsPictureComponent';
import PostsContentComponent from '../components/PostsContentComponent';
import {WP_URL_POST}  from '@env';
import { Title,Divider } from 'react-native-paper';





const Posts= (props) => {

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
       
       
        {
            <View style={{backgroundColor:"#cfc19f"}}>
            {
            (postList.length>0) ?( 
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
                <SafeAreaView style={styles.cardViewOverAll}>
                    <ScrollView >
                    <TouchableOpacity onPress={()=>handleBackButtonClick()} >
                            <Text style={{margin:10}} >
                                Go Back
                            </Text>
                    </TouchableOpacity>
                        <PostsPictureComponent postId={15} subTitle={postList[0].excerpt.rendered} title={postList[0].title.rendered} imageUrl={postList[0].better_featured_image.media_details.sizes.large.source_url} />
                        <PostsContentComponent content={postList[0].content.rendered} />
                    </ScrollView>
                </SafeAreaView>
                 </Animated.View>
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
        }
    
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
