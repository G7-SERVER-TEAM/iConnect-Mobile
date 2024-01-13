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

export default function HomeScreen() {
  const navigation = useNavigation();

  const newsData = [
    {
      id: "1",
      title: "Amazing Thailand Countdown 2024",
      description:
        "ไอคอนสยาม เตรียมเคาต์ดาวน์สะกดโลก “Amazing Thailand Countdown 2024”",
      image: "/Users/sittipaksrisawas/Desktop/TestApp/assets/images/new1.jpeg",
    },
    {
      id: "2",
      title: "Breaking News 2",
      description: "This is the description of breaking news 2.",
      image: "/Users/sittipaksrisawas/Desktop/TestApp/assets/images/new1.jpeg",
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
              HOME
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

        <View className="mt-5">
          <Text
            className="font-bold"
            style={{
              color: themeColors.text,
              fontSize: 20,
              alignContent: "center",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            {" "}
            Hi!, Server G7
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 5 }}>
        <Text
          style={{
            fontWeight: "bold",
            color: themeColors.text,
            fontSize: 20,
            alignSelf: "flex-start",
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 25,
          }}
        >
          News
        </Text>
        <FlatList
          style={{ marginLeft: 25 }}
          data={newsData}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false} // Optional: hide horizontal scroll indicator
          renderItem={({ item }) => (
            <NewsCard
              news={item}
              onPress={() => navigation.navigate("NewsDetail", { news: item })}
            />
          )}
        />
      </View>

      <View>
        <Text
          style={{
            fontWeight: "bold",
            color: themeColors.text,
            fontSize: 20,
            alignSelf: "flex-start",
            marginTop: 0,
            marginBottom: 10,
            marginLeft: 25,
          }}
        >
          Parking Status
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
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
          <View className="absolute bottom-10 right-[42.5%] flex items-center justify-center rounded-full border-4 border-black h-[75px] w-[75px]" style={{backgroundColor: themeColors.text}}>
              <FontAwesome
                  style={{
                      color: "white",
                      fontSize: 24,
                  }}
                  name="qrcode"
              />
          </View>
          <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => navigation.navigate("History")}>
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
