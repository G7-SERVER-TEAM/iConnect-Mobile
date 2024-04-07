import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { themeColors } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../components/bottomTab";
import HistoriesCard from "../components/historiesCard";

const HistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const uid = route.params.uid;
  const access_token = route.params.access_token;

  const handleParkingHistory = (uid, access_token) => {
    const searchParkingHistory = async () => {
      const ICONNECT_API = `http://192.168.1.37:8082/transaction/history/${uid}`;
      const information = {
        status: "FINISH",
      };
      try {
        const result = await fetch(ICONNECT_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
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

    const getCurrentDate = (time) => {
      var checkInTime = new Date(time);

      var date = checkInTime.getDate();
      var month = checkInTime.getMonth() + 1;
      var year = checkInTime.getFullYear();

      return date + "/" + month + "/" + year;
    };

    const getTimeDescription = (time) => {
      const currentTime = new Date(time);
      return {
        year: currentTime.getFullYear(),
        month:
          currentTime.getMonth() < 10
            ? `0${currentTime.getMonth()}`
            : currentTime.getMonth(),
        day:
          currentTime.getDate() < 10
            ? `0${currentTime.getDate()}`
            : currentTime.getDate(),
        hour: currentTime.getHours() - 7,
        minute:
          currentTime.getMinutes() < 10
            ? `0${currentTime.getMinutes()}`
            : currentTime.getMinutes(),
        second:
          currentTime.getSeconds() < 10
            ? `0${currentTime.getSeconds()}`
            : currentTime.getSeconds(),
        millisecond: currentTime.getMilliseconds(),
      };
    };

    const searchAreaLocation = async (id) => {
      const ICONNECT_API = `http://192.168.1.37:8082/area/id/${id}`;
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
      const ICONNECT_API = `http://192.168.1.37:8082/transaction/price/complete/${id}`;
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

    async function processParkingHistory() {
      try {
        const result = await searchParkingHistory();
        const data = JSON.parse(result);
        const txnList = data.result;

        let historyList = [];

        for (const transaction of txnList) {
          const currentDate = getCurrentDate(transaction.start_time);
          const start_time = getTimeDescription(transaction.start_time);
          const end_time = getTimeDescription(transaction.end_time);
          const currentTime = convertCurrentTimeFormat(
            new Date(transaction.start_time),
            new Date(transaction.end_time)
          );

          const currentArea = await searchAreaLocation(transaction.area_id);
          const areaResult = JSON.parse(currentArea);

          const currentPrice = await getCurrentPrice(
            transaction.transaction_id
          );
          const priceResult = JSON.parse(currentPrice);

          const parkingHistory = {
            name: areaResult.result.area_name,
            date: currentDate,
            timestamp: {
              start: `${start_time.hour}:${start_time.minute}:${start_time.second}`,
              end: `${end_time.hour}:${end_time.minute}:${end_time.second}`,
            },
            license_plate: transaction.license_plate,
            price: priceResult.result,
            duration: currentTime,
          };

          historyList.push({ ...parkingHistory });
        }
        return historyList;
      } catch (error) {
        console.error("Error processing parking history:", error);
        return [];
      }
    }

    // Call the function
    const historyList = processParkingHistory();

    return historyList;
  };

  const [historyParkingList, setHistoryParkingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleParkingHistory(uid, access_token);
        setHistoryParkingList(result.slice().reverse());
      } catch (error) {
        console.error("Error fetching parking history:", error);
      }
    };

    fetchData();
  }, [uid, access_token]);

  const handleHome = () => {
    navigation.navigate("Home", { uid, access_token });
  };

  const handleProfile = () => {
    navigation.navigate("Profile", { uid, access_token });
  };

  return (
    <SafeAreaView
      className="flex-1 gap-3"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="bg-white flex-row border rounded-b-[25px] justify-between items-center h-[90px] px-[22px]">
        <View className="items-center">
          <TouchableOpacity onPress={handleHome}>
            <Image
              source={require("../assets/images/WelcomePicture.png")}
              style={{ width: 50, height: 50, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View className="flex">
          <Text
            className="font-bold text-[20px]"
            style={{ color: themeColors.text }}
          >
            History Parking
          </Text>
        </View>

        <View className="flex-row">
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
              onPress={() => navigation.navigate("Notification")}
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
      </View>
      <View>
        <Text
          className="text-[24px] font-bold ml-5"
          style={{ color: themeColors.text }}
        >
          My History
        </Text>
      </View>
      <View className="flex-1 items-center">
        <FlatList
          data={historyParkingList}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          renderItem={({ item }) => <HistoriesCard data={item} />}
        />
      </View>
      {/* menu bar  */}
      <View style={{ marginTop: "auto" }}>
        <BottomTab
          onPress={handleHome}
          onPress2={() => navigation.navigate("History", { uid, access_token })}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;
