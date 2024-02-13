import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
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

export default function PaymentDetailScreen() {
  const navigation = useNavigation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  useEffect(() => {
    setSelectedPaymentMethod("cash");
  }, []);
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
              Payment
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

      <View
        style={{
          margin: 20,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: themeColors.text,
            marginBottom: 15,
          }}
        >
          Select Payment Method
        </Text>

        {/* Cash Payment */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start", // Align items to the left
            marginBottom: 15,
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
          }}
          onPress={() => setSelectedPaymentMethod("cash")}
        >
          {selectedPaymentMethod === "cash" && (
            <MaterialCommunityIcons
              name="radiobox-marked"
              style={{
                color: themeColors.bgbtn,
                fontSize: 30,
              }}
            />
          )}
          <Text
            style={{
              fontSize: 18,
              color: themeColors.text,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            CASH
          </Text>
          <MaterialCommunityIcons
            name="cash"
            style={{
              color: themeColors.text,
              fontSize: 35,
              marginLeft: "auto",
            }}
          />
        </TouchableOpacity>

        {/* Card Payment */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start", // Align items to the left
            marginBottom: 15,
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
          }}
          onPress={() => setSelectedPaymentMethod("card")}
        >
          {selectedPaymentMethod === "card" && (
            <MaterialCommunityIcons
              name="radiobox-marked"
              style={{
                color: themeColors.bgbtn,
                fontSize: 30,
              }}
            />
          )}
          <Text
            style={{
              fontSize: 18,
              color: themeColors.text,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            QR PAYMENT
          </Text>
          <MaterialCommunityIcons
            name="credit-card"
            style={{
              color: themeColors.text,
              fontSize: 35,
              marginLeft: "auto",
            }}
          />
        </TouchableOpacity>
      </View>

      <View>
        {/* ปุ่มกด */}
        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={() => navigation.navigate("PaymentSummary")}
          style={{
            backgroundColor: themeColors.bgbtn,
            marginLeft: 35,
            marginRight: 35,
            
          }}
        >
          <Text
            className="font-bold text-center text-white"
            style={{ fontSize: 20 }}
          >
            CONTINUE
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
