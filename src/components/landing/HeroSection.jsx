import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView as useFramerInView,
} from "framer-motion";
import { ArrowRight, Video, Users, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({
  onStartMeeting = () => console.log("Start meeting clicked"),
  onJoinMeeting = () => console.log("Join meeting clicked"),
  onSignUp = () => console.log("Sign up clicked"),
}) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left column - Text content */}
        <div className="flex flex-col space-y-6">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            Connect with anyone, <span className="text-blue-600">anywhere</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-lg"
          >
            High-quality video meetings for teams and individuals. Secure,
            reliable, and easy to use.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              onClick={onStartMeeting}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
            >
              <Video size={20} />
              Start a meeting
            </Button>

            <Button
              onClick={onJoinMeeting}
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg flex items-center gap-2"
            >
              <Users size={20} />
              Join a meeting
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8">
            <p className="text-gray-600 mb-4">Don't have an account yet?</p>
            <Button
              onClick={onSignUp}
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 font-medium flex items-center gap-2 pl-0"
            >
              Sign up for free
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>

        {/* Right column - Image */}
        <motion.div
          variants={imageVariants}
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1200&q=80"
            alt="Video conference with diverse team members"
            className="w-full h-auto rounded-xl"
          />

          {/* Feature badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
            {[
              {
                icon: <Video size={16} className="text-blue-600" />,
                text: "HD Video",
              },
              {
                icon: <Users size={16} className="text-blue-600" />,
                text: "Up to 100 participants",
              },
              {
                icon: <Calendar size={16} className="text-blue-600" />,
                text: "Calendar integration",
              },
              {
                icon: <Shield size={16} className="text-blue-600" />,
                text: "End-to-end encryption",
              },
            ].map((badge, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={badgeVariants}
                className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium shadow-sm"
              >
                {badge.icon}
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
