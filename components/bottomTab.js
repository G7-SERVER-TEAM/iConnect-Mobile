import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { themeColors } from "../theme";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

const BottomTab = ({ onPress, onPress2 }) => {

  return (
    <View className="bg-white flex-row h-[10vh] rounded-t-[25px] items-center justify-around ml-4">
      <TouchableOpacity className="flex items-center" onPress={onPress}>
          <AntDesign
              name="home"
              style={{ color: themeColors.text, fontSize: 25 }}
          />
          <Text className="text-[16px] font-bold" style={{color: themeColors.text}}>
              Home
          </Text>
      </TouchableOpacity>
      <View className="absolute bottom-10 right-[42.5%] flex items-center justify-center rounded-full border-4 border-black h-[75px] w-[75px]" style={{backgroundColor: themeColors.text}}>
          <FontAwesome
              style={{
                  color: "white",
                  fontSize: 24,
              }}
              name="qrcode"
          />
      </View>
      <TouchableOpacity className="flex items-center" onPress={onPress2}>
          <Ionicons
              name="document-text"
              style={{ color: themeColors.text, fontSize: 25 }}
          />
          <Text className="text-[16px] font-bold" style={{color: themeColors.text}}>
              History
          </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomTab