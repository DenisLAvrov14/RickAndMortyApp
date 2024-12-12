import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ErrorView;
