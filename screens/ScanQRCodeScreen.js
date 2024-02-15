import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { CameraView, Camera } from 'expo-camera/next'
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme/index";

export default function ScanQRCodeScreen() {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(false) //request permission for the camera
  const [scanData, setScanData] = useState()

  useEffect(() => {
    const getCameraPermissions = async() => {
      const {status} = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status == "granted")
    } 
    getCameraPermissions()
  }, [])

  if (!hasPermission) {
    return (
      <Text>Please grant camera permissions to the apps</Text>
    )
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data)
    console.log(`Data: ${data}`)
    console.log(`Type: ${type}`)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("ScanSuccess", { data })
  }

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
        <Text 
          style={styles.description}
          >{`Align the QR code within the 
frame to scan.`}
        </Text>
      </View>
      <CameraView 
        onBarcodeScanned={scanData ? undefined : handleBarCodeScanned
        }
        style={{
          width:313,
          height:431,
        }}
      />
      <View 
        className="w-[312px] border-t-white border-t-[2px] border-t-dotted my-8"
    />
      <View style={styles.button}>
        <TouchableOpacity
          className="py-4 rounded-3xl px-8"
          onPress={() => navigation.navigate("Home")}
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
        {scanData && (
          <TouchableOpacity
            className="py-4 rounded-3xl px-8"
            onPress={() => setScanData(undefined)}
            style={{
              backgroundColor: "gray",
              marginLeft: 25,
              marginRight: 25,      
            }}
          >
            <Text
              className="font-bold text-center text-white"
              style={{ fontSize: 20 }}
            >
              Scan Again
            </Text>
          </TouchableOpacity>
          )}
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
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 20,
    color: "white",
  }
});
