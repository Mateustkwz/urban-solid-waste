import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import { UserCard, View } from "@components/ui";
import { useCityHallStore } from "@store/cityHallStore";
import { Spacing } from "@theme/spacing";

export default function ManageUsersScreen() {
  const { t } = useTranslation();
  const { userList } = useCityHallStore();

  const filteredUsers = useMemo(() => {
    return userList.filter(
      (user) => user.role.length === 1 && user.role[0] === "CITIZEN",
    );
  }, [userList]);

  return (
    <View style={styles.deliveryContainer}>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserCard key={item.id} data={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    position: "relative",
    overflow: "scroll",
  },
  buttonContainer: {
    width: "50%",
    position: "absolute",
    paddingVertical: Spacing.xl,
    bottom: Spacing.xxxl,
    right: Spacing.xl,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
