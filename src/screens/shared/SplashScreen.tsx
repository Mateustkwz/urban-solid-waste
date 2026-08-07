import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const bootstrap = async () => {
      // TODO:
      // - Load fonts
      // - Seed AsyncStorage
      // - Restore user session
      // - Navigate to Auth or App
    };

    bootstrap();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoCycle</Text>

      <ActivityIndicator size="large" />

      <Text style={styles.subtitle}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
  },
});
