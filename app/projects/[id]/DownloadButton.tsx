"use client"

import { DocumentArrowDownIcon } from "@heroicons/react/24/outline"
import { generateDetailedProjectPDF } from "@/lib/pdfGenerator"

interface Project {
  name: string
  category: string
  description: string
  technologies: string[]
  features: string[]
  challenges: string[]
  link?: string
}

interface DownloadButtonProps {
  project: Project
}

export default function DownloadButton({ project }: DownloadButtonProps) {
  const handleDownloadPDF = async () => {
    try {
      await generateDetailedProjectPDF(project)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center gap-2"
      title="Download Project Documentation"
    >
      <DocumentArrowDownIcon className="w-4 h-4" />
      Download PDF
    </button>
  )
}
