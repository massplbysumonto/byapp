import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet,TextInput,TouchableWithoutFeedback } from "react-native";
import{REGISTER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileManagement from "./ProfileManagement";

function Register({props}){

const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[phone,setPhone]=useState('');
const [status,setStatus]=useState(0);
const [userData,setUserData]=useState('');

useEffect(()=>{
  if(userData.length ===null)
checkUserStorage()
});

const checkUserStorage=async()=>{
  var userStorageData=await AsyncStorage.getItem('userData');
  if(Object.keys(JSON.parse(userStorageData)).length >0 ||userStorageData != null || userStorageData!=undefined)
  {
    setStatus(1);
    setUserData(userStorageData);
    userStorageData=JSON.parse(userStorageData);
    console.log(userStorageData.password)
    setName(userStorageData.name);
    setEmail(userStorageData.email)
    setPassword(userStorageData.password);
    setPhone(userStorageData.phone);
  }
}

    const submitButonHandler=async()=>{
      
       let data = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    body: JSON.stringify({
    name:name,
    email:email,
    phone:phone,
    password:password
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    }
  };
  let response=  await fetch(REGISTER_URL,data)
    .then(response => response.json())  // promise
    .then(async(json) =>{
      // console.log(json);
      if(json.code ===2)
      {
        alert('Record Updated Successfully!!');
      }
      else if(json.code === -1)
      {
        alert('Server Error');
      }
      else{
        var userData={name:name, email:email, password:password, phone:phone};
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        setStatus(1);
        alert("Successfully Registered");

      }
     } )
    }

   
    return (
        <>
            <View>
              {status===0 &&
                <Text style={styles.headings}>Register</Text>
              }
              {status===1 &&
                <Text style={styles.headings}>Profile Management</Text>
              }

                <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Name"
        value={name}
        onChangeText={newValue => setName(newValue)}
      />
                <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Email"
        value={email}
        onChangeText={newValue => setEmail(newValue)}
        editable={status==0?true:false}
      />
                      <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Phone"
        value={phone}
        onChangeText={newValue => setPhone(newValue)}
      />
                      <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        placeholder="Enter Password"
        value={password}
        onChangeText={newValue => setPassword(newValue)}
      />
        
        <TouchableWithoutFeedback style={{}} onPress={()=>submitButonHandler()}>
    <View>
            <Text style={styles.btnstext}>Submit</Text>
            </View>

        </TouchableWithoutFeedback>
</View>
        </>
    )
}
export default Register;

// const Styles = StyleSheet.create({
// input:{}
// });
const styles = StyleSheet.create({
	headings :{
		marginVertical:20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(183,153,114,1)',
	},
    input :{
        backgroundColor: 'rgba(183,153,114,0.15)',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    btnstext:{
        textAlign: 'center',
        backgroundColor: "rgba(183,153,114,1)",
        color: '#fff',
        marginVertical: 20,
        paddingVertical: 8,
        borderRadius: 10,


        // width: 80,
        // textAlign: 'center'
    }
})