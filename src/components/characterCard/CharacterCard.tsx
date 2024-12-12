import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    default:
      return "gray";
  }
};

const CharacterCard = ({ character }: { character: any }) => (
  <View style={styles.card}>
    <Image source={{ uri: character.image }} style={styles.image} />
    <View>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={[styles.status, { color: getStatusColor(character.status) }]}>
        {character.status}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CharacterCard;
