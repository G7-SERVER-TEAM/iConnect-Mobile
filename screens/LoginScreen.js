import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors = {};
    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }
    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 6 characters.";
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const searchUserAccount = async (information) => {
    const ICONNECT_API = "http://192.168.1.37:8081/auth/email/login";
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
    if (isFormValid) {
      const accountInformation = {
        email: email,
        password: password,
      };
      searchUserAccount(accountInformation)
        .then((result) => {
          const account = JSON.parse(result);
          console.log(account);
          const uid = account.uid;
          console.log(uid);
          const access_token = account.access_token;
          navigation.navigate("Home", { uid, access_token });
        })
        .catch((error) => {
          setErrorMessage("Invalid email or password");
          setShowErrorModal(true);
        });
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Please correct them.");
    }
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
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
            placeholder="Email"
            onChangeText={setEmail}
          />
          {/* Display email error message */}
          {errors.email && (
            <Text className="text-red-500 m-0">{errors.email}</Text>
          )}

          <View
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
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
          {/* Display password error message */}
          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}

          <TouchableOpacity
            className="py-4 rounded-3xl"
            onPress={handleLogin}
            style={{
              backgroundColor: themeColors.bgbtn,
              opacity: isFormValid ? 1 : 0.5,
            }}
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

      {/* Error Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              onPress={() => setShowErrorModal(false)}
              style={{
                padding: 10,
                backgroundColor: themeColors.bgbtn,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
