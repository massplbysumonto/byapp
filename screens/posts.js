import React,{useEffect,useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Card,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import PostsPictureComponent from '../components/PostsPictureComponent';
import PostsContentComponent from '../components/PostsContentComponent';
import {WP_URL_POST}  from '@env';
import { Title,Divider } from 'react-native-paper';





const Posts= (props) => {

    const [postList, setPostList] = React.useState([]);
    const [postId,setPostId] = React.useState(props.route.params.postId);
    

    useEffect(()=>{
         getPosts();
        
    },[postId]);


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

    return (<>
       
        {
            (postList.length>0) ?( 
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
            ):(<View style={styles.screen}><Text>
                Loding ...
            </Text></View>)
        }
    
    </>);

};

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
