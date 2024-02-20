import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const searchUserAccount = async (information) => {
    const ICONNECT_API = "http://10.4.13.25:8081/auth/email/login";
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

  const handleLogin = () => {
    const accountInformation = {
      email: email,
      password: password,
    };
    searchUserAccount(accountInformation).then(result => {
      const account = JSON.parse(result);
      const uid = account.uid;
      const access_token = account.access_token;
      navigation.navigate("Home", { uid, access_token });
    })
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={{ color: "white" }}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center" style={{ marginTop: 100 }}>
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
            SIGN IN
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text
            className="font-bold"
            style={{ color: themeColors.text, fontSize: 15 }}
          >
            To Your Account
          </Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 px-8">
        <View className="form space-y-2">
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
            onChangeText={setEmail}
          />
          <View
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={{ flexDirection: "row" }}
          >
            <TextInput
              style={{ width: "92%" }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>

          <TouchableOpacity
            className="py-4 rounded-3xl"
            onPress={handleLogin}
            style={{ backgroundColor: themeColors.bgbtn }}
          >
            <Text
              className="font-bold text-center text-white"
              style={{ fontSize: 20 }}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
