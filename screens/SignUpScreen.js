import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  const [password1, setPassword1] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);

  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const route = useRoute();
  const uid = route.params?.uid;

  useEffect(() => {
    validateForm();
  }, [email, password1, password2]);

  const validateForm = () => {
    let errors = {};

    // Validate email field
    checkEmailForUse(email).then((result) => {
      const res = JSON.parse(result);
      if (res.result == "Email already exists.") {
        setErrorMessage("Email already exists.");
        errors.email = "Email already exists.";
        setShowErrorModal(true);
        setIsFormValid(false);
      } else {
        setErrorMessage("");
        setIsFormValid(true);
      }
    });
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password1) {
      errors.password1 = "Password is required.";
    } else if (password1.length < 8) {
      errors.password1 = "Password must be at least 8 characters long.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password1
      )
    ) {
      errors.password1 =
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.";
    }

    if (!password2) {
      errors.password2 = "Password is required.";
    } else if (password2.length < 8) {
      errors.password2 = "Password must be at least 8 characters long.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password2
      )
    ) {
      errors.password2 =
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.";
    }

    // Validate password confirmation
    if (password1 !== password2) {
      errors.password2 = "Passwords do not match.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const createAccountInformation = async (information) => {
    const ICONNECT_API = "http://192.168.1.37:8081/auth/email/sign-up";
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
        throw new Error(`Error: ${result.status} - ${result.body}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const checkEmailForUse = async (email) => {
    const ICONNECT_API = `http://192.168.1.37:8081/account/email/${email}`;
    try {
      const result = await fetch(ICONNECT_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        const responseBody = await result.text();
        return responseBody;
      } else {
        throw new Error(`Error: ${result.status} - ${result.body}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleCreateAccount = () => {
    if (Object.keys(errors).length !== 0) setIsFormValid(false);
    if (isFormValid) {
      const accountInformation = {
        email: email,
        password: password1,
        uid: uid,
      };
      console.log(accountInformation);
      if (Object.keys(errors).length !== 0 || errorMessage.length != 0) {
        setErrorMessage("Something wrong. Please try again.");
        setShowErrorModal(true);
      } else {
        createAccountInformation(accountInformation)
          .then((result) => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            setErrorMessage("Something wrong. Please try again.");
            setShowErrorModal(true);
          });
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
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
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
            placeholder="Email"
            onChangeText={setEmail}
          />
          {/* {errors.email && (
            <Text className="text-red-500 m-0">{errors.email}</Text>
          )} */}
          <View
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
            style={{ flexDirection: "row" }}
          >
            <TextInput
              style={{ width: "92%" }}
              placeholder="Password"
              secureTextEntry={!showPassword1}
              value={password1}
              onChangeText={setPassword1}
            />
            <MaterialCommunityIcons
              name={showPassword1 ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword1}
            />
          </View>
          {/* {errors.password1 && (
            <Text className="text-red-500 m-0">{errors.password1}</Text>
          )} */}
          <View
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
            style={{ flexDirection: "row" }}
          >
            <TextInput
              style={{ width: "92%" }}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword2}
              value={password2}
              onChangeText={setPassword2}
            />
            <MaterialCommunityIcons
              name={showPassword2 ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword2}
            />
          </View>
          {/* {errors.password2 && (
            <Text className="text-red-500 m-0">{errors.password2}</Text>
          )} */}
          <TouchableOpacity
            className="py-4 rounded-3xl"
            onPress={handleCreateAccount}
            style={{
              backgroundColor: themeColors.bgbtn,
              opacity: Object.keys(errors).length === 0 ? 1 : 0.5,
            }}
          >
            <Text
              className="font-bold text-center text-white"
              style={{ fontSize: 20 }}
            >
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>
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
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
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
                <Text style={{ color: "white", textAlign: "center" }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
