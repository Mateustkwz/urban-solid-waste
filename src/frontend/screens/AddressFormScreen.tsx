import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, TextInput, TouchableOpacity, View } from "@components/ui";
import { getAddressByZipCode } from "@frontend-services/axios.service";
import { addNewAddress, updateAddress } from "@frontend-services/user.service";
import {
  getAddressType,
  handleErrorMessage,
  showToast,
} from "@frontend-utils/common.util";
import { AppNavigationList } from "@navigation/AppNavigator";
import { useUserStore } from "@store/userStore";
import { Colors } from "@theme/colors";
import { Spacing } from "@theme/spacing";

type AddressRouteProp = RouteProp<AppNavigationList, "AddressForm">;

type AddressFormProps = {
  route: AddressRouteProp;
};

type AddressFormData = {
  id: string;
  name: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function AddressRegisterScreen({ route }: AddressFormProps) {
  const { t } = useTranslation();
  const { user, updateAddresses } = useUserStore();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const address = route.params?.address;

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    defaultValues: {
      id: address?.id ?? "",
      name: address?.name ?? "",
      street: address?.street ?? "",
      number: address ? `${address.number}` : "",
      complement: address?.complement ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      zipCode: address ? `${address.zipCode}` : "",
    },
  });

  const zipCodeSearch = async (zipcode: string) => {
    setLoading(true);

    try {
      const { data } = await getAddressByZipCode(zipcode);

      if (data) {
        reset({
          city: data.localidade,
          state: data.estado,
          street: data.logradouro,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onSubmit = async (data: AddressFormData) => {
    try {
      setLoading(true);

      if (user) {
        const newAddress = {
          ...data,
          type: getAddressType(user?.currentRole),
          number: Number(data.number),
          zipCode: Number(data.zipCode),
        };
        let updatedAddresses = [];

        if (address) {
          updatedAddresses = await updateAddress(newAddress, user.id);
        } else {
          updatedAddresses = await addNewAddress(newAddress, user.id);
        }

        updateAddresses(updatedAddresses);
      }
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setLoading(false);
      showToast(
        "error",
        t(`error.title.${address ? "editAddress" : "newAddress"}`),
        (handleErrorMessage(error) || error) as string,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: Spacing.md }}>
          {/* Zip Code */}
          <Controller
            control={control}
            name="zipCode"
            rules={{ required: t("error.required.zipCode") }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t("common.label.zipCode")}
                placeholder="Ex: 17500120"
                keyboardType="numeric"
                value={value}
                required
                backgroundColor="surface"
                errorMessage={errors.zipCode?.message}
                onChangeText={async (val) => {
                  const num = val.replace(/\D/g, "").slice(0, 9);

                  if (num.length === 8) {
                    await zipCodeSearch(num);
                  }

                  onChange(num);
                  clearErrors("zipCode");
                }}
              />
            )}
          />

          {/* Name */}
          <Controller
            control={control}
            name="name"
            rules={{ required: t("error.required.zipCode") }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t("common.label.addressName")}
                placeholder="Ex: Casa"
                value={value}
                required
                backgroundColor="surface"
                errorMessage={errors.name?.message}
                onChangeText={async (val) => {
                  onChange(val);
                  clearErrors("name");
                }}
              />
            )}
          />

          <View>
            {/* Street */}
            <Controller
              control={control}
              name="street"
              rules={{ required: t("error.required.street") }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  backgroundColor="surface"
                  style={styles.inputText}
                  label={t("common.label.street")}
                  placeholder="Ex: Avenida Brasil"
                  value={value}
                  required
                  errorMessage={errors.street?.message}
                  onChangeText={(val) => {
                    onChange(val);
                    clearErrors("street");
                  }}
                />
              )}
            />

            {/* Number */}
            <Controller
              control={control}
              name="number"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  backgroundColor="surface"
                  style={styles.inputText}
                  label={t("common.label.number")}
                  keyboardType="numeric"
                  placeholder="Ex: 3214"
                  value={value}
                  errorMessage={errors.number?.message}
                  onChangeText={(val) => {
                    const num = val.replace(/\D/g, "");
                    onChange(num);
                    clearErrors("number");
                  }}
                />
              )}
            />
          </View>

          {/* Complement */}
          <Controller
            control={control}
            name="complement"
            render={({ field: { onChange, value } }) => (
              <TextInput
                backgroundColor="surface"
                style={styles.inputText}
                label={t("common.label.complement")}
                value={value}
                errorMessage={errors.complement?.message}
                placeholder="Ex: Apt 32"
                onChangeText={(val) => {
                  onChange(val);
                  clearErrors("complement");
                }}
              />
            )}
          />

          {/* City */}
          <Controller
            control={control}
            name="city"
            rules={{ required: t("error.required.city") }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                backgroundColor="surface"
                style={styles.inputText}
                label={t("common.label.city")}
                value={value}
                placeholder="Ex: Curitiba"
                required
                errorMessage={errors.city?.message}
                onChangeText={(val) => {
                  onChange(val);
                  clearErrors("city");
                }}
              />
            )}
          />

          {/* State */}
          <Controller
            control={control}
            name="state"
            rules={{ required: t("error.required.state") }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                backgroundColor="surface"
                style={styles.inputText}
                label={t("common.label.state")}
                value={value}
                placeholder="Ex: Paraná"
                required
                errorMessage={errors.state?.message}
                onChangeText={(val) => {
                  onChange(val);
                  clearErrors("state");
                }}
              />
            )}
          />
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={{
            margin: Spacing.md,
            padding: Spacing.md,
            backgroundColor: Colors.light.primary,
            borderRadius: Spacing.sm,
          }}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ textAlign: "center" }} color="surface">
            {address ? t("address.editTitle") : t("address.newTitle")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#2E7D32" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(88, 87, 87, 0.4)",
    justifyContent: "center",
    paddingBottom: Spacing.big * 3,
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 10,
  },
  inputText: {},
});
