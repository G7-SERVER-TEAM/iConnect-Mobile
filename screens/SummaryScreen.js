import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
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

  const route = useRoute();
  const uid = route.params.uid;
  const access_token = route.params.access_token;

  const [license, setLicense] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [parkingTime, setParkingTime] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleParkingSummary = (uid, token) => {
    const searchParkingActive = async () => {
      const ICONNECT_API = `http://10.4.13.48:8082/transaction/progress/${uid}`;
      const information = {
        status: "ACTIVE",
      };
      try {
        const result = await fetch(ICONNECT_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(information),
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

    const getTimeDescription = (time) => {
      const start_time = new Date(time);
      return {
        year: start_time.getFullYear(),
        month: start_time.getMonth(),
        day: start_time.getDate(),
        hour: start_time.getHours(),
        minute:
          start_time.getMinutes() < 10
            ? `0${start_time.getMinutes()}`
            : start_time.getMinutes(),
        second:
          start_time.getSeconds() < 10
            ? `0${start_time.getSeconds()}`
            : start_time.getSeconds(),
        millisecond: start_time.getMilliseconds(),
      };
    };

    const getCurrentDate = (time) => {
      const data = getTimeDescription(time);
      return `${data.day}/${data.month}/${data.year}`;
    };

    const searchAreaLocation = async (id) => {
      const ICONNECT_API = `http://10.4.13.48:8082/area/id/${id}`;
      try {
        const result = await fetch(ICONNECT_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

    const calculateDifferentTime = (start_time, end_time) => {
      const timeDifference = end_time.getTime() - start_time.getTime();
      return timeDifference / (1000 * 60 * 60);
    };

    const convertCurrentTimeFormat = (start_time, end_time) => {
      const currentTime = calculateDifferentTime(start_time, end_time);
      return `${Math.floor(currentTime)} hrs ${Math.floor(
        (currentTime - Math.floor(currentTime)) * 60
      )} mins`;
    };

    const getCurrentPrice = async (id) => {
      const ICONNECT_API = `http://10.4.13.48:8082/transaction/price/${id}`;
      try {
        const result = await fetch(ICONNECT_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

    searchParkingActive().then((result) => {
      const transaction = JSON.parse(result);
      const start_time = getTimeDescription(transaction.result.start_time);

      searchAreaLocation(transaction.result.area_id).then((result) => {
        const location = JSON.parse(result);
        setArea(location.result.area_name);
      });

      const end_time = new Date();

      const currentTime = convertCurrentTimeFormat(
        new Date(transaction.result.start_time),
        end_time
      );
      const endOfTime = getTimeDescription(end_time);

      getCurrentPrice(transaction.result.transaction_id).then((result) => {
        const price = JSON.parse(result);
        setCurrentPrice(price.result);
      });

      setLicense(transaction.result.license_plate);
      setStartTime(
        `${start_time.hour}:${start_time.minute}:${start_time.second}`
      );
      setEndTime(`${endOfTime.hour}:${endOfTime.minute}:${endOfTime.second}`);
      setParkingTime(currentTime);
      setDate(getCurrentDate(new Date(transaction.result.start_time)));
      setUpdateTime(end_time);
      setTransactionId(transaction.result.transaction_id);
    });
  };

  handleParkingSummary(uid, access_token);

  const handlePaymentComplete = () => {
    const updateTransaction = async (transaction_id, access_token) => {
      const ICONNECT_API = `http://10.4.13.48:8082/transaction/${transaction_id}`;
      const information = {
        status: "FINISH",
        end_time: updateTime,
      };
      try {
        const result = await fetch(ICONNECT_API, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(information),
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

    const createCashPayment = async (transaction_id, access_token) => {
      const ICONNECT_API = `http://10.4.13.48:8082/transaction/payment/cash/create/${transaction_id}`;
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

    updateTransaction(transactionId, access_token).then(result => {
      console.log(JSON.parse(result));
    });

    createCashPayment(transactionId, access_token).then(result => {
      console.log(JSON.parse(result));
      handleBackHome()
    })
  };

  const handleBackHome = () => {
    navigation.navigate("Home", { uid, access_token });
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
          <TouchableOpacity onPress={() => navigation.navigate("Home", { uid, access_token })}>
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
              Summary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate("Notification", { uid, access_token })}
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
                marginLeft: 10,
                color: "black",
                fontSize: 18,
                marginTop: 15,
                fontWeight: "bold",
              }}
            >
              {area}
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
              {date}
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
              {startTime}
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
              {endTime}
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
              {license}
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
              {parkingTime}
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
              {currentPrice} BATHS
            </Text>
          </View>
        </TouchableOpacity>

        {/* ปุ่มกด */}
        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={handlePaymentComplete}
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
          onPress={() => navigation.navigate("Home", { uid, access_token })}
          onPress2={() => navigation.navigate("History", { uid, access_token })}
        />
      </View>
    </SafeAreaView>
  );
}
