import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import { UserRole, materialUnit, materials } from "@constants/common";
import { User } from "@frontend-types/user.type";
import { Radius } from "@theme/radius";
import { Spacing } from "@theme/spacing";
import { Size } from "@theme/typography";

import {
  AddressSelector,
  DateSelector,
  Dropdown,
  Icon,
  MultiSelectDropdown,
  RadioSelect,
  Text,
  TextButton,
  TextInput,
  TextModal,
  TimeSelector,
  View,
} from "@components/ui/";
import {
  createNewDelivery,
  updateDelivery,
} from "@frontend-services/delivery.service";
import { Address } from "@frontend-types/common.type";
import { DeliveryType } from "@frontend-types/delivery.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { AppNavProp, AppNavigationList } from "@navigation/AppNavigator";
import { useDeliveryStore } from "@store/deliveryStore";
import { useUserStore } from "@store/userStore";

type DeliveryRouteProp = RouteProp<AppNavigationList, "DeliveryForm">;

type DeliveryFormProps = {
  route: DeliveryRouteProp;
};

type DeliveryFormData = {
  id: string;
  material: string[];
  address: Address;
  unit: string;
  quantity: string;
  method: { id: "association" | "home"; label: string };
  association: { id: string; label: string };
  date: Date;
  time: string;
};

const mockAssociations: User[] = [
  {
    id: "user-001",
    role: [UserRole.ASSOCIATION],
    name: "Associação Silva Reciclagens",
    cpfOrCnpj: "123.456.789-00",
    email: "mateus.silva@example.com",
    password: "hashedPassword123",
    points: 250,
    currentRole: UserRole.ASSOCIATION,
    address: [
      {
        id: "associacaosilva",
        name: "Associação Silva",
        type: "RESIDENTIAL",
        street: "Rua das Flores",
        number: 123,
        zipCode: 80000000,
        city: "Curitiba",
        state: "PR",
        complement: "Apto 45",
      },
    ],
    rewards: [
      {
        rewardId: "reward-001",
        rescued: true,
        rescuedDate: "2026-09-01",
        rescuedTime: "14:30",
      },
    ],
  },
  {
    id: "user-002",
    role: [UserRole.ASSOCIATION],
    name: "Associação Recicla Curitiba",
    cpfOrCnpj: "12.345.678/0001-99",
    email: "contato@recicla.org",
    password: "securePass456",
    points: 1200,
    currentRole: UserRole.ASSOCIATION,
    address: [
      {
        id: "associacaocuritiba",
        name: "Associação Curitiba",
        type: "COLLECTION_POINT",
        street: "Av. Brasil",
        number: 456,
        zipCode: 80500000,
        city: "Curitiba",
        state: "PR",
      },
    ],
    rewards: [
      {
        rewardId: "reward-002",
        rescued: false,
        rescuedDate: "",
        rescuedTime: "",
      },
    ],
  },
  {
    id: "user-003",
    role: [UserRole.ASSOCIATION],
    name: "Associação da Prefeitura de Curitiba",
    cpfOrCnpj: "98.765.432/0001-11",
    email: "prefeitura@curitiba.gov.br",
    password: "cityHallSecure789",
    currentRole: UserRole.ASSOCIATION,
    address: [
      {
        id: "prefeitura",
        name: "Prefeitura",
        type: "CITY_HALL",
        street: "Praça Tiradentes",
        number: 1,
        zipCode: 80020000,
        city: "Curitiba",
        state: "PR",
      },
    ],
    rewards: [],
  },
];

export default function DeliveryFormScreen({ route }: DeliveryFormProps) {
  const { t } = useTranslation();
  const { addresses, user } = useUserStore();
  const { setDeliveries } = useDeliveryStore();
  const navigation = useNavigation<AppNavProp>();

  const delivery = route.params?.delivery;
  const initialAssociation = mockAssociations.find(
    (item) => item.id === delivery?.id,
  );

  const [selectedAssociation, setSelectedAssociation] = useState<User>(
    initialAssociation ?? mockAssociations[0],
  );
  const [loading, setLoading] = useState(false);

  const avaiableMaterials = Object.entries(materials).map(([name, value]) => ({
    id: name,
    label: value.label,
  }));

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    defaultValues: {
      id: delivery?.id ?? "",
      material: delivery?.material ?? [],
      unit: delivery?.unit ?? materialUnit.kg,
      quantity: delivery?.quantity ? `${delivery?.quantity}` : undefined,
      method: {
        id: delivery?.method ?? "home",
        label: t(`delivery.${delivery?.method ?? "home"}`),
      },
      address: delivery?.address ?? addresses[0],
      association: {
        id: selectedAssociation.id,
        label: selectedAssociation.name,
      },
      date: new Date(),
      time: `${new Date().getHours()}:00`,
    },
  });

  const methodValue = useWatch({ control, name: "method" });

  const submitForm = async (data: DeliveryFormData) => {
    setLoading(true);

    const splittedTime = data.time.split(":");
    const now = new Date().toString();

    try {
      let updatedDeliveries: DeliveryType[] = [];
      const newDelivery = {
        associationId: data.association.id,
        id: data.id,
        userId: user?.id ?? "",
        material: data.material,
        quantity: Number(data.quantity),
        unit: data.unit.toLowerCase() as "kg" | "unit",
        method: data.method.id,
        status: "pending" as DeliveryType["status"],
        deliveryDate: {
          date: data.date.toString(),
          endTime: data.time,
          startTime: `${Number(splittedTime[0]) + 2}:${splittedTime[1]}`,
        },
        address: data.address,
        createdAt: now,
        createdBy: user?.id ?? "",
        updatedAt: now,
        updatedBy: user?.id ?? "",
      };

      if (delivery) {
        updatedDeliveries = await updateDelivery(newDelivery);
      } else {
        updatedDeliveries = await createNewDelivery(newDelivery);
      }

      setDeliveries(updatedDeliveries);

      navigation.goBack();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast(
        "error",
        t(`error.title.${delivery ? "editDelivery" : "newDelivery"}`),
        (handleErrorMessage(error) || error) as string,
      );
    }
  };

  if (!addresses.length) {
    return (
      <TextModal
        visible
        onClose={() => null}
        title={t("delivery.addNewAddressTitle")}
        description={t("delivery.addNewAddressDescription")}
        style={styles.newAddressModalContainer}
      >
        <View style={styles.newAddressModalContent}>
          <TextButton
            alignSelf="center"
            backgroundColor="associationIcon"
            color="surface"
            style={styles.modalButton}
            onPress={() =>
              navigation.navigate("AddressForm", { address: undefined })
            }
            paddingVertical={Spacing.sm}
          >
            {t("delivery.newAddress")}
          </TextButton>
          <TextButton
            alignSelf="center"
            backgroundColor="associationBackground"
            color="associationIcon"
            style={styles.modalButton}
            onPress={() => navigation.goBack()}
            paddingVertical={Spacing.sm}
          >
            {t("common.word.back")}
          </TextButton>
        </View>
      </TextModal>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* <Text variant="h1" style={Size.subtitle}>
          {t("delivery.newDelivery")}
        </Text> */}
        <Text variant="body" style={[styles.subtitle, Size.bodySmall]}>
          {t("delivery.newDeliveryDescription")}
        </Text>

        <View style={styles.formContainer}>
          {/* Material Selector */}
          <Controller
            control={control}
            name="material"
            rules={{
              validate: (value) =>
                value.length > 0 || t("error.required.selectAtLeastOneItem"),
            }}
            render={({ field: { onChange, value } }) => (
              <MultiSelectDropdown
                options={avaiableMaterials}
                selected={value}
                onChange={(current) => {
                  onChange(current);
                  clearErrors("material");
                }}
                label={t("common.label.materialSelect")}
                errorMessage={errors.material?.message}
                required
              />
            )}
          />

          {/* Unit and Quantity */}
          <View>
            <Text
              variant="bodySmall"
              color={errors.quantity ? "error" : "text"}
            >
              {t("common.label.quantitySelect")}
              <Text color="error">*</Text>
            </Text>
            <View style={styles.unitAndQuantityContent}>
              <Controller
                control={control}
                name="quantity"
                rules={{
                  required: t("error.required.quantity"),
                  validate: (value) => {
                    if (Number(value) <= 0) {
                      return t("error.format.minQuantity");
                    }
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{ width: 148 }}
                    icon="Weight"
                    keyboardType="numeric"
                    value={value}
                    borderColor={errors.quantity ? "error" : "border"}
                    backgroundColor="transparent"
                    iconColor="icon"
                    placeholder={t("common.placeholder.quantity")}
                    onChangeText={(value) => {
                      const document = value.replace(/[^\d,]/g, "");

                      onChange(document);
                      clearErrors("quantity");
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="unit"
                render={({ field: { onChange, value } }) => (
                  <RadioSelect
                    options={Object.entries(materialUnit).map(
                      ([key, value]) => ({
                        value: key,
                        label: value,
                      }),
                    )}
                    selected={value}
                    position="horizontal"
                    onChange={onChange}
                    style={{ bottom: 6 }}
                  />
                )}
              />
            </View>
            {errors.quantity && (
              <View style={styles.errorContainer}>
                <Icon
                  style={styles.errorIcon}
                  name="TriangleAlert"
                  color="error"
                  size={18}
                />
                <Text
                  style={styles.errorMessage}
                  variant="bodySmall"
                  color="error"
                >
                  {errors.quantity.message}
                </Text>
              </View>
            )}
          </View>

          {/* Method */}
          <Controller
            control={control}
            name="method"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label={t("common.label.method")}
                onChange={onChange}
                options={[
                  { id: "home", label: t("delivery.home") },
                  { id: "association", label: t("delivery.association") },
                ]}
                selected={value}
              />
            )}
          />

          {/* Association */}
          <Controller
            control={control}
            name="association"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                label={t("common.label.association")}
                style={styles.associationContainer}
                onChange={(event) => {
                  onChange(event);
                  setSelectedAssociation(
                    mockAssociations.find(
                      (item) => item.id === event.id,
                    ) as User,
                  );
                }}
                options={mockAssociations.map((item) => ({
                  id: item.id,
                  label: item.name,
                }))}
                selected={value}
              />
            )}
          />

          {/* Address */}
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <AddressSelector
                addresses={
                  methodValue.id === "home" || !selectedAssociation.address
                    ? addresses
                    : selectedAssociation.address
                }
                onChange={onChange}
                selected={
                  methodValue.id === "home" || !selectedAssociation.address
                    ? value
                    : selectedAssociation.address[0]
                }
                method={methodValue.id}
              />
            )}
          />

          <View style={styles.dateContainer}>
            <Text variant="bodySmall">Selecione Data e Hora</Text>
            <View style={styles.dateContent}>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <DateSelector value={value} onChange={onChange} />
                )}
              />

              <Controller
                control={control}
                name="time"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text>-</Text>
                    <TimeSelector value={value} onChange={onChange} />
                  </>
                )}
              />
            </View>
          </View>
        </View>

        <TextButton
          onPress={handleSubmit(submitForm)}
          backgroundColor="primary"
          color="surface"
          style={styles.submitButton}
          isLoading={loading}
          paddingVertical={Spacing.md}
        >
          {t(`delivery.${delivery ? "edit" : "submit"}`)}
        </TextButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flex: 1,
  },
  subtitle: {
    marginBottom: Spacing.lg,
  },
  formContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    overflow: "scroll",
    flex: 1,
  },
  unitAndQuantityContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 8,
    gap: 4,
  },
  associationContainer: { marginTop: 8 },
  errorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -2,
    gap: 6,
    paddingBottom: 8,
  },
  errorMessage: {
    fontFamily: "Nunito-Bold",
  },
  errorIcon: {
    bottom: 1,
  },
  dateContainer: {
    marginTop: Spacing.sm,
  },
  dateContent: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  submitButton: {
    marginTop: Spacing.lg,
    borderRadius: Radius.xxxl,
    width: "100%",
    alignItems: "center",
  },
  newAddressModalContainer: {
    gap: Spacing.sm,
    padding: 6,
  },
  newAddressModalContent: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  modalButton: {
    borderRadius: Radius.sm,
  },
});
