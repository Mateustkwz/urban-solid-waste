import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import { DeliveryType } from "@frontend-types/delivery.type";
import { formatDateShort } from "@frontend-utils/date.util";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

import { materials } from "@constants/common";
import { Icon, Text, View } from "./";

export const DeliveryCard = ({ data }: { data: DeliveryType }) => {
  const { t } = useTranslation();
  let statusColor: {
    color: keyof typeof Colors.light;
    background: keyof typeof Colors.light;
  } = {
    color: "primary",
    background: "citizenBackground",
  };

  switch (data.status) {
    case "pending":
      statusColor.color = "yellow";
      statusColor.background = "yellowBackground";
      break;
    case "cancelled":
      statusColor.color = "red";
      statusColor.background = "redBackground";
      break;
  }

  return (
    <View style={styles.deliveryContainer} background="background">
      <View style={styles.deliveryIcon} background="componentBackground">
        <Icon name="Recycle" color="primary" />
      </View>
      <View style={styles.deliveryContent}>
        <View style={styles.deliveryTitleContainer}>
          <Text variant="h1" style={Size.body}>
            {`${t("common.word.delivery")} #${data.id}`}
          </Text>
          <View style={styles.deliveryTitleRightContent}>
            <View
              background={statusColor.background}
              style={styles.statusTextContainer}
            >
              <Text
                variant="h1"
                style={[Size.caption, { flex: 1 }]}
                color={statusColor.color}
              >
                {t(`common.word.${data.status}`)}
              </Text>
            </View>
            <Icon name="ChevronRight" color="icon" size={16} />
          </View>
        </View>
        <Text variant="bodySmall" color="text">
          {data.material.map((item) => materials[item].label).join(", ")}
        </Text>
        <View style={styles.dateAndPointsContainer}>
          <Icon name="Calendar" size={12} color="icon" />
          <Text variant="subtitle" color="icon" style={Size.caption}>
            {formatDateShort(data.delivery_date.date)}
          </Text>
          {data.points && (
            <View style={styles.pointsContainer}>
              <Icon name="Lightbulb" color="yellow" size={16} />
              <Text variant="h1" color="yellow" style={Size.bodySmall}>
                {`+${data.points} ${t("common.word.pts")}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryContainer: {
    width: "100%",
    padding: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    borderColor: Colors.light.border,
    borderWidth: 1,
    ...Shadows.cardLight,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.lg,
  },
  deliveryIcon: {
    padding: 14,
    borderRadius: Radius.lg,
  },
  deliveryContent: {
    gap: Spacing.xs,
    flex: 1,
  },
  deliveryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  deliveryTitleRightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  statusTextContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.round,
  },
  dateAndPointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
});
