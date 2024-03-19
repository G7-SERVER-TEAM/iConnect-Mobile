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
import { useRoute } from "@react-navigation/native";

export default function PaymentDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const uid = route.params.uid;
  const access_token = route.params.access_token;
  const transactionId = route.params.transactionId;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentId, setPaymentId] = useState("");
  useEffect(() => {
    setSelectedPaymentMethod("cash");
  }, []);

  const handlePaymentWithCash = () => {
    const createCashPayment = async (transaction_id, access_token) => {
      const ICONNECT_API = `http://192.168.1.5:8082/transaction/payment/cash/create/${transaction_id}`;
      try {
        const result = await fetch(ICONNECT_API, {
          method: "POST",
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
    };
    createCashPayment(transactionId, access_token);
    navigation.navigate("PaymentSummary", { uid, access_token, paymentId });
  };

  const createPromptPay = async (transaction_id, access_token) => {
    const ICONNECT_API = `http://192.168.1.5:8082/transaction/payment/create/${transaction_id}`;
    try {
      const result = await fetch(ICONNECT_API, {
        method: "POST",
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
  };

  const handlePaymentWithPromptPay = async () => {
    try {
      const result = await createPromptPay(transactionId, access_token);
      const res = JSON.parse(result);
      setPaymentId(res.result.payment_id);
    } catch (error) {
      console.error("Error during payment creation:", error);
    }
  };

  const handleContinue = () => {
    if (selectedPaymentMethod === "cash") {
      handlePaymentWithCash();
    } else if (selectedPaymentMethod === "card") {
      handlePaymentWithPromptPay()
    }
  };
  
  useEffect(() => {
    console.log("Payment ID after setting:", paymentId);
    if (paymentId) {
      navigation.navigate("QRPayment", { uid, access_token, paymentId });
    }
  }, [paymentId, navigation, uid, access_token]);
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
            onPress={() => navigation.navigate("Home", { uid, access_token })}
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
            onPress={() =>
              navigation.navigate("Profile", { uid, access_token })
            }
          >
            <MaterialCommunityIcons
              name="bell"
              style={{ color: themeColors.text, fontSize: 25 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ textAlign: "center", marginLeft: 10 }}
            onPress={() =>
              navigation.navigate("Profile", { uid, access_token })
            }
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
          onPress={handleContinue}
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
          onPress={() => navigation.navigate("Home", { uid, access_token })}
          onPress2={() => navigation.navigate("History", { uid, access_token })}
        />
      </View>
    </SafeAreaView>
  );
}
