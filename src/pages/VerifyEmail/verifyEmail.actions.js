import axiosInstance from "../../utils/AxiosInstance";
import toast from "react-hot-toast";

export const sendOTP = async (email) => {
  try {
    await axiosInstance.post("/auth/send", { email });
    toast.success("OTP sent to your email.");
  } catch (error) {
    console.error("Error sending OTP:", error);
    toast.error("Failed to send OTP. Please try again.");
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/auth/verify-email", { email, otp });
    if (response.data.success) {
      localStorage.setItem("isVerified", true); // Store verified state
    }
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    toast.error("Invalid OTP. Please try again.");
    throw error;
  }
};

export const resendOTP = async (email) => {
  try {
    await axiosInstance.post("/auth/resend-otp", { email });
    toast.success("OTP resent successfully.");
  } catch (error) {
    console.error("Error resending OTP:", error);
    toast.error("Failed to resend OTP. Please try again.");
    throw error;
  }
};
