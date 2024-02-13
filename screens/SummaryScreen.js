import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NewsCard from "../components/newsCard";
import { FlatList } from "react-native";
import BottomTab from "../components/bottomTab";

export default function SummaryScreen() {
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
              Summary
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
            height: 260,
            width: "auto",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: 25,
              marginTop: 5,
              marginBottom: 6,
            }}
          >
            {/* เรทราคาต่อชั่วโมง */}
            <View
              style={{
                backgroundColor: themeColors.bgbtn,
                marginTop: 9,
                marginRight: 10,
                borderRadius: 7,
                overflow: "hidden",
                height: 30,
                width: 130,
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
            {/* ชื่อสถานที่ */}
            <Text
              style={{
                alignSelf: "end",
                color: "black",
                fontSize: 16,
                marginTop: 15,
                fontWeight: "bold",
              }}
            >
              FUTURE PARK RANGSIT
            </Text>
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
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                marginLeft: 25,
                marginTop: 10,
                color: "gray",
                fontWeight: "bold",
              }}
            >
              DATE
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "gray",
              }}
            >
              21/10/2023
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
                fontWeight: "bold",
              }}
            >
              CHECK-IN TIME
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "grey",
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
                fontWeight: "bold",
              }}
            >
              CHECK-OUT TIME
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "grey",
              }}
            >
              02:30:00 p.m.
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
                fontWeight: "bold",
              }}
            >
              LICENSE PLATE
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "grey",
              }}
            >
              1กก1111
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
                fontWeight: "bold",
              }}
            >
              TOTAL TIME
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: "grey",
              }}
            >
              2 hrs 00 mins
            </Text>
          </View>
          {/* เส้นใต้ */}
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: themeColors.text,
              width: "87%",
              alignSelf: "center",
              marginTop: 15,
            }}
          />

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                marginLeft: 25,
                marginTop: 10,
                color: themeColors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              TOTAL
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginRight: 25,
                color: themeColors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              60 BATHS
            </Text>
          </View>
        </TouchableOpacity>

        {/* ปุ่มกด */}
        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={() => navigation.navigate("PaymentDetail")}
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
            COMPLETE PAYMENT
          </Text>
        </TouchableOpacity>
      </View>
      {/* menu bar  */}
      <View style={{ marginTop: "auto" }}>
        <BottomTab
          onPress={() => navigation.navigate("Home")}
          onPress2={() => navigation.navigate("History")}
        />
      </View>
    </SafeAreaView>
  );
}
