import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { AssociationCard, View } from "@components/ui/";
import { useAssociationStore } from "@store/associationStore";
import { Spacing } from "@theme/spacing";

export default function RegisteredAssociationsScreen() {
  const { associations } = useAssociationStore();

  const associationList = associations?.filter(
    (association) =>
      association.role.length === 1 && association.role[0] === "ASSOCIATION",
  );

  return (
    <View style={styles.container}>
      {associationList && (
        <FlatList
          data={associationList}
          contentContainerStyle={{ gap: Spacing.sm }}
          renderItem={({ item }) => (
            <AssociationCard key={item.id} data={item} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    position: "relative",
    flex: 1,
  },
});
