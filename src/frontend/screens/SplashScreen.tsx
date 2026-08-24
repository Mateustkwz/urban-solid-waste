import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import { Icon, Text, View } from "@components/ui";
import { Colors, Radius, Spacing } from "@theme/index";

export default function SplashScreen() {
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={[Colors.light.primary, Colors.light.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Recycling Icon */}
      <View style={styles.iconBackground}>
        <View style={styles.iconWrapper}>
          <Icon name="Recycle" size={64} />
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text variant="h1" style={styles.title}>
          {t("splash.titleUrban")}
        </Text>
        <Text variant="subtitle" style={styles.subtitle}>
          {t("splash.titleSolidWaste")}
        </Text>
      </View>

      {/* Illustration */}
      <View style={styles.illustration}>
        <View
          style={[
            styles.body,
            {
              left: 35,
              height: 85,
              backgroundColor: Colors.light.background,
              opacity: 0.2,
            },
          ]}
        />
        <View
          style={[
            styles.body,
            {
              left: 80,
              height: 100,
              backgroundColor: Colors.light.background,
              opacity: 0.2,
            },
          ]}
        />
        <View
          style={[
            styles.body,
            {
              left: 125,
              height: 70,
              backgroundColor: Colors.light.background,
              opacity: 0.2,
            },
          ]}
        />
        <View
          style={[
            styles.head,
            {
              left: 46,
              top: -Spacing.sm,
              backgroundColor: Colors.light.secondary,
              width: 30,
              height: 30,
            },
          ]}
        />
        <View
          style={[
            styles.head,
            {
              left: 88,
              top: Spacing.xs,
              backgroundColor: Colors.light.accent,
              width: 24,
              height: 24,
            },
          ]}
        />
        <View
          style={[
            styles.head,
            {
              left: 136,
              top: Spacing.xl,
              backgroundColor: Colors.light.background,
              opacity: 0.7,
              width: 18,
              height: 18,
            },
          ]}
        />
      </View>

      {/* Tagline */}
      <Text variant="bodyMedium" style={styles.tagline}>
        {t("splash.tagline")}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.huge,
    paddingBottom: Spacing.xxl,
  },
  iconBackground: {
    width: 156,
    height: 156,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: Radius.grand,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  iconWrapper: {
    width: 126,
    height: 126,
    borderRadius: Radius.grand,
    backgroundColor: "rgba(255,255,255,0.09)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: Spacing.huge,
    backgroundColor: "transparent",
  },
  title: {
    color: Colors.light.surface,
  },
  subtitle: {
    color: Colors.light.surface,
    opacity: 0.8,
    marginTop: Spacing.sm,
  },
  illustration: {
    width: 200,
    height: 120,
    marginBottom: Spacing.xl,
    position: "relative",
    backgroundColor: "transparent",
  },
  body: {
    position: "absolute",
    bottom: 0,
    width: 56,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
  head: {
    position: "absolute",
    borderRadius: Radius.round,
  },
  tagline: {
    color: Colors.light.surface,
    textAlign: "center",
    marginTop: Spacing.lg,
  },
});
