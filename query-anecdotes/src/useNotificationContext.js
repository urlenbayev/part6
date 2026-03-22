import { useContext } from "react";
import NotificationContext from "./NotificationContext";

export const useNotificationValue = () => {
  const context = useContext(NotificationContext);
  return context.notification;
};

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext);
  return context.notificationDispatch;
};
