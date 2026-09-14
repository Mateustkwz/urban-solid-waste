import React from "react";
import { ViewProps } from "react-native";

import { Text, View } from "../ui/";
import { BaseModal } from "./BaseModal";

type TextModalProps = ViewProps & {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

export const TextModal = ({
  visible,
  onClose,
  title,
  description,
  children,
  style,
}: TextModalProps) => (
  <BaseModal style={style} visible={visible} onClose={onClose}>
    <View style={style}>
      <Text variant="h1">{title}</Text>
      <Text variant="body">{description}</Text>
    </View>
    {children}
  </BaseModal>
);
