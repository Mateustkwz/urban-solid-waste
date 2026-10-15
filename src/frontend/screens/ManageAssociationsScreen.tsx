import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { User } from "@backend-types/user.type";
import { BlockUserModal, UserCard, View } from "@components/ui";
import { UserRole } from "@constants/common";
import { useCityHallStore } from "@store/cityHallStore";
import { Spacing } from "@theme/spacing";

export default function ManageAssociationsScreen() {
  const { userList } = useCityHallStore();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return userList.filter(
      (user) => user.role.length === 1 && user.role[0] === "ASSOCIATION",
    );
  }, [userList]);

  return (
    <View style={styles.deliveryContainer}>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <UserCard
            key={item.id}
            data={item}
            role={"ASSOCIATION" as UserRole}
            setCurrentUser={setSelectedUser}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      />
      {selectedUser && (
        <BlockUserModal
          user={selectedUser}
          visible
          onClose={() => setSelectedUser(null)}
        />
      )}
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
