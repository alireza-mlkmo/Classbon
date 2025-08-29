"use client";

import { ReactNode, useEffect, useState } from "react";
import { IconCheck, IconClose } from "../icons";
import { IconError, IconInfo } from "../icons/indexp";
import { useNotificationStore } from "@/stores/notification.store";
import Progress from "../progress/Progress";
import { NotificationType } from "@/types/notifiaction.interface";
import { NotificationToastProps } from "./notification.types";

const notificationTypes: Record<NotificationType, string> = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  error: "bg-error",
};

const notificationIcons: Record<NotificationType, ReactNode> = {
  success: <IconCheck width={20} height={20} color="white" />,
  info: <IconInfo width={20} height={20} color="white" />,
  warning: <IconInfo width={20} height={20} color="white" />,
  error: <IconError width={20} height={20} color="white" />,
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification: { id, message, type, duration = 10000 },
}) => {
  const dismissNotification = useNotificationStore(
    (state) => state.dismissNotification
  );
  const [progessValue, setProgressValue] = useState<number>(100);
  useEffect(() => {
    const interval = duration / 100;
    const intervalId = setInterval(() => {
      setProgressValue((oldValue) =>
        Math.max(oldValue - 100 / (duration / interval), 0)
      );
    }, interval);
    return () => clearInterval(intervalId);
  }, [duration]);
  return (
    <div className="notification">
      <div className={`notification-icon ${notificationTypes[type]}`}>
        {notificationIcons[type]}
      </div>
      <div className="text-sm font-semibold">{message}</div>
      <button
        className="mr-auto hover:text-white mt-2"
        onClick={() => dismissNotification(id)}
      >
        <IconClose width={20} height={20} />
      </button>
      <Progress
        className="!absolute bottom-1 left-2 right-2 !w-auto"
        size="tiny"
        variant={type}
        value={progessValue}
      />
    </div>
  );
};
