"use client";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Divider } from "@/app/components/Divider";

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

const SubmitButton = ({ isLoading }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span>Signing in...</span>
      </div>
    ) : (
      "Sign In"
    )}
  </button>
);

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded) return null;
  
  if (user?.id) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors?.[0]?.message || "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/dashboard`,
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err?.errors?.[0]?.message || "Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      
      <div className="space-y-4 mb-6">
        <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />
      </div>

      <Divider />

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          type="email"
          id="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
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

        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
}