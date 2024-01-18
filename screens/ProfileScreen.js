import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NewsCard from "../components/newsCard";
import { FlatList } from "react-native";
import { Bold } from "react-native-feather";

export default function ProfileScreen() {
  const navigation = useNavigation();
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
              My Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{}}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 35,
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/images/user.png")} // ใส่ URL ของภาพผู้ใช้ที่ต้องการแสดง
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 15,
              }}
            />
            <Text
              style={{
                fontSize: 22,
                color: themeColors.text,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Server G7
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: themeColors.text,
                marginBottom: 20,
              }}
            >
              Student
            </Text>
          </View>

          <View style={{ alignSelf: "start" }}>
            <Text
              style={{
                fontSize: 18,
                color: themeColors.text,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Personal Information
            </Text>
            <View style={{ flexDirection: "row", marginLeft: 40 }}>
              <Text style={{ fontWeight: "bold" }}>Age</Text>
              <Text style={{ marginLeft: 100 }}>23</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginLeft: 40, paddingTop: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>Birth Date</Text>
              <Text style={{ marginLeft: 55 }}>01-01-2000</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginLeft: 40, paddingTop: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>Phone Number</Text>
              <Text style={{ marginLeft: 23 }}>012-345-6789</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 40,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Email</Text>
              <Text style={{ marginLeft: 87 }}>server@gmail.com</Text>
            </View>
          </View>
        </View>
        <View className="px-8">
          <TouchableOpacity
            className="py-4 rounded-3xl"
            onPress={() => navigation.navigate("Login")}
            style={{ backgroundColor: themeColors.logoutbtn }}
          >
            <Text
              className="font-bold text-center text-white"
              style={{ fontSize: 20 }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
