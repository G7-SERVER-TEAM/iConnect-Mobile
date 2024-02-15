import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NewsCard from "../components/newsCard";
import { FlatList } from "react-native";
import BottomTab from "../components/bottomTab";

export default function StatusDetailScreen() {
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
          paddingBottom: 20,
          backgroundColor: "white",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "start" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/images/WelcomePicture.png")}
              style={{ width: 50, height: 50, marginLeft: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              className="font-bold"
              style={{
                color: themeColors.text,
                fontSize: 20,
                alignContent: "center",
              }}
            >
              Status Detail
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate("Profile")}
          >
            <MaterialCommunityIcons
              name="bell"
              style={{ color: themeColors.text, fontSize: 25 }}
              onPress={() => navigation.navigate("Notification")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ textAlign: "center", marginLeft: 10 }}
            onPress={() => navigation.navigate("Profile")}
          >
            <MaterialCommunityIcons
              name="account"
              style={{ color: themeColors.text, fontSize: 29, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            marginTop: 40,
            marginBottom: 10,
            marginLeft: 25,
            marginRight: 25,
            borderRadius: 20,
            overflow: "hidden",
            height: 230,
            width: "auto",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: 25,
              marginTop: 5,
            }}
          >
            {/* ชื่อสถานที่ */}
            <Text
              style={{
                alignSelf: "flex-start",
                color: themeColors.text,
                fontSize: 13,
                marginTop: 15,
                marginRight: 'auto',
                fontWeight: "bold",
              }}
            >
              FUTURE PARK RANGSIT
            </Text>

            {/* เรทราคาต่อชั่วโมง */}
            <View
              style={{
                backgroundColor: themeColors.bgbtn,
                marginRight: 'auto',
                marginTop: 9,
                borderRadius: 7,
                overflow: "hidden",
                height: 30,
                width: 140,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 14,
                  marginTop: 7,
                  fontWeight: "bold",
                }}
              >
                20BATHS/HOUR
              </Text>
            </View>
          </View>

          {/* เส้นใต้ */}
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: themeColors.text,
              width: "85%",
              alignSelf: "center",
              marginTop: 5,
            }}
          />
          {/* ราคาที่ต้องจ่าย */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 25,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 50,
                marginTop: 10,
                fontWeight: "bold",
                color: themeColors.text,
              }}
            >
              40
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                marginTop: 40,
                marginLeft: 5,
                fontWeight: "bold",
                color: themeColors.text,
              }}
            >
              BATHS
            </Text>
          </View>

          <Text
            style={{
              alignSelf: "center",
              color: "black",
              fontSize: 16,
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            LICENSE PLATE : 1กข1111
          </Text>

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
              Check-In Time
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "black",
                fontWeight: "bold",
              }}
            >
              11:30:00 a.m.
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
              Current Parking for
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "black",
                fontWeight: "bold",
              }}
            >
              2 hrs 00 mins
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={() => navigation.navigate("Summary")}
          style={{
            backgroundColor: themeColors.bgbtn,
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            
          }}
        >
          <Text
            className="font-bold text-center text-white"
            style={{ fontSize: 20 }}
          >
            SUMMARY
          </Text>
        </TouchableOpacity>

        
      </View>
      {/* menu bar  */}
      <View style={{marginTop: 'auto'}}>
        <BottomTab
          onPress={() => navigation.navigate("Home")}
          onPress2={() => navigation.navigate("History")}
        />
      </View>
    </SafeAreaView>
  );
}
