import React,{useState,useEffect} from "react";
import { Animated,Text, TouchableWithoutFeedback ,Easing,ScrollView,Image,View} from "react-native";
import {WP_URL_POST}  from '@env';
import '../globalVariables';
// import GoogleTranslator from '../service/googleTranslator'
import AsyncStorage from '@react-native-async-storage/async-storage';
const BlockInformation = ({setrotation,rotation,excerpt,readExcerpt,readpostId,cellName,postButton,postName,postId,navigation,postIndex,postPlayIndex}) => {
    // console.log(GoogleTranslator.translate());
    const [isRotating, setRotation] = useState(true);
    // console.log("bl"+rotation);
    const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(isRotating ? 0 : 1));
    const [postList, setPostList] = React.useState([]);
    const [readpostList, setreadPostList] = React.useState([]);
    const [readStatus, setreadStatus] = React.useState(false);
    // console.log("postButton"+postButton);
    useEffect(()=>{
        setreadStatus(postButton);
    },[postButton])

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
         setRotation(rotation);
    },[rotation]);

    useEffect(()=>{
        getPosts();
         
   },[postId]);

   useEffect(()=>{
    if(postButton)
        {
            getPostsforRead();
        }
     
},[readpostId]);

   function getText(html){
    return html.replace(/<[^>]+>/g, '');
}

    async function getPosts() {
        try {
            var POST_URL=await AsyncStorage.getItem("postUrl");
        let response = await fetch(
            POST_URL+''+postId
        );
        let responseJson = await response.json();
        var postlist=responseJson;
        setPostList([postlist])
        
        return responseJson;
        } catch (error) {
        console.error(error);
        }
       
      }
      async function getPostsforRead() {
        try {
            var POST_URL=await AsyncStorage.getItem("postUrl");
        let response = await fetch(
            POST_URL+''+readpostId
        );
        let responseJson = await response.json();
        var readpostList=responseJson;
        // console.log(responseJson);
        setreadPostList([readpostList])
        
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
        outputRange: ['70%','140%']
    });

    const viewLengthStyle={
        height: lengthData
    }

    const checkOnPress = ()=>{
        if(isRotating==true)
        setrotation(false);
        setRotation(!isRotating);
    }
    

return(
    <>
    <View style={{justifyContent: 'space-between', flexDirection: 'row',zIndex:9999}}>

    <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 15, width: '50%', }}>
        
        <TouchableWithoutFeedback onPress={()=>{setreadStatus(false)}}> 

            <View style={{ backgroundColor: readStatus?'rgba(89,64,57,0.5)':'#594039',paddingHorizontal: 8, paddingVertical: 6, width: 56, flex: 1, marginHorizontal: 2, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Text style={{textAlign: 'center', fontWeight: '500'}}>Play</Text>
            </View>

        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>{setreadStatus(true)}}> 

            <View style={{ backgroundColor:readStatus?'#594039':'rgba(89,64,57,0.5)',paddingHorizontal: 8, paddingVertical: 6, width: 56, flex: 1, marginHorizontal: 2, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <Text  style={{textAlign: 'center', fontWeight: '500'}}>Read</Text>
            </View>

        </TouchableWithoutFeedback>
       
    </View>
    <TouchableWithoutFeedback onPress={()=>checkOnPress()}> 

    <View style={{ backgroundColor: '#594039',padding: 8,width: 36, alignSelf: 'flex-end'}}>
   

    {
        isRotating==true &&
        <Image source={require('../assets/other/up.png')} style={{width:20,height:15,zIndex: 1, top:0}}/>
        ||
        <Image source={require('../assets/other/down.png')} style={{width:20,height:15,zIndex: 1, top:0}}/>
    }
    </View>

    </TouchableWithoutFeedback>
    </View>

    {/* ///////////////////////////// */}

    
    <Animated.View style={[{width:"100%", backgroundColor:"#b79972",borderTopLeftRadius: 15,borderTopRightRadius: 0,borderColor:"black",paddingVertical:10},viewLengthStyle]}>
    
    {(postList.length>0 && isRotating==false)?(
        <>
             {
                readStatus ?
            <>
                 {
                    readpostList.length < 0 ?
                        <View>
                            <Text style={{alignContent:'flex-start',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',fontSize: 13,}} ellipsizeMode='tail'>Double tap any cell to know more</Text>
                        </View>
                        :  
                        <>
                        <TouchableWithoutFeedback onPress={()=>changePage()}>
                            <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",alignSelf:"center"}}>
                            { global.config.GL_LANG[1][0]} <Text style={{fontWeight:"900",fontSize:20}}>{ global.config.GL_LANG[1][1]}</Text> {global.config.GL_LANG[1][2]}
                            </Text>
                        </TouchableWithoutFeedback>
                <ScrollView>    
                   
                <Text style={{alignContent:'flex-start',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',fontSize: 13,}} ellipsizeMode='tail'>
                    <Text style={{fontStyle:"normal",fontSize:14, fontWeight:"bold"}}>
                        {cellName}
                    </Text>
                    {getText(readpostList[0].excerpt.rendered)}
                </Text>
                </ScrollView>
                </>
                }
            </>
            :
            <>
            <TouchableWithoutFeedback onPress={()=>changePage()}>
            <Text style={{alignContent:'center',paddingHorizontal:"5%",paddingTop:"1%",alignSelf:"center"}}>
            { global.config.GL_LANG[1][0]} <Text style={{fontWeight:"900",fontSize:20}}>{ global.config.GL_LANG[1][1]}</Text> {global.config.GL_LANG[1][2]}
            </Text>
            </TouchableWithoutFeedback>
            <ScrollView>
            <Text style={{alignContent:'flex-start',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',fontSize: 13,}} ellipsizeMode='tail'>
                <Text style={{fontStyle:"normal",fontSize:14, fontWeight:"bold"}}>
                    {postName} 
                </Text>
            {getText(postList[0].excerpt.rendered)}
            </Text>
        </ScrollView>
        </>
            }</>
        ):(
            <>
                { 
                readStatus ?
                    <ScrollView>
                        {
                            readpostList.length < 0 ?
                            <View>
                            <Text style={{alignContent:'flex-start',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',fontSize: 13,}} ellipsizeMode='tail'>Double tap any cell to know more</Text>
                        </View>
                        :
                        <Text style={{textAlign:'left',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',fontSize: 13}}>
                            <Text style={{textAlign:'left',fontStyle:"normal",fontSize:14, fontWeight:"bold"}}>{cellName}</Text>- {readExcerpt}
                        </Text>
                        }
                    </ScrollView>
                :
                <ScrollView>
                <Text style={{textAlign:'left',paddingHorizontal:"5%",paddingTop:"1%",color: 'black',fontSize: 13}}>
                    <Text style={{textAlign:'left',fontStyle:"normal",fontSize:14, fontWeight:"bold"}}>{postName}</Text>- {excerpt}
                </Text>
                </ScrollView>
                }
            </>    
        )}
        
    </Animated.View>
    </>
    
)
function changePage ()
{
    if(readStatus)
    {
        navigation.navigate('Posts',{postId:readpostId,postIndex:postIndex})
    }
    else
    {
        navigation.navigate('Posts',{postId:postId,postIndex:postPlayIndex})
    }
  
}

}

export default BlockInformation;