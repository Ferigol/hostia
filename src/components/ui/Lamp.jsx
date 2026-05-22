import { motion } from "framer-motion";

export const LampContainer = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 4,
      overflow: "hidden",
      mixBlendMode: "screen",
      maskImage: "linear-gradient(to bottom, transparent 0px, black 80px)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 80px)",
    }}
  >
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>

      {/* Left conic beam */}
      <motion.div
        initial={{ opacity: 0.5, width: "12rem" }}
        whileInView={{ opacity: 1, width: "24rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "80px",
          right: "50%",
          height: "11rem",
          overflow: "visible",
          backgroundImage: "conic-gradient(from 70deg at center top, #500ff5, transparent, transparent)",
        }}
      >
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: "100%", height: "8rem", background: "#000",
          maskImage: "linear-gradient(to top, white, transparent)",
          WebkitMaskImage: "linear-gradient(to top, white, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          width: "8rem", height: "100%", background: "#000",
          maskImage: "linear-gradient(to right, white, transparent)",
          WebkitMaskImage: "linear-gradient(to right, white, transparent)",
        }} />
      </motion.div>

      {/* Right conic beam */}
      <motion.div
        initial={{ opacity: 0.5, width: "12rem" }}
        whileInView={{ opacity: 1, width: "24rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          height: "11rem",
          overflow: "visible",
          backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #500ff5)",
        }}
      >
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: "8rem", height: "100%", background: "#000",
          maskImage: "linear-gradient(to left, white, transparent)",
          WebkitMaskImage: "linear-gradient(to left, white, transparent)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: "100%", height: "8rem", background: "#000",
          maskImage: "linear-gradient(to top, white, transparent)",
          WebkitMaskImage: "linear-gradient(to top, white, transparent)",
        }} />
      </motion.div>

      {/* Wide glow orb */}
      <div style={{
        position: "absolute",
        top: "80px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "22rem",
        height: "7rem",
        borderRadius: "50%",
        background: "#500ff5",
        opacity: 0.5,
        filter: "blur(3rem)",
        zIndex: 5,
      }} />

      {/* Small bright orb near bar */}
      <motion.div
        initial={{ width: "6rem" }}
        whileInView={{ width: "13rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translate(-50%, -5rem)",
          height: "7rem",
          borderRadius: "50%",
          background: "#7c3aed",
          filter: "blur(2rem)",
          zIndex: 3,
        }}
      />

      {/* Horizontal glowing bar */}
      <motion.div
        initial={{ width: "12rem" }}
        whileInView={{ width: "24rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translate(-50%, -1px)",
          height: "2px",
          background: "#c4b5fd",
          borderRadius: "9999px",
          boxShadow: "0 0 12px 4px rgba(196,181,253,0.9), 0 0 40px 12px rgba(80,15,245,0.5), 0 0 80px 24px rgba(80,15,245,0.2)",
          zIndex: 5,
        }}
      />
    </div>
  </div>
);
