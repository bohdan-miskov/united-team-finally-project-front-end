import { useEffect } from "react";
import toast from "react-hot-toast";

const toastStyleOptions = {
  background: "#1e1e2f",
  color: "#fff",
  border: "1px solid #22c55e",
  padding: "12px 16px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "500",
  boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
};

const toastIconThemeOptions = {
  primary: "#22c55e",
  secondary: "#fff",
};

export default function SuccessToastMessage({ children }) {
  useEffect(() => {
    if (!children) return;

    toast.success(String(children), {
      duration: 4000,
      style: toastStyleOptions,
      iconTheme: toastIconThemeOptions,
    });
  }, [children]);

  return null;
}
