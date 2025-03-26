"use client";

import { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/utils/Context";
import { toast } from "sonner";

// Components
const GoogleButton = ({ onClick, isLoading, isDarkMode }) => (
  <motion.button 
    onClick={onClick}
    disabled={isLoading}
    className={`w-full ${
      isDarkMode 
        ? 'bg-gradient-to-br from-white/10 to-white/5 text-white border-white/10' 
        : 'bg-gradient-to-br from-white to-gray-100 text-gray-800 border-gray-200'
    } rounded-xl p-4 flex items-center justify-center space-x-3 backdrop-blur-sm transition-all duration-300 
    ${
      isDarkMode 
        ? 'border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.3),inset_1px_1px_1px_rgba(255,255,255,0.1)]' 
        : 'border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.05),inset_1px_1px_1px_rgba(255,255,255,0.8)]'
    } hover:shadow-lg`}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <img src="/google.png" alt="Google" className="w-8 h-6" />
    <span style={{fontFamily: "var(--font-space-grotesk)"}} className="font-medium">Continue with Google</span>
  </motion.button>
);

const InputField = ({ type, id, value, onChange, label, isLoading, showPasswordToggle, onTogglePassword, showPassword, isDarkMode }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-gray-700'} mb-2`} style={{fontFamily: "var(--font-space-grotesk)"}}>{label}</label>
    <div className="relative">
      <motion.input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full ${
          isDarkMode 
            ? 'bg-gradient-to-br from-white/10 to-white/5 text-white border-white/10' 
            : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 border-gray-200'
        } border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
          isDarkMode 
            ? 'shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]' 
            : 'shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]'
        }`}
        required
        disabled={isLoading}
        whileFocus={{ scale: 1.01 }}
        style={{fontFamily: "var(--font-space-grotesk)"}}
      />
      {showPasswordToggle && (
        <motion.button
          type="button"
          onClick={onTogglePassword}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/60 hover:text-white/90' : 'text-gray-500 hover:text-gray-700'}`}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </motion.button>
      )}
    </div>
  </div>
);

const SubmitButton = ({ isLoading, text }) => (
  <motion.button
    type="submit"
    disabled={isLoading}
    className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white rounded-xl p-4 font-medium transition-all duration-300 shadow-[0_4px_15px_rgba(79,70,229,0.4),inset_1px_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.6),inset_1px_1px_1px_rgba(255,255,255,0.3)]"
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span style={{fontFamily: "var(--font-space-grotesk)"}} className="font-medium">Processing...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span style={{fontFamily: "var(--font-space-grotesk)"}} className="font-medium">{text}</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.div>
      </div>
    )}
  </motion.button>
);

export default function SignUpComponent() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
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
      toast.success("Verification email sent successfully!");
    } catch (err) {
      console.error("Sign-up error:", err);
      const errorMessage = err?.errors?.[0]?.message || "An unexpected error occurred.";
      
      if (errorMessage.includes("already exists")) {
        toast.error("This email is already registered. Please sign in instead.");
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      } else {
        toast.error(errorMessage);
      }
      setError(errorMessage);
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
        toast.success("Email verified successfully! Redirecting...");
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      const errorMessage = err?.errors?.[0]?.message || "Verification failed";
      toast.error(errorMessage);
      setError(errorMessage);
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
      const errorMessage = err?.errors?.[0]?.message || "Failed to sign up with Google";
      toast.error(errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={`space-y-8 ${isDarkMode ? 'bg-black/30' : 'bg-white/70'} p-6 rounded-2xl ${
        isDarkMode 
          ? 'shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_1px_1px_1px_rgba(255,255,255,0.1)]' 
          : 'shadow-[0_10px_30px_rgba(0,0,0,0.06),inset_1px_1px_1px_rgba(255,255,255,0.9)]'
      } backdrop-filter backdrop-blur-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!pendingVerification ? (
        <>
          <motion.div 
            className="space-y-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GoogleButton onClick={handleGoogleSignUp} isLoading={isLoading} isDarkMode={isDarkMode} />
          </motion.div>

          <motion.div 
            className={`flex items-center my-6 ${isDarkMode ? 'text-white/50' : 'text-gray-400'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <div className={`flex-grow h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
            <span className="px-3 text-sm" style={{fontFamily: "var(--font-space-grotesk)"}}>or continue with email</span>
            <div className={`flex-grow h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
          </motion.div>

          <motion.form 
            onSubmit={handleSignUp} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <InputField
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Full Name"
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
            
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              isLoading={isLoading}
              isDarkMode={isDarkMode}
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
              isDarkMode={isDarkMode}
            />

            {error && (
              <motion.div 
                className={`bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl ${
                  isDarkMode 
                    ? 'shadow-[0_4px_15px_rgba(239,68,68,0.2)]' 
                    : 'shadow-[0_4px_15px_rgba(239,68,68,0.1)]'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{fontFamily: "var(--font-space-grotesk)"}}>{error}</p>
              </motion.div>
            )}

            <SubmitButton isLoading={isLoading} text="Create Account" />
          </motion.form>
        </>
      ) : (
        <motion.form 
          onSubmit={handleVerification} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'} rounded-xl p-5 border ${
              isDarkMode ? 'border-indigo-800/30' : 'border-indigo-100'
            } ${
              isDarkMode 
                ? 'shadow-[0_4px_15px_rgba(79,70,229,0.2)]' 
                : 'shadow-[0_4px_15px_rgba(79,70,229,0.1)]'
            }`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className={`h-6 w-6 mt-0.5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                  Verification email sent
                </h3>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`} style={{fontFamily: "var(--font-space-grotesk)"}}>
                  We've sent a verification code to your email. Please enter it below to complete your registration.
                </p>
              </div>
            </div>
          </motion.div>
          
          <InputField
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            label="Verification Code"
            isLoading={isLoading}
            isDarkMode={isDarkMode}
          />

          {error && (
            <motion.div 
              className={`bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-xl ${
                isDarkMode 
                  ? 'shadow-[0_4px_15px_rgba(239,68,68,0.2)]' 
                  : 'shadow-[0_4px_15px_rgba(239,68,68,0.1)]'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{fontFamily: "var(--font-space-grotesk)"}}>{error}</p>
            </motion.div>
          )}

          <SubmitButton isLoading={isLoading} text="Verify Email" />
        </motion.form>
      )}
    </motion.div>
  );
}