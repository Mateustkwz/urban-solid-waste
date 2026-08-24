import { Button, Text } from "../ui/";
import { BaseModal } from "./BaseModal";

type TextModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
};

export const TextModal = ({
  visible,
  onClose,
  title,
  description,
}: TextModalProps) => (
  <BaseModal visible={visible} onClose={onClose}>
    <Text variant="h1">{title}</Text>
    <Text variant="body">{description}</Text>
    <Button text="Fechar" onPress={onClose} />
  </BaseModal>
);
