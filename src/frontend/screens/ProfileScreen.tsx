import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import {
  TouchableOpacity as CustomTouchableOpacity,
  Icon,
  LinearGradient,
  ProfilePicture,
  ProgressBar,
  Text,
  View,
} from "@components/ui";
import { logout as serviceLogout } from "@frontend-services/auth.service";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { getEcoLevel } from "@frontend-utils/points.util";
import { AppNavProp } from "@navigation/AppNavigator";
import { useDeliveryStore } from "@store/deliveryStore";
import { useUserStore } from "@store/userStore";
import { Radius, Shadows, Size, Spacing } from "@theme/index";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, logout } = useUserStore();
  const { deliveries } = useDeliveryStore();
  const navigation = useNavigation<AppNavProp>();

  const [loading, setLoading] = useState(false);

  const userLevel = useMemo(() => getEcoLevel(user?.points || 0), [user]);
  const deliveredOnes = useMemo(
    () => deliveries.filter((deliv) => deliv.status === "collected"),
    [deliveries],
  );
  const userTotalPoints = useMemo(
    () =>
      (user?.points || 0) +
      deliveredOnes.reduce((prev, next) => prev + (next.points || 0), 0),
    [user, deliveredOnes],
  );

  const handleMyAddresses = () => {
    navigation.navigate("MyAddresses");
  };

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      setLoading(true);
      await serviceLogout(user.id);
      logout();
      setLoading(false);
    } catch (error) {
      showToast("error", t("error.title.logout"), handleErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <LinearGradient
          style={styles.header}
          colors={["primary", "primaryLight"]}
        >
          <TouchableOpacity style={styles.headerPicture}>
            <ProfilePicture
              height={Spacing.big * 1.2}
              width={Spacing.big * 1.2}
              name={user.name}
              variant="h3"
            />
          </TouchableOpacity>
          <View>
            <Text variant="h3" color="background">
              {user.name}
            </Text>
            <Text
              style={[styles.headerTitle]}
              variant="caption"
              color="background"
            >
              {user.email}
            </Text>
            <View style={styles.currentLevelContainer}>
              <View
                background="surface"
                style={styles.currentLevelBackground}
              />
              <Text
                variant="h1"
                style={[styles.currentLevelText, Size.caption]}
                color="surface"
              >
                {t("profile.level", { level: userLevel.level })}
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View
          style={[
            styles.deliveryContainer,
            styles.cardContainer,
            Shadows.cardLight,
          ]}
          background="surface"
        >
          <View style={styles.customContainer}>
            <Text variant="h3" color="primary">
              {new Intl.NumberFormat("pt-br").format(user.points || 0)}
            </Text>
            <Text variant="caption">{t("common.word.points")}</Text>
          </View>
          <View style={styles.customContainer}>
            <Text variant="h3" color="primary">
              {deliveredOnes.length}
            </Text>
            <Text variant="caption">{t("common.word.deliveries")}</Text>
          </View>
          <View style={styles.customContainer}>
            <Text variant="h3" color="primary">
              {new Intl.NumberFormat("pt-br").format(
                deliveredOnes.reduce((prev, next) => {
                  if (next.unit === "kg") {
                    return prev + Number(next.quantity);
                  }

                  return prev;
                }, 0),
              )}
            </Text>
            <Text
              style={{ maxWidth: 60, textAlign: "center" }}
              variant="caption"
            >
              {t("common.label.totalKgRecycle")}
            </Text>
          </View>
          <View style={styles.customContainer}>
            <Text variant="h3" color="primary">
              {new Intl.NumberFormat("pt-br").format(
                deliveredOnes.reduce((prev, next) => {
                  if (next.unit === "unit") {
                    return prev + Number(next.quantity);
                  }

                  return prev;
                }, 0),
              )}
            </Text>
            <Text
              style={{ maxWidth: 60, textAlign: "center" }}
              variant="caption"
            >
              {t("common.label.totalUnitRecycle")}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.cardContainer,
            styles.levelContainer,
            Shadows.cardLight,
          ]}
          background="surface"
        >
          <Text style={styles.levelIcon}>🌿</Text>
          <Text
            variant="h1"
            style={Size.body}
          >{`${t("common.word.level")} ${userLevel.level}`}</Text>
          <Text variant="bodySmall" color="textSecondary">
            {`${new Intl.NumberFormat("pt-br").format(user.points || 0)} / ${new Intl.NumberFormat("pt-br").format(userLevel.nextTarget || 0)} ${t("profile.nextLevelRequirement")}`}
          </Text>
          <ProgressBar
            style={styles.levelProgressBar}
            height={Spacing.md}
            progress={userTotalPoints / (userLevel.nextTarget || 0)}
          />
          <Text variant="bodySmall" color="textSecondary">
            {t("profile.nextLevelInfo", {
              points: userTotalPoints,
              nextLevel: userLevel.nextLevel,
            })}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <CustomTouchableOpacity
            style={styles.itemContainer}
            backgroundColor="surface"
            onPress={handleMyAddresses}
          >
            <Icon name="MapPin" color="primary" size={18} />
            <Text variant="h3" style={Size.bodySmall} color="text">
              {t("profile.myAddresses")}
            </Text>
            <Icon
              style={styles.chevronIcon}
              name="ChevronRight"
              color="textLight"
              size={18}
            />
          </CustomTouchableOpacity>
          <CustomTouchableOpacity
            style={styles.logoutButton}
            backgroundColor="transparent"
            borderColor="darkRed"
            textColor="darkRed"
            onPress={handleLogout}
            isLoading={loading}
          >
            <Icon name="LogOut" color="darkRed" />
            <Text variant="h3" style={Size.body} color="darkRed">
              {t("common.logout")}
            </Text>
          </CustomTouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    display: "flex",
  },
  header: {
    height: Spacing.big * 3.5,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    display: "flex",
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "center",
  },
  headerTitle: {
    marginTop: 1,
  },
  headerPicture: {
    marginRight: Spacing.xs,
  },
  currentLevelContainer: {
    marginTop: Spacing.xs * 1.5,
    position: "relative",
    overflow: "hidden",
    borderRadius: Radius.xxl,
    left: -2,
  },
  currentLevelBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
    opacity: 0.2,
  },
  currentLevelText: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingLeft: Spacing.sm,
  },
  cardContainer: {
    position: "relative",
    width: "90%",
    alignSelf: "center",
    zIndex: 2,
  },
  deliveryContainer: {
    top: -Spacing.xxl,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.huge,
    borderRadius: Radius.xxl,
  },
  customContainer: {
    alignItems: "center",
  },
  levelContainer: {
    padding: Spacing.lg,
    borderRadius: Radius.xl,
  },
  levelIcon: {
    position: "absolute",
    right: Spacing.lg,
    top: Spacing.xxl,
  },
  levelProgressBar: { marginVertical: Spacing.sm },
  bodyContainer: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: "flex-start",
    gap: Spacing.md,
  },
  chevronIcon: {
    position: "absolute",
    right: Spacing.lg,
  },
  logoutButton: {
    marginTop: Spacing.huge,
    borderWidth: 2,
    borderRadius: Radius.grand,
    flexDirection: "row",
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
});
