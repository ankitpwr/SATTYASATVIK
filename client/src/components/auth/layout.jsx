import { Outlet } from "react-router-dom";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delay: 0.1, staggerChildren: 0.06 },
  },
};

const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// === Floating Particle Component (Cyan glow) ===
function FloatingParticle({ delay, duration, xStart, size }) {
  return (
    <motion.div
      className="absolute left-0 w-1 h-1 bg-cyan-400/30 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${xStart}%`,
      }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function AuthLayout() {
  const [showIntro, setShowIntro] = useState(true);

  // === Gradient Aura (Mouse follow) ===
  const mouse = {
    x: useSpring(0, { stiffness: 200, damping: 30 }),
    y: useSpring(0, { stiffness: 200, damping: 30 }),
  };

  const introTitleLine1 = "Satya".split("");
  const introTitleLine2 = "Sattvik".split("");
  const loginTitle = "Welcome Back Captain! 👋".split("");

  // === Card sheen state ===
  const [sheenPosition, setSheenPosition] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);

    const handleMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse.x, mouse.y]);

  // === 3D Parallax Card Logic ===
  const cardRef = useRef(null);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    rotateX.set(yPct * -8);
    rotateY.set(xPct * 8);
    setSheenPosition({ x: mouseX, y: mouseY });
  };

  const handleCardMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-black overflow-hidden text-white cursor-none">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <FloatingParticle delay={0} duration={10} xStart={10} size={2} />
        <FloatingParticle delay={2} duration={8} xStart={30} size={1} />
        <FloatingParticle delay={3} duration={12} xStart={50} size={2} />
        <FloatingParticle delay={5} duration={7} xStart={70} size={3} />
        <FloatingParticle delay={7} duration={10} xStart={90} size={1} />
      </div>

      {/* Gradient Aura Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[250px] pointer-events-none z-10"
        style={{
          x: mouse.x,
          y: mouse.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

    
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            className="flex flex-col items-center justify-center text-center z-20 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
          >
            
            <motion.img
  src="/logo.png"
  alt="Logo"
  className="w-32 h-32 mx-auto mb-6 rounded-full shadow-[0_0_25px_rgba(0,200,255,0.5)]"
  initial={{ opacity: 0, y: -20 }}
  animate={{
    opacity: 1,
    y: [0, -10, 0],
    filter: [
      "drop-shadow(0 0 10px rgba(0,255,255,0.6))",
      "drop-shadow(0 0 25px rgba(0,255,255,0.9))",
      "drop-shadow(0 0 10px rgba(0,255,255,0.6))",
    ],
  }}
  transition={{
    opacity: { duration: 1.2 },
    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    filter: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  }}
/>

            {/* Text Animation */}
            <motion.h1
              className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {introTitleLine1.map((char, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
              <span className="text-cyan-400">
                {introTitleLine2.map((char, i) => (
                  <motion.span key={i} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Blinking Cursor */}
              <motion.span
                className="ml-1 text-4xl text-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
              >
                |
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-4 text-gray-400 text-lg max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Welcome to a world of pure, organic, and eco-friendly products.
            </motion.p>
          </motion.div>
        ) : (
          /* === LOGIN / REGISTER SCREEN === */
          <motion.div
            key="auth"
            className="relative z-20 flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center justify-between px-8 sm:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Left Section - Banner Text */}
            <motion.div
              initial={{ x: -100, opacity: 0, rotateY: 30 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="hidden lg:flex flex-col justify-center w-2/5 pr-8 space-y-6"
              style={{ perspective: 1000 }}
            >
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-display">
                <motion.span
                  variants={sentenceVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {loginTitle.map((char, i) => (
                    <motion.span key={i} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              <p className="text-gray-400 text-lg font-body">
                Sign in or create an account to begin your journey with elegance
                and trust.
              </p>
            </motion.div>

            {/* Right Section - Login/Register Card */}
            <motion.div
              initial={{ y: 50, opacity: 0, rotateX: -20 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex-1 flex items-center justify-center"
              style={{ perspective: 1000 }}
            >
              <motion.div
                ref={cardRef}
                onMouseMove={(e) => {
                  handleCardMouseMove(e);
                  setIsCardHovered(true);
                }}
                onMouseLeave={() => {
                  handleCardMouseLeave();
                  setIsCardHovered(false);
                }}
                style={{ rotateX, rotateY }}
                whileHover={{ scale: 1.01, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-full max-w-md p-8 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,200,255,0.10)] hover:shadow-[0_0_60px_rgba(0,200,255,0.15)] transition-shadow relative overflow-hidden"
              >
                {/* Mouse-following Sheen */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-30"
                  style={{
                    background: `radial-gradient(200px circle at ${sheenPosition.x}px ${sheenPosition.y}px, rgba(56,189,248,0.1), transparent 80%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isCardHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Outlet (Login/Signup Forms) */}
                <Outlet />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AuthLayout;
