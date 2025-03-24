"use client";

import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Divider } from "@/app/components/Divider";

// Components
const GoogleButton = ({ onClick, isLoading }) => (
  <button 
    onClick={onClick}
    disabled={isLoading}
    className="w-full bg-white/5 hover:bg-white/10 text-white rounded-xl p-3 flex items-center justify-center space-x-3 backdrop-blur-sm transition-all duration-200 hover:scale-105"
  >
    <img src="/google.png" alt="Google" className="w-8 h-6" />
    <span>Continue with Google</span>
  </button>
);



const InputField = ({ type, id, value, onChange, label, isLoading, showPasswordToggle, onTogglePassword, showPassword }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">{label}</label>
    <div className="relative">
      <input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-white/5 text-white border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        required
        disabled={isLoading}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  </div>
);

const SubmitButton = ({ isLoading, text }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span>Processing...</span>
      </div>
    ) : (
      text
    )}
  </button>
);

export default function SignUpComponent() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  if (!isLoaded) {
    return null;
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.update({
        unsafeMetadata: { name }
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err?.errors?.[0]?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Google sign-up error:", err);
      setError(err?.errors?.[0]?.message || "Failed to sign up with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">


      {!pendingVerification ? (
        <>
          <div className="space-y-4 mb-6">
            <GoogleButton onClick={handleGoogleSignUp} isLoading={isLoading} />
          </div>

          <Divider />

          <form onSubmit={handleSignUp} className="space-y-6">
            <InputField
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              isLoading={isLoading}
            />
            
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              isLoading={isLoading}
            />

            <InputField
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              isLoading={isLoading}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                <p>{error}</p>
              </div>
            )}

            <SubmitButton isLoading={isLoading} text="Sign Up" />
          </form>
        </>
      ) : (
        <form onSubmit={handleVerification} className="space-y-6">
          <div>
            <p className="text-white mb-4">
              We've sent a verification code to your email. Please enter it below.
            </p>
            <InputField
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              label="Verification Code"
              isLoading={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
              <p>{error}</p>
            </div>
          )}

          <SubmitButton isLoading={isLoading} text="Verify Email" />
        </form>
      )}
    </div>
  );
}