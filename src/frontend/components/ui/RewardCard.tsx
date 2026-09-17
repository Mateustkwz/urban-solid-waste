import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { Reward } from "@frontend-types/reward.type";

import { Text, View } from ".";

type RewardCardProps = {
  reward: Reward;
};

export const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  return (
    <TouchableOpacity
      style={[styles.card, !reward.available && styles.cardUnavailable]}
      disabled={!reward.available}
    >
      <Image source={{ uri: reward.img }} style={styles.image} />

      <View style={styles.info}>
        <Text variant="body" style={styles.title}>
          {reward.title}
        </Text>
        <Text numberOfLines={3} variant="bodySmall" style={styles.description}>
          {reward.description}
        </Text>
        <View style={styles.bottomContainer}>
          <Text variant="bodySmall" style={styles.points}>
            {reward.requiredPoints} pts
          </Text>
          {!reward.available && (
            <Text color="red" style={styles.badge}>
              Indisponível
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: 186,
    overflow: "hidden",
    borderWidth: 0.1,
  },
  cardUnavailable: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: 92,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 8,
    marginTop: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    paddingHorizontal: 8,
    height: 64,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1565C0",
    paddingHorizontal: 8,
  },
  badge: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
  },
});
