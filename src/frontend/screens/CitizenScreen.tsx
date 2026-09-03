import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import {
	Chip,
	DeliveryCard,
	Icon,
	LinearGradient,
	ProfilePicture,
	Text,
	View,
} from "@components/ui";
import { materials } from "@constants/common";
import { DeliveryType } from "@frontend-types/delivery.type";
import { formatSchedule } from "@frontend-utils/date.util";
import { useAuthStore } from "@store/authStore";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

export default function CitizenScreen() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const mockLastDelivery = formatSchedule({
    date: "2026-08-20",
    start_time: "08:00",
    end_time: "12:00",
  });

  const mockRecentDeliveries: DeliveryType[] = [
    {
      id: "2026-01",
      material: ["paper", "plastic"],
      delivery_date: {
        date: "2026-08-17",
        start_time: "08:00",
        end_time: "10:00",
      },
      quantity: 0.8,
      method: "home",
      unit: "kg",
      status: "collected",
      points: 85,
    },
    {
      id: "2026-02",
      material: ["paper", "plastic"],
      delivery_date: {
        date: "2026-08-29",
        start_time: "10:00",
        end_time: "12:00",
      },
      quantity: 0.8,
      method: "home",
      unit: "kg",
      status: "pending",
      points: 85,
    },
  ];

  if (!user) {
    return null;
  }

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
          <View>
            <Text variant="bodySmall" color="background">
              {t("citizen.hello", { name: user.name })}
            </Text>
            <Text
              style={[styles.headerTitle, Size.h3]}
              variant="h1"
              color="background"
            >
              {t("citizen.goodDay")}
            </Text>
          </View>
          <View style={styles.headerPicture}>
            <ProfilePicture name={user.name} />
          </View>
        </LinearGradient>
        <LinearGradient
          style={styles.pointsContainer}
          colors={["primary", "primaryLight", "primaryLight"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View background="surface" style={styles.bubble1} />
          <View background="surface" style={styles.bubble2} />
          <Text
            variant="bodySemiBold"
            style={Size.bodySmall}
            color="background"
          >
            {t("citizen.yourPoints")}
          </Text>
          <View style={styles.pointsTextContainer}>
            <Text style={Size.huge} variant="h1" color="background">
              {new Intl.NumberFormat("pt-br").format(user.points || 0)}
            </Text>
            <Text variant="bodyMedium" style={styles.pts} color="background">
              {t("common.word.pts")}
            </Text>
          </View>
          <View>
            <Text
              variant="bodySemiBold"
              style={Size.bodySmall}
              color="background"
            >
              {t("citizen.level")}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.contentContainer}>
          <Text variant="h2" style={Size.body}>
            {t("citizen.nextDelivery")}
          </Text>
          <View
            style={styles.nextDeliveryContainer}
            background="componentBackground"
          >
            <View style={styles.nextDeliveryIcon} background="primary">
              <Icon name="Truck" />
            </View>
            <View style={styles.nextDeliveryContent}>
              <Text variant="h1" style={Size.body}>
                {`${t("common.word.collect")} ${t("common.word.schedulled")}`}
              </Text>
              <Text color="textSecondary" style={Size.label}>
                {mockLastDelivery}
              </Text>
              <View style={styles.nextDeliveryChipsContainer}>
                <Chip {...materials.paper} />
                <Chip {...materials.eletronic} />
              </View>
            </View>
          </View>
          {mockRecentDeliveries.length && (
            <View style={styles.recentDeliveriesContainer}>
              <Text variant="h2" style={Size.body}>
                {t("citizen.recentDeliveries")}
              </Text>
              {mockRecentDeliveries.map((delivery) => (
                <DeliveryCard key={delivery.id} data={delivery} />
              ))}
            </View>
          )}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    marginTop: 1,
  },
  headerPicture: {
    marginRight: Spacing.xs,
  },
  pointsContainer: {
    position: "relative",
    width: "90%",
    top: -Spacing.massive,
    alignSelf: "center",
    borderRadius: Radius.xxl,
    zIndex: 2,
    overflow: "hidden",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  bubble1: {
    position: "absolute",
    width: Spacing.massive * 2,
    height: Spacing.massive * 2,
    borderRadius: Radius.round,
    right: -Spacing.lg,
    top: -Spacing.lg,
    opacity: 0.12,
  },
  bubble2: {
    position: "absolute",
    width: Spacing.huge * 2,
    height: Spacing.huge * 2,
    borderRadius: Radius.round,
    right: Spacing.massive,
    bottom: -Spacing.xxxl,
    opacity: 0.12,
  },
  pointsTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: Spacing.md,
  },
  pts: {
    paddingBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
    top: -Spacing.xxxl,
  },
  nextDeliveryContainer: {
    width: "100%",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    borderColor: Colors.light.border,
    borderWidth: 1,
    ...Shadows.cardLight,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  nextDeliveryIcon: {
    padding: 14,
    borderRadius: Radius.lg,
  },
  nextDeliveryContent: {
    display: "flex",
    gap: Spacing.xs,
  },
  nextDeliveryChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    maxWidth: "90%",
  },
  recentDeliveriesContainer: {
    marginTop: Spacing.lg,
  },
});
