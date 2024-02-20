import React, { useState } from "react";
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

  const [currentPrice, setCurrentPrice] = useState("")
  const [currentArea, setCurrentArea] = useState("")

  const [parkingHistory, setParkingHistory] = useState({})
  // const [historyList, setHistoryList] = useState([])
  let historyList = []

  // const historiesData = [
  //   {
  //     id: "1",
  //     name: "Future Park Rangsit",
  //     date: "21/10/2023",
  //     timestamp: {
  //       start: "09:30:10 p.m.",
  //       end: "12:30:00 p.m.",
  //     },
  //     license_plate: "1กก1111",
  //     price: "60",
  //     duration: "3",
  //   },
  //   {
  //     id: "2",
  //     name: "Central World",
  //     date: "20/10/2023",
  //     timestamp: {
  //       start: "16:00:30 p.m.",
  //       end: "18:00:10 p.m.",
  //     },
  //     license_plate: "1กข1234",
  //     price: "70",
  //     duration: "3",
  //   },
  // ];

  const  handleParkingHistory = (uid, access_token) => {
    const searchParkingHistory = async () => {
      const ICONNECT_API = `http://10.4.13.25:8082/transaction/history/${uid}`;
      const information = {
        status: "FINISH",
      };
      try {
        const result = await fetch(ICONNECT_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
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

    const getCurrentDate=(time)=>{
      var checkInTime = new Date(time)

      var date = checkInTime.getDate();
      var month = checkInTime.getMonth() + 1;
      var year = checkInTime.getFullYear();
      
      return date + '/' + month + '/' + year;
   }

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
      const ICONNECT_API = `http://10.4.13.25:8082/area/id/${id}`;
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
      const ICONNECT_API = `http://localhost:8082/transaction/price/${id}`;
      try {
        const result = await fetch(ICONNECT_API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
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

    searchParkingHistory().then((result) => {
      const data = JSON.parse(result);

      const transactionList = data.result
      // let historyList = []

      // transactionList.forEach(
      //   async transaction => {
      //   console.log(transaction)

      //   const currentDate = getCurrentDate(transaction.start_time);
      //   const start_time = getTimeDescription(transaction.start_time);
      //   const end_time = getTimeDescription(transaction.end_time);
      //   const currentTime = convertCurrentTimeFormat(new Date(transaction.start_time), new Date());

      //   const currPrice = getCurrentPrice(transaction.transaction_id).then(result => {
      //     const price = JSON.parse(result);
      //   })

      //   const currLocation = searchAreaLocation(transaction.result.area_id).then(result => {
      //     const location = JSON.parse(result);
      //     location.result.area_name;
      //   })
        
      //   const parkingHistory = {
      //     name: currLocation,
      //     date: currentDate,
      //     timestamp: {
      //       start: `${start_time.hour}:${start_time.minute}:${start_time.second}`,
      //       end: `${end_time.hour}:${end_time.minute}:${end_time.second}`,
      //     },
      //     license_plate: transaction.license_plate,
      //     price: currPrice,
      //     duration: currentTime,
      //   }

      //   historyList.push(parkingHistory)
      // });
      
      transactionList.forEach(
          async transaction =>{
      
          const currentDate = getCurrentDate(transaction.start_time);
          const start_time = getTimeDescription(transaction.start_time);
          const end_time = getTimeDescription(transaction.end_time);
          const currentTime = convertCurrentTimeFormat(new Date(transaction.start_time), new Date());
      
          const priceResult = await getCurrentPrice(transaction.result.transaction_id);
          const price = JSON.parse(priceResult);
          setCurrentPrice(price.result);
      
          const areaResult = await searchAreaLocation(transaction.result.transaction_id);
          const area = JSON.parse(areaResult);
          setCurrentArea(area.result);

          setParkingHistory({
            name: currentArea,
            date: currentDate,
            timestamp: {
              start: `${start_time.hour}:${start_time.minute}:${start_time.second}`,
              end: `${end_time.hour}:${end_time.minute}:${end_time.second}`,
            },
            license_plate: transaction.result.license_plate,
            price: currentPrice,
            duration: currentTime,
          });
      
          historyList.push(parkingHistory);
        }
    );           
    });
  };
  
  handleParkingHistory(uid, access_token);
  console.log(`History List: ${historyList.length}`);

  return (
    <SafeAreaView
      className="flex-1 gap-3"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="bg-white flex-row border rounded-b-[25px] justify-between items-center h-[90px] px-[22px]">
        <View className="items-center">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
            onPress={() => navigation.navigate("Profile")}
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
        <Text
          className="text-[24px] font-bold ml-5"
          style={{ color: themeColors.text }}
        >
          My History
        </Text>
      </View>
      <View className="flex-1 items-center">
        <FlatList
          data={historyList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoriesCard data={item} />}
        />
      </View>
      {/* <View className="flex-1 items-center"> */}
      {/* <View 
                className=
                    "bg-white flex rounded-[25px] h-[15vh] w-[93vw] px-[22px] pt-[16px] mb-5"
                    >
                        <View className="flex-row justify-between items-center mb-1">
                            <MaterialCommunityIcons 
                                name='check-circle'
                                style={{
                                    color:themeColors.bgbtn,
                                    fontSize: 30,
                                    display: 'flex'
                                }}
                                />
                            <Text className="flex font-semibold text-[20px]"
                                style={{color: themeColors.text}}
                            >
                                Future Park Rangsit
                            </Text>
                        </View>
                        <View className="border-[1px] mb-2" style={{borderColor: themeColors.text}}/>
                        <View className="flex gap-2">
                            <View className="flex-row justify-between">
                                <Text className="text-[14px]" style={{color: themeColors.des}}>21/10/2023</Text>
                                <Text className="text-[14px]" style={{color: themeColors.des}}>09:30:10 p.m. - 12:30:00 p.m.</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-[14px]" style={{color: themeColors.des}}>LICENSE PLATE:  1กก1111</Text>
                                <View className="flex-row">   
                                    <Text className="text-[14px]" style={{color: themeColors.text}}>60 BATHS </Text>
                                    <Text className="text-[14px]" style={{color: themeColors.des}}>(3 hours)</Text>
                                </View> 
                            </View>
                        </View>
                </View>
                <View 
                className=
                    "bg-white flex rounded-[25px] h-[15vh] w-[93vw] px-[22px] pt-[16px] mb-5"
                    >
                        <View className="flex-row justify-between items-center mb-1">
                            <MaterialCommunityIcons 
                                name='check-circle'
                                style={{
                                    color:themeColors.bgbtn,
                                    fontSize: 30,
                                    display: 'flex'
                                }}
                                />
                            <Text className="flex font-semibold text-[20px]"
                                style={{color: themeColors.text}}
                            >
                                Central World
                            </Text>
                        </View>
                        <View className="border-[1px] mb-2" style={{borderColor: themeColors.text}}/>
                        <View className="flex gap-2">
                            <View className="flex-row justify-between">
                                <Text className="text-[14px]" style={{color: themeColors.des}}>20/10/2023</Text>
                                <Text className="text-[14px]" style={{color: themeColors.des}}>16:00:30 p.m. - 18:00:10 p.m.</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-[14px]" style={{color: themeColors.des}}>LICENSE PLATE:  1กข1234</Text>
                                <View className="flex-row">   
                                    <Text className="text-[14px]" style={{color: themeColors.text}}>70 BATHS </Text>
                                    <Text className="text-[14px]" style={{color: themeColors.des}}>(3 hours)</Text>
                                </View> 
                            </View>
                        </View>
                </View> */}
      {/* </View> */}
      {/* menu bar  */}
      <View style={{ marginTop: "auto" }}>
        <BottomTab
          onPress={() => navigation.navigate("Home", {uid, access_token})}
          onPress2={() => navigation.navigate("History")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;