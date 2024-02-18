import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { themeColors } from "../theme";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";



const BottomTab = ({ onPress, onPress2, onPressQRCode }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 85,
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 0,
        
        
      }}
    >
      <TouchableOpacity style={{ alignItems: "center"}} onPress={onPress}>
        <AntDesign
          name="home"
          style={{ color: themeColors.text, fontSize: 25 }}
        />
        <Text
          style={{ color: themeColors.text, fontSize: 16, fontWeight: "bold" }}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: -65,
          width: 75,
          height: 75, 
          backgroundColor: themeColors.text,
          borderRadius: 37.5, 
          borderWidth: 4,
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPressQRCode}
      >
        <FontAwesome
          style={{
            color: "white",
            fontSize: 40,
          }}
          name="qrcode"
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: "center",  }} onPress={onPress2}>
        <Ionicons
          name="document-text"
          style={{ color: themeColors.text, fontSize: 30 }}
        />
        <Text
          style={{ color: themeColors.text, fontSize: 14, fontWeight: "bold" }}
        >
          History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab; 