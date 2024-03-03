import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
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
import { RNCamera } from "react-native-camera";
import { useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  const uid = route.params.uid;
  console.log(uid);
  const access_token = route.params.access_token;

  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");

  const [license, setLicense] = useState("");
  const [time, setTime] = useState("");
  const [area, setArea] = useState("");
  const [parkingTime, setParkingTime] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const [visible, setVisible] = useState(true);

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

  const handleParkingStatus = (uid, token) => {
    const searchParkingActive = async () => {
      const ICONNECT_API = `http://192.168.1.5:8082/transaction/progress/${uid}`;
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
        setVisible(false)
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

    const searchAreaLocation = async (id) => {
      const ICONNECT_API = `http://192.168.1.5:8082/area/id/${id}`;
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
      const ICONNECT_API = `http://192.168.1.5:8082/transaction/price/${id}`;
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

      if (transaction.result.length != 0) setVisible(true);

      const start_time = getTimeDescription(transaction.result.start_time);

      searchAreaLocation(transaction.result.area_id).then((result) => {
        const location = JSON.parse(result);
        console.log(location)
        setArea(location.result.area_name);
      });

      const currentTime = convertCurrentTimeFormat(
        new Date(transaction.result.start_time),
        new Date()
      );

      getCurrentPrice(transaction.result.transaction_id).then((result) => {
        const price = JSON.parse(result);
        setCurrentPrice(price.result);
      });

      setLicense(transaction.result.license_plate);
      setTime(`${start_time.hour}:${start_time.minute}:${start_time.second}`);
      setParkingTime(currentTime);
    });
  };

  const handleProfile = () => {
    navigation.navigate("Profile", { uid, access_token });
  };

  const searchUserAccount = async (uid, access_token) => {
    const ICONNECT_API = `http://192.168.1.5:8080/user/id/${uid}`;
    try {
      const result = await fetch(ICONNECT_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
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

  const profile = async () => {
    try {
      const result = await searchUserAccount(uid, access_token);
      const accountData = JSON.parse(result);

      setFirstName(accountData.result.name);
      setLastName(accountData.result.surname);
    } catch (error) {
      console.error("Error fetching or parsing user account data:", error);
    }
  };

  // Call functions
  profile();
  handleParkingStatus(uid, access_token);


  const handleQRCode = () => {
    navigation.navigate("ScanQRCode", { uid, access_token });
  };

  const handleStatusDetail = () => {
    navigation.navigate("StatusDetail", { uid, access_token });
  };

  const handleHistory = () => {
    navigation.navigate("History", { uid, access_token });
  };

  console.log(visible)

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
              HOME
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ marginLeft: "auto" }}
            // onPress={}
          >
            <MaterialCommunityIcons
              name="bell"
              style={{ color: themeColors.text, fontSize: 25 }}
              onPress={() => navigation.navigate("Notification", { uid, access_token})}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="justify-center"
            style={{ textAlign: "center", marginLeft: 10 }}
            onPress={handleProfile}
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
            Hi!, {fname} {lname}
          </Text>
        </View>
      </View>
      <ScrollView>
        {/* <View style={{ marginBottom: 5 }}>
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
                onPress={() =>
                  navigation.navigate("NewsDetail", { news: item })
                }
              />
            )}
          />
        </View> */}

        <View>
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
            Parking Status
          </Text>
          { visible ?
            <TouchableOpacity
              onPress={handleStatusDetail}
              style={{
                backgroundColor: "white",
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
                {area}
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
                  {currentPrice} BATHS
                </Text>
              </View>
            </TouchableOpacity>
          : 
          <View className="flex justify-center items-center h-full">
            <Text className="text-stone-500 text-lg">You are not currently parking anywhere</Text>
          </View>
          }
        </View>
      </ScrollView>

      {/* menu bar  */}
      <View style={{ marginTop: "auto" }}>
        <BottomTab
          onPress={() => navigation.navigate("Home", { uid, access_token })}
          onPressQRCode={handleQRCode}
          onPress2={handleHistory}
        />
      </View>
    </SafeAreaView>
  );
}
