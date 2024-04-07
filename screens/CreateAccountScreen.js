import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccountScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, firstName, lastName, phone]);

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
    if (!firstName) {
      errors.firstName = "Firstname is required.";
    } else if (firstName.length < 3) {
      errors.firstName = "Firstname must be at least 3 characters.";
    }

    if (!lastName) {
      errors.lastName = "Lastname is required.";
    } else if (lastName.length < 3) {
      errors.lastName = "Lastname must be at least 3 characters.";
    }

    checkPhoneNumberForUse(phone).then((result) => {
      const res = JSON.parse(result);
      if (res.result == "Phone already exists.") {
        setErrorMessage("Phone already exists.");
        errors.phone = "Phone already exists.";
        setShowErrorModal(true);
        setIsFormValid(false);
      } else {
        setErrorMessage("");
        setIsFormValid(true);
      }
    });
    if (!phone) {
      errors.phone = "Phone is required.";
    } else if (!/^0[0-9]{1,2}[0-9]{3}[0-9]{4}$/.test(phone)) {
      errors.phone =
        "Phone is invalid. Please enter a valid Thai phone number.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
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

  const checkPhoneNumberForUse = async (phone) => {
    const ICONNECT_API = `http://192.168.1.37:8080/user/phone/${phone}`;
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

  const createUserInformation = async (information) => {
    const ICONNECT_API = "http://192.168.1.37:8080/user/profile/create";
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
        // return result.status;
        throw new Error(`HTTP error: ${result.status}`);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleSignUp = () => {
    if (Object.keys(errors).length !== 0) setIsFormValid(false);
    if (isFormValid) {
      const userInformation = {
        name: firstName,
        surname: lastName,
        email: email,
        birth_date: new Date(),
        phone_number: phone,
        role_id: "1",
      };
      if (Object.keys(errors).length !== 0 || errorMessage.length != 0) {
        setErrorMessage("Something wrong. Please try again.");
        setShowErrorModal(true);
      } else {
        createUserInformation(userInformation)
          .then((result) => {
            const user = JSON.parse(result);
            const uid = user.result.uid;
            console.log(uid);
            navigation.navigate("SignUp", { uid });
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
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
              placeholder="Firstname"
              onChangeText={(newFirstName) => setFirstName(newFirstName)}
            />
            {errors.firstName && (
              <Text className="text-red-500 m-0">{errors.firstName}</Text>
            )}
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
              placeholder="Lastname"
              onChangeText={(newLastName) => setLastName(newLastName)}
            />
            {errors.lastName && (
              <Text className="text-red-500 m-0">{errors.lastName}</Text>
            )}
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
              placeholder="Email"
              onChangeText={(newEmail) => setEmail(newEmail)}
            />
            {errors.email && (
              <Text className="text-red-500 m-0">{errors.email}</Text>
            )}
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl m-0"
              placeholder="Phone Number"
              onChangeText={(newPhone) => setPhone(newPhone)}
            />
            {errors.phone && (
              <Text className="text-red-500 m-0">{errors.phone}</Text>
            )}

            <TouchableOpacity
              className="py-4 rounded-3xl"
              onPress={handleSignUp}
              style={{
                backgroundColor: themeColors.bgbtn,
                opacity: Object.keys(errors).length === 0 ? 1 : 0.5,
              }}
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
      </ScrollView>
    </View>
  );
}
