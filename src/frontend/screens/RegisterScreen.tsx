import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Icon,
  RadioSelect,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "@components/ui";
import { textRoles, UserRole } from "@constants/common";
import { register } from "@frontend-services/auth.service";
import { NavigationProp } from "@frontend-types/navigation.type";
import { handleErrorMessage, showToast } from "@frontend-utils/common.util";
import { isValidCPF } from "@frontend-utils/userValidation.util";
import { Colors, Radius, Spacing } from "@theme/index";

type RegisterFormData = {
  name: string;
  document: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
  role: UserRole;
};

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      document: "",
      email: "",
      password: "",
      role: Object.keys(textRoles)[0] as UserRole,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      await register({
        id: "",
        name: data.name.trim(),
        cpfOrCnpj: data.document,
        email: data.email.trim().toLowerCase(),
        password: data.password,
        role: [data.role],
        address: "",
        points: data.role === "CITIZEN" ? 0 : undefined,
        currentRole: data.role,
      });

      setLoading(false);

      navigation.navigate("Login");
    } catch (error) {
      showToast(
        "error",
        t("error.title.register"),
        (handleErrorMessage(error) || error) as string,
      );
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            backgroundColor="componentBackground"
            onPress={() => navigation.goBack()}
          >
            <Icon name="ArrowLeft" size={Spacing.lg} color="primary" />
          </TouchableOpacity>

          <Text variant="h2" style={styles.headerTitle}>
            {t("register.title")}
          </Text>
        </View>

        {/* Profile picture */}
        <TouchableOpacity
          style={styles.profileCard}
          backgroundColor="surface"
          onPress={() => {
            // Profile image will be implemented later.
          }}
        >
          <View
            style={styles.profileIconContainer}
            background="componentBackground"
          >
            <Icon name="Camera" size={Spacing.xl} color="primary" />
          </View>

          <View style={styles.profileTextContainer} background="transparent">
            <Text variant="bodySemiBold">{t("register.profilePhoto")}</Text>

            <Text variant="bodySmall" color="textSecondary">
              {t("common.word.optional")}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Name */}
          <Controller
            control={control}
            name="name"
            rules={{
              required: t("error.required.name"),
              minLength: {
                value: 3,
                message: t("error.format.minLengthName"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t("common.label.fullName")}
                icon="User"
                placeholder="João Silva Magri"
                value={value}
                required
                iconColor="icon"
                errorMessage={errors.name?.message}
                onChangeText={(value) => {
                  onChange(value);
                  clearErrors("name");
                }}
              />
            )}
          />

          {/* Document */}
          <Controller
            control={control}
            name="document"
            rules={{
              required: t("error.required.document"),
              validate: (value) => {
                if (!isValidCPF(value)) {
                  return t("error.format.document");
                }
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t("common.label.document")}
                icon="IdCard"
                keyboardType="numeric"
                value={value}
                required
                iconColor="icon"
                placeholder={t("common.placeholder.document")}
                errorMessage={errors.document?.message}
                onChangeText={(value) => {
                  const document = value.replace(/\D/g, "").slice(0, 11);

                  onChange(document);
                  clearErrors("document");
                }}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: t("error.required.email"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("error.format.email"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t("common.label.email")}
                icon="Mail"
                keyboardType="email-address"
                placeholder="João.silva@gmail.com"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                required
                iconColor="icon"
                errorMessage={errors.email?.message}
                onChangeText={(value) => {
                  onChange(value);
                  clearErrors("email");
                }}
              />
            )}
          />

          {/* Password */}
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
                icon="LockKeyhole"
                placeholder="••••••••"
                secureteIcon
                value={value}
                required
                iconColor="icon"
                errorMessage={errors.password?.message}
                //   helperText={t("register.minimumPassword")}
                onChangeText={(value) => {
                  onChange(value);
                  clearErrors("password");
                }}
              />
            )}
          />

          {/* Role */}
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <RadioSelect
                options={Object.entries(textRoles).map((role) => ({
                  value: role[0],
                  label: role[1],
                }))}
                onChange={onChange}
                selected={value}
              />
            )}
          />
        </View>

        {/* Terms */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.termsContainer}
            backgroundColor="componentBackground"
            onPress={() => setAcceptedTerms((current) => !current)}
          >
            <View
              style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}
              background={acceptedTerms ? "primary" : "transparent"}
            >
              {acceptedTerms && <Icon name="Check" size={Spacing.md} />}
            </View>

            <Text style={styles.termsText} color="textSecondary">
              {t("register.agreement")}{" "}
              <Text style={styles.termsLink} color="primary">
                {t("common.terms")}
              </Text>{" "}
              {t("common.word.and")}{" "}
              <Text style={styles.termsLink} color="primary">
                {t("common.policies")}
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: !acceptedTerms
                  ? Colors.light.textSecondary
                  : Colors.light.primary,
              },
            ]}
            disabled={!acceptedTerms}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText} color="surface">
              {t("register.title")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: Spacing.huge,
    height: "100%",
  },

  header: {
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.xxl,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },

  backButton: {
    width: Spacing.huge,
    height: Spacing.huge,
    borderRadius: Radius.round,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },

  headerTitle: {
    fontSize: 20,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: Spacing.xxl,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  profileIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },

  profileTextContainer: {
    gap: Spacing.xs,
  },

  form: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
  },

  footer: {
    marginTop: Spacing.xxxl,
    paddingBottom: Spacing.huge,
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: Spacing.xxl,
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
    marginTop: 2,
  },

  checkboxChecked: {
    borderColor: Colors.light.primary,
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },

  termsLink: {
    fontWeight: "700",
  },

  button: {
    marginHorizontal: Spacing.xxl,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.xxl,
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
