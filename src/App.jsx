import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Player from "./components/Player";
import Zone from "./components/Zone";
import CursorDot from "./components/CursorDot";

export default function App() {
  // States
  const [journals, setJournals] = useState([]);
  const [journalText, setJournalText] = useState("");
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [timer, setTimer] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [currentZone, setCurrentZone] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });
  const [popup, setPopup] = useState(null);

  // Popup instructions
  useEffect(() => {
    setPopup("Controls: ⬆️⬇️ Arrow Keys / Scroll | 🖱️ Tap to teleport | 📱 Swipe to move");
    setTimeout(() => setPopup(null), 4000);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Achievements unlock
  useEffect(() => {
    if (journals.length >= 3) {
      setAchievements((a) => [...new Set([...a, "Consistency Badge"])]);
    }
    if (posts.length >= 3) {
      setAchievements((a) => [...new Set([...a, "Leader Badge"])]);
    }
  }, [journals, posts]);

  const movePlayer = (newPos) => {
    setPlayerPos(newPos);
    checkZoneTransition(newPos);
  };

  const checkZoneTransition = (pos) => {
    if (pos.y > window.innerHeight - 50) {
      if (currentZone < zones.length - 1) {
        setCurrentZone((z) => z + 1);
        setPlayerPos({ x: 100, y: 50 });
      } else {
        setPopup("🚫 No more content below!");
        setTimeout(() => setPopup(null), 2000);
        setPlayerPos({ x: 100, y: window.innerHeight - 100 });
      }
    }
    if (pos.y < 20) {
      if (currentZone > 0) {
        setCurrentZone((z) => z - 1);
        setPlayerPos({ x: 100, y: window.innerHeight - 100 });
      } else {
        setPopup("🚫 No more content above!");
        setTimeout(() => setPopup(null), 2000);
        setPlayerPos({ x: 100, y: 50 });
      }
    }
  };

  // Zones with responsive UI + animations
    // Zones with responsive UI + animations
  const zones = [
    {
      title: "📚 Journals",
      color: "bg-gradient-to-b from-indigo-500 to-purple-600",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Journals block */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg hover:scale-[1.02] transition">
            <h2 className="text-lg sm:text-2xl font-bold text-white">Write a Journal</h2>
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Start writing your thoughts..."
              className="w-full mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-white/20 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              rows={4}
            />
            <button
              onClick={() => {
                if (journalText.trim() !== "") {
                  setJournals([...journals, { id: Date.now(), text: journalText }]);
                  setJournalText("");
                }
              }}
              className="mt-3 sm:mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md transition text-sm sm:text-base"
            >
              Save Journal
            </button>
          </div>
          {/* Saved entries */}
          <div className="space-y-2 sm:space-y-3">
            {journals.map((j) => (
              <motion.div
                key={j.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white/5 rounded-xl p-2 sm:p-3 text-white shadow text-sm sm:text-base"
              >
                {j.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      title: "🏙️ Community",
      color: "bg-gradient-to-b from-green-500 to-emerald-700",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Community block */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg hover:scale-[1.02] transition">
            <h2 className="text-lg sm:text-2xl font-bold text-white">Community Feed</h2>
            <input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-white/20 text-black focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
            />
            <button
              onClick={() => {
                if (postText.trim() !== "") {
                  setPosts([{ id: Date.now(), text: postText }, ...posts]);
                  setPostText("");
                }
              }}
              className="mt-3 sm:mt-4 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md transition text-sm sm:text-base"
            >
              Post
            </button>
          </div>
          {/* Feed */}
          <div className="space-y-2 sm:space-y-3">
            {posts.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 rounded-xl p-2 sm:p-3 text-white shadow text-sm sm:text-base"
              >
                👩‍🎓 {p.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      title: "🎓 Study Room",
      color: "bg-gradient-to-b from-purple-500 to-pink-600",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg hover:scale-[1.02] transition"
        >
          <h2 className="text-lg sm:text-2xl font-bold text-white">Group Study</h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-2">Collaborate with peers in real-time sessions.</p>
          <button
            onClick={() => setTimer(25 * 60)}
            className="mt-3 sm:mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md transition text-sm sm:text-base"
          >
            Start Focus Timer
          </button>
          {timer !== null && (
            <motion.p
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-white mt-3 sm:mt-4 text-base sm:text-lg font-semibold"
            >
              ⏳ {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </motion.p>
          )}
        </motion.div>
      ),
    },
    {
      title: "🏆 Achievements",
      color: "bg-gradient-to-b from-yellow-400 to-orange-600",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg text-center hover:scale-[1.05] transition"
            >
              <h2 className="text-base sm:text-xl font-bold text-white">{ach}</h2>
              <p className="text-xs sm:text-sm text-gray-200 mt-2">Unlocked by your activity 🎉</p>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
  ];

  // Render
  return (
  <div
    className={`h-screen flex flex-col items-center justify-center ${zones[currentZone].color} relative overflow-hidden`}
  >
    {/* Animated cursor dot */}
    <CursorDot />

    {/* Current zone content */}
    <Zone
      title={zones[currentZone].title}
      content={zones[currentZone].content}
    />

    {/* Player sprite */}
    <Player playerPos={playerPos} setPlayerPos={movePlayer} />

    {/* Popup instructions */}
    {popup && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 
                   bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm 
                   px-3 sm:px-4 py-2 rounded-lg shadow-lg border border-white/20"
      >
        {popup}
      </motion.div>
    )}
  </div>
);
}