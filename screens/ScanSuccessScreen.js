import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { themeColors } from "../theme/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ScanSuccessScreen() {
    const navigation = useNavigation()
    const route = useRoute()

    // QRCode's data
    const dataString = route.params?.data
    const data = JSON.parse(dataString);
    const username = data.name 
    const license_plate = data.license_plate
    const check_in_time = data.start_time
    const transaction_id = data.transaction_id

    const uid = route.params.uid;
    const access_token = route.params.access_token;

    console.log(data)

    const getCheckInDate=(time)=>{
        var checkInTime = new Date(time)

        var date = checkInTime.getDate();
        var month = checkInTime.getMonth() + 1;
        var year = checkInTime.getFullYear();
        
        console.log( date + '/' + month + '/' + year)
        return date + '/' + month + '/' + year;
     }

     const getCheckInTime=(time)=>{
        var checkInTime = new Date(time)

        var hour = (checkInTime.getHours() < 10 ? '0' : '') + checkInTime.getHours();
        var minute = (checkInTime.getMinutes() < 10 ? '0' : '') + checkInTime.getMinutes();
        var second = (checkInTime.getSeconds() < 10 ? '0' : '') + checkInTime.getSeconds();
   
        return hour + ':' + minute + ':' + second;
     }

     const startTransaction = async (transaction_id, access_token) => {
        const ICONNECT_API = `http://192.168.1.5:8082/transaction/qrcode/update/${transaction_id}`;
        const information = {
          "uid": uid
        };
        try {
          const result = await fetch(ICONNECT_API, {
            method: 'PATCH', 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(information)
          })
          if (result.ok) {
            const responseBody = await result.text();
            console.log('Succeed!')
            return responseBody;
          } else {
            throw new Error(`Error: ${result.status} - ${result.statusText}`);
          }
        } catch (err) {
          throw err;
        }
     };
     
     startTransaction(transaction_id, access_token)

    return (
        <View style={styles.container}>
          <View>
            <Text
              style={{
                fontSize: 48,
                paddingTop: 100,
                color: themeColors.text
              }}
            >
              Scan QR Code
            </Text>
          </View>
          <View 
            className="p-5"
            style={{
                backgroundColor: "white",
                marginBottom: 20,
                marginTop: 20,
                borderRadius: 20,
                overflow: "hidden",
                width: "auto",
              }}
          >
            <View className="flex items-center">
              <MaterialCommunityIcons 
                name="check-circle-outline"
                className="border-white rounded-[37.5] border-[4px]"
                style={{
                    color: themeColors.text,
                    fontSize: 50
                }}
              />
            </View>
            <View className="flex flex-col justify-center items-center">
                <Text className="text-3xl">VALID ID</Text>
                <Text>{username}</Text>
            </View>
            <View
                style={{
                    borderBottomWidth: 2,
                    borderBottomColor: themeColors.text,
                    width: "85%",
                    alignSelf: "center",
                    marginTop: 5,
                    }}
            />
            <View
                style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
                <Text
                    style={{
                    marginLeft: 25,
                    marginTop: 10,
                    color: "gray",
                    }}
                >
                    License Plate:
                </Text>
                <Text
                    style={{
                    marginTop: 10,
                    marginRight: 25,
                    color: "black",
                    fontWeight: "bold",
                    }}
                >
                    {license_plate}
                </Text>
            </View>
            <View
                style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
                <Text
                    style={{
                    marginLeft: 25,
                    marginTop: 10,
                    color: "gray",
                    }}
                >
                    Date:
                </Text>

                <Text
                    style={{
                    marginTop: 10,
                    marginRight: 25,
                    color: "black",
                    fontWeight: "bold",
                    }}
                >
                    {getCheckInDate(check_in_time)}
                </Text>
            </View>
            <View
                style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
                <Text
                    style={{
                    marginLeft: 25,
                    marginTop: 10,
                    color: "gray",
                    }}
                >
                    Check-In Time:
                </Text>

                <Text
                    style={{
                    marginTop: 10,
                    marginRight: 25,
                    color: "black",
                    fontWeight: "bold",
                    }}
                >
                    {getCheckInTime(check_in_time)}
                </Text>
            </View>
        </View>
          <View style={styles.button}>
            <TouchableOpacity
              className="py-4 rounded-3xl px-8"
              onPress={() => navigation.navigate("Home", {uid, access_token})}
              style={{
                backgroundColor: themeColors.bgbtn,
                marginLeft: 25,
                marginRight: 25,      
              }}
            >
              <Text
                className="font-bold text-center text-white"
                style={{ fontSize: 20 }}
              >
                Go Back to HOME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
}

    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.bg,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
});
