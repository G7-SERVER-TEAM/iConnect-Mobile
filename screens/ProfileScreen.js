import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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
import { useRoute } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute()
  
  const uid = route.params.uid;
  const access_token = route.params.access_token;

  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("")
  const [fname, setFirstName] = useState("")
  const [lname, setLastName] = useState("")

  const searchUserAccount = async (uid, access_token) => {
    const ICONNECT_API = `http://192.168.1.5:8080/user/id/${uid}`;
    try {
      const result = await fetch(ICONNECT_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`
        }
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

  const profile = async () => {
    try {
      const result = await searchUserAccount(uid, access_token);
      const accountData = JSON.parse(result);

      setEmail(accountData.result.email);
      setPhoneNum(accountData.result.phone_number);
      setFirstName(accountData.result.name);
      setLastName(accountData.result.surname);

    } catch (error) {
      console.error('Error fetching or parsing user account data:', error);
    }
  };
  
  profile();


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
              onPress={() => navigation.goBack({ uid, access_token})}
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
                marginBottom: 15,
              }}
            >
              {fname} {lname}
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
            {/* <View style={{ flexDirection: "row", marginLeft: 40 }}>
              <Text style={{ fontWeight: "bold" }}>Age</Text>
              <Text style={{ marginLeft: 100 }}>23</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginLeft: 40, paddingTop: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>Birth Date</Text>
              <Text style={{ marginLeft: 55 }}>01-01-2000</Text>
            </View> */}
            <View
              style={{ flexDirection: "row", marginLeft: 40, paddingTop: 10 }}
            >
              <Text style={{ fontWeight: "bold" }}>Phone Number</Text>
              <Text style={{ marginLeft: 23 }}> {phoneNum}</Text>
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
              <Text style={{ marginLeft: 87 }}>{email}</Text>
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
};
