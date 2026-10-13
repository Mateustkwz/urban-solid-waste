import { RouteProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

import { materials } from "@constants/common";
import { DeliveryType } from "@frontend-types/delivery.type";
import { AppNavProp, AppNavigationList } from "@navigation/AppNavigator";
import { useAssociationStore } from "@store/associationStore";
import { Spacing } from "@theme/spacing";

import { Icon, Text, TextButton, View } from "@components/ui/";

type DeliveryRouteProp = RouteProp<AppNavigationList, "DeliveryDetails">;

type DeliveryDetailsProps = {
  route: DeliveryRouteProp;
};

export default function DeliveryDetailsScreen({ route }: DeliveryDetailsProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<AppNavProp>();
  const { associations } = useAssociationStore();

  const delivery = route.params?.delivery as DeliveryType | undefined;

  if (!delivery) {
    return (
      <View style={styles.container}>
        <Text>{t("common.word.back")}</Text>
        <TextButton onPress={() => navigation.goBack()}>
          {t("common.word.back")}
        </TextButton>
      </View>
    );
  }

  const association = associations.find(
    (item) => item.id === delivery.associationId,
  );

  const materialLabels = delivery.material.map((material) => {
    const materialInfo = materials[material as keyof typeof materials];

    return materialInfo?.label ?? material;
  });

  const deliveryDate = delivery.deliveryDate?.date
    ? new Date(delivery.deliveryDate.date).toLocaleDateString()
    : "—";

  const collectedDate = new Date(delivery.updatedAt)
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " - ");

  const deliveryTime = delivery.deliveryDate?.endTime ?? "—";

  const formatValue = (value?: string | number | null) =>
    value === undefined || value === null || value === "" ? "—" : String(value);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.detailsContainer}>
        <DetailSection
          title={t("common.label.materialSelect").replace("Selecione os ", "")}
        >
          {materialLabels.length ? (
            materialLabels.map((material, index) => (
              <Text key={`${material}-${index}`} variant="body">
                {material}
              </Text>
            ))
          ) : (
            <Text variant="body">—</Text>
          )}
        </DetailSection>

        <DetailSection title={t("common.label.quantitySelect")}>
          <Text variant="body">
            {formatValue(delivery.quantity)} {formatValue(delivery.unit)}
          </Text>
        </DetailSection>

        <DetailSection
          title={t("common.label.method").replace(
            "Selecione o método",
            "Método",
          )}
        >
          <Text variant="body">
            {t(`delivery.${delivery.method}`).replace("Selecione a ", "")}
          </Text>
        </DetailSection>

        <DetailSection
          title={t("common.label.association").replace("Selecione a ", "")}
        >
          <Text variant="body">{association?.name ?? "—"}</Text>
        </DetailSection>

        <DetailSection title={t("common.label.street")}>
          <Text variant="body">
            {`${delivery.address.street}, ${delivery.address.number} - ${delivery.address.city}, ${delivery.address.state}`}
            {` ${delivery.address.zipCode}`}
          </Text>
        </DetailSection>

        <DetailSection title="Data do Agendamento">
          <View style={styles.dateRow}>
            <Icon name="CalendarDays" size={18} color="icon" />
            <Text variant="body">
              {deliveryDate} - {deliveryTime}
            </Text>
          </View>
        </DetailSection>

        {delivery.status === "collected" || delivery.status === "cancelled" ? (
          <DetailSection
            title={`Data ${delivery.status === "collected" ? "da coleta" : "do cancelamento"}`}
          >
            <View style={styles.dateRow}>
              <Icon name="CalendarDays" size={18} color="icon" />
              <Text variant="body">{collectedDate}</Text>
            </View>
          </DetailSection>
        ) : null}

        <DetailSection title="Atualizado por">
          <Text variant="body">
            {delivery.userId === delivery.updatedBy ? "Usuário" : "Associação"}
          </Text>
        </DetailSection>

        <DetailSection title="Status">
          <Text variant="body">{t(`common.word.${delivery.status}`)}</Text>
        </DetailSection>

        {delivery.points ? (
          <DetailSection title="Pontos recebidos">
            <Text color="yellow" variant="body">{`+ ${delivery.points}`}</Text>
          </DetailSection>
        ) : null}
      </View>
    </ScrollView>
  );
}

type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <View style={styles.section}>
      <Text variant="bodySmall" color="text" style={styles.label}>
        {title}
      </Text>

      <View style={styles.valueContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  subtitle: {
    marginBottom: Spacing.lg,
  },
  detailsContainer: {
    gap: Spacing.md,
  },
  section: {
    gap: Spacing.xs,
  },
  label: {
    opacity: 0.7,
  },
  valueContainer: {
    gap: Spacing.xs,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  backButton: {
    marginTop: Spacing.lg,
    width: "100%",
    alignItems: "center",
  },
});
