import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

import {
  Icon,
  LinearGradient,
  Text,
  TextButton,
  TextInput,
  TouchableOpacity,
  View,
} from "@components/ui";
import { login } from "@frontend-services/user.service";
import { NavigationProp } from "@frontend-types/navigation.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { isValidCNPJ, isValidCPF } from "@frontend-utils/userValidation.util";
import { useAuthStore } from "@store/authStore";
import { Colors, Radius, Spacing } from "@theme/index";

type LoginFormData = {
  document: string;
  password: string;
};

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      document: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await login(data.document, data.password);

      if (!response.currentRole && response.role.length === 1) {
        response.currentRole = response.role[0];
      }

      setLoading(false);

      authStore.login(response);
    } catch (error) {
      showToast("error", t("error.title.login"), handleErrorMessage(error));
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const isValidDocument = (document: string) => {
    if (!isValidCNPJ(document) && !isValidCPF(document)) {
      return t("error.format.document");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={["primary", "primaryLight"]}
      >
        <View background="transparent" style={styles.dflex}>
          <View background="transparent" style={styles.iconHeaderContainer}>
            <View style={styles.iconHeaderbackground} />
            <Icon
              name="Recycle"
              size={Spacing.xxl}
              color="surface"
              style={styles.iconHeader}
            />
          </View>
          <Text variant="h1" style={styles.title} color="surface">
            {t("common.appName")}
          </Text>
        </View>
        <Text style={styles.subtitle} color="surface">
          {t("login.welcomeBack")}
        </Text>
      </LinearGradient>

      <View style={styles.form}>
        <Text variant="h1" style={styles.formTitle}>
          {t("login.title")}
        </Text>

        <Controller
          control={control}
          name="document"
          rules={{
            required: t("error.required.document"),
            validate: isValidDocument,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("common.label.document")}
              icon="IdCard"
              placeholder={t("common.placeholder.document")}
              keyboardType="numeric"
              errorMessage={errors.document?.message}
              value={value}
              onChangeText={(value) => {
                onChange(value.replace(/\D/g, ""));
                clearErrors("document");
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: t("error.required.password"),
            minLength: {
              value: 6,
              message: t("error.format.minLengthPassword"),
            },
            maxLength: {
              value: 32,
              message: t("error.format.maxLengthPassword"),
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t("common.label.password")}
              icon="UserKey"
              placeholder="••••••••"
              secureteIcon
              value={value}
              errorMessage={errors.password?.message}
              onChangeText={(value) => {
                onChange(value);
                clearErrors("password");
              }}
            />
          )}
        />

        <TextButton fontWeight="700" style={styles.forgotPassword}>
          {t("login.forgotPassword")}
        </TextButton>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          isLoading={loading}
        >
          <Text style={styles.buttonText} color="surface">
            {t("login.login")}
          </Text>
        </TouchableOpacity>

        <View style={styles.lineContainer}>
          <View style={styles.line} background="border" />
          <Text
            variant="bodySmall"
            color="textSecondary"
            style={{ fontWeight: 700 }}
          >
            {t("common.word.or")}
          </Text>
          <View style={styles.line} background="border" />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.createAccount]}
          backgroundColor="transparent"
          onPress={() => handleRegister()}
        >
          <Text style={styles.buttonText} color="primary">
            {t("login.signup")}
          </Text>
        </TouchableOpacity>

        <Text
          style={[styles.disclaimer, styles.disclaimerContainer]}
          color="textSecondary"
        >
          {t("login.textAgreement")}{" "}
          <Text
            style={[styles.disclaimer, styles.termsAndPolicies]}
            color="primary"
          >
            {t("common.terms")}
          </Text>{" "}
          <Text style={styles.disclaimer}> e </Text>
          <Text
            style={[styles.disclaimer, styles.termsAndPolicies]}
            color="primary"
          >
            {t("common.policies")}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dflex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: Spacing.xxl, // antes: 40
    paddingHorizontal: Spacing.xxl, // antes: 20
    paddingTop: Spacing.big * 2.5,
  },
  iconHeaderContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconHeaderbackground: {
    height: Spacing.huge,
    width: Spacing.huge,
    borderRadius: Radius.lg,
    opacity: 0.2,
  },
  iconHeader: {
    position: "absolute",
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    marginTop: Spacing.sm, // antes: 8
  },
  form: {
    flex: 1,
    padding: Spacing.xxl, // antes: 20
  },
  formTitle: {
    fontSize: 28,
    marginBottom: Spacing.xl,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: Spacing.xxl, // antes: 24
  },
  button: {
    padding: Spacing.md, // antes: 14
    borderRadius: Radius.xxl, // antes: 24
    alignItems: "center",
    marginBottom: Spacing.xxl, // antes: 20
  },
  lineContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: Spacing.lg,
    marginBottom: Spacing.xxl, // antes: 20
  },
  line: {
    height: 1,
    flex: 1,
  },
  createAccount: {
    borderColor: Colors.light.primary,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  termsAndPolicies: {
    fontWeight: 700,
  },
  disclaimerContainer: {
    maxWidth: 280,
    alignSelf: "center",
    marginTop: "auto",
    paddingBottom: Spacing.xxl,
  },
  disclaimer: {
    fontSize: 14,
    textAlign: "center",
  },
});
