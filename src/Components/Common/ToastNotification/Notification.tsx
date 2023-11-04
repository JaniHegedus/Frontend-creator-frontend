import {ToastNotification} from "@/Components/Common/ToastNotification/ToastNotification";

export const NotifyMessage = (
  type?: "success" | "warning" | "error",
  label?: string,
  text?: string
) => {
  ToastNotification({
    type: type ? type : "default",
    label: label,
    text: text,
  });
};
