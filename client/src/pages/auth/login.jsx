import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// === Animation Variants ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });

        const user = data.payload.user;
        const token = data.payload.token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        if (user.role === "admin") {
          window.location.href = "/admin";
        }
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-md space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* === Header Section === */}
      <motion.div className="text-center" variants={itemVariants}>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Sign in to your account
        </motion.h1>

        <p className="mt-3 text-gray-400 text-sm">
          Don’t have an account?
          <Link
            className="ml-2 font-semibold text-cyan-400 hover:text-blue-500 transition-all duration-300 hover:drop-shadow-[0_0_5px_rgb(0,200,255)]"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </motion.div>

      {/* === Form Section === */}
      <motion.div variants={itemVariants}>
        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={
            <motion.button
              type="submit"
              className="relative w-full px-8 py-3 font-semibold text-white rounded-lg overflow-hidden
                         bg-gradient-to-r from-gray-900 via-black to-gray-900 
                         border border-gray-700 shadow-md transition-all duration-500 mt-6"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 25px rgba(0, 200, 255, 0.4)",
                borderColor: "rgba(0, 200, 255, 0.4)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Moving light sweep */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative z-10 tracking-wide">Sign In</span>
            </motion.button>
          }
        />
      </motion.div>
    </motion.div>
  );
}

export default AuthLogin;
