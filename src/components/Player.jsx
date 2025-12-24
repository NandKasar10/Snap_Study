import { useEffect } from "react";
import { motion } from "framer-motion";
import player from "../assets/player.png";

export default function Player({ playerPos, setPlayerPos }) {
  useEffect(() => {
    // Keyboard movement
    const handleKey = (e) => {
      let newPos = { ...playerPos };
      if (e.key === "ArrowUp") newPos.y -= 20;
      if (e.key === "ArrowDown") newPos.y += 20;
      if (e.key === "ArrowLeft") newPos.x -= 20;
      if (e.key === "ArrowRight") newPos.x += 20;
      setPlayerPos(newPos);
    };
    window.addEventListener("keydown", handleKey);

    // Scroll movement
    const handleScroll = (e) => {
      const newPos = { ...playerPos, y: playerPos.y + (e.deltaY > 0 ? 20 : -20) };
      setPlayerPos(newPos);
    };
    window.addEventListener("wheel", handleScroll);

    // Touch swipe movement
    let startX = 0, startY = 0;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      let newPos = { ...playerPos };
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 30) newPos.x += 40; // swipe right
        else if (diffX < -30) newPos.x -= 40; // swipe left
      } else {
        if (diffY > 30) newPos.y += 40; // swipe down
        else if (diffY < -30) newPos.y -= 40; // swipe up
      }
      setPlayerPos(newPos);
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [playerPos, setPlayerPos]);

  // Click teleport only on the player image
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newPos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setPlayerPos(newPos);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.img
        src={player}
        alt="player"
        onClick={handleClick}
        animate={{ x: playerPos.x, y: playerPos.y }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="absolute w-12 h-12 pointer-events-auto z-50"
      />
    </div>
  );
}