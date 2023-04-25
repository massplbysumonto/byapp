import React from "react";
import { View, Image, TouchableWithoutFeedback, Share } from "react-native";
function FloatingFont({navigation,increaseFont,decreaseFont,sharePost,postID}){

    const shareContent = async (content, message) => {
        try {
          const result = await Share.share({
            message: message,
            url: content,
            title: 'Check this out!',
          });
          if (result.action === Share.sharedAction) {
            console.log('Shared successfully');
          } else if (result.action === Share.dismissedAction) {
            console.log('Sharing cancelled');
          }
        } catch (error) {
          console.log(error.message);
        }
      };
// console.log(postID);

  // const contentToShare = 'https://www.youtube.com/watch?v=xxxxxxxxxx';
  // const messageToDisplay = 'Hey, check out this video!';

  const handleSharePress = () => {
    shareContent(contentToShare, messageToDisplay);
  };

    return(
        <View style={{width:"100%",height:"8%",paddingVertical:3,flexDirection:"row",flex: 1, position: "absolute", justifyContent: "center",bottom: 52, zIndex: 1}}>
            <View style={{flexDirection:"row", alignItems:"center",width:"55%",  paddingVertical:10, paddingHorizontal: 10,justifyContent:"space-around", backgroundColor: "rgba(255,255,255,1)",borderRadius: 10}}>
                <TouchableWithoutFeedback onPress={(e)=>increaseFont()}>
                <View style={{}}>
                <Image  source={require("../assets/other/fontsplus.png")} style={{flex: 1, aspectRatio:1,
                 resizeMode:"contain"}} />
                  </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>sharePost()}>
              <View>
            <Image  source={require("../assets/other/share.png")} style={{flex: 1, aspectRatio:1,
                 resizeMode:"contain"}} />
                 </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>decreaseFont()}>
            <View style={{}}>
            <Image  source={require("../assets/other/fontminus.png")} style={{flex: 1, aspectRatio:1,
                 resizeMode:"contain"}} />
                  </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={(e)=>navigation.navigate('Comment',{postId:postID})}>
            <View style={{}}>
            <Image  source={require("../assets/other/messege.png")} style={{flex: 1, aspectRatio:1,
                 resizeMode:"contain"}} />
                  </View>
            </TouchableWithoutFeedback>
            </View>
        </View>
        
        
    )
}

export default FloatingFont;
