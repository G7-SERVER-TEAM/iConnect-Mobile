import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { FlatList, StyleSheet } from "react-native";
import { Bold } from "react-native-feather";
import NotificationItem from "../components/NotificationItem";

export default function NotificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const uid = route.params.uid;
  const access_token = route.params.access_token;

  const handleLoginHistory = (uid, access_token) => {
    const searchHistory = async () => {
      const ICONNECT_API = `http://10.4.13.158:8081/account/uid/${uid}`;
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
        hour: currentTime.getHours(),
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

    const processLoginHistory = async () => {
      try {
        const result = await searchHistory();
        const data = JSON.parse(result);
        const historyLogin = data.result.logged_id_history;

        let historyList = [];
        let count = 1;
        for (const log of historyLogin) {
          const time = getTimeDescription(log);
          const currentTime = `${time.day}-${time.month}-${time.year} ${time.hour}:${time.minute}:${time.second}`;
          const historyLog = {
            id: count,
            title: "Login Successfully!",
            description: currentTime,
            status: "success",
          };
          count++;
          
          historyList.push({...historyLog});
        }
        return historyList;
      } catch (err) {
        console.error("#1:Error processing login history:", err);
        return [];
      }
    };
    const historyList = processLoginHistory();

    return historyList;
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleLoginHistory(uid, access_token);
        setNotifications(result);
      } catch (err) {
        console.error("#2:Error processing login history:", err);
      }
    };
    fetchData();
  }, [uid, access_token]);

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
        <View
          style={{ flexDirection: "row", justifyContent: "start", margin: 20 }}
        >
          <View className="flex-row justify-start">
            <TouchableOpacity
              style={{ marginLeft: "auto" }}
              onPress={() => navigation.navigate("Home", { uid, access_token })}
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="justify-center"
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text
              className="font-bold"
              style={{
                color: themeColors.text,
                fontSize: 20,
                alignSelf: "center",
                marginBottom: 10,
              }}
            >
              Notification
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 6,
          }}
        >
          <SafeAreaView>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NotificationItem
                  title={item.title}
                  description={item.description}
                  status={item.status}
                />
              )}
            />
          </SafeAreaView>
        </View>
      </View>
    </SafeAreaView>
  );
}
