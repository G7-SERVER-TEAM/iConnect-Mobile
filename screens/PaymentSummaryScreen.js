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
import BottomTab from "../components/bottomTab";

export default function PaymentSuccessScreen() {
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
              Payment Summary
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
        {/* Checkmark Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 40,
            zIndex: 1, 
          }}
        >
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            style={{
              color: themeColors.text,
              fontSize: 80,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
            marginLeft: 30,
            marginRight: 30,
            marginTop: -25,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: themeColors.text,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Thank You!
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "grey",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Your payment is successful
          </Text>
          {/* เส้นใต้ */}
          <View
            style={{
              borderBottomWidth: 1.5,
              borderBottomColor: "grey",
              width: "87%",
              alignSelf: "center",
              marginBottom: 15,
            }}
          />
        </View>

        {/* ปุ่มกด */}
        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: themeColors.bgbtn,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
            marginBottom: 300,
          }}
        >
          <Text
            className="font-bold text-center text-white"
            style={{ fontSize: 20 }}
          >
            Go Back to HOME
          </Text>
        </TouchableOpacity>

        {/* menu bar */}
        <BottomTab
          style={{ marginTop: 100 }}
          onPress={() => navigation.navigate("Home")}
          onPress2={() => navigation.navigate("History")}
        />
      </View>
    </SafeAreaView>
  );
}
