import { Notification } from "@/types/notifiaction.interface";
import { generateId } from "@/utils/string";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type NotificationState = {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>()(
  devtools((set, get) => ({
    notifications: [],

    showNotification: (notification) => {
      const id = generateId();
      set((state) => ({
        notifications: [...state.notifications, { id, ...notification }],
      }));

      setTimeout(() => {
        get().dismissNotification(id);
      }, 5000);
    },

    dismissNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((notif) => notif.id !== id),
      }));
    },
  }))
);

export const showNotification = (notifications: Omit<Notification, "id">[]) => {
  notifications.forEach((notif) =>
    useNotificationStore.getState().showNotification(notif)
  );
};
