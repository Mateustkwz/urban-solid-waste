import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PlaygroundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Design Playground</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Primary Button</Text>
      </Pressable>

      {/* Test cards */}
      {/* Test typography */}
      {/* Test inputs */}
      {/* Test icons */}
      {/* Test spacing */}
      {/* Test dark mode */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
});
