import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

export default function CreateAccountScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [birthDate, setBirthDate] = useState(dayjs());

  const createUserInformation = async (information) => {
    const ICONNECT_API = "http://192.168.1.5:8080/user/profile/create";
    try {
      const result = await fetch(ICONNECT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleSignUp = () => {
    const userInformation = {
      name: firstName,
      surname: lastName,
      email: email,
      birth_date: new Date(),
      phone_number: phone,
      role_id: "1",
    };
    createUserInformation(userInformation)
      .then((result) => {
        const user = JSON.parse(result);
        const uid = user.result.uid;
        navigation.navigate("SignUp", { uid });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <ScrollView className="flex-col">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            style={{ marginLeft: 30 }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center" style={{ marginTop: 30 }}>
          <Image
            source={require("../assets/images/WelcomePicture.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <View className="flex-row justify-center">
          <Text
            className="font-bold"
            style={{ color: themeColors.text, fontSize: 50, marginTop: 10 }}
          >
            CREATE
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text
            className="font-bold"
            style={{ color: themeColors.text, fontSize: 15 }}
          >
            Your Account
          </Text>
        </View>
      </SafeAreaView>

      {/* <ScrollView className="flex-col"> */}
        <View className="flex-1 px-8">
          <View className="form space-y-2">
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Firstname"
              onChangeText={(newFirstName) => setFirstName(newFirstName)}
            />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Lastname"
              onChangeText={(newLastName) => setLastName(newLastName)}
            />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Email"
              onChangeText={(newEmail) => setEmail(newEmail)}
            />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Phone Number"
              onChangeText={(newPhone) => setPhone(newPhone)}
            />

            {/* <View className="flex-1 bg-slate-100">
              <DateTimePicker
                className="p-4 bg-gray-100 text-gray-100 rounded-2xl mb-3"
                mode="single"
                date={birthDate}
                onChange={(params) => setBirthDate(params.date)}
              />
            </View> */}

            <TouchableOpacity
              className="py-4 rounded-3xl"
              onPress={handleSignUp}
              style={{ backgroundColor: themeColors.bgbtn }}
            >
              <Text
                className="font-bold text-center text-white"
                style={{ fontSize: 20 }}
              >
                CONTINUE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
