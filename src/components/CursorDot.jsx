import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorDot() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-pink-500 pointer-events-none z-50"
      animate={{ x: pos.x - 8, y: pos.y - 8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}