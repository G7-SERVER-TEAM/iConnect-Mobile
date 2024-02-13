import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { FlatList, StyleSheet } from "react-native";
import { Bold } from "react-native-feather";
import NotificationItem from "../components/NotificationItem";

export default function NotificationScreen() {
  const navigation = useNavigation();

  const notifications = [
    {
      id: "1",
      title: "Login Succesfully!",
      description:"Your account has login!",
      status: "success"
    },
    {
      id: "2",
      title: "Login Succesfully!",
      description:"Your account has login!",
      status: "success"
    },
    {
      id: "3",
      title: "Login Succesfully!",
      description:"Your account has login!",
      status: "success"
    },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View
        style={{
          paddingTop: 15,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: "white",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "start", margin: 20 }}
        >
          <View className="flex-row justify-start">
            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="justify-center"
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text
              className="font-bold"
              style={{
                color: themeColors.text,
                fontSize: 20,
                alignSelf: "center",
                marginBottom: 10,
              }}
            >
              Notification
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{}}>
        <View style={
          { 
            paddingHorizontal: 20,
            paddingVertical: 6,
          }
        }>
          <SafeAreaView>
            <FlatList
              data={notifications}
              keyExtractor={item => item.id}
              renderItem={({item}) => 
                <NotificationItem 
                  title={item.title} 
                  description={item.description}
                  status={item.status}
                />
              }
              
            />
          </SafeAreaView>
        </View>
      </View>
    </SafeAreaView>
  );
}
