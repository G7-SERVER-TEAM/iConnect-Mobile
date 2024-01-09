// NewsCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { themeColors } from "../theme";

const NewsCard = ({ news, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: news.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{news.title}</Text>
          <Text style={styles.cardDescription}>{news.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 25,
    borderRadius: 20,
    overflow: "hidden",
    height: 250,
    width: 300 
  },
  cardImage: {
    width: "100%",
    height: "55%",
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: themeColors.text,
  },
  cardDescription: {
    fontSize: 12,
    
  },
});

export default NewsCard;

