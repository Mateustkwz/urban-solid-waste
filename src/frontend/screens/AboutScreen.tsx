import React from "react";

import { Text } from "@components/ui";
import { aboutText } from "@constants/common";

export default function AboutScreen() {
  return (
    <Text
      variant="bodySemiBold"
      style={{
        paddingVertical: 32,
        paddingHorizontal: 32,
        lineHeight: 32,
        textAlign: "justify",
      }}
    >
      {aboutText}
    </Text>
  );
}
