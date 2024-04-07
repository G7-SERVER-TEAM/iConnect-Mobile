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
import { useRoute } from "@react-navigation/native";

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  const route = useRoute();

  const uid = route.params.uid;
  const access_token = route.params.access_token;
  const paymentId = route.params.paymentId;

  const handleUpdatePaymentStatus = async () => {
    const ICONNECT_API = `http://192.168.1.37:8082/payment/${paymentId}`;
    try {
      const result = await fetch(ICONNECT_API, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (result.ok) {
        const responseBody = await result.text();
        console.log("Succeed!");
        return responseBody;
      } else {
        throw new Error(`Error: ${result.status} - ${result.statusText}`);
      }
    } catch (err) {
      throw err;
    }
  }

  const handleGoToHome = () => {
    handleUpdatePaymentStatus();
    navigation.navigate("Home", { uid, access_token })
  }

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
          <TouchableOpacity
            onPress={() => navigation.navigate("Home", { uid, access_token })}
          >
            <Image
              source={require("../assets/images/WelcomePicture.png")}
              style={{ width: 50, height: 50, marginLeft: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate("Home", {uid, access_token})}
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
            onPress={() => navigation.navigate("Profile", { uid, access_token })}
          >
            <MaterialCommunityIcons
              name="bell"
              style={{ color: themeColors.text, fontSize: 25 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ textAlign: "center", marginLeft: 10 }}
            onPress={() => navigation.navigate("Profile", { uid, access_token })}
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
          onPress={handleGoToHome}
          style={{
            backgroundColor: themeColors.bgbtn,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 10,
          }}
        >
          <Text
            className="font-bold text-center text-white"
            style={{ fontSize: 20 }}
          >
            Go Back to HOME
          </Text>
        </TouchableOpacity>
      </View>
      {/* menu bar  */}
      <View style={{ marginTop: "auto" }}>
        <BottomTab
          onPress={() => navigation.navigate("Home", { uid, access_token })}
          onPress2={() => navigation.navigate("History", { uid, access_token })}
        />
      </View>
    </SafeAreaView>
  );
}
