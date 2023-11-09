import React, { Component } from "react";
// import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Updates extends Component{
constructor(){
    super();
}

componentDidMount(){

}
async getInstalledXMLData(gameName){
  var xmlInfo;
  if(gameName==="Buddhiyoga")
  {
    xmlInfo= require('../assets/game/buddhiyogaEngine.json');
    global.config.GL_XML_DATA=require('../assets/game/buddhiyogaEngine.json');
     xmlInfo=xmlInfo[xmlInfo.length-1];
     
  }
  else if(gameName==="99kapher")
  {
    xmlInfo = require('../assets/game/99kapherEngine.json');
    global.config.GL_XML_DATA=require('../assets/game/99kapherEngine.json');
    xmlInfo=xmlInfo[xmlInfo.length-1];
  }
  global.config.GAME_DATA=xmlInfo
    return(xmlInfo);
}

async getXMLFromDevice(xmlName){
  
  var path = RNFS.DocumentDirectoryPath + '/'+xmlName+'.json';
  // console.log(path);
  const checkExistence = await RNFS.exists(path);
  if(checkExistence)
  {
    var response = await RNFS.readFile(path);
    response=JSON.parse(response);
    global.config.GL_XML_DATA=response;
    global.config.GAME_DATA=global.config.GL_XML_DATA[global.config.GL_XML_DATA.length - 1];
    // global.config.BOARD_URL=global.config.GL_XML_DATA[global.config.GL_XML_DATA.length - 1].boardImage
  }
  else{
    // if(xmlName)
    let xmlData=await this.getInstalledXMLData(xmlName);
    // global.config.GL_XML_DATA=require('../assets/game/buddhiyogaEngine.json');
    // global.config.GAME_DATA=global.config.GL_XML_DATA[global.config.GL_XML_DATA.length - 1];
  }
}

async downloadXMLFile(name){
  let xmlData=await this.getInstalledXMLData(name);
  let xmlName=xmlData.name;
  let version=xmlData.version;
  var path = RNFS.DocumentDirectoryPath + '/'+xmlName+'.json';
  console.log(path);
  const request = await fetch('https://buddhiyoga.in/buddhiyogaapi/Api/getBoardXML', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({boardName:xmlName,version:version}),
  });
  const response =  await request.json();
  if(response === 404)
    {
      this.getXMLFromDevice(xmlName);
    }
    else{
      global.config.GL_XML_DATA=response;
      RNFS.writeFile(path, JSON.stringify(response))
      .then(async (success) => {
        // console.log(success)
      console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });
    }
}

}

export default new Updates;