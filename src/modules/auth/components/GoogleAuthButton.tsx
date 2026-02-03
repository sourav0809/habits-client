import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";
import { NAVIGATION_PATHS } from "@/constants";
import { toast } from "sonner";
import { useGoogleLogin } from "../hooks";
import { getApiErrorMessage } from "@/utils";

export function GoogleAuthButton() {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin();

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error("No credential received from Google");
      return;
    }
    try {
      await googleLogin.mutateAsync({ idToken });
      toast.success("Signed in with Google successfully");
      navigate(NAVIGATION_PATHS.DASHBOARD, { replace: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : getApiErrorMessage(error) || "Failed to sign in with Google";
      toast.error(errorMessage);
    }
  };

  const handleError = () => {
    toast.error("Google Sign-In was cancelled or failed");
  };

  return (
    <div className="relative w-full [&_.google-login-wrapper]:w-full! [&_iframe]:min-w-full!">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="pill"
        width="100%"
        containerProps={{
          className: "google-login-wrapper flex justify-center",
        }}
        useOneTap={false}
      />
      {googleLogin.isPending && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/80 z-10">
          <Loader2 className="size-5 animate-spin" />
        </div>
      )}
    </div>
  );
}
