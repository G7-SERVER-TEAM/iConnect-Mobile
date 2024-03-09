// NewsCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { themeColors } from "../theme";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 6,
  },
  icon: {
    padding: 10,
    backgroundColor: themeColors.text,
    borderRadius: 999,

  },
  title: {
    fontSize: 18,
    fontWeight: "bold",    
  },
  description: {
    fontSize: 12,
    color: '#898989',
    paddingTop: 5,
  },
});

const NotificationItem = ({ title, description, status }) => {
  return (
    <View style={styles.container}>

      <View style={styles.icon}>
        <Ionicons 
          name="person-outline"
          size={24}
          style={
            { color: '#FFFFFF' }
          }
        ></Ionicons>
      </View>

      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

