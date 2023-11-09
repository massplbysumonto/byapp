import React,{useEffect,useState,useRef} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Share
} from 'react-native';

import PostsPictureComponent from '../components/PostsPictureComponent';
import PostsContentComponent from '../components/PostsContentComponent';
import {WP_URL_POST}  from '@env';
import Postsheader from '../components/postsheader';
import PostBottomSticky from '../components/postBottomStickyTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Posts= (props) => {
  // console.log(global.config.GL_LANG_NAME);
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
    },[postList.length])


    // handleBackButtonClick= () => {
    //     // console.log(props);
    //     props.navigation.goBack(null);
    //     return true;
    //   }
      
    
    async function getPosts() {
      var lang_url=await AsyncStorage.getItem('postUrl');
      if(lang_url===null)
      {
          lang_url=WP_URL_POST;
      }
        try {
        console.log(WP_URL_POST+''+postId);
        let response = await fetch(
          lang_url+''+postId,
        );
        let responseJson = await response.json();
        var postlist=responseJson;
        setPostList([postlist])
        
        return responseJson;
        } catch (error) {
        console.error(error);
        }
       
      }    
      const _start = async () => {
        return Animated.parallel([
          Animated.timing(slideUpValue, {
    
            toValue: 1,
    
            duration: 500,
    
            useNativeDriver: true
    
          })
    
        ]).start();
    
      };
      const _end = async () => {
        // console.log("hello")
        return Animated.parallel([
          Animated.timing(slideDownValue, {
    
            toValue: 0,
    
            duration: 500,
    
            useNativeDriver: true
    
          })
    
        ]).start();
    
      };
      const defaultFontSize=20;
      const [fontSize, setfontSize]=useState(20);
      
      const increaseSize=()=>{
        if(fontSize<=30)
        {
          setfontSize(fontSize+1);
        }
      }
      const decreaseFont=()=>{
        if(fontSize>=defaultFontSize)
        {
          setfontSize(fontSize-1);
        }
      }

      const postComment=()=>{
        props.navigation.navigate('Comment',{postId:postId});
      }

      const sharePost=async()=>{
        try {
          // console.log(postList!=null);
          const result = await Share.share({
            message: postList!=null?postList[0].link:"https://buddhiyoga.in/site/en/",
            url: postList!=null?postList[0].link:"https://buddhiyoga.in/site/en/",
            title: 'BuddhiYoga',

          },
          {
            dialogTitle:'BuddhiYoga'
          });
          if (result.action === Share.sharedAction) {
            console.log('Shared successfully');
          } else if (result.action === Share.dismissedAction) {
            console.log('Sharing cancelled');
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      const playAudio=useRef(true);

      const playAudiodevice=(data)=>{
        playAudio.current=data
      }

    return (<>
    <SafeAreaView style={styles.cardViewOverAll}>
            <View style={{ position: 'relative'}}>
              <Postsheader navigation={props.navigation } playAudiodevice={playAudiodevice}/>
              {/* <FloatingFont increaseFont={increaseSize} decreaseFont={decreaseFont} sharePost={sharePost} postID={postId} /> */}
              
            {
            (postList.length>0) ?( 
              <View>
                <Animated.View

                style={{
      
                  transform: [
      
                    {
      
                      translateY: slideUpValue.interpolate({
      
                        inputRange: [0, 1],
      
                        outputRange: [900, 0]
      
                      })
      
                    }
      
                  ],
                  width:"100%",
                  height:"100%"
                }}
      
              >
                
                    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ padding: 10}}>
                        <PostsPictureComponent  audioStatus={playAudio.current} postId={15} postIndex={props.route.params.postIndex} subTitle={postList[0].excerpt.rendered} fontSize={fontSize} content={postList[0].content.rendered} title={postList[0].title.rendered} imageUrl={postList[0].better_featured_image.media_details.sizes.large.source_url} />
                        <PostsContentComponent postIndex={props.route.params.postIndex} subTitle={postList[0].excerpt.rendered} title={postList[0].title.rendered} content={postList[0].content.rendered} fontSize={fontSize}/>
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
              {/* <SafeAreaView style={styles.screen}> */}
              <View style={{justifyContent:'center',alignItems:"center",flex:1}}>
              <Text>
                Loading ...
            </Text>
            </View>
            {/* </SafeAreaView> */}
            </Animated.View>)
        }
        
          </View>
           <View style={{width:"100%",height:"40%", backgroundColor: 'rgba(183,153,114,0.25)',}}></View>
           <PostBottomSticky increaseFont={increaseSize} decreaseFont={decreaseFont} postShare={sharePost} postComment={postComment}/>

           </SafeAreaView>
    
    </>);

};

const styles = StyleSheet.create({
    screen:{
        
        alignItems:"center",
        justifyContent:'center',
        width:"100%",
        height:"100%",
        // backgroundColor: "#cfc19f",
        // backgroundColor: 'rgba(183,153,114,0.25)',
    },
    cardViewOverAll:{
        width:"100%",
        height:"100%",
        // backgroundColor:'#cfc19f',
        backgroundColor: 'rgba(183,153,114,0.25)',
        // marginVertical:20,
        
    },
    cardView:{
        paddingTop:"10%",
        width:"75%",

    }
    }
    );


export default Posts;
