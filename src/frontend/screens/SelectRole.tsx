import * as LucideIcons from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import { Icon, Text, TouchableOpacity, View } from "@components/ui";
import { UserRole } from "@constants/common";
import { useAuthStore } from "@store/authStore";
import { Colors, Radius, Shadows, Size, Spacing } from "@theme/index";

export default function SelectRoleScreen() {
  const { t } = useTranslation();
  const { user, currentRole } = useAuthStore();

  const handleSelectRole = (role: UserRole) => {
    if (user) {
      currentRole(user, role);
    }
  };

  const roleItems = [
    {
      role: UserRole.CITIZEN,
      label: "citizen",
      icon: "User",
    },
    {
      role: UserRole.ASSOCIATION,
      label: "association",
      icon: "Truck",
    },
    {
      role: UserRole.CITY_HALL,
      label: "cityHall",
      icon: "Building2",
    },
  ].filter((item) => {
    if (user && user.role.includes(item.role)) {
      return true;
    }

    return false;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header} background="background">
        <View background="primary" style={styles.iconHeaderContainer}>
          <Icon name="Recycle" size={Spacing.huge} style={styles.iconHeader} />
        </View>
        <Text variant="h1" style={styles.title} color="text">
          {t("selectRole.title")}
        </Text>
        <Text variant="bodySemiBold" style={styles.subtitle} color="text">
          {t("selectRole.subtitle")}
        </Text>
      </View>

      <View style={styles.content}>
        {roleItems.map((item) => (
          <TouchableOpacity
            style={[styles.card, { ...Shadows.card }]}
            onPress={() => handleSelectRole(item.role)}
            backgroundColor="background"
            borderColor="transparent"
            key={"roleSelectCard-" + item.label}
          >
            <View
              style={styles.iconCardTextContainer}
              background={
                `${item.label}Background` as keyof typeof Colors.light
              }
            >
              <Icon
                name={item.icon as keyof typeof LucideIcons}
                size={28}
                color={`${item.label}Icon` as keyof typeof Colors.light}
              />
            </View>
            <View style={styles.cardText} background="transparent">
              <Text variant="h2" style={{ ...Size.body, fontWeight: 700 }}>
                {t(`common.role.${item.label}`)}
              </Text>
              <Text
                style={{ ...Size.bodySmall, maxWidth: 180 }}
                variant="bodySemiBold"
                color="textSecondary"
              >
                {t(`common.role.${item.label}Description`)}
              </Text>
            </View>
            <Icon name="ChevronRightIcon" color="icon" size={Spacing.xl} />
          </TouchableOpacity>
        ))}

        <Text
          variant="bodySemiBold"
          style={[styles.note, { ...Size.label }]}
          color="textSecondary"
        >
          {t("selectRole.note")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.big * 1.4,
    alignItems: "center",
  },
  iconHeaderContainer: {
    width: Spacing.huge * 1.8,
    height: Spacing.huge * 1.8,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
    borderRadius: Radius.xxl,
  },
  iconHeader: { position: "absolute" },
  title: { marginTop: Spacing.sm },
  subtitle: { marginTop: Spacing.sm },
  content: { flex: 1, paddingHorizontal: Spacing.xxl },
  question: { fontSize: 22, marginBottom: Spacing.sm },
  subquestion: { fontSize: 16, marginBottom: Spacing.xl },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: Spacing.sm,
    padding: Spacing.xl,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: Spacing.lg,
  },
  iconCardTextContainer: {
    height: 56,
    width: 56,
    borderRadius: Radius.xl,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.xs,
  },
  cardText: { marginLeft: Spacing.md, flex: 1 },
  note: {
    textAlign: "center",
    marginTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    fontSize: 14,
  },
});
