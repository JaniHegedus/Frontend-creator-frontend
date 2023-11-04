import { toast } from "react-toastify";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
interface notifyInterface {
  position?: "top-right" | "bottom-left";
  delay?: number;
  progressBar?: boolean;
  type?: "default" | "success" | "warning" | "error";
  label?: string;
  text?: string;
}

export const ToastNotification = (
    {
  position = "top-right",
  delay = 10000,
  progressBar = false,
  type = "default",
  label,
  text,
    }:
        notifyInterface) =>
{
  const toastButtonBack = {
    default: "text-primary-300 bg-gray-300",
    success: "text-brokenGray-200 bg-gray-600",
    warning: "text-brokenGray-200 bg-warning-300",
    error: "text-brokenGray-200 bg-error-300",
  };

  const toastText = {
    default: "text-black dark:text-white",
    success: "text-black dark:text-white",
    warning: "text-orange",
    error: "text-red",
  };

  const CloseButton = ({ closeToast }: {closeToast:any}) => (
    <div
      onClick={closeToast}
      className={`${toastButtonBack[type]} rounded-full h-6 w-6 flex justify-center items-center md:hover:opacity-70 -mr-2 -mt-1`}
    >
      <div
        className={`flex items-center justify-center text-[10px] text-white p-3`}
      >
        <CloseOutlinedIcon />{" "}
      </div>
    </div>
  );

  const textContainer = () => {
    return (
      <>
        {label && text ? (
          <div className="flex flex-col">
            <h2
              className={`${toastText[type]} font-rubik text-sm font-bold pb-2 leading-4`}
            >
              {label}
            </h2>
            <p
              className={`${toastText[type]} font-noto text-sm font-medium leading-5`}
            >
              {text}
            </p>
          </div>
        ) : label ? (
          <div className="flex flex-col">
            <h2
              className={`${toastText[type]} font-rubik text-sm font-bold leading-4`}
            >
              {label}
            </h2>
          </div>
        ) : text ? (
          <div className="flex flex-col">
            <p className={`${toastText[type]} font-noto text-sm leading-5`}>
              {text}
            </p>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  return toast(textContainer(), {
    className: "!bg-gray-300 dark:!bg-gray-700",
    position: position,
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    type: type,
    closeButton: CloseButton,
  });
};
