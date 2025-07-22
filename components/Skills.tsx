"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: "Technical Skills",
      skills: [
        "React",
        "Javascript",
        "Swift",
        "SwiftUI",
        "Python",
        "FastAPI",
        "SQL",
        "Machine Learning",
        "MVVM",
        "MVC",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Development Tools",
      skills: ["Git", "Github", "GitFlow", "Firebase", "Supabase", "Postman", "Xcode", "TestFlight"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Design & Management",
      skills: ["Notion", "Jira", "Confluence", "Figma", "Miro", "Product Management", "Agile Methodology"],
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Leadership", "Teamwork", "Pitching", "Communication", "Public Speaking"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
      id="skills"
      className="mb-20"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 className="text-4xl font-bold mb-12 text-center" variants={itemVariants}>
        Technical{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
      </motion.h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-500"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <motion.h3
              className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
              layoutId={`skill-title-${index}`}
            >
              <motion.div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              {category.title}
            </motion.h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  className={`bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
