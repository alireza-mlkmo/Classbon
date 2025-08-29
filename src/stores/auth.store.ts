import { UserSession } from "@/types/auth.types";
import { create } from "zustand";


type AuthStatus = "loading" | "authenicated" | "unauthenicated";

interface SessionState {
  session: UserSession | null;
  status: AuthStatus;
  updateSession: () => void;
  clearSession: () => void;
}

async function fetchSessionFromApi() {
  try {
    const response = await fetch("../api/auth/session");

    if (response.ok) {
      const data = await response.json();

      return data
        ? { session: data, status: "authenicated" as AuthStatus }
        : { session: null, status: "unauthenicated" as AuthStatus };
    } else {
      return { session: null, status: "unauthenicated" as AuthStatus };
    }
  } catch (error) {
    console.error(error);
    return { session: null, status: "unauthenicated" as AuthStatus };
  }
}

export const useSessionStore = create<SessionState>((set) => ({
    session: null,
    status: 'loading' as AuthStatus,

    clearSession: () => set({
        session: null,
        status: 'unauthenticated' as AuthStatus
    }),
    updateSession: async () => {
       const { session, status } = await fetchSessionFromApi();
       set({session, status})
    },
    
}));

if (typeof window !== "undefined") {
  useSessionStore.getState().updateSession();
}