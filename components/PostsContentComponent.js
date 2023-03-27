import { mergeProps } from "@native-html/css-processor";
import React, { useState } from "react";
import { Text ,View, StyleSheet } from 'react-native';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
const PostsContentComponent = (prop) => {
  const source = {
    html: prop.content
  };
const [fontSize,setFontSize] = useState(20);

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
  
  
//   console.log(prop);
	
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
		marginVertical:40,
    marginHorizontal: 10,
    padding:10,
	backgroundColor:'#F2D997'
	}
})
