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

export default function QrCodePaymentScreen() {
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
              QR Code Payment
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


        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
          }}
        >
          {/* QR Code Image */}
        <Image
          source={require("../assets/images/qr_code_image.jpg")}
          style={{
            width: 350,
            height: 350,
            alignSelf: "center",
            marginTop: 15,
          }}
        />

          <Text
            className="font-bold"
            style={{
              fontSize: 18,
              color: themeColors.text,
              textAlign: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Please Scan QR Code for Payment.
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
          onPress={() => navigation.navigate("PaymentSummary")}
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
            CONTINUE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={() => navigation.navigate("PaymentDetail")}
          style={{
            backgroundColor: "black",
            marginLeft: 25,
            marginRight: 25,
            marginTop: 10,
            
          }}
        >
          <Text
            className="font-bold text-center text-white"
            style={{ fontSize: 20 }}
          >
            GO BACK
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

