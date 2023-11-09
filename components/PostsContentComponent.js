import React, { useState,useRef } from "react";
import { useEffect } from "react";
import { Text , View, StyleSheet, TouchableWithoutFeedback, Animated, ScrollView, Image, Dimensions} from 'react-native';
import Loader from './loader';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import '../globalVariables';
import Sound from "react-native-sound";

// global.config.GL_XML_DATA
const PostsContentComponent = (prop) => {
	const [source,setNewHtml]=useState([]);
	const [cellIndex, setcellIndex]=useState(0);
	const [htmlData,setHtmlData]=useState({html:"Loading...."});
	// const { width } = useWindowDimensions();
	const [audioArr,setAudioArr]=useState([]);
	const { width, height } = Dimensions.get('window');
	useEffect(()=>{
		 getHtml();
		 getAudio();
	},[]);

	const getAudio=()=>{
		var splitContent=prop.content.split("<!-- Audio -->");
		if(splitContent[1] === undefined)
		
		{
	  
		}
		else
		{
		  splitContent=splitContent[1].split("<!-- AudioUrl -->")
		  
		  
		  if(splitContent.length>1)
		  {
			var audioArr=[];
			for (let index = 1; index < splitContent.length; index++) {
				let element = splitContent[index];
				if(element.length>0)
				{
				element=element.trim().replace("<!-- ","").replace("-->","").replace("<!--","").replace(" -->","");
				audioArr.push(element);
				}
				else{
				  audioArr.push("");
				}
			}
			// console.log(audioArr);
			setAudioArr(audioArr);
				//   console.log('audio',audioArr,'audio length ',audioArr.length)
		  }
		}
	  }

	const getHtml=()=>{
		var totalSize=global.config.GL_XML_DATA[prop.postIndex].postToBeShown;
		var splitContent=prop.content.split("<!-- Start -->");
		var postContents=[];
		if(splitContent.length < 2)
		{
			splitContent=prop.content.split("<!-- Start -->");
		}
		splitContent.forEach((element,index) => {
			var arr=[];
			if(index > 0 && index < totalSize){
				arr=element.split("</br></br>");
				postContents.push(arr);
				
			
			if(index==1)
				{
					// console.log('ajsdjskd');
					let tempArr=[];
					tempArr.push("Excerpt");
					tempArr.push(prop.subTitle);
					// console.log(tempArr);
					postContents.push(tempArr)
				}
			}
		});
		// console.log(postContents);
		setHtmlData({html:postContents[0][1]})
		setNewHtml(postContents);
	}
	// const parserFunction=(data)=>{
	// 	const replacedHTML = data
	//     .replace("&#8217;", "'").replace('&#8211;', "-")
	//     .replace("&nbsp;", " ").replace("&nbsp;", " ")
    //     .replace(/<strong>/g, '').replace(/<\/strong>/g, '') 
    //     .replace(/<em>/g, '').replace(/<\/em>/g, '') 
    //     .replace(/<\/br>/g, '\n')
    //     .replace(/<span>/g, '').replace(/<\/span>/g, '') 
    //     .replace(/<hr>/g, '').replace(/<br \/>/g, '')
	// 	.replace(/<!-- Start of Story  --/g, '').replace(/<!-- End of Story. --/g, '')
	// 	.replace(/<!-- Start On the gameboard. --/g, '').replace(/<!-- End of On the gameboard. --/g, '')
	// 	.replace(/<!---->/g, '').replace(/<\/p>/g, '').replace(/<p>/g, '')
	// 	; // Remove <h3> tags

    //   return (
    //     <Text>{replacedHTML.trim()}</Text>
    //   );
	// }
	const playAudio=async()=>{
		var audioSound= await AsyncStorage.getItem("audio");
		if(audioSound!==null || audioSound !==undefined)
		{
		  var audiosound= JSON.parse(audioSound);
		//   playAudioSound.current=audiosound;
		}
		if(audiosound)
		{
		var audio = new Sound(audioArr[cellIndex],null, error => {  
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

	return(
		<View>
			<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{width: '100%', marginTop: 20, marginBottom: 10}}>
				<View style={[Styles.categories]}>
				{
				source.map((key,index) => (	
					<>
						<TouchableWithoutFeedback key={index} onPress={()=>{setcellIndex(index);setHtmlData({html:key[1]})}}>
						<View style={[Styles.categoriesItems,{backgroundColor:cellIndex === index?"#594039":"#D5C0A4"}]} key={index}>
						<Text key={{index}} style={[Styles.categoriesItemsText,{color:cellIndex === index?"#D5C0A4":"#594039",fontSize:prop.fontSize-3}]}>{global.config.GL_LANG[8][index]}</Text>		
						</View>
						</TouchableWithoutFeedback>
				</>
				))
				}
				</View>
			</ScrollView>
			{
				source.length <=0 ?
				<Loader/>
				:
				<View style={Styles.categoriesItemsData}>
				<ScrollView style={[{height:height*0.36,}]}>
				<View style={{padding:'4%'}}>
				{
						(audioArr.length>0 && audioArr[cellIndex].length >0) &&
				<View style={{width:"100%",justifyContent:"flex-end",flexDirection:"row"}}>
					<TouchableWithoutFeedback onPress={()=>playAudio()}>
					<Image source={require('../assets/other/sounds.png')} style={{width:50,height:30}}/>
					</TouchableWithoutFeedback>
					
				</View>
				}
						<RenderHtml
							contentWidth={width}
							source={htmlData}
							tagsStyles={{ p:{color:'black',fontSize:prop.fontSize},i:{fontSize:prop.fontSize,fontStyle:"italic",fontWeight:"bold"}}}						
						/>
					</View>					
			</ScrollView>
			</View>
			}
			
			</View>
		
	)
}
export default PostsContentComponent;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		marginVertical:10,
    marginHorizontal: 10,
    paddingHorizontal:20,
    // backgroundColor:'#F2D997',
    backgroundColor:'#F2D997',
	borderRadius: 15,
	borderWidth: 1,
	// elevation: 1,
	borderColor: 'rgba(0,0,0,0.2)',

	},
	categories:{
		flexDirection:"row",
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	categoriesItems:{
		
		paddingHorizontal: 15,
		marginRight: 10,
		borderRadius: 8,
		paddingVertical: 15
	},
	categoriesItemsText:{
		// color:"#594039",
		textAlign:"center",
		// fontSize:17,
		fontWeight:"500"
	},
	categoriesItemsData:{
		padding: 10,
		backgroundColor: '#fff',
		// marginTop: 10,
		borderRadius: 10,
		// height:300
	},
	categoriesItemsDataText:{
		color: 'rgba(0,0,0,.8)',
		// fontSize:15
	},
	cardContent:{
		// borderRadius: 20,
	},
	heads:{
		position: 'relative',
		padding: 10,
		borderColor: 'rgba(0,0,0,0.4)',
		
		borderBottomWidth: 1,
	},
	headings:{
		width: '100%',
			paddingVertical:20,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#594039',
		
	  },
	  contents:{
		width: '100%',
		paddingVertical:20,
		fontSize: 15,
		color: '#000',
	  }
})