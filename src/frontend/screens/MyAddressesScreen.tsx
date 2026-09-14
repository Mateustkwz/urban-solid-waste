import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import {
  AddressCard,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from "@components/ui/";
import { getUserAddresses } from "@frontend-services/user.service";
import { Address } from "@frontend-types/common.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { AppNavProp } from "@navigation/AppNavigator";
import { useAuthStore } from "@store/authStore";
import { Radius } from "@theme/radius";
import { Spacing } from "@theme/spacing";

export default function MyAddressesScreen() {
  const { t } = useTranslation();
  const { user, updateAddresses, addresses } = useAuthStore();
  const navigation = useNavigation<AppNavProp>();

  const handleNewAddress = (data?: Address) => {
    navigation.navigate("AddressForm", { address: data });
  };

  const loadAddresses = useCallback(async () => {
    try {
      if (user) {
        const addresses = await getUserAddresses(user.id);

        updateAddresses(addresses);
      }
    } catch (error) {
      showToast(
        "error",
        t("error.title.loadAddresses"),
        (handleErrorMessage(error) || error) as string,
      );
    }
  }, [t, updateAddresses, user]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  return (
    <View style={styles.container}>
      {addresses && (
        <FlatList
          data={addresses}
          contentContainerStyle={{ gap: Spacing.sm }}
          renderItem={({ item }) => (
            <AddressCard key={item.id} data={item} onEdit={handleNewAddress} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        textColor="surface"
        borderRadius={Radius.huge}
        style={styles.buttonContainer}
        backgroundColor="associationIcon"
        onPress={() => handleNewAddress()}
      >
        <View style={styles.buttonContent}>
          <Icon name="HousePlus" />
          <Text color="surface">{t("address.newAddress")}</Text>
        </View>
      </TouchableOpacity>
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
  buttonContainer: {
    width: "50%",
    position: "absolute",
    paddingVertical: Spacing.xl,
    bottom: Spacing.big,
    right: Spacing.xl,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
