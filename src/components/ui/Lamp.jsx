import { motion } from "framer-motion";

export const LampContainer = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 5,
      mixBlendMode: "screen", // La luz se mezcla con fotos y textos como luz real
    }}
  >
    {/* Gran cono de luz descendente */}
    <motion.div
      initial={{ opacity: 0, scaleX: 0.1 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 1.0, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "60px",
        left: "50%",
        transform: "translateX(-50%)",
        transformOrigin: "top center",
        width: "120%",
        height: "90%",
        background:
          "radial-gradient(ellipse 55% 70% at 50% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 25%, rgba(255,255,255,0.05) 55%, transparent 80%)",
      }}
    />

    {/* Barra horizontal brillante */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "60px",
        left: "50%",
        transform: "translateX(-50%)",
        transformOrigin: "center",
        width: "65%",
        maxWidth: "720px",
        height: "1.5px",
        background: "white",
        borderRadius: "9999px",
        boxShadow:
          "0 0 12px 4px rgba(255,255,255,0.9), 0 0 40px 12px rgba(255,255,255,0.4), 0 0 80px 24px rgba(255,255,255,0.15)",
      }}
    />

    {/* Orbe suave bajo la barra */}
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "320px",
        height: "90px",
        borderRadius: "50%",
        background:
          "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />
  </div>
);
