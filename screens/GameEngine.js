import React,{useState,useRef, useEffect,createRef} from 'react';
import DeviceInfo, { getType } from "react-native-device-info";
import { getTimeZone } from "react-native-localize";
import Sound from 'react-native-sound';
// import FastImage from 'react-native-fast-image'
import {
  View,
  Animated,
  Easing,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import { TouchableOpacity } from 'react-native';
import BlockInformation from '../components/Celllinformation';
import { TapGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../globalVariables';
import Dice1 from "../assets/game/dice/updated/dice1.png";
import Dice2 from "../assets/game/dice/updated/dice2.png";
import Dice3 from "../assets/game/dice/updated/dice3.png";
import Dice4 from "../assets/game/dice/updated/dice4.png";
import Dice5 from "../assets/game/dice/updated/dice5.png";
import Dice6 from "../assets/game/dice/updated/dice6.png";
import Dice7 from "../assets/game/dice/updated/dice7770.4.gif";
import Dice8 from "../assets/game/dice/updated/dice8.png";
import Dice9 from "../assets/game/dice/updated/dice9.png";
import Dice10 from "../assets/game/dice/updated/dice10.png";
import Dice11 from "../assets/game/dice/updated/dice11.png";
import Dice12 from "../assets/game/dice/updated/dice12.png";
import Hamburger from '../components/hamburger';
import cssBuddhiyoga from './Buddhiyoga.css'
import css99kaPhere from './99kapher.css';

const GameEngine=({navigation}) => {  
// console.log(" global.config.GL_BOARD_DIMENSIONS.boardHeight: "+ typeof(global.config.GL_BOARD_DIMENSIONS.boardHeight));
  const postIdCurrent =useRef(global.config.GAME_DATA.initialPostID);
  const postReadIdCurrent =useRef(global.config.GAME_DATA.initialPostID);
  const postIndex=useRef(global.config.GAME_DATA.initialCellPosition);
  const postPlayIndex=useRef(global.config.GAME_DATA.initialCellPosition);
  const postIdCellMovement=useRef(global.config.GAME_DATA.initialPostID);
  const diceFaceFrame = useRef(null);
  const [diceFace,setDiceFace] =useState(Dice7);
  const playerPositionX=useRef(0);
  const playerPositionY=useRef(0);
  const sound=useRef("dice_rolling.mp3");
  const { width, height } = Dimensions.get('window');
  const [imageUrl,setImageUrl]=useState()
  const[lang,setLang]=useState("");
  var playerPositions =global.config.GL_XML_DATA;
  const [gameState,setGameState] =useState(0);
  const [excerpt,setExcerptState] =useState("Loading....");
  const [postName,setPostName] =useState("..");
  const cellInfo = useRef("Loading please wait...");
  const [isRotating, setRotation] = useState(true);
  const [magicStatus, setMagicStatus] = useState(false);
  const [position,setPosition] = useState(new Animated.ValueXY({x:0,y:0}));
  const diceSpinValue= new Animated.Value(0);
  const [cssFile,setCssFile]=useState({});

  // const [boardHeight, setboardHeight] = useState(1);
  // const [widthRatios, setWidthRatios] = useState(1);

  // const imageWidths=useRef(global.config.GAME_DATA.defaultBoardWidth);
  // const imageHeights=useRef(global.config.GAME_DATA.defaultBoardHeight);


  const onImageLayout = (event) => {
    const imageWidth = event.nativeEvent.layout.width;
    const imageHeight = event.nativeEvent.layout.height;

    const x1=imageWidth/global.config.GAME_DATA.defaultBoardWidth;
    const x2=imageHeight/global.config.GAME_DATA.defaultBoardHeight;
    const x3=Math.min(x1,x2).toFixed(3);
    const imageWidths=global.config.GAME_DATA.defaultBoardWidth*x3;
    const imageHeights=global.config.GAME_DATA.defaultBoardHeight*x3;
    
    global.config.GL_BOARD_DIMENSIONS = {boardWidth: imageWidths, boardHeight: imageHeights, defaultWidthHeightRatio: x3}
    
    setGameState(gameState===0?1:0);

    console.log("imageWidths: "+global.config.GL_BOARD_DIMENSIONS.boardWidth+" imageHeights: "+global.config.GL_BOARD_DIMENSIONS.boardHeight+"defaultWidthHeightRatio: "+  global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
  }

  // const onImageLayout = (event) => {


  // //   // if(!global.config.GAME_DATA.BOARD_LOAD_STATUS)
  // //   // {
  // //     // global.config.GAME_DATA.BOARD_LOAD_STATUS=true;
      // const imageWidth = event.nativeEvent.layout.width;
      // const imageHeight = event.nativeEvent.layout.height;
  // //     // const defalutWidthRatios=1;
  // //     // const defalutHeightRatios=((defalutWidthRatios*global.config.GAME_DATA.defaultBoardHeight)/global.config.GAME_DATA.defaultBoardWidth).toFixed(3);
  // //     // const setBoardImageHeight=imageWidth*defalutHeightRatios;

  // //     // console.log("defalutWidthRatios: "+defalutWidthRatios+" defalutHeightRatios: "+defalutHeightRatios.toFixed(3));
      // global.config.GL_BOARD_DIMENSIONS = {boardWidth: imageWidth, boardHeight: setBoardImageHeight, compairedWithDefaultWidthRatio: (imageWidth/global.config.GAME_DATA.defaultBoardWidth).toFixed(3), compairedWithDefaultHeightRatio: (setBoardImageHeight/global.config.GAME_DATA.defaultBoardHeight).toFixed(3)}
      
      // setGameState(gameState===0?1:0);
  // //     // console.log('global.config.GL_BOARD_LOAD_STATUS_FALSETO: '+global.config.GAME_DATA.BOARD_LOAD_STATUS+ 'imageWidth:  '+ global.config.GL_BOARD_DIMENSIONS.boardWidth+"    imageHeight:  "+global.config.GL_BOARD_DIMENSIONS.boardHeight+"    ssratiosnpssWidth"+ global.config.GL_BOARD_DIMENSIONS.compairedWithDefaultWidthRatio+"    ssratiosnpssHeight"+ global.config.GL_BOARD_DIMENSIONS.compairedWithDefaultHeightRatio);  
  // // // }
  // // //   else{
  // // //     setGameState(gameState===0?1:0);
  // // //     // global.config.GAME_DATA.BOARD_LOAD_STATUS=true;
  // // //     console.log('global.config.GL_BOARD_LOAD_STATUSTRUETO: '+global.config.GAME_DATA.BOARD_LOAD_STATUS+ 'imageWidth:  '+ global.config.GL_BOARD_DIMENSIONS.boardWidth+"    imageHeight:  "+global.config.GL_BOARD_DIMENSIONS.boardHeight+"    ssratiosnpssWidth"+ global.config.GL_BOARD_DIMENSIONS.compairedWithDefaultWidthRatio+"    ssratiosnpssHeight"+ global.config.GL_BOARD_DIMENSIONS.compairedWithDefaultHeightRatio);  
  // // //   }

  // };

  useEffect(()=>{
    if(global.config.GAME_DATA.name=== "Buddhiyoga")
    {
      setCssFile(cssBuddhiyoga)
    }
    else{
      setCssFile(css99kaPhere);
    }
  },[global.config.GAME_DATA.name]);

  useEffect(()=>{
    async function getLanguage(){
    var lang_code_storage=global.config.GL_LANG_CODE
    setLang(lang_code_storage);
    setImageUrl(global.config.BOARD_URL);
    }
    getLanguage();

  },[])

  const spin = diceSpinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });

  const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if(value !== null) {
      // value previously stored
      return value;
    }
    else
    {
      return null;
    }
  } catch(e) {
    // error reading value
    // console.log("Error While fetching Data")
  }
}

  var initialStates={
    iDisplacement:0,
    iSnakeLadderBase:0,
    iOld_state:0,
    iCurrent_state:0,
    iReverseTo:0,
    iRoll:0,
    iOld_ReverseTo:0,
    player:{
      image: null,
      position: global.config.GAME_DATA.initialCellPosition,
      targetPosition: 1,
      wallet: 100,
      global_direction: 1,
      current_cell_type: 0
    },
    dice:{
      iDiceFace: 0,
      iDiceRollCount: 0,
      iDiceCurrentRoll: 0,
      ispinValue:1
    },
    diceFace:Dice7


  }

  var saveStates={
    iDisplacement:0,
    iSnakeLadderBase:0,
    iOld_state:0,
    iCurrent_state:0,
    iReverseTo:0,
    iRoll:0,
    iOld_ReverseTo:0,
    player:{
      image: null,
      position: global.config.GAME_DATA.initialCellPosition,
      targetPosition: 1,
      wallet: 100,
      global_direction: 1,
      current_cell_type: 0
    },
    dice:{
      iDiceFace: 0,
      iDiceRollCount: 0,
      iDiceCurrentRoll: 0,
      ispinValue:1,
      currentDiceFace: 0
    },
    diceFace:Dice7


  }
  var playerMove=[];
  const iDisplacement = useRef(0);
  const specialMove = useRef(0);
  const iSnakeLadderBase = useRef(0);
  const iOld_state = useRef(0);
  const iCurrent_state = useRef(0);
  const iReverseTo = useRef(0);
  const iRoll=useRef(0);
  const iOld_ReverseTo = useRef(0);
  const currentDiceFace = useRef(0);
  const diceStatus=useRef(true);

const player = useRef({
  image: null,
  position: global.config.GAME_DATA.initialCellPosition,
  targetPosition: 1,
  wallet: 100,
  global_direction: 1,
  current_cell_type: 0
});
//End of player variable




const dice=useRef({iDiceFace: 0,
  iDiceRollCount: 0,
  iDiceCurrentRoll: 0,
  ispinValue:1,
  currentRoll:0})
//End of Dice Variable


/* Variables for the game End */



  var positionConfig = {
    "initCellPos": global.config.GAME_DATA.initialCellPosition,
    "initPlayerPos": global.config.GAME_DATA.initialCellPosition,
    "initTargetPos": global.config.GAME_DATA.initialCellPosition,
    "shortTitle": "BY",
    "retreatCellResult": 6,
    "retreatCellOnCount": 3,
    "initialMoveResult": 6,
    "firstLandingCell": 6,
    "cellDimentionX": 95,
    "cellDimentionY": 95,
    "terminatingCellPos":3
  };
  
  useEffect(()=>{
    initializePawn();
    // alert("hello");
},[gameState]);

useEffect(()=>{
  stateChangePawn();
},[excerpt]);

  const diceImage=[
    {
      imageurl:Dice1
    },
    {
      imageurl:Dice2
    },
    {
      imageurl:Dice3
    },
    {
      imageurl:Dice4
    },
    {
      imageurl:Dice5
    },
    {
      imageurl:Dice6
    },
    {
      imageurl:Dice7
    },
    {
      imageurl:Dice8
    },
    {
      imageurl:Dice9
    },
    {
      imageurl:Dice10
    },
    {
      imageurl:Dice11
    },
    {
      imageurl:Dice12
    }
  ];



const initializePawn = ()=>
{
  getData('@saveSate'+global.config.GAME_DATA.name).then(async(data)=>{
      if(data=='null' || data==null || data==undefined )
      {
        dice.current=initialStates.dice;
        iDisplacement.current=initialStates.iDisplacement;
        iSnakeLadderBase.current = initialStates.iSnakeLadderBase;
        iOld_state.current = initialStates.iOld_state
        iCurrent_state.current = initialStates.iCurrent_state;
        iReverseTo.current = initialStates.iOld_ReverseTo;
        iRoll.current=initialStates.iRoll;
        iOld_ReverseTo.current = initialStates.iOld_ReverseTo;
        player.current=initialStates.player;
        // playerPositionX.current=(playerPositions[positionConfig.initCellPos].x);
        // playerPositionY.current=(playerPositions[positionConfig.initCellPos].y);  
        playerPositionX.current=(playerPositions[positionConfig.initCellPos].x*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
        playerPositionY.current=(playerPositions[positionConfig.initCellPos].y*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);  

          Animated.timing(position,{
            toValue:{x:playerPositionX.current,y:playerPositionY.current},
            useNativeDriver: true
            }).start();
            setExcerptState(playerPositions[positionConfig.initCellPos].info.quote[0].name);
            setPostName(playerPositions[positionConfig.initCellPos].info.name);
            setDiceFace(Dice7);
            dice.current.iDiceFace=Dice7;
      }
      else
      {
        let savedData=JSON.parse(data);
        dice.current=savedData.dice;
        iDisplacement.current=savedData.iDisplacement;
        iSnakeLadderBase.current = savedData.iSnakeLadderBase;
        iOld_state.current = savedData.iOld_state
        iCurrent_state.current = savedData.iCurrent_state;
        iReverseTo.current = savedData.iOld_ReverseTo;
        iRoll.current=savedData.iRoll;
        iOld_ReverseTo.current = savedData.iOld_ReverseTo;
        player.current=savedData.player;
        postIdCellMovement.current=playerPositions[player.current.position].postID;
        // playerPositionX.current=(playerPositions[player.current.position].x);
        // playerPositionY.current=(playerPositions[player.current.position].y);  
        playerPositionX.current=(playerPositions[player.current.position].x*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
        playerPositionY.current=(playerPositions[player.current.position].y*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);  
        postPlayIndex.current=savedData.postPlayIndex 
          Animated.timing(position,{
            toValue:{x:playerPositionX.current,y:playerPositionY.current},
            useNativeDriver: true
            }).start();
            setExcerptState(playerPositions[player.current.position].info.quote[0].name);
            setPostName(playerPositions[player.current.position].info.name);
            setDiceFace(savedData.dice.iDiceFace);
            dice.current.iDiceFace=savedData.dice.iDiceFace;
      }
  });
 
  
      
}
const stateChangePawn = async()=>
{
  var data=playerPositions[positionConfig.initCellPos].info.name;
  cellInfo.current=data;  
    Animated.timing(position,{
      toValue:{x:playerPositionX.current,y:playerPositionY.current},
      useNativeDriver: true
      }).start();
      
}
  const [postButton,setPostButton]=useState(false);
  const [imageScale,setImageScale] = useState(1);
  var zoomableViewRef = useRef(createRef());
  const audio=useRef(true); //true for on, false for off


  // const diceRoll=async()=>{
  //   diceStatus.current=false;
  //   setPostButton(true);
  //   zoomableViewRef.current.zoomTo(1);
  //   specialMove.current=0
  //   setPostButton(false);
  //   setImageScale(1);
  //   if(!isRotating)
  //   {
  //     setRotation(!isRotating);
  //   }
  //   Animated.timing(
  //     diceSpinValue,
  //   {
  //     toValue: 1,
  //     duration: 200,
  //     easing: Easing.linear, // Easing is an additional import from react-native
  //     useNativeDriver: true  // To make use of native driver for performance
  //   }
  // ).start(()=>{
  //   dice.current.iDiceRollCount++;
  //   let min = 1;
  //   let max = 7;
  //   dice.current.iDiceCurrentRoll= min+Math.floor( Math.random() * (max - min));
  //   // dice.current.iDiceCurrentRoll=2;
  //   specialMove.current = playerPositions[player.current.position].info.movement.specialMove[(dice.current.iDiceCurrentRoll* 3) + iCurrent_state.current];
  //   console.log("specialMove"+specialMove.current);
  //   let faceDice=playerPositions[player.current.position].info.movement.diceState[(dice.current.iDiceCurrentRoll* 3) + iCurrent_state.current];
  //   console.log("faceDice "+faceDice);
  //   console.log("iSnakeLadderBase.current "+iSnakeLadderBase.current);
  //   console.log("dice.current.iDiceCurrentRoll-1: "+ dice.current.iDiceCurrentRoll-1);
  //   if(iSnakeLadderBase.current==0)
  //   {
  //     dice.current.currentRoll=dice.current.iDiceCurrentRoll-1;
  //     setDiceFace(diceImage[dice.current.iDiceCurrentRoll-1].imageurl)
  //     dice.current.iDiceFace=diceImage[dice.current.iDiceCurrentRoll-1].imageurl;
  //   }
  //   else
  //   {
  //     setDiceFace(diceImage[6].imageurl)
  //     dice.current.iDiceFace=diceImage[6].imageurl
  //   }
  //   sound.current="dice_rolling.mp3";
    
  //   if(specialMove.current > 0 || specialMove.current < 0 )
  //   {
  //       alert('INSIDE specialMove.current condition -382---',);
  //       setDiceFace(diceImage[faceDice].imageurl)
  //       dice.current.iDiceFace=diceImage[faceDice].imageurl
  //       currentDiceFace.current=diceImage[faceDice].imageurl;
  //       // currentDiceFace.current=faceDice;
  //   }
  //   initiatePawnMovement();
  // });
  // // if(specialMove.current === 0)
  // //   {
  //     currentDiceFace.current=dice.current.iDiceFace;
  //   // }
  // if(dice.current.ispinValue==1)
  // {
  //   dice.current.ispinValue=0;
  // }
  // else
  // {
  //   dice.current.ispinValue=1;
  // }
  // };
  // const diceRoll=async()=>{
  //   diceStatus.current=false;
  //   setPostButton(true);
  //   zoomableViewRef.current.zoomTo(1);
  //   specialMove.current=0
  //   setPostButton(false);
  //   setImageScale(1);
  //   if(!isRotating)
  //   {
  //     setRotation(!isRotating);
  //   }
  //   Animated.timing(
  //     diceSpinValue,
  //   {
  //     toValue: 1,
  //     duration: 200,
  //     easing: Easing.linear, // Easing is an additional import from react-native
  //     useNativeDriver: true  // To make use of native driver for performance
  //   }
  // ).start(()=>{
  //   dice.current.iDiceRollCount++;
  //   let min = 1;
  //   let max = 7;
  //   dice.current.iDiceCurrentRoll= min+Math.floor( Math.random() * (max - min));
  //   // dice.current.iDiceCurrentRoll=4;
  //   specialMove.current = playerPositions[player.current.position].info.movement.specialMove[(dice.current.iDiceCurrentRoll* 3) + iCurrent_state.current];
  //   let faceDice=playerPositions[player.current.position].info.movement.diceState[(dice.current.iDiceCurrentRoll* 3) + iCurrent_state.current];
  //   if(iSnakeLadderBase.current==0)
  //   {
  //     dice.current.currentRoll=dice.current.iDiceCurrentRoll-1;
  //     setDiceFace(diceImage[dice.current.iDiceCurrentRoll-1].imageurl)
  //     dice.current.iDiceFace=diceImage[dice.current.iDiceCurrentRoll-1].imageurl;
  //   }
  //   else
  //   {
  //     setDiceFace(diceImage[6].imageurl)
  //     dice.current.iDiceFace=diceImage[6].imageurl
  //   }
  //   sound.current="dice_rolling.mp3";
  //   // currentDiceFace.current=dice.current.iDiceFace;
    
  //   if(specialMove.current > 0 || specialMove.current < 0 )
  //   {
  //       alert('INSIDE specialMove.current condition -382---',);
  //       // setDiceFace(diceImage[6].imageurl)
  //       // setDiceFace(diceImage[faceDice].imageurl)
  //       dice.current.iDiceFace=faceDice+1;
  //       currentDiceFace.current=diceImage[faceDice].imageurl;
  //       // currentDiceFace.current=faceDice;
  //   }
  //   initiatePawnMovement();
    
  // });
  // // if(specialMove.current === 0)
  // //   {
   
  // currentDiceFace.current=dice.current.iDiceFace;
  //   // }
  // if(dice.current.ispinValue==1)
  // {
  //   dice.current.ispinValue=0;
  // }
  // else
  // {
  //   dice.current.ispinValue=1;
  // }
  // };

  const diceRoll=async()=>{
    diceStatus.current=false;
    setPostButton(true);
    zoomableViewRef.current.zoomTo(1);
    specialMove.current=0
    setPostButton(false);
    setImageScale(1);
    if(!isRotating)
    {
      setRotation(!isRotating);
    }
    Animated.timing(
      diceSpinValue,
    {
      toValue: 1,
      duration: 200,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true  // To make use of native driver for performance
    }
  ).start(()=>{
    dice.current.iDiceRollCount++;
    let min = 1;
    let max = 7;
    // dice.current.iDiceCurrentRoll= min+Math.floor( Math.random() * (max - min));
    dice.current.iDiceCurrentRoll=6;
    specialMove.current = playerPositions[player.current.position].info.movement.specialMove[(dice.current.iDiceCurrentRoll* 3) + iCurrent_state.current];
    let faceDice=playerPositions[player.current.position].info.movement.diceState[(dice.current.iDiceCurrentRoll* 3) + iCurrent_state.current];
    if(iSnakeLadderBase.current==0)
    {
      dice.current.currentRoll=dice.current.iDiceCurrentRoll-1;
      setDiceFace(diceImage[dice.current.iDiceCurrentRoll-1].imageurl)
      dice.current.iDiceFace=diceImage[dice.current.iDiceCurrentRoll-1].imageurl;
    }
    else
    {
      setDiceFace(diceImage[6].imageurl)
      dice.current.iDiceFace=diceImage[6].imageurl
    }
    sound.current="dice_rolling.mp3";
    // currentDiceFace.current=dice.current.iDiceFace;
    
    if(specialMove.current > 0 || specialMove.current < 0 )
    {
        alert('INSIDE specialMove.current condition -382---',);
        // setDiceFace(diceImage[6].imageurl)
        // setDiceFace(diceImage[faceDice].imageurl)
        dice.current.iDiceFace=faceDice+1;
        currentDiceFace.current=diceImage[faceDice].imageurl;
        // currentDiceFace.current=faceDice;
    }
    initiatePawnMovement();
    
  });
  // if(specialMove.current === 0)
  //   {
   
  currentDiceFace.current=dice.current.iDiceFace;
    // }
  if(dice.current.ispinValue==1)
  {
    dice.current.ispinValue=0;
  }
  else
  {
    dice.current.ispinValue=1;
  }
  };

  const initiatePawnMovement = async ()=>{
    iRoll.current=dice.current.iDiceCurrentRoll;
    iOld_state.current = iCurrent_state.current;
    console.log("iOld_state.current: "+ iOld_state.current)
    iCurrent_state.current = playerPositions[player.current.position].info.movement.state[(iRoll.current * 3) + iOld_state.current];
    console.log("iCurrent_state.current: "+ iCurrent_state.current)
   if (iCurrent_state.current == 999) {
    console.log("iCurrent_state.current:111111111111111111"+iCurrent_state.current)
     iCurrent_state.current = iOld_state.current;
   }
   iDisplacement.current = playerPositions[player.current.position].info.movement.displacement[iOld_state.current];
   specialMove.current=playerPositions[player.current.position].info.movement.specialMove[iOld_state.current];
   if (iDisplacement.current == 0) {
     iDisplacement.current = playerPositions[player.current.position].info.movement.displacement[(iRoll.current* 3) + iOld_state.current];
     specialMove.current = playerPositions[player.current.position].info.movement.specialMove[(iRoll.current* 3) + iOld_state.current];
    console.log("iDisplacement.current: "+ iDisplacement.current)
    console.log("playecurrentpositions: "+ player.current.position)

  if(iDisplacement.current==-62 || iDisplacement.current==0 || (player.current.position + iDisplacement.current)>global.config.GAME_DATA.totalNoOfCells){
   setTimeout(() => {
     setDiceFace(diceImage[6].imageurl)
     dice.current.iDiceFace=diceImage[6].imageurl
   }, 1000);
   diceStatus.current=true
  }
   }
 if (iDisplacement.current < 999) {
   iSnakeLadderBase.current = playerPositions[player.current.position + iDisplacement.current].info.movement.displacement[iCurrent_state.current];
   console.log('iSnakeLadderBase.current initialMovement: '+ iSnakeLadderBase.current)
 }


   if ((iDisplacement.current != 0) && (iDisplacement.current < 999) ) {
     iOld_ReverseTo.current = iReverseTo.current;
     iReverseTo.current = playerPositions[player.current.position].info.movement.return[(iRoll.current * 3) + iOld_state.current];
     if (iReverseTo.current == 999) {
         iReverseTo.current = iOld_ReverseTo.current;
     }

     player.current.targetPosition = player.current.position + iDisplacement.current;
 }
 else if (iDisplacement.current == 999) {
     player.current.targetPosition = iReverseTo.current;
 }

 if(iDisplacement.current<0 || specialMove.current < 0 )
 {
   sound.current="snake_bite.mp3";
 }
 else if(iDisplacement.current>6 || specialMove.current >0)
 {
   sound.current="ladder.mp3";
 }
 else
 {
   sound.current="dice_rolling.mp3";
 }
 var audioSound=await AsyncStorage.getItem("audio");
 if(audioSound!==null || audioSound !==undefined)
 {
   var audiosound= JSON.parse(audioSound);
   audio.current=audiosound;
 }
   if(audio.current)
   {
 var buttonSound = new Sound (sound.current, Sound.MAIN_BUNDLE, (error) => {
   if (error) {
     console.log('Failed to load sound', error);
   }
   else{
    //  if(diceFace===8)
    //  {
    //    buttonSound.setCurrentTime(.5).play(()=>{
    //      buttonSound.release();
    //    });
    //  }
    //  else{
     buttonSound.setCurrentTime(.2).play(()=>{
       buttonSound.release();
     });
    //  }
     
   }
 });
}
// console.log("specialMove"+ specialMove.current);
  if(((iDisplacement.current < 0) || (iDisplacement.current > 6 )) || specialMove.current !=0)
  {
   player.current.targetPosition=player.current.position+iDisplacement.current;
    movePawnToCell();
  }
  else if(iDisplacement.current!=0)
  {
   // console.log(iDisplacement.current);
   dice.current.iDiceCurrentRoll=iDisplacement.current;
   movePawnNextCell();
   cellInfo.current=playerPositions[player.current.position].info.name;
  }
  diceStatus.current=true;
  postIdCurrent.current=playerPositions[player.current.position].postID;
 
};

  const landingEvent =async()=>{
    if(lang=='en')
    {
      var audioData='hi_'+playerPositions[player.current.position].landing;  
    }
    else{
      var audioData=lang+'_'+playerPositions[player.current.position].landing;
    }
    
    // let asd=require(`../assets/audio/game/en/${lang}_abhiman.wav`);
    if(audio.current)
    {
      var buttonSound = new Sound (audioData, Sound.MAIN_BUNDLE,(error) => {
      if (error) {
        console.log('Failed to load sound', error);
      }
      else{
        buttonSound.play(()=>{
          buttonSound.release();
        });
      }
    });
    }
    player.current.global_direction=1;
    player.current.targetPosition=player.current.position;
    // console.log("landingEvent iSnakeLadderBase.current: "+iSnakeLadderBase.current);
    if(iSnakeLadderBase.current>0)
    {
    
      setDiceFace(diceImage[8].imageurl);
      dice.current.iDiceFace=diceImage[8].imageurl;
    
      
      
    }
    else if(iSnakeLadderBase.current < 0)
    {
      
      setDiceFace(diceImage[7].imageurl);
      dice.current.iDiceFace=diceImage[7].imageurl;
    
    }
    else
    {
      setDiceFace(diceImage[6].imageurl)
      dice.current.iDiceFace=diceImage[6].imageurl;
    
    }
    // console.log("landingEvent dice.current.iDiceFace: "+dice.current.iDiceFace);
    diceStatus.current=true;
    setImageScale(2);
    postIdCellMovement.current=playerPositions[player.current.position].postID;
    postPlayIndex.current=player.current.position;
    saveStatesFunc(playerPositions[player.current.position].info.name,playerPositions[player.current.position].cellNo);
    setExcerptState(playerPositions[player.current.position].info.quote[0].name);
    setPostName(playerPositions[player.current.position].info.name);
  };

  const flyoverEvent =()=>{
    
    if((player.current.position+1) > global.config.GAME_DATA.totalNoOfCells )
    {
      player.current.global_direction=-1;
    }

  };

  const movePawnNextCell=async()=>{
      // playerPositionX.current=(playerPositions[player.current.position].x);
      // playerPositionY.current=(playerPositions[player.current.position].y);
      playerPositionX.current=(playerPositions[player.current.position].x*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
      playerPositionY.current=(playerPositions[player.current.position].y*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
      postPlayIndex.current=player.current.position;
      Animated.sequence([
    Animated.timing(position,{
      toValue:{x: playerPositionX.current,y: playerPositionY.current},
      useNativeDriver: true
    })]).start(()=>{

      if(dice.current.iDiceCurrentRoll>0)
      {
        flyoverEvent();
        player.current.position= player.current.position+(1*player.current.global_direction);
        dice.current.iDiceCurrentRoll--;
        movePawnNextCell();
      }
      else
      {
        
        landingEvent();
      }
    });
  };

  const movePawnToCell=async ()=>{
    var lastPost=false;
    if(player.current.position==global.config.GAME_DATA.initialCellPosition){
      lastPost=true;
    }
    // playerPositionX.current=(playerPositions[player.current.targetPosition].x);
    // playerPositionY.current=(playerPositions[player.current.targetPosition].y);
    playerPositionX.current=(playerPositions[player.current.targetPosition].x*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
    playerPositionY.current=(playerPositions[player.current.targetPosition].y*global.config.GL_BOARD_DIMENSIONS.defaultWidthHeightRatio);
    // console.log("movePawnToCell iSnakeLadderBase.current: "+iSnakeLadderBase.current);
    
    if(iSnakeLadderBase.current>0)
    {
      setDiceFace(diceImage[8].imageurl)
      dice.current.iDiceFace=diceImage[8].imageurl;
      
    }
    else if(iSnakeLadderBase.current < 0)
    {
      setDiceFace(diceImage[7].imageurl)
      dice.current.iDiceFace=diceImage[7].imageurl;
    }
    // console.log("movePawnToCell dice.current.iDiceFace: "+dice.current.iDiceFace);

    diceStatus.current=true;

    Animated.timing(position,{
      toValue:{x: playerPositionX.current,y:playerPositionY.current},
      useNativeDriver: true
    }).start(async()=>{
      player.current.position=player.current.targetPosition;
      postIdCellMovement.current=playerPositions[player.current.position].postID;
      postPlayIndex.current=player.current.position;
      setImageScale(2);
      saveStatesFunc(playerPositions[player.current.position].info.name,playerPositions[player.current.position].cellNo);
      setExcerptState(playerPositions[player.current.position].info.quote[0].name);
      setPostName(playerPositions[player.current.position].info.name);
      if(lang=='en')
    {
      var audioData='hi_'+playerPositions[player.current.position].landing_sm;  
    }
    else{
      var audioData=lang+'_'+playerPositions[player.current.position].landing_sm;
    }
      if(audio.current && !lastPost)
      {
        var buttonSound = new Sound (audioData, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load sound', error);

        }
        else{
          
          buttonSound.play(()=>{
            buttonSound.release();
          });
        }
      });
    }
    });
  };

  var bufferPlayerMoves=[];
  var device={deviceID:"",manufacturer:"",model:"",timeZone:"",nativeLang:"",date:""};

  const saveStatesFunc =async(postName,postID)=>{
      saveStates.dice=dice.current;
      saveStates.player=player.current;
      saveStates.iCurrent_state=iCurrent_state.current;
      saveStates.iDisplacement=iDisplacement.current;
      saveStates.iOld_ReverseTo=iOld_ReverseTo.current;
      saveStates.iOld_state=iOld_state.current;
      saveStates.iReverseTo=iOld_ReverseTo.current;
      saveStates.iRoll=iRoll.current;
      saveStates.iSnakeLadderBase=iSnakeLadderBase.current;
      saveStates.diceFace=diceFace;  
      saveStates.currentDiceFace=currentDiceFace.current;
      saveStates.postName=postName;
      saveStates.postID=postID;
      saveStates.postPlayIndex=postPlayIndex.current
      var bufferStates={};
      bufferStates.gameState=saveStates;
      await DeviceInfo.getAndroidId().then((androidId) => {
        device.deviceID=androidId;
      });
      await DeviceInfo.getManufacturer().then((androidId) => {
        device.manufacturer=androidId;
      });
      await DeviceInfo.getDevice().then((deviceID) => {
        device.model=deviceID;
      });
      device.timeZone=getTimeZone();
      device.nativeLang=global.config.GL_LANG_CODE;
      var date = new Date();
      device.date=date;

      saveStates.deviceInformation=device;
      storeData('@saveSate'+global.config.GAME_DATA.name,saveStates);
      playerMove.push(saveStates);
      var storageData=await getData('@playerMove'+global.config.GAME_DATA.name);
      if(storageData===null)
      {
        storeData('@playerMove'+global.config.GAME_DATA.name,playerMove);
      }
      else{
        storageData=JSON.parse(storageData);
        storageData.push(saveStates);
        storeData('@playerMove'+global.config.GAME_DATA.name,storageData);
      }
      bufferStates.deviceInformaion=device;
      bufferPlayerMoves.push(bufferStates);
      var bufferStorageData=await getData('@bufferPlayerMove'+global.config.GAME_DATA.name);
      if(bufferStorageData===null)
      {
        storeData('@bufferPlayerMove'+global.config.GAME_DATA.name,bufferPlayerMoves);
      }
      else{
        bufferStorageData=JSON.parse(bufferStorageData);
        bufferStorageData.push(bufferStates);
         storeData('@bufferPlayerMove'+global.config.GAME_DATA.name,bufferStorageData);
      }
     if(storageData!=null && storageData.length >= 3) {
        setMagicStatus(true);
      }
  };
  const [undefinedTaps,setUndefinedTaps]=useState(0);
  const [cellName,setCellName]=useState([]);
  const [cellID,setCellID]=useState();
  const [readExcerpt,setreadExcerpt]=useState();


  const getPosts=async(e)=>{
  let postsid;
  let x=e.nativeEvent.x;
  let y=e.nativeEvent.y-360;
  console.log("x"+x+" y"+y);
  playerPositions.forEach((element,index) => {
    if((x>=element.topX && y>=element.topY ) && (x<=element.botX  && y<=element.botY))
    {
      postIndex.current=index;
      postsid=element.postID;
    }
  });
  postReadIdCurrent.current=postsid;
  if(postReadIdCurrent.current !==undefined){
    // alert('asdsad');
    setPostButton(true);
    setCellName(playerPositions[postIndex.current].info.name);
    // setCellID(playerPositions[postIndex.current].cellNo)
    setreadExcerpt(playerPositions[postIndex.current].info.quote[0].name);
  }
  else{
    if(undefinedTaps=== 3){
      setUndefinedTaps(0);
      alert("please tap inside the cell");
      }
      else{
        setUndefinedTaps(undefinedTaps+1);
      }
  }
}

    const magicButton=()=>{
      navigation.navigate('recentMoves');
    }

    const howtoplayFunction=()=>{
      navigation.navigate('Help');
    }
    const debugMode=()=>{
      navigation.navigate('Help');
    }


// console.log("global.config.GL_BOARD_DIMENSIONS.boardHeight"+global.config.GL_BOARD_DIMENSIONS.boardHeight)
return (
    <>
    <SafeAreaView style={[cssFile.safeAreaView,{width: width,height: height}]}>
    <Hamburger navigation={navigation} infoFunction={magicButton} resetStatus={true} magicStatus={magicStatus} howtoplayFunction={howtoplayFunction} debugMode={debugMode} />
    <View style={[cssFile.gameView,{flex:1, width: width}]} >
    <Animated.View style={cssFile.gameContainer} onLayout={onImageLayout}>
    {/* <Animated.View style={{width:width,height:380,overflow:'hidden'}}> */}
    <View style={cssFile.subgameContainer}>
    <Animated.View style={[cssFile.imageView,{padding: 0,width: global.config.GL_BOARD_DIMENSIONS.boardWidth, height: global.config.GL_BOARD_DIMENSIONS.boardHeight}]}>
    <ReactNativeZoomableView
          ref={zoomableViewRef}
            zoomEnabled={true}
            maxZoom={2}
            minZoom={1}
            zoomStep={0.78}
            initialZoom={1}
            bindToBorders={true}
            style={cssFile.zoomableView}
          >
       <TapGestureHandler
          numberOfTaps={1}
          style={{backgroundColor: 'red', padding: 0}}
          onActivated={(e) => {
              getPosts(e)
          }}>
            {/* <Animated.Image source={{uri:imageUrl}} style={{width:380,height:380,zIndex:-1,}}> */}
            {/* <Animated.Image source={{uri:imageUrl}} style={[cssFile.imageStyle,{height: Number(global.config.GL_BOARD_DIMENSIONS.boardHeight)}]} onLayout={onImageLayout}>
                  </Animated.Image> */}
                  <Animated.Image source={{uri:imageUrl}} style={[cssFile.imageStyle,{}]}>
                  </Animated.Image>
        </TapGestureHandler>
      {/* <Animated.View 
      style={{alignContent:'center',
      justifyContent:'center',
      bottom:46,
      right:155,
      width:37.5,
      height:42.5,
      transform:[{
        translateX:position.x
      },{translateY:position.y}]
      }}> */}
      <Animated.View style={[cssFile.tokenView,{transform:[{translateX:position.x},{translateY:position.y}]}]}>
        {/* <Animated.Image source={require('../assets/game/token4.png')} style={{width:40,height:40,opacity:imageScale==2?0.8:1}}></Animated.Image> */}
        <Animated.Image source={require('../assets/game/token4.png')} style={[cssFile.token,{opacity:imageScale==2?0.8:1}]}></Animated.Image>
      </Animated.View>
      </ReactNativeZoomableView>
      </Animated.View>
      
      {/* <View style={{
      flex:1,
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'center',
      width:"100%", 
      bottom:0,
      height:"10%"
      }}> */}
      <View style={cssFile.diceView}>
      {/* <Animated.View style={{
        width:45,
        height:45,
        borderRadius:10,      
        transform: [{rotate: spin}]
    }}> */}
    <Animated.View style={[cssFile.diceAnimatedView,{transform: [{rotate: spin}]}]}>
      <TouchableOpacity onPress={() => {diceRoll()}} style={{justifyContent:'center', alignItems:'center',zIndex:-1}} disabled={diceStatus.current==false ? true : false}>
      <Animated.Image ref={diceFaceFrame} source={diceFace} 
      style={{width:"95%",height:"100%"}}
      resizeMode="contain"
      />
      </TouchableOpacity>
      </Animated.View>
      </View>
    
   </View>
   </Animated.View>
   </View>
    {/* <View style={{ marginTop:'0%',width:"100%", height:"15%",justifyContent:'flex-end'}} > */}
    <View style={cssFile.blockInformationView} >
   <BlockInformation setrotation={(e)=>setRotation(e)} rotation={isRotating} excerpt={excerpt} readExcerpt={readExcerpt} readpostId={postReadIdCurrent.current} cellName={cellName} postButton={postButton} postName={postName} postId={postIdCellMovement.current} navigation={navigation} postIndex={postIndex.current} postPlayIndex={postPlayIndex.current}/>        
   </View>
   </SafeAreaView>
   </>
  );
};
<>
  </>

export default GameEngine ;