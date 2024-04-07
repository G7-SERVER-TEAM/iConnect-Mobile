import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
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

  const route = useRoute();
  const uid = route.params.uid;
  const access_token = route.params.access_token;

  const [license, setLicense] = useState("");
  const [time, setTime] = useState("");
  const [area, setArea] = useState("");
  const [parkingTime, setParkingTime] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentRate, setCurrentRate] = useState("");

  const handleParkingDetail = (uid, token) => {
    const searchParkingActive = async () => {
      const ICONNECT_API = `http://192.168.1.37:8082/transaction/progress/${uid}`;
      const information = {
        status: "ACTIVE",
      };
      try {
        const result = await fetch(ICONNECT_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
        hour: start_time.getHours() - 7,
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

    const searchAreaLocation = async (id) => {
      const ICONNECT_API = `http://192.168.1.37:8082/area/id/${id}`;
      try {
        const result = await fetch(ICONNECT_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
    }

    const convertCurrentTimeFormat = (start_time, end_time) => {
      const currentTime = calculateDifferentTime(start_time, end_time);
      return `${Math.floor(currentTime)} hrs ${Math.floor((currentTime - Math.floor(currentTime)) * 60)} mins`;
    }

    const getCurrentPrice = async (id) => {
      const ICONNECT_API = `http://192.168.1.37:8082/transaction/price/${id}`;
      try {
        const result = await fetch(ICONNECT_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
      const UTC7OffsetMilliseconds = 7 * 60 * 60 * 1000;
      const start_time = getTimeDescription(transaction.result.start_time);

      searchAreaLocation(transaction.result.area_id).then(result => {
        const location = JSON.parse(result);
        setArea(location.result.area_name);
      });

      const endTimeMilliseconds = new Date().getTime();
      const end_time = new Date(endTimeMilliseconds + UTC7OffsetMilliseconds);

      const currentTime = convertCurrentTimeFormat(
        new Date(transaction.result.start_time),
        end_time
      );

      getCurrentPrice(transaction.result.transaction_id).then(result => {
        const price = JSON.parse(result);
        setCurrentPrice(price.result.totalPrice);
        setCurrentRate(price.result.currentRate);
      })

      setLicense(transaction.result.license_plate);
      setTime(`${start_time.hour}:${start_time.minute}:${start_time.second}`);
      setParkingTime(currentTime);
    });
  };

  handleParkingDetail(uid, access_token);

  const handleParkingSummary = () => {
    navigation.navigate("Summary", { uid, access_token });
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
              Status Detail
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
              onPress={() => navigation.navigate("Notification")}
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
                fontSize: 18,
                marginTop: 15,
                marginRight: 'auto',
                fontWeight: "bold",
              }}
            >
              {area}
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
                {currentRate}BATHS/HOUR
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
              {currentPrice}
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
            LICENSE PLATE : {license}
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
              {time}
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
              {parkingTime}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-4 rounded-3xl"
          onPress={handleParkingSummary}
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
          onPress={() => navigation.navigate("Home", { uid, access_token })}
          onPress2={() => navigation.navigate("History", { uid, access_token })}
        />
      </View>
    </SafeAreaView>
  );
}
