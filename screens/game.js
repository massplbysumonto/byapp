import React,{useState,useRef, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Button,
  Easing,
  Text,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {
    PanGestureHandler,
    GestureHandlerRootView,TapGestureHandler
} from 'react-native-gesture-handler';
// import { Link } from '@react-navigation/native';

import Dice7 from "../assets/game/dice/dice7.png";
import Hamburger from '../components/hamburger';

const Game= ({navigation}) => {
  
  // const [running, setRunning] = useState(false);
  // const [diceRollCount, setDiceRollCount] = useState(0);
  // const [currentPoints, setCurrentPoints] = useState(0);
  const postIdCurrent =useRef(551);

  const diceFace = useRef(Dice7);
  const diceFaceFrame = useRef(null);
  const cellInfoNow=useRef(null);

  // const [, updateState]=useState();
  
/* Variables for the game  */  
  const position = new Animated.ValueXY({x:0,y:0});
  console.log(position);
  const diceSpinValue= new Animated.Value(0);

  const spin = diceSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });


  // var diceRolled=0,diceThrowResult=0;

  var iDisplacement = 0;
  var iSnakeLadderBase = 0;
  var iOld_state = 0;
  var iCurrent_state = 0;
  var iReverseTo = 0;
  var iRoll;
  var iOld_ReverseTo = 0;
  // var postId=0;
  //Player Variable
  
  var player = {
    image: null,
    position: 68,
    targetPosition: 1,
    wallet: 100,
    
    global_direction: 1,
    current_cell_type: 0
};
//End of player variable


const pan = useSharedValue(false);
const startingPosition = 0;
const x = useSharedValue(startingPosition);
const y = useSharedValue(startingPosition);


// const newPanEvent = useAnimatedGestureHandler({
//   onStart: (event, ctx) => {
//   pan.value = true;
//   ctx.startX = x.value;
//   ctx.startY = y.value;
//   },
//   onActive: (event, ctx) => {
//   x.value = ctx.startX + event.translationX;
//   y.value = ctx.startY + event.translationY;
//   },
//   onEnd: (event, ctx) => {
//   pan.value = false;
//   ctx.startX = x.value;
//   ctx.startY = y.value;
//   },
// });

// const animStyle = useAnimatedStyle(() => {
//   return {
//   transform: [{ translateX: x.value }, { translateY: y.value }]
//   };
// });


//Start of Dice Variable
var dice = {

  iDiceFace: 0,
  iDiceRollCount: 0,
  iDiceCurrentRoll: 0,
  ispinValue:1
};

function changePage ()
{
  navigation.navigate('Posts',{postId:postIdCurrent.current})
}



//End of Dice Variable


  



/* Variables for the game End */

  var playerPositions =require('../assets/game/buddhiyogaEngine.json');




  var positionConfig = {
    "initCellPos": 68,
    "initPlayerPos": 68,
    "initTargetPos": 68,
    "shortTitle": "BY",
    "retreatCellResult": 6,
    "retreatCellOnCount": 3,
    "initialMoveResult": 6,
    "firstLandingCell": 6,
    "cellDimentionX": 95,
    "cellDimentionY": 95,
    "terminatingCellPos":3
  };

  const diceImage=[
    {
      imageurl:require("../assets/game/dice/dice1.png")
    },
    {
      imageurl:require("../assets/game/dice/dice2.png")
    },
    {
      imageurl:require("../assets/game/dice/dice3.png")
    },
    {
      imageurl:require("../assets/game/dice/dice4.png")
    },
    {
      imageurl:require("../assets/game/dice/dice5.png")
    },
    {
      imageurl:require("../assets/game/dice/dice6.png")
    },
    {
      imageurl:require("../assets/game/dice/dice7.png")
    },
    {
      imageurl:require("../assets/game/dice/dice8.png")
    },
    {
      imageurl:require("../assets/game/dice/dice9.png")
    },
    {
      imageurl:require("../assets/game/dice/dice10.png")
    },
    {
      imageurl:require("../assets/game/dice/dice11.png")
    },
    {
      imageurl:require("../assets/game/dice/dice12.png")
    }
  ];



const initializePawn = ()=>
{
  // console.log(playerPositions[68])
    Animated.timing(position,{
      toValue:{x:playerPositions[positionConfig.initCellPos].x,y:playerPositions[positionConfig.initCellPos].y},
      useNativeDriver: true
      }).start()
      console.log(position)
}

var i=1;

 initializePawn();

  const diceRoll=()=>{
    // console.log("hello");
    Animated.timing(
      diceSpinValue,
    {
      toValue: dice.ispinValue,
      duration: 200,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  ).start(()=>{

    dice.iDiceRollCount++;


    let min = 1;
    let max = 7;
    dice.iDiceCurrentRoll= min+Math.floor( Math.random() * (max - min));
    // console.log("Dice roll result :: "+dice.iDiceCurrentRoll);
    // setDiceFace(diceImage[dice.iDiceCurrentRoll-1].imageurl);
    if(iSnakeLadderBase==0)
    {
      diceFace.current=diceImage[dice.iDiceCurrentRoll-1].imageurl;
      let img = diceImage[dice.iDiceCurrentRoll-1].imageurl;
      let imgProps = Image.resolveAssetSource(img);
      diceFaceFrame.current.setNativeProps({ src: [imgProps] });
    }
    else
    {

      diceFace.current=diceImage[6].imageurl;
      let img = diceImage[6].imageurl;
      let imgProps = Image.resolveAssetSource(img);
      diceFaceFrame.current.setNativeProps({ src: [imgProps] });

    }
    initiatePawnMovement();
  });

  if(dice.ispinValue==1)
  {
    dice.ispinValue=0;
  }
  else
  {
    dice.ispinValue=1;
  }

  // console.log(position.x,position.y)

  };

  


  const initiatePawnMovement = async ()=>{

    // console.log("Dice roll number :: "+ diceThrowResult);

       iRoll=dice.iDiceCurrentRoll;
       iOld_state = iCurrent_state;
       iCurrent_state = playerPositions[player.position].info.movement.state[(iRoll * 3) + iOld_state];


      //  console.log("Current State :: "+ iCurrent_state);

      if (iCurrent_state == 999) {
        iCurrent_state = iOld_state;
      }


      iDisplacement = playerPositions[player.position].info.movement.displacement[iOld_state];

      // console.log("Current Displacement :: "+ iDisplacement);

      if (iDisplacement == 0) {
        iDisplacement = playerPositions[player.position].info.movement.displacement[(iRoll * 3) + iOld_state];
        // console.log("Re-calculating Displacement is "+iDisplacement+ "For a Roll of "+iRoll);
      }

    if (iDisplacement < 999) {
      iSnakeLadderBase = playerPositions[player.position + iDisplacement].info.movement.displacement[iCurrent_state];
    }
    

      if ((iDisplacement != 0) && (iDisplacement < 999) ) {
      // console.log("Ready to set Target Position")
        iOld_ReverseTo = iReverseTo;
        iReverseTo = playerPositions[player.position].info.movement.return[(iRoll * 3) + iOld_state];
        if (iReverseTo == 999) {
            iReverseTo = iOld_ReverseTo;
        }
      // console.log("Reverse "+iReverseTo);

        player.targetPosition = player.position + iDisplacement;
      // player.targetPosition = player.position + iDisplacement;
      // console.log("Player's Target Position is :: "+iDisplacement);
    }
    else if (iDisplacement == 999) {
        player.targetPosition = iReverseTo;
    }

    //  console.log("Player's Target Position is :: "+iDisplacement);


     if(iDisplacement < 0 || iDisplacement > 6 )
     {
      player.targetPosition=player.position+iDisplacement;
      // console.log("Target Position is "+player.targetPosition);
      // console.log("Player's Target Position is Second :: "+iDisplacement+"Cell Name "+playerPositions[player.position + iDisplacement].info.name);
       movePawnToCell();
      
     }
     else if(iDisplacement!=0)
     {
      // console.log("Player's Target Position is Second :: "+iDisplacement+"Cell Name "+playerPositions[player.position + iDisplacement].info.name);
       dice.iDiceCurrentRoll=iDisplacement;
        movePawnNextCell();
     }
    //  console.log("Target Position ::"+playerPositions[player.position].postID);
     postIdCurrent.current=playerPositions[player.position].postID;
    //  console.log(postIdCurrent);
    //  console.log("SnakeBaseLadder :: "+iSnakeLadderBase);

  };

  function delay(ms) {
    
    return new Promise( resolve=>{

      setTimeout(()=>{resolve,ms});
    
    });
    
      
  }

  const landingEvent =()=>{
    
    player.global_direction=1;
    player.targetPosition=player.position;

    if(iSnakeLadderBase>0)
    {
      diceFace.current=diceImage[8].imageurl;
      let img = diceImage[8].imageurl;
      let imgProps = Image.resolveAssetSource(img);
      diceFaceFrame.current.setNativeProps({ src: [imgProps] });
    }
    else if(iSnakeLadderBase < 0)
    {
      diceFace.current=diceImage[7].imageurl;
      let img = diceImage[7].imageurl;
      let imgProps = Image.resolveAssetSource(img);
      diceFaceFrame.current.setNativeProps({ src: [imgProps] });
    }
    else
    {
      diceFace.current=diceImage[6].imageurl;
      let img = diceImage[6].imageurl;
      let imgProps = Image.resolveAssetSource(img);
      diceFaceFrame.current.setNativeProps({ src: [imgProps] });
    }

  };

  const flyoverEvent =()=>{
    if((player.position+1) > 72 )
    {
      player.global_direction=-1;
    }

  };

  const waitForPlayerActionEvent=()=>{

  };



  const movePawnNextCell=()=>{
    
    // console.log(player)
    Animated.sequence([
    Animated.timing(position,{
      toValue:{x:playerPositions[player.position].x,y:playerPositions[player.position].y},
      useNativeDriver: true
    })]).start(()=>{

      if(dice.iDiceCurrentRoll>0)
      {
        flyoverEvent();
        player.position= player.position+(1*player.global_direction);
        dice.iDiceCurrentRoll--;
        movePawnNextCell();
      }
      else
      {
        landingEvent();
      }

    });

    

  };

  const movePawnToCell=()=>{
    

    
    Animated.timing(position,{
      toValue:{x:playerPositions[player.targetPosition].x,y:playerPositions[player.targetPosition].y},
      useNativeDriver: true
    }).start(()=>{
      player.position=player.targetPosition;
    });

    

    

  };
const getPosts=(e)=>{
  let Xdiff;
  let postsid;
  let qoute;
  let x=e.nativeEvent.x;
  let y=e.nativeEvent.y;
  // console.log(e.nativeEvent);
  playerPositions.forEach(element => {
    if(element.postID!=551)
    {
    let x1=Math.sqrt(Math.pow(element.x-x +28,2)+Math.pow(-360-element.y+y+14,2));
    // console.log(x1);
    if(Xdiff==undefined || x1 <=Xdiff)
    {
      Xdiff=x1;
      postsid=element.postID;
      qoute=element.info.quote[0].name;

    }
    }
  });
  postIdCurrent.current=postsid;
  cellInfoNow.current.setNativeProps([{text:qoute}]);
  changePage();
}

  
  
  return (
    <>
    <Hamburger/>
    <View style={styles.container} >
    <View style={styles.gameContainer}>
    {/* <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: 300,
        borderRadius: 10,
        height: 'auto',
        marginHorizontal: "11%"}}
        onPress={()=>changePage()}
        ><Text style={{color: '#fff',lineheight: 40,fontWeight: '500', textAlign: 'center',paddingHorizontal:10}}>Get More Info  </Text>
          </TouchableOpacity> */}
                  {/* <View style={styles.CircleShape} /> */}

        {/* <View style={{
                        position:'absolute',
                        top:"10%",
                        left:"5%",
                        right:"5%",
                        width:"90%",height:"10%", backgroundColor:"#F2D997",
                        borderRadius: 10, shadowOffset: {width: -2, height: 4},  
                        shadowColor: '#171717',  
                        shadowOpacity: 0.2,  
                        shadowRadius: 3,
                        alignItems:'center',
                        justifyContent:'center',
                        paddingTop:"5%"
                        }} >
            <TextInput
        editable={false}
        ref={cellInfoNow}
        defaultValue={"Welcome To Buddhiyoga"}
      />
          </View>   */}
          

        <GestureHandlerRootView>
        <TapGestureHandler
          numberOfTaps={2}
          onActivated={(e) => (
              getPosts(e)
        )}>
          <Image source={require('../assets/game/board.jpg')} style={{width:380,height:380,alignSelf:'center'}} />
        </TapGestureHandler>
        </GestureHandlerRootView>

      <Animated.View 
      style={{alignContent:'center',
      justifyContent:'center',
      width:40,
      height:40,
      bottom:46,
      left:28,
      transform:[{
        translateX:position.x
      },{translateY:position.y}]
      }} >
        <Image source={require('../assets/game/token4.png')} style={{width:40,height:40}}  />
      </Animated.View>

      <View style={{
      position:'absolute',
      flex:1,
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center',
      width:"100%",
      bottom:20,
      height:"10%"
      }}>
      <Animated.View style={{
        
        width:60,
        height:60,
        backgroundColor:"#DEB887",
        borderRadius:10,        
        
        
        transform: [{rotate: spin}]
    
    }}>
      {/* <TouchableOpacity onPress={() => diceRoll()}>
      <Image ref={diceFaceFrame} source={require("../assets/game/dice/dice7.png")} />
      </TouchableOpacity> */}

      </Animated.View>
      </View>

    </View>


        
   </View>
   </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'#cfc19f'
    
  },
  gameContainer:{
    // flex:1,
    alignContent:'center',
    // justifyContent:'center',
    width:"100%",
    height:"90%",
    // backgroundColor:'#cfc19f'
  },
  CircleShape: {
    position:'absolute',
    top:"17%",
    left:"44%",
    width: "15%",
    height: "7.5%",
    borderRadius: 150 / 2,
    backgroundColor: '#FF9800',
    zIndex:1,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 160 / 2,
  },

});

export default Game;