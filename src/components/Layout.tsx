import { NavLink } from "react-router-dom";
import { Home, Drama, Lightbulb, FileText, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";

const navItems = [
  { to: "/home", label: "冒险主页", icon: Home },
  { to: "/theater", label: "情景剧场", icon: Drama },
  { to: "/skills", label: "技能树", icon: Lightbulb },
  { to: "/contract", label: "任务契约", icon: FileText },
  { to: "/tree-hole", label: "匿名树洞", icon: MessageCircle },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const userProfile = useGameStore((s) => s.userProfile);

  return (
    <div className="min-h-screen bg-adventure-cream">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-adventure-orange/10 px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="font-display text-xl text-adventure-orange">
            单亲爸爸育儿大冒险
          </h1>
          {userProfile && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-adventure-blue font-body">
                {userProfile.nickname}
              </span>
              <span className="bg-adventure-orange/20 text-adventure-orange text-xs font-medium rounded-full px-2 py-0.5">
                Lv.{userProfile.level}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="pb-20 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around max-w-lg mx-auto py-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-200 ${
                  isActive
                    ? "text-adventure-orange scale-105"
                    : "text-adventure-blue/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-body">{label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-adventure-orange mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
