import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useAnimation,
  useInView as useFramerInView,
} from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import QuickJoin from "@/components/meeting/QuickJoin";
import ScheduleMeeting from "@/components/meeting/ScheduleMeeting";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";
import ScrollToTop from "@/components/ui/scroll-to-top";

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authModalTab, setAuthModalTab] = React.useState("login");

  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useFramerInView(ref, {
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleStartMeeting = () => {
    // Navigate to the start meeting page
    navigate("/start-meeting");
  };

  const handleJoinMeeting = () => {
    // Open the QuickJoin component's functionality
    const joinSection = document.getElementById("join-meeting-section");
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSignUp = () => {
    setAuthModalTab("register");
    setIsAuthModalOpen(true);
  };

  const handleJoin = (meetingId) => {
    if (meetingId && meetingId.length >= 6) {
      navigate(`/meeting/${meetingId}`);
    }
  };

  const joinSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <HeroSection
          onStartMeeting={handleStartMeeting}
          onJoinMeeting={handleJoinMeeting}
          onSignUp={handleSignUp}
        />

        <motion.div
          id="join-meeting-section"
          className="max-w-7xl mx-auto px-4 py-12"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={joinSectionVariants}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
            <motion.div
              className="w-full md:w-1/2 lg:w-1/3"
              variants={itemVariants}
            >
              <QuickJoin onJoin={handleJoin} />
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 lg:w-1/3"
              variants={itemVariants}
            >
              <ScheduleMeeting
                onSchedule={(values) => {
                  console.log("Meeting scheduled:", values);
                  // Generate a meeting ID for the scheduled meeting
                  const meetingId = Math.random().toString(36).substring(2, 10);
                  // In a real app, you would save this to a database
                  alert(`Meeting scheduled! Your meeting ID is: ${meetingId}`);
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        <FeaturesSection />
      </main>

      <Footer />

      <ScrollToTop showBelow={300} />

      <AuthModal
        defaultOpen={isAuthModalOpen}
        defaultTab={authModalTab}
        onOpenChange={setIsAuthModalOpen}
        onLoginSuccess={(data) => {
          console.log("Login success:", data);
          // Handle successful login (e.g., redirect to dashboard)
        }}
        onRegisterSuccess={(data) => {
          console.log("Register success:", data);
          // Handle successful registration
        }}
      />
    </div>
  );
};

export default LandingPage;
