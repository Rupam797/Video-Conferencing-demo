import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useInView as useFramerInView,
} from "framer-motion";
import {
  Video,
  Users,
  Shield,
  Globe,
  MessageSquare,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({
  icon,
  title,
  description = "Feature description",
  index,
}: FeatureCardProps) => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <Card className="bg-white h-full transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-2">
          <motion.div
            variants={iconVariants}
            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Omit<FeatureCardProps, "index">[];
}

const FeaturesSection = ({
  title = "Powerful Features for Seamless Collaboration",
  subtitle = "Our platform offers everything you need for productive virtual meetings and team collaboration.",
  features = [
    {
      icon: <Video size={24} />,
      title: "HD Video Conferencing",
      description:
        "Crystal clear video with adaptive quality to ensure smooth meetings even with low bandwidth.",
    },
    {
      icon: <Users size={24} />,
      title: "Multiple Participants",
      description:
        "Host meetings with up to 100 participants with grid view and speaker highlight features.",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Meetings",
      description:
        "End-to-end encryption and password protection to keep your conversations private and secure.",
    },
    {
      icon: <Globe size={24} />,
      title: "Cross-Platform Support",
      description:
        "Join from any device - desktop, mobile, or tablet with our web and native applications.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "In-Meeting Chat",
      description:
        "Share messages, links, and files with all participants or privately during meetings.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Meeting Scheduling",
      description:
        "Plan ahead with calendar integration and automated reminders for all participants.",
    },
  ],
}: FeaturesSectionProps) => {
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

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
