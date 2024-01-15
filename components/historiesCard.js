import React from 'react'
import { View, Text } from 'react-native'
import { themeColors } from "../theme";
import {  MaterialCommunityIcons } from "@expo/vector-icons";

const HistoriesCard = ( data ) => {
    console.log(data);
  return (
    <View 
      className=
          "bg-white flex rounded-[25px] h-[15vh] w-[93vw] px-[22px] pt-[16px] mb-5"
          >
              <View className="flex-row justify-between items-center mb-1">
                  <MaterialCommunityIcons 
                      name='check-circle'
                      style={{
                          color:themeColors.bgbtn,
                          fontSize: 30,
                          display: 'flex'
                      }}
                      />
                  <Text className="flex font-semibold text-[20px]" style={{color: themeColors.text}}>
                      {data.data.name}
                  </Text>
              </View>
              <View className="border-[1px] mb-2" style={{borderColor: themeColors.text}}/>
              <View className="flex gap-2">
                  <View className="flex-row justify-between">
                      <Text className="text-[14px]" style={{color: themeColors.des}}>{data.data.date}</Text>
                      <Text className="text-[14px]" style={{color: themeColors.des}}>{data?.data.timestamp?.start} - {data?.data.timestamp?.end}</Text>
                  </View>
                  <View className="flex-row justify-between">
                      <Text className="text-[14px]" style={{color: themeColors.des}}>LICENSE PLATE:  {data.data.license_plate}</Text>
                      <View className="flex-row">   
                          <Text className="text-[14px]" style={{color: themeColors.text}}>{data.data.price} BATHS </Text>
                          <Text className="text-[14px]" style={{color: themeColors.des}}>({data.data.duration} hours)</Text>
                      </View> 
                  </View>
              </View>
      </View>
  );
};

export default HistoriesCard;