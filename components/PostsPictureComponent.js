import React,{useEffect,useRef,useState} from "react";
import { Text ,View, StyleSheet,ActivityIndicator,TouchableOpacity,Image, TouchableWithoutFeedback,Dimensions,ScrollView } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import '../globalVariables';
import Sound from 'react-native-sound';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostsPictureComponent = (props) => {
  // alert(props.audioStatus);
const [imageLoad, setImageLoad] = React.useState(false);
const [audioArr,setAudioArr]=useState("");
const playAudioSound=useRef(true);
const { width, height } = Dimensions.get('window');
const [imageHeights, setImageHeights] = useState();
const [imageWidths, setImageWidths] = useState();

const onImageLayout = (event) => {
  const imageWidth = event.nativeEvent.layout.width;
  const imageHeight = imageWidth*(5/8);
  setImageWidths(imageWidth);
  setImageHeights(imageHeight);

  
};

// const [imageDimension,setimageDimension]=useState([]);
// const getImageDimensions = async (img) =>  {
//     const imageSource = {url: img};
//     const { width, height } = Image.resolveAssetSource(imageSource);
//     return { width, height };
//   }
//     const imageDimensions = await getImageDimensions('https://buddhiyoga.in/site/wp-content/uploads/2016/09/68-vaikuntha-1024x755.png');
//     setimageDimension(imageDimensions);
    // imageDimension.current=imageDimensions;
  


useEffect(()=>{
  getAudio();
},[]);

const getAudio=()=>{
  var splitContent=props.content.split("<!-- Audio -->");
  if(splitContent[1] === undefined)
  
  {

  }
  else
  {
    splitContent=splitContent[1].split("<!-- backgroundAudio -->");
    if(splitContent.length>1)
    {

      var audioArr=[];
      // for (let index = 1; index < splitContent.length; index++) {
          let element = splitContent[0];
          if(element.length>0)
          {
          element=element.trim().replace("<!-- ","").replace("-->","").replace("<!--","").replace(" -->","");
          audioArr.push(element);
          setAudioArr(element)
          }
          else{
            audioArr.push("");
            setAudioArr("");
          }
      // }
      // setAudioArr(audioArr);
            // console.log('audio',audioArr,'audio length ',audioArr.length)
    }
  }
}

  const playAudio=async()=>{
    var audioSound= await AsyncStorage.getItem("audio");
    if(audioSound!==null || audioSound !==undefined)
    {
      var audiosound= JSON.parse(audioSound);
      playAudioSound.current=audiosound;
    }
    if(playAudioSound.current)
    {
    var audio = new Sound(audioArr,null, error => {  
        if (error) {  
          alert('Failed to load audio');  
          return;  
        }
        else{  
        // if loaded successfully 
        console.log("played");
        audio.play(()=>{
          audio.release();
        }); 
        }
      }  
      );  
    }
  }
// const [imageDimension, setimageDimensions]=useState({})


  
console.log("imageWidth: "+imageWidths+"     imageHeights: "+imageHeights);
	return(
    <>
		<View style={[Styles.container,{height:height*.4, overflow: 'scroll', padding: 0, margin: 0,width:"100%", borderRadius: 10}]}>
    {  imageLoad && <View style={{flex : 1, justifyContent: 'center', alignItems: 'center', zIndex:1}}>
  
          <ActivityIndicator  color={'black'} style={{flex : 1, justifyContent: 'center', alignItems: 'center', zIndex:1}} />
        
        </View>
    }
{/*     
		<Card.Cover style={imageLoad?{display:'none'}:{}} source={{ uri: props.imageUrl }} onLoadStart={() => onLoading(true)} onLoadEnd={()=>onLoading(false)}  />} */}
    <View style={{flexDirection:"column",justifyContent:"space-between",alignItems: 'center', padding: 0, height: '100%'}}>
      <View style={{width:"100%",padding:10,flexDirection:"row", margin: 0, position: 'relative', justifyContent: 'center', backgroundColor: 'rgba(183,153,114,1)'}} >
    <FastImage  
        onLayout={onImageLayout}
        source={{
            uri: props.imageUrl,
            priority: FastImage.priority.high,
        }}
        style={{ width: '80%', height: imageHeights, }}
        onLoadStart={() => setImageLoad(true)}
        onLoadEnd={()=>setImageLoad(false)}
        resizeMode={FastImage.resizeMode.contain}
    />
    <View style={{width:"10%", position: 'absolute', right: 10}}>
      {
        audioArr.length >0 &&
      
      <TouchableWithoutFeedback onPress={()=>playAudio()}>
    <Image source={require('../assets/other/sounds.png')} style={{width:60,height:50}}/>
    </TouchableWithoutFeedback>
      }
    </View>
    </View>
    <ScrollView style={{width:"100%", padding: 10, backgroundColor: '#fff'}}>
        <Text style={{color:'#000', width:"100%",lineHeight:props.fontSize-1, fontSize:props.fontSize-3,}}>{global.config.GL_XML_DATA[props.postIndex].info.quote[0].name}</Text>
    </ScrollView>
    </View>
	</View>
  </>
	)
}
export default PostsPictureComponent;

const Styles = StyleSheet.create({
	container :{
		// alignContent:'center',
		// marginVertical:20,
    // marginHorizontal: 10,
    padding:10,
    backgroundColor:'#F2D997'
	}
})
