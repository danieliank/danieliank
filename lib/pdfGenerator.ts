interface Project {
  id?: string
  name: string
  category: string
  description: string
  technologies: string[]
  link?: string
  features?: string[]
  challenges?: string[]
  image?: string
}

export const generateProjectPDF = async (project: Project) => {
  // Import jsPDF dynamically to avoid SSR issues
  const { jsPDF } = await import("jspdf")

  const doc = new jsPDF()

  // Debug: Log project data to ensure features and challenges are present
  console.log("Generating PDF for project:", project.name)
  console.log("Features:", project.features)
  console.log("Challenges:", project.challenges)

  // Set up monochrome colors (grayscale only)
  const darkGray = [60, 60, 60]
  const mediumGray = [120, 120, 120]
  const lightGray = [200, 200, 200]
  const black = [0, 0, 0]

  let yPosition = 20
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  const contentWidth = pageWidth - margin * 2

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    const lineHeight = fontSize * 0.35
    lines.forEach((line: string, index: number) => {
      if (y + index * lineHeight < pageHeight - 30) {
        doc.text(line, x, y + index * lineHeight)
      }
    })
    return y + lines.length * lineHeight
  }

  // Helper function to load and add image
  const addProjectImage = async (imagePath: string, x: number, y: number, width: number, height: number) => {
    try {
      const imageUrl = imagePath.startsWith("/") ? `${window.location.origin}${imagePath}` : imagePath
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            canvas.width = img.width
            canvas.height = img.height

            ctx?.drawImage(img, 0, 0)

            if (ctx) {
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
              const data = imageData.data

              for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
                data[i] = gray
                data[i + 1] = gray
                data[i + 2] = gray
              }

              ctx.putImageData(imageData, 0, 0)
            }

            const dataURL = canvas.toDataURL("image/jpeg", 0.8)
            doc.addImage(dataURL, "JPEG", x, y, width, height)
            resolve(true)
          }
          img.src = reader.result as string
        }
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error("Error loading image:", error)
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
      doc.rect(x, y, width, height, "F")
      doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
      doc.setFontSize(8)
      doc.text("Image", x + width / 2 - 8, y + height / 2)
    }
  }

  // Project Name
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(black[0], black[1], black[2])
  yPosition = addWrappedText(project.name, margin, yPosition, contentWidth, 16)
  yPosition += 3

  // Category
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
  doc.text(project.category, margin, yPosition)
  yPosition += 12

  // Add project image (positioned after title)
  const imageSize = 35
  if (project.image) {
    await addProjectImage(project.image, margin, yPosition, imageSize, imageSize)
  }

  // Description Section (positioned next to image)
  const textStartX = project.image ? margin + imageSize + 8 : margin
  const textWidth = project.image ? contentWidth - imageSize - 8 : contentWidth

  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(black[0], black[1], black[2])
  doc.text("OVERVIEW", textStartX, yPosition + 5)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  const descriptionEndY = addWrappedText(project.description, textStartX, yPosition + 12, textWidth, 8)

  // Move yPosition to below both image and description
  yPosition = Math.max(yPosition + imageSize + 5, descriptionEndY + 8)

  // Technologies Section
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(black[0], black[1], black[2])
  doc.text("TECHNOLOGIES", margin, yPosition)
  yPosition += 7

  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  const techText = project.technologies.join(" • ")
  yPosition = addWrappedText(techText, margin, yPosition, contentWidth, 8)
  yPosition += 10

  // Two-column layout for Features and Challenges
  const columnWidth = (contentWidth - 10) / 2
  const leftColumnX = margin
  const rightColumnX = margin + columnWidth + 10

  let leftColumnY = yPosition
  let rightColumnY = yPosition

  // Key Features Section (Left Column) - ALWAYS SHOW IF DATA EXISTS
  if (project.features && Array.isArray(project.features) && project.features.length > 0) {
    console.log("Adding features section with", project.features.length, "features")

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(black[0], black[1], black[2])
    doc.text("KEY FEATURES", leftColumnX, leftColumnY)
    leftColumnY += 7

    // Show up to 6 features to ensure they fit
    const featuresToShow = project.features.slice(0, 6)
    featuresToShow.forEach((feature, index) => {
      if (leftColumnY < pageHeight - 40) {
        doc.setFontSize(7)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
        doc.text("•", leftColumnX, leftColumnY)
        leftColumnY = addWrappedText(feature, leftColumnX + 4, leftColumnY, columnWidth - 4, 7)
        leftColumnY += 1.5
      }
    })
  } else {
    console.log("No features found for project:", project.name)
  }

  // Technical Challenges Section (Right Column) - ALWAYS SHOW IF DATA EXISTS
  if (project.challenges && Array.isArray(project.challenges) && project.challenges.length > 0) {
    console.log("Adding challenges section with", project.challenges.length, "challenges")

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(black[0], black[1], black[2])
    doc.text("TECHNICAL CHALLENGES", rightColumnX, rightColumnY)
    rightColumnY += 7

    // Show up to 6 challenges to ensure they fit
    const challengesToShow = project.challenges.slice(0, 6)
    challengesToShow.forEach((challenge, index) => {
      if (rightColumnY < pageHeight - 40) {
        doc.setFontSize(7)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
        doc.text("•", rightColumnX, rightColumnY)
        rightColumnY = addWrappedText(challenge, rightColumnX + 4, rightColumnY, columnWidth - 4, 7)
        rightColumnY += 1.5
      }
    })
  } else {
    console.log("No challenges found for project:", project.name)
  }

  // Update yPosition to the bottom of both columns
  yPosition = Math.max(leftColumnY, rightColumnY) + 8

  // Project Link Section (if available and space permits)
  if (project.link && yPosition < pageHeight - 35) {
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(black[0], black[1], black[2])
    doc.text("PROJECT LINK", margin, yPosition)
    yPosition += 7

    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    yPosition = addWrappedText(project.link, margin, yPosition, contentWidth, 8)
    yPosition += 8
  }

  // Developer Information Section (compact)
  if (yPosition < pageHeight - 30) {
    const remainingSpace = pageHeight - yPosition - 20
    const boxHeight = Math.min(25, remainingSpace)

    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
    doc.rect(margin, yPosition, contentWidth, boxHeight, "F")

    yPosition += 4
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(black[0], black[1], black[2])
    doc.text("DEVELOPER", margin + 3, yPosition)
    yPosition += 6

    const developerInfo = [
      "Daniel Ian Kurniawan - iOS Developer & Product Manager",
      "dikur1007@gmail.com • linkedin.com/in/danieliank • danieliank.vercel.app",
    ]

    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])

    developerInfo.forEach((info) => {
      if (yPosition < pageHeight - 20) {
        yPosition = addWrappedText(info, margin + 3, yPosition, contentWidth - 6, 7)
        yPosition += 3
      }
    })
  }

  // Footer
  const footerY = pageHeight - 12
  doc.setFontSize(6)
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
  doc.text(`Generated ${new Date().toLocaleDateString()}`, margin, footerY)
  doc.text("© 2025 Daniel Ian Kurniawan", pageWidth - margin - 35, footerY)

  // Save the PDF
  const fileName = `${project.name.replace(/[^a-zA-Z0-9]/g, "_")}_Documentation.pdf`
  doc.save(fileName)
}

export const generateDetailedProjectPDF = async (project: Project) => {
  // Use the same single-page format for detailed view
  await generateProjectPDF(project)
}
