"use client";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/utils/Context";
import { toast } from "sonner";

// Components
const GoogleButton = ({ onClick, isLoading, isDarkMode }) => (
  <motion.button 
    onClick={onClick}
    disabled={isLoading}
    className={`w-full ${isDarkMode 
      ? 'bg-[#1a1a2e] text-white border-[#2a2a3e] shadow-[5px_5px_10px_#151525,-5px_-5px_10px_#1f1f37]' 
      : 'bg-[#f0f0f5] text-black border-[#e0e0e5] shadow-[5px_5px_10px_#d1d1d6,-5px_-5px_10px_#ffffff]'} 
      rounded-xl p-4 flex items-center justify-center space-x-3 backdrop-blur-sm transition-all duration-300 border`}
    whileHover={{ scale: 1.02, boxShadow: isDarkMode 
      ? '3px 3px 6px #151525, -3px -3px 6px #1f1f37, inset 1px 1px 1px #2a2a3e' 
      : '3px 3px 6px #d1d1d6, -3px -3px 6px #ffffff, inset 1px 1px 1px #e0e0e5' }}
    whileTap={{ scale: 0.98, boxShadow: isDarkMode 
      ? 'inset 3px 3px 6px #151525, inset -3px -3px 6px #1f1f37' 
      : 'inset 3px 3px 6px #d1d1d6, inset -3px -3px 6px #ffffff' }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <img src="/google.png" alt="Google" className="w-8 h-6" />
    <span style={{fontFamily: "var(--font-space-grotesk)", fontWeight: 500}}>Continue with Google</span>
  </motion.button>
);

const InputField = ({ type, id, value, onChange, label, isLoading, showPasswordToggle, onTogglePassword, showPassword, isDarkMode }) => (
  <div>
    <label htmlFor={id} className={`block text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-gray-700'} mb-2`} style={{fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.02em"}}>{label}</label>
    <div className="relative">
      <motion.input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full ${isDarkMode 
          ? 'bg-[#1a1a2e] text-white border-[#2a2a3e] shadow-[inset_3px_3px_6px_#151525,inset_-3px_-3px_6px_#1f1f37]' 
          : 'bg-[#f0f0f5] text-black border-[#e0e0e5] shadow-[inset_3px_3px_6px_#d1d1d6,inset_-3px_-3px_6px_#ffffff]'} 
          border rounded-xl p-4 focus:outline-none transition-all duration-300`}
        required
        disabled={isLoading}
        whileFocus={{ boxShadow: isDarkMode 
          ? 'inset 2px 2px 4px #151525, inset -2px -2px 4px #1f1f37, 0 0 0 2px rgba(99, 102, 241, 0.4)' 
          : 'inset 2px 2px 4px #d1d1d6, inset -2px -2px 4px #ffffff, 0 0 0 2px rgba(99, 102, 241, 0.4)' }}
        style={{fontFamily: "var(--font-space-grotesk)"}}
      />
      {showPasswordToggle && (
        <motion.button
          type="button"
          onClick={onTogglePassword}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/70 hover:text-white/90' : 'text-gray-500 hover:text-gray-700'}`}
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
    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 font-medium transition-all duration-300 shadow-[5px_5px_15px_rgba(79,70,229,0.3)]"
    whileHover={{ 
      scale: 1.03, 
      boxShadow: "7px 7px 20px rgba(79,70,229,0.4)",
      background: "linear-gradient(to right, #4f46e5, #9333ea)" 
    }}
    whileTap={{ 
      scale: 0.97, 
      boxShadow: "3px 3px 10px rgba(79,70,229,0.3)",
      background: "linear-gradient(to right, #4338ca, #7e22ce)" 
    }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span style={{fontFamily: "var(--font-space-grotesk)", fontWeight: 500}}>Processing...</span>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <span style={{fontFamily: "var(--font-space-grotesk)", fontWeight: 500}}>{text}</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.div>
      </div>
    )}
  </motion.button>
);

export default function SignInComponent() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (!isLoaded) {
    return null;
  }
  
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
        toast.success("Successfully signed in!");
        router.push("/dashboard");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      const errorMessage = err?.errors?.[0]?.message || "An error occurred during sign in";
      setError(errorMessage);
      
      if (errorMessage.includes("already exists")) {
        toast.error("This email is already registered. Please sign in instead.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
      toast.success("Redirecting to Google sign in...");
    } catch (err) {
      console.error("Google sign-in error:", err);
      const errorMessage = err?.errors?.[0]?.message || "Failed to sign in with Google";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={`space-y-8 p-8 rounded-2xl ${isDarkMode 
        ? 'bg-[#1a1a2e] shadow-[10px_10px_30px_#151525,-10px_-10px_30px_#1f1f37]' 
        : 'bg-[#f0f0f5] shadow-[10px_10px_30px_#d1d1d6,-10px_-10px_30px_#ffffff]'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="space-y-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} isDarkMode={isDarkMode} />
      </motion.div>

      <motion.div 
        className={`w-full h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <InputField
          type="email"
          id="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
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
            className={`${isDarkMode 
              ? 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]' 
              : 'bg-red-100 border-red-200 text-red-600 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]'} 
              border px-4 py-3 rounded-xl`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p style={{fontFamily: "var(--font-space-grotesk)"}}>{error}</p>
          </motion.div>
        )}

        <SubmitButton isLoading={isLoading} text="Sign In" />
      </motion.form>
    </motion.div>
  );
}