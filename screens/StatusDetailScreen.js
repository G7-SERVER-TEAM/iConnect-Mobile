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
            marginBottom: 20,
            marginLeft: 25,
            marginRight: 25,
            borderRadius: 20,
            overflow: "hidden",
            height: 180,
            width: "auto",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: themeColors.text,
              fontSize: 20,
              marginTop: 15,
              fontWeight: "bold",
            }}
          >
            FUTURE PARK RANGSIT
          </Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: themeColors.text,
              width: "85%",
              alignSelf: "center",
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "start"
            }}
          />
          
          <Text
            style={{
              alignSelf: "center",
              color: "black",
              fontSize: 16,
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            40
          </Text>
          <Text>BATHS</Text>
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
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text
              style={{
                marginLeft: 25,
                marginTop: 10,
                color: themeColors.text,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Total
            </Text>

            <Text
              style={{
                marginRight: 25,
                marginTop: 10,
                color: themeColors.text,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              40 BATHS
            </Text>
          </View>
        </TouchableOpacity>

        {/* menu bar  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "white",
            paddingVertical: 20,
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
            <AntDesign
              name="home"
              style={{ color: themeColors.text, fontSize: 25 }}
            />
            <Text
              style={{
                color: themeColors.text,
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: themeColors.text,
              borderRadius: 50,
            }}
          >
            <FontAwesome
              style={{
                color: "white",
                fontSize: 24,
              }}
              name="qrcode"
            />
          </View>
          <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
            <Ionicons
              name="document-text"
              style={{ color: themeColors.text, fontSize: 25 }}
            />
            <Text
              style={{
                color: themeColors.text,
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
