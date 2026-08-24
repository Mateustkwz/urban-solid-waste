import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

import { delay } from "@backend-utils/common.util";
import { Session } from "@models/auth.model";

const SESSION_KEY = "sessions";

const getSessions = async (): Promise<Session[]> => {
  const data = await SecureStore.getItemAsync(SESSION_KEY);

  await delay();

  if (!data) {
    return [];
  }

  return JSON.parse(data) as Session[];
};

const saveSessions = async (sessions: Session[]): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(sessions));
  await delay();
};

const createSession = async (userId: string): Promise<Session> => {
  const sessions = await getSessions();
  const session: Session = {
    token: Crypto.randomUUID(),
    userId,
    expiration: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };

  sessions.push(session);

  await saveSessions(sessions);
  await delay();

  return session;
};

const getSessionByUserId = async (userId: string): Promise<Session | null> => {
  const sessions = await getSessions();

  await delay();

  return sessions.find((session) => session.userId === userId) ?? null;
};

const deleteSession = async (userId: string): Promise<void> => {
  const sessions = await getSessions();

  const remainingSessions = sessions.filter(
    (session) => session.userId !== userId,
  );

  await saveSessions(remainingSessions);
  await delay();
};

export default {
  createSession,
  deleteSession,
  getSessionByUserId,
  getSessions,
  saveSessions,
};
