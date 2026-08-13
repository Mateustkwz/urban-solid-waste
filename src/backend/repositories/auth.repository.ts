import * as SecureStore from "expo-secure-store";

import { Session } from "@models/auth.model";

const SESSION_KEY = "sessions";

const getSessions = async (): Promise<Session[]> => {
  const data = await SecureStore.getItemAsync(SESSION_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data) as Session[];
};

const saveSessions = async (sessions: Session[]): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(sessions));
};

const createSession = async (userId: string): Promise<Session> => {
  const sessions = await getSessions();

  const session: Session = {
    token: crypto.randomUUID(),
    userId,
    expiration: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };

  sessions.push(session);

  await saveSessions(sessions);

  return session;
};

const getSessionByUserId = async (userId: string): Promise<Session | null> => {
  const sessions = await getSessions();

  return sessions.find((session) => session.userId === userId) ?? null;
};

const deleteSession = async (userId: string): Promise<void> => {
  const sessions = await getSessions();

  const remainingSessions = sessions.filter(
    (session) => session.userId !== userId,
  );

  await saveSessions(remainingSessions);
};

export default {
  createSession,
  deleteSession,
  getSessionByUserId,
  getSessions,
  saveSessions,
};
