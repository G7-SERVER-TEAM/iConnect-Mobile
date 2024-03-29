import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState }from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';



export default function SignUpScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const [password1, setPassword1] = useState(''); 
    const [showPassword1, setShowPassword1] = useState(false); 

    const [password2, setPassword2] = useState(''); 
    const [showPassword2, setShowPassword2] = useState(false); 

    const toggleShowPassword1 = () => { 
        setShowPassword1(!showPassword1); 
    }; 
     const toggleShowPassword2 = () => { 
        setShowPassword2(!showPassword2); 
    }; 

    const route = useRoute();

    const createAccountInformation = async (information) => {
        const ICONNECT_API = "http://192.168.1.5:8081/auth/email/sign-up";
        try {
          const result = await fetch(ICONNECT_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(information),
          });
           if (result.ok) {
            const responseBody = await result.text();
            return responseBody;
        } else {
            throw new Error(`Error: ${result.status} - ${result.statusText}`);
        }
        } catch (err) {
          throw err;
        }
      };

    const handleCreateAccount = () => {
        if (password1 != password2) {
            throw new error("Password isn't match.");
        }
        const uid = route.params?.uid;
        const accountInformation = {
          email: email,
          password: password1,
          uid: uid
        };
        createAccountInformation(accountInformation).then(result => {
          navigation.navigate("Login")
        }).catch(err => {
          console.log(err);
        });
      };

  return (
    <View className="flex-1" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity style={{marginLeft: 30}}
                onPress={()=> navigation.goBack()}   
            >
            <ArrowLeftIcon size="20" color="white" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center" style={{marginTop: 30}}>
            <Image source={require('../assets/images/WelcomePicture.png')} 
                style={{width: 150, height: 150}} />
        </View>
        <View className="flex-row justify-center">
            <Text className="font-bold" style={{color: themeColors.text,fontSize: 50, marginTop: 10}}>
                CREATE
            </Text>
        </View>
        <View className="flex-row justify-center">
            <Text className="font-bold" style={{color: themeColors.text,fontSize: 15}}>
                Your Account
            </Text>
        </View>
      </SafeAreaView>
      
      <View className="flex-1 px-8">
        <View className="form space-y-2">
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder='Email'
                onChangeText={setEmail}
            />
            <View className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" style={{flexDirection: 'row'}}>
                <TextInput
                style={{width: '92%'}}
                placeholder='Password'
                secureTextEntry={!showPassword1} 
                    value={password1} 
                    onChangeText={setPassword1} 
                    
                />
                <MaterialCommunityIcons 
                    name={showPassword1 ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    onPress={toggleShowPassword1} 
                /> 
            </View>
            
            <View className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" style={{flexDirection: 'row'}}>
                <TextInput
                style={{width: '92%'}}
                placeholder='Confirm Password'
                secureTextEntry={!showPassword2} 
                    value={password2} 
                    onChangeText={setPassword2} 
                    
                />
                <MaterialCommunityIcons 
                    name={showPassword2 ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    onPress={toggleShowPassword2} 
                /> 
            </View>
            
    
            <TouchableOpacity
                className="py-4 rounded-3xl"
                onPress={handleCreateAccount}
                style={{backgroundColor: themeColors.bgbtn}}
            >
                <Text className="font-bold text-center text-white" style={{fontSize: 20}}>
                    CREATE ACCOUNT
                </Text>
            </TouchableOpacity>

        </View>
       
      </View>
    </View>
  )
}


