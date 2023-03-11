import React,{useState,useRef, useCallback, useMemo, useEffect} from 'react';
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
import BlockInformation from '../components/blockInformation';
import {
    GestureHandlerRootView,TapGestureHandler
} from 'react-native-gesture-handler';
// import { Link } from '@react-navigation/native';

import Dice7 from "../assets/game/dice/dice7.png";
import Hamburger from '../components/hamburger';

const Game= ({navigation}) => {
  
  const postIdCurrent =useRef(551);

  const diceFace = useRef(Dice7);
  const diceFaceFrame = useRef(null);
  const cellInfoNow=useRef(null);
  const [gameState,setGameState] =useState(0);
  const cellInfo = useRef("Loading please wait...");
/* Variables for the game  */  
  const position = new Animated.ValueXY({x:0,y:0});
  
  const diceSpinValue= new Animated.Value(0);

  const spin = diceSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });



  var iDisplacement = 0;
  var iSnakeLadderBase = 0;
  var iOld_state = 0;
  var iCurrent_state = 0;
  var iReverseTo = 0;
  var iRoll;
  var iOld_ReverseTo = 0;

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



//Start of Dice Variable
var dice = {
  iDiceFace: 0,
  iDiceRollCount: 0,
  iDiceCurrentRoll: 0,
  ispinValue:1
};
//End of Dice Variable

function changePage ()
{
  navigation.navigate('Posts',{postId:postIdCurrent.current})
}

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
  var data=playerPositions[positionConfig.initCellPos].info.name;
  // cellInfo.current.setNativeProps({text:data});
  // console.log("data"+data);
  cellInfo.current=data;
      
    Animated.timing(position,{
      toValue:{x:playerPositions[positionConfig.initCellPos].x,y:playerPositions[positionConfig.initCellPos].y},
      useNativeDriver: true
      }).start();
      
}

  useEffect(()=>{

    initializePawn();

  },[gameState]);

  const diceRoll=()=>{
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

  };

  


  const initiatePawnMovement = async ()=>{

       iRoll=dice.iDiceCurrentRoll;
       iOld_state = iCurrent_state;
       iCurrent_state = playerPositions[player.position].info.movement.state[(iRoll * 3) + iOld_state];



      if (iCurrent_state == 999) {
        iCurrent_state = iOld_state;
      }


      iDisplacement = playerPositions[player.position].info.movement.displacement[iOld_state];


      if (iDisplacement == 0) {
        iDisplacement = playerPositions[player.position].info.movement.displacement[(iRoll * 3) + iOld_state];
      }

    if (iDisplacement < 999) {
      iSnakeLadderBase = playerPositions[player.position + iDisplacement].info.movement.displacement[iCurrent_state];
    }
    

      if ((iDisplacement != 0) && (iDisplacement < 999) ) {
        iOld_ReverseTo = iReverseTo;
        iReverseTo = playerPositions[player.position].info.movement.return[(iRoll * 3) + iOld_state];
        if (iReverseTo == 999) {
            iReverseTo = iOld_ReverseTo;
        }

        player.targetPosition = player.position + iDisplacement;
    }
    else if (iDisplacement == 999) {
        player.targetPosition = iReverseTo;
    }

     if(iDisplacement < 0 || iDisplacement > 6 )
     {
      player.targetPosition=player.position+iDisplacement;
       movePawnToCell();
   cellInfo.current=playerPositions[player.position].info.name;  
  //  console.log(playerPositions[player.targetPosition].info.name)
  //  setCell(cellInfo.current);
     }
     else if(iDisplacement!=0)
     {
       dice.iDiceCurrentRoll=iDisplacement;
        movePawnNextCell();
    cellInfo.current=playerPositions[player.position].info.name;
    // console.log(playerPositions[player.targetPosition].info.name)
    // setCell(cellInfo.current);
     }
     postIdCurrent.current=playerPositions[player.position].postID;
    
  };

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
    // alert
  };

  const flyoverEvent =()=>{
    if((player.position+1) > 72 )
    {
      player.global_direction=-1;
    }

  };

  const movePawnNextCell=()=>{
    

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
  playerPositions.forEach(element => {
    if(element.postID!=551)
    {
    let x1=Math.sqrt(Math.pow(element.x-x +28,2)+Math.pow(-360-element.y+y+14,2));
    if(Xdiff==undefined || x1 <=Xdiff)
    {
      Xdiff=x1;
      postsid=element.postID;
      qoute=element.info.quote[0].name;

    }
    }
  });
  postIdCurrent.current=postsid;
  // cellInfoNow.current.setNativeProps([{text:qoute}]);
  changePage();
  // console.log(qoute)
}

  const resetGame=(e)=>{
    setGameState(1);
  }
  const about=(e)=>{
    alert("about game");

  }

  return (
    <>
    <Hamburger navigation={navigation} resetFunction={resetGame} infoFunction={about}/>

    <View style={styles.container} >
    <View style={styles.gameContainer}>
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
      // position:'absolute',
      flex:1,
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center',
      width:"100%",
      bottom:20,
      height:"10%"
      }}>
      <Animated.View style={{
        
        width:40,
        height:40,
        backgroundColor:"rgba(88, 44, 36,1)",
        borderRadius:10,        
        
        
        transform: [{rotate: spin}]
    
    }}>
      <TouchableOpacity onPress={() => diceRoll()} style={{justifyContent:'center', alignItems:'center'}}>
      <Image ref={diceFaceFrame} source={require("../assets/game/dice/dice7.png")} style={{width:"80%",height:"100%"}}/>
      </TouchableOpacity>

      </Animated.View>
      </View>

    </View>
   </View>

   <View style={{ position:'absolute',width:"100%", height:"100%",justifyContent:'flex-end'}} >
   <BlockInformation ref={cellInfo} info={cellInfo.current}/>        
   </View>
   </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor:'rgba(183,153,114,0.25)',
    position:'relative'
  },
  gameContainer:{
    alignContent:'center',
    width:"100%",
    height:"90%",
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