"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowTopRightOnSquareIcon, EyeIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"
import { generateProjectPDF } from "@/lib/pdfGenerator"

const projects = [
  {
    id: "lightsout",
    name: "LightsOut: Find Your Way Out",
    category: "Games Puzzle",
    description:
      "A brain-twisting memory puzzle wrapped in a retro 1-bit aesthetic where players explore mazes that disappear into darkness. The game uniquely challenges spatial memory, requiring players to mentally visualize and recall the maze layout to escape.",
    technologies: ["SwiftUI", "Prim's Algorithm", "Core Animation", "Core Haptics"],
    features: [
      "Memory-based maze navigation gameplay",
      "Retro 1-bit black and white aesthetic",
      "Progressive difficulty with increasing maze complexity",
      "Timer-based countdown mode for added challenge",
      "Offline-first gameplay with zero tracking",
      "Custom modifiers with shake animation for invalid moves",
      "Prim's Algorithm for organic, solvable maze structures",
    ],
    challenges: [
      "Implementing Prim's Algorithm for dynamic maze generation",
      "Creating engaging memory-based gameplay mechanics",
      "Balancing difficulty progression and player retention",
      "Designing minimalist UI that enhances focus",
      "Optimizing performance for smooth animations",
    ],
    link: "https://apps.apple.com/us/app/lightsout-find-your-way-out/id6746441274",
    image: "/images/lightsout.png",
    color: "from-gray-800 to-gray-900",
  },
  {
    id: "tinytales",
    name: "TinyTales",
    category: "Education Kids",
    description:
      "Storytelling app that turns daily routines into magical moments with fun, personalized stories and AI-powered suggestions for children with ASD.",
    technologies: ["SwiftUI", "Core ML", "Natural Language"],
    features: [
      "Personalized storytelling for daily routines",
      "AI-powered story suggestions and content generation",
      "Interactive quizzes for comprehension testing",
      "Social Story approach specifically for children with ASD",
      "Gentle wording suggestions for better communication",
      "Progress tracking for learning development",
    ],
    challenges: [
      "Creating age-appropriate AI-generated content",
      "Designing accessible interfaces for children with ASD",
      "Implementing natural language processing for story generation",
      "Balancing educational content with engaging storytelling",
      "Ensuring content safety and appropriateness",
    ],
    link: "https://testflight.apple.com/join/3sskSmpp",
    image: "/images/tinytales.png",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "physiquest",
    name: "PhysiQuest",
    category: "Education Games",
    description:
      "An application that turns complex physics concepts into enjoyable, hands-on experiences with interactive experiments, conceptual material, and exercises.",
    technologies: ["SwiftUI", "SpriteKit", "Core Animation"],
    features: [
      "Interactive physics playground for experimentation",
      "Comprehensive conceptual learning materials",
      "Hands-on experiments with real-time simulations",
      "Progress tracking exercises and assessments",
      "Visual physics simulations and demonstrations",
      "Structured learning path with flexible exploration",
    ],
    challenges: [
      "Creating accurate physics simulations and calculations",
      "Designing intuitive learning interfaces for complex concepts",
      "Balancing educational content with engaging gameplay",
      "Optimizing performance for real-time physics rendering",
      "Making abstract physics concepts visually understandable",
    ],
    link: "https://testflight.apple.com/join/At4PVBYc",
    image: "/images/physiquest.png",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "terapilah",
    name: "Terapilah",
    category: "Health & Fitness Reference",
    description:
      "Specialized app designed to support the recovery journey of stroke survivors by focusing on targeted motor exercises, combining physical therapy with motor imagery techniques.",
    technologies: ["SwiftUI", "HealthKit", "Core ML"],
    features: [
      "Personalized motor exercises based on stroke impact",
      "Motor imagery techniques for neural rehabilitation",
      "Muscle grade assessment and tracking",
      "Progress monitoring and recovery analytics",
      "Stroke-specific rehabilitation programs",
      "Adaptive exercise difficulty based on user capability",
    ],
    challenges: [
      "Creating accessible UI for users with motor impairments",
      "Developing personalized exercise recommendation algorithms",
      "Integrating medical best practices and clinical guidelines",
      "Ensuring safety and appropriateness of exercises",
      "Designing for varying levels of stroke-related disabilities",
    ],
    link: "https://testflight.apple.com/join/Z583J8km",
    image: "/images/terapilah.png",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "ark",
    name: "Ark - Find Animals",
    category: "Games Entertainment",
    description:
      "An AR-based game where players discover and interact with various virtual animals in real-world locations. Uses augmented reality to overlay animal visuals onto the player's environment.",
    technologies: ["ARKit", "SwiftUI", "Core Location"],
    features: [
      "Augmented reality animal discovery and interaction",
      "Location-based gameplay with real-world integration",
      "Interactive 3D animal models and animations",
      "Educational wildlife content and information",
      "Real-world environment integration and tracking",
      "Collection and discovery progression system",
    ],
    challenges: [
      "Achieving accurate AR object placement and tracking",
      "Optimizing location tracking and GPS integration",
      "Managing 3D model performance on mobile devices",
      "Creating realistic animal behaviors and interactions",
      "Handling varying lighting and environmental conditions",
    ],
    link: "https://testflight.apple.com/join/xkwYdtA2",
    image: "/images/ark.png",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "sovereign-heart",
    name: "Sovereign Heart",
    category: "Health & Fitness Games",
    description:
      "Leverages HealthKit to monitor the user's real-time heart rate, turning physical activity into a thrilling survival experience where users must keep their heart rate elevated to evade virtual zombies with MVVM structure.",
    technologies: ["SwiftUI", "HealthKit", "WatchKit", "Haptics"],
    features: [
      "Real-time heart rate monitoring using HealthKit",
      "Zombie survival gameplay mechanics",
      "Apple Watch native interface and controls",
      "Haptic feedback integration for immersion",
      "MVVM architecture pattern implementation",
      "Fitness gamification with survival elements",
    ],
    challenges: [
      "Integrating HealthKit with real-time gameplay mechanics",
      "Optimizing performance for Apple Watch hardware",
      "Creating engaging haptic feedback patterns",
      "Balancing fitness goals with game enjoyment",
      "Managing battery life during intensive monitoring",
    ],
    link: "",
    image: "/images/sovereign-heart.png",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "motorq",
    name: "MotorQ",
    category: "Utilities Lifestyle",
    description:
      "Empowers motorbike owners to take care of their vehicles by tracking service intervals and reminding users when maintenance is due.",
    technologies: ["SwiftUI", "Core Data", "UserNotifications"],
    features: [
      "Service interval tracking and scheduling",
      "Maintenance reminders and notifications",
      "Cost tracking and expense management",
      "Service history and record keeping",
      "Widget support for quick status checks",
      "Multiple vehicle management support",
    ],
    challenges: [
      "Creating intuitive maintenance scheduling interfaces",
      "Implementing reliable notification system",
      "Designing for non-technical motorcycle owners",
      "Managing complex service interval calculations",
      "Ensuring data persistence and backup",
    ],
    link: "",
    image: "/images/motorq.png",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "iam",
    name: "iAm",
    category: "Health & Fitness Utilities",
    description:
      "A notes app to help people with frequent anxiety attacks by encouraging emotion dumping and reflection using various media formats.",
    technologies: ["SwiftUI", "Core Data", "AVFoundation"],
    features: [
      "Multi-media emotion capture (text, audio, images)",
      "Secure note encryption and privacy protection",
      "Anxiety tracking and pattern recognition",
      "Guided reflection prompts and exercises",
      "Privacy-focused design with local storage",
      "Mood tracking and emotional analytics",
    ],
    challenges: [
      "Ensuring user privacy and data security",
      "Creating supportive UX for anxiety management",
      "Implementing secure local data storage",
      "Designing calming and non-triggering interfaces",
      "Balancing feature richness with simplicity",
    ],
    link: "https://testflight.apple.com/join/6E212fbe",
    image: "/images/iam.png",
    color: "from-teal-500 to-blue-600",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const handleDownloadPDF = async (project: any) => {
    try {
      await generateProjectPDF(project)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.section
      id="projects"
      className="mb-20"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 className="text-4xl font-bold mb-12 text-center" variants={itemVariants}>
        Featured{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
      </motion.h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <motion.div
              className="bg-white/60 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-500"
              whileHover={{
                scale: 1.05,
                y: -10,
                rotateY: 5,
                rotateX: 5,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-white">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`}
                  animate={{
                    opacity: hoveredProject === project.id ? 0.2 : 0.1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {project.category}
                </motion.div>

                {/* Download Button Overlay */}
                <motion.button
                  className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
                  onClick={() => handleDownloadPDF(project)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Download Project Documentation"
                >
                  <DocumentArrowDownIcon className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                  layoutId={`title-${project.id}`}
                >
                  {project.name}
                </motion.h3>

                <motion.p
                  className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3"
                  animate={{
                    opacity: hoveredProject === project.id ? 0.8 : 1,
                  }}
                >
                  {project.description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="bg-gray-100/80 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium border border-gray-200/50"
                      whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={`/projects/${project.id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <EyeIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      View Details
                    </Link>
                  </motion.div>

                  {project.link && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100/80 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200/80 transition-all duration-300 flex items-center gap-2 border border-gray-200/50 group"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        Link
                      </a>
                    </motion.div>
                  )}
                </div>

                {/* Download Documentation Button */}
                <motion.button
                  className="w-full mt-3 bg-gray-50/80 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100/80 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200/50 group"
                  onClick={() => handleDownloadPDF(project)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DocumentArrowDownIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Download PDF
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
