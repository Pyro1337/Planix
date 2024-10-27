import { toast } from "react-toastify";

export const SuccessToast = ({
  message = "Solicitud realizada con éxito!",
}) => {
  toast.success(message, {
    hideProgressBar: false,
  });
};
