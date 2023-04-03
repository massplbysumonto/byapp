import { mergeProps } from "@native-html/css-processor";
import React, { useEffect, useState } from "react";
import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
const PostsContentComponent = (prop) => {
 const [dataSource,setData] = useState("");
  useEffect(() => {
		setSource();
  },[dataSource])

  const setSource=() => {
	var data="<p><strong>Audio</strong></p>";
	var d=prop.content.split(data);
	var newHTML=d[0].concat(prop.subTitle);
	newHTML=newHTML.concat(data.concat(d[1]));
	console.log(newHTML);
	setData(newHTML);
}
var source={
	html:dataSource
};

  const tagsStyles = {
	body: {
	  whiteSpace: 'normal',
	  color: 'black',
	  backgroudColor:'#F2D997',
	  fontSize: prop.fontSize,
	},
	a: {
	  color: 'black'
	}
  };
  
  
	return(
		
		<Card style={Styles.container}>
	<Card.Content>
  <RenderHtml
      source={source}
	  tagsStyles={tagsStyles}
    />
		</Card.Content>
	</Card>
		
	)
}
export default PostsContentComponent;

const Styles = StyleSheet.create({
	container :{
		alignContent:'center',
		// marginVertical:40,
    marginHorizontal: 10,
    // padding:2,
	backgroundColor:'#F2D997'
	}
})
