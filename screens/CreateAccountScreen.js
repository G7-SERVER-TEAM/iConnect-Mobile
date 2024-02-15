import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CreateAccountScreen() {
  const navigation = useNavigation();

  const [password1, setPassword1] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);

  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
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

      <View className="flex-1 px-8">
        <View className="form space-y-2">
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Firstname"
          />

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Lastname"
          />

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Email"
          />

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Phone Number"
          />

          <TouchableOpacity
            className="py-4 rounded-3xl"
            onPress={() => navigation.navigate("SignUp")}
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
    </View>
  );
}
