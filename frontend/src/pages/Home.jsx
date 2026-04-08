import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldAlert, Zap, Activity, MessageSquare, PieChart, Lock, User, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

/* --- REUSABLE COMPONENTS --- */
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const FadeInContent = ({ children, delay = 0, yOffset = 40 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* --- MAIN PAGE COMPONENT --- */
const Home = () => {
  const navigate = useNavigate();
  // Hero Parallex
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);

  // Section 4 feature scroll transformations
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  // Map 0 -> 1 progress to specific panels
  const leftPanelY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-['Inter',sans-serif] selection:bg-indigo-500/30">

      {/* 1. HERO SECTION (100vh) */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative h-screen flex flex-col items-center justify-center px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] -z-10" />

        <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Introducing PDA Core</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-bold font-['Outfit'] tracking-tighter leading-[1.05] mb-8"
          >
            Decode Hidden <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600">
              Power in Conversations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light mb-12"
          >
            The world’s first AI OS specifically designed to analyze linguistic pragmatics, map micro-hierarchies, and reveal unconscious bias in team communications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full text-lg transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3"
            >
              Upload Conversation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. STATS SECTION (Animated Counters) */}
      <section className="relative py-32 px-8 border-y border-white/5 bg-[#080808]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <FadeInContent delay={0.1}>
            <div className="text-6xl font-['Outfit'] font-bold text-indigo-400 mb-4">
              <AnimatedCounter end={94} suffix="%" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dominance Accuracy</h3>
            <p className="text-gray-500">Cross-verified against human sociolinguistics experts across 50,000 corporate datasets.</p>
          </FadeInContent>

          <FadeInContent delay={0.3}>
            <div className="text-6xl font-['Outfit'] font-bold text-purple-400 mb-4">
              <AnimatedCounter end={120} suffix="k+" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hierarchies Mapped</h3>
            <p className="text-gray-500">Invisible power structures identified in daily active enterprise organizations.</p>
          </FadeInContent>

          <FadeInContent delay={0.5}>
            <div className="text-6xl font-['Outfit'] font-bold text-blue-400 mb-4">
              <AnimatedCounter end={2.5} suffix="B" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pragmatic Tokens</h3>
            <p className="text-gray-500">Hedges, boosters, and directives dynamically classified in real-time pipelines.</p>
          </FadeInContent>
        </div>
      </section>

      {/* 3. PROBLEM SECTION (Visual Storytelling) */}
      <section className="min-h-screen flex items-center justify-center px-8 relative bg-[#050505]">
        <div className="absolute inset-0 bg-blue-900/5 blur-[200px]" />
        <div className="max-w-4xl mx-auto text-center">
          <FadeInContent>
            <ShieldAlert className="w-16 h-16 text-red-500/80 mx-auto mb-8" />
            <h2 className="text-5xl md:text-7xl font-['Outfit'] font-bold mb-8 leading-tight">
              We lose the signals <br />
              <span className="text-gray-600">when we type.</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light leading-relaxed mb-12">
              Body language is gone. Eye contact doesn't exist. Yet, power struggles, linguistic bullying, and unconscious bias still dictate decisions over Slack, Teams, and Email. <strong>PDA surfaces what is left unsaid.</strong>
            </p>
          </FadeInContent>
        </div>
      </section>

      {/* 4. PINNED SCROLLING FEATURE SECTIONS */}
      <section ref={containerRef} className="h-[300vh] relative bg-[#0a0a0a]">
        <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center px-8 overflow-hidden">

          {/* Left Text Track */}
          <div className="w-full md:w-1/2 flex flex-col justify-center h-full pr-0 md:pr-16 z-20">
            <motion.div style={{ y: leftPanelY }} className="space-y-[60vh] pt-[20vh] pb-[20vh]">

              {/* Feature 1 */}
              <div className="h-[80vh] flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-4xl font-['Outfit'] font-bold mb-4">Dominance Detection</h3>
                <p className="text-xl text-gray-400">Our NLP engine tracks hedges, boosters, and latency. We identify natural leaders and structural silos in the micro-communications of your team.</p>
              </div>

              {/* Feature 2 */}
              <div className="h-[80vh] flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                  <PieChart className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-4xl font-['Outfit'] font-bold mb-4">Power Shift Timeline</h3>
                <p className="text-xl text-gray-400">Watch dominance fluctuate in real-time. Know exactly the minute a conversation turns from collaborative to dictatorial.</p>
              </div>

              {/* Feature 3 */}
              <div className="h-[80vh] flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-4xl font-['Outfit'] font-bold mb-4">Linguistic Evidence Engine</h3>
                <p className="text-xl text-gray-400">We don't just score you; we show you why. See exact quotes flagged as raw Directives vs collaborative Negotiation.</p>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Track */}
          <div className="w-full md:w-1/2 h-2/3 md:h-[80vh] relative mt-12 md:mt-0 glass-card bg-[#0f0f0f] border-white/5 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

            {/* Visual element that fades based on scroll */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
              className="absolute inset-0 flex items-center justify-center p-12"
            >
              {/* Fake UI for Feature 1 */}
              <div className="w-full max-w-sm space-y-4">
                <div className="h-16 rounded-xl bg-white/5 border border-white/10 flex items-center px-4 justify-between">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-indigo-500/30"></div><span className="font-semibold">Sarah Jenkins</span></div>
                  <span className="text-indigo-400 font-bold">82%</span>
                </div>
                <div className="h-16 rounded-xl bg-white/5 border border-white/10 flex items-center px-4 justify-between">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-500/30"></div><span className="font-semibold">Michael Ross</span></div>
                  <span className="text-gray-400 font-bold">18%</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.35, 0.5, 0.7], [0, 1, 0]) }}
              className="absolute inset-0 flex flex-col items-center justify-center p-12"
            >
              {/* Fake UI for Feature 2 */}
              <div className="w-full aspect-video border border-white/10 rounded-2xl bg-[#0a0a0a] flex items-end relative overflow-hidden p-6 gap-2">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                {[40, 50, 45, 60, 80, 85, 75, 40].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-indigo-500/40 rounded-t-sm"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.75, 0.9], [0, 1]) }}
              className="absolute inset-0 flex items-center justify-center p-12"
            >
              {/* Fake UI for Feature 3 */}
              <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="text-sm text-red-400 font-bold uppercase tracking-wider mb-4">Flagged as Directive</h4>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-lg">"I need this done by 5PM. <strong>Do not</strong> reply until it's finished."</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. TRANSITION & FINAL CTA SECTION */}
      <section className="relative py-48 px-8 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#010101]" />

        {/* Massive blurred background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-[150px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <FadeInContent>
            <h2 className="text-6xl md:text-8xl font-['Outfit'] font-bold mb-8">
              Shift the Balance.
            </h2>
            <p className="text-2xl text-gray-400 mb-16 font-light max-w-3xl mx-auto">
              Empower your HR, User Research, and Management teams with the objective truth behind every interaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-10 py-5 bg-indigo-600 text-white font-bold rounded-full text-lg hover:bg-indigo-500 transition-colors shadow-[0_0_50px_rgba(79,70,229,0.4)]"
              >
                Analyze Your Conversations
              </button>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors">
                Read the Research
              </button>
            </div>
          </FadeInContent>
        </div>
      </section>

      <Navbar />
    </div>
  );
};

export default Home;
