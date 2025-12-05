import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// === Animation Variants ===
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

// === Initial State ===
const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // === Handle Submit ===
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
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
      {/* === Header === */}
      <motion.div className="text-center" variants={itemVariants}>
        <motion.h1
          className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Create new account
        </motion.h1>

        <p className="mt-3 text-gray-400 text-sm">
          Already have an account?
          <Link
            className="ml-2 font-semibold text-cyan-400 hover:text-blue-500 transition-all duration-300 hover:drop-shadow-[0_0_5px_rgb(0,200,255)]"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </motion.div>

      {/* === Form Section === */}
      <motion.div variants={itemVariants}>
        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={
            
            <motion.button
  type="submit"
  className="relative w-full px-8 py-3 font-semibold text-white rounded-lg overflow-hidden 
             bg-gradient-to-r from-neutral-900 via-black to-neutral-900 
             border border-gray-700 shadow-lg transition-all duration-500"
  whileHover={{
    scale: 1.05,
    boxShadow: "0px 0px 25px rgba(255, 255, 255, 0.15)",
  }}
  whileTap={{ scale: 0.96 }}
>
  {/* Moving glossy shine */}
  <motion.span
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
    animate={{ x: ["-150%", "150%"] }}
    transition={{
      duration: 2.2,
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

export default AuthRegister;
