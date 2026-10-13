import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Erro ao limpar dados da Store:", error);
  }
};
