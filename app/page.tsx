"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { ExternalLink, ArrowDown, MessageCircle } from "lucide-react"

// Customizable placeholder text section
const placeholderContent = {
  title: "Embark on Your Epic Adventure",
  content: `A Knight of Mira is an ambassador of truth.  

Being a knight of Mira is an eternal vow to rid this realm of false information and protect only that which is true.There is no place for misinformation in these lands and it is up to you to to stop the spread.
The knights of Mira stand strong in the face of even the most dangerous lies.
Unshaken.

So raise thy banner, brave soul. Step forth and take thy place amongst the guardians of a new digital age. You are not alone.The Citadel of knights stands with you.And together you shall form an impenetrable order.Built on truth

For those who Believe ✨`,
}

// Customizable data - easily replace images and text here
const bubbleData = [
  {
    id: 1,
    image: "/images/champion.jpg",
    title: "Champion",
    description: "Should you choose this path you will receive the knowledge you need to be a Champion Knight of Mira",
    links: [
      { label: "X", url: "https://x.com/shermansensei/status/1944447604705624141" },
      { label: "Guide", url: "https://medium.com/@fadabdul15/a-knights-guide-to-the-miraverse-0b94d415cbbe" },
    ],
  },
  {
    id: 2,
    image: "/images/builder.png",
    title: "Builder",
    description:
      "Should you choose this path you will receive all the knowledge you need to be a Builder Knight of Mira",
    links: [
      { label: "X", url: "https://example.com/trails" },
      {
        label: "Guide",
        url: "https://medium.com/@fadabdul15/build-trustworthy-ai-a-developers-guide-to-the-mira-verification-sdk-0aaad32191d2",
      },
    ],
  },
  {
    id: 3,
    image: "/images/sigil.png",
    title: "The Story of Mira",
    description: "Now that you have chosen your Destiny you must must know where Mira comes from",
    links: [
      { label: "X", url: "https://x.com/shermansensei/status/1945842800420946091" },
      { label: "Medium", url: "https://medium.com/@fadabdul15/sigil-of-truth-the-story-of-mira-e2ccdc10db5e" },
    ],
  },
  {
    id: 4,
    image: "/images/fault.png",
    title: "The Fault in our Machines",
    description: "You now know where Mira came from you must know why the world needs Mira",
    links: [
      { label: "X", url: "https://x.com/shermansensei/status/1950120167662346318" },
      { label: "Story", url: "https://medium.com/@fadabdul15/the-fault-our-machines-a95b914d471d" },
    ],
  },
  {
    id: 5,
    image: "/images/what.png",
    title: "What If...",
    description: "You have learnt why the world needs Mira now you must see the future with Mira",
    links: [
      { label: "X", url: "https://x.com/shermansensei/status/1949593866979430692" },
      { label: "X", url: "https://x.com/shermansensei/status/1949593866979430692" },
    ],
  },
  {
    id: 6,
    image: "/images/who.jpg",
    title: "Who needs Mira?",
    description: "Ah the final step. To truly become a Knight of Mira you must know who needs your help.",
    links: [
      { label: "X", url: "https://x.com/shermansensei/status/1948891467214381147" },
      { label: "X", url: "https://x.com/shermansensei/status/1948891467214381147" },
    ],
  },
]

// Partners data - easily customizable
const partnersData = [
  { id: 1, text: "Lagrange", image: "/images/lagrange.png", url: "https://lagrange.dev" },
  { id: 2, text: "Gaib", image: "/images/gaib.jpg", url: "https://gaib.ai" },
  { id: 3, text: "Plume", image: "/images/plume.jpg", url: "https://plume.network" },
  { id: 4, text: "Gaia", image: "/images/gaia.jpg", url: "https://gaia.com" },
  { id: 5, text: "Storacha", image: "/images/storacha.png", url: "https://storacha.network" },
  { id: 6, text: "Gigabrain", image: "/images/gigabrain.jpg", url: "https://gigabrain.com" },
  { id: 7, text: "Think", image: "/images/think.jpg", url: "https://think.ai" },
  { id: 8, text: "Arc", image: "/images/arc.jpg", url: "https://arc.net" },
]

function TwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function ArrowConnector({ direction = "down" }: { direction?: "down" | "diagonal-left" | "diagonal-right" }) {
  const getTransform = () => {
    if (direction === "diagonal-left") {
      return "transform -translate-x-12 md:-translate-x-16 rotate-45"
    } else if (direction === "diagonal-right") {
      return "transform translate-x-12 md:translate-x-16 -rotate-45"
    }
    return ""
  }

  return (
    <div className={`flex justify-center py-6 md:py-8 ${getTransform()}`}>
      <div className="flex flex-col items-center gap-2">
        {[...Array(3)].map((_, index) => (
          <ArrowDown key={index} size={24} className="text-amber-500" style={{ opacity: 0.4 + index * 0.3 }} />
        ))}
      </div>
    </div>
  )
}

function BubbleItem({
  data,
  showConnector,
  connectorDirection = "down",
  position = "left" | "right" | "center",
  showNumber = true,
  bubbleNumber,
  showLinks = true,
}: {
  data: (typeof bubbleData)[0]
  showConnector: boolean
  connectorDirection?: "down" | "diagonal-left" | "diagonal-right"
  position?: "left" | "right" | "center"
  showNumber?: boolean
  bubbleNumber?: number
  showLinks?: boolean
}) {
  const [opacity, setOpacity] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2

      // Calculate distance from viewport center
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
      const maxDistance = windowHeight / 3 // Reduced for better visibility

      // Calculate opacity based on distance from center - reaches 1 when centered
      if (distanceFromCenter < 50) {
        setOpacity(1)
      } else {
        const newOpacity = Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7)
        setOpacity(newOpacity)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const finalOpacity = isHovered ? 1 : opacity

  return (
    <div
      ref={elementRef}
      id={`bubble-${data.id}`}
      className={`flex flex-col items-center transition-all duration-300 ${
        position === "left"
          ? "md:self-start md:ml-20 lg:ml-24"
          : position === "right"
            ? "md:self-end md:mr-20 lg:mr-24"
            : ""
      }`}
      style={{ opacity: finalOpacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bubble Container */}
      <div className="relative group">
        {/* Outer ring with grey gradient */}
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          {/* Inner circle with image */}
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            <Image
              src={data.image || "/placeholder.svg"}
              alt={data.title}
              width={200}
              height={200}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Floating badge - only show if showNumber is true */}
        {showNumber && (
          <div className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg border-2 border-gray-400">
            <span className="text-sm md:text-base font-bold text-gray-600">{bubbleNumber}</span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="mt-8 md:mt-10 text-center max-w-xs md:max-w-sm">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-lg">{data.title}</h3>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow-md mb-6">{data.description}</p>

        {/* Links Section - only show if showLinks is true and links exist */}
        {showLinks && data.links && data.links.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-2 drop-shadow-md">Explore:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {data.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-gray-400/30 rounded-full text-xs text-gray-200 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {link.label}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Arrow Connector */}
      {showConnector && <ArrowConnector direction={connectorDirection} />}
    </div>
  )
}

function PartnerBubble({ partner }: { partner: (typeof partnersData)[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center text-center transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{ opacity: isHovered ? 1 : 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Small bubble */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 p-0.5 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <Image
            src={partner.image || "/placeholder.svg"}
            alt={partner.text}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Text */}
      <p className="mt-3 text-xs md:text-sm text-gray-200 max-w-20 md:max-w-24 leading-tight drop-shadow-md">
        {partner.text}
      </p>
    </a>
  )
}

function ScrollIndicator({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-center animate-bounce scale-50">
      <div className="flex flex-col items-center gap-1 bg-black/40 backdrop-blur-sm border border-gray-600/30 rounded-full px-2 py-1.5 hover:bg-black/60 transition-all duration-300">
        <span className="text-white text-[8px] font-medium drop-shadow-lg">Scroll</span>
        <div className="flex flex-col items-center gap-0.5">
          <ArrowDown size={10} className="text-white animate-pulse" />
          <ArrowDown size={8} className="text-white/70 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <ArrowDown size={6} className="text-white/50 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  )
}

export default function GalleryLanding() {
  const [showLargeText, setShowLargeText] = useState(false)
  const [showSmallText, setShowSmallText] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [headerOpacity, setHeaderOpacity] = useState(1)
  const [introOpacity, setIntroOpacity] = useState(1)
  const [galleryTitleOpacity, setGalleryTitleOpacity] = useState(1)
  const [placeholderOpacity, setPlaceholderOpacity] = useState(1)
  const [partnersOpacity, setPartnersOpacity] = useState(1)
  const [headerHovered, setHeaderHovered] = useState(false)
  const [introHovered, setIntroHovered] = useState(false)
  const [galleryTitleHovered, setGalleryTitleHovered] = useState(false)
  const [placeholderHovered, setPlaceholderHovered] = useState(false)
  const [partnersHovered, setPartnersHovered] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [currentLine, setCurrentLine] = useState(0)
  const [adventureTypingText, setAdventureTypingText] = useState("")
  const [designedTypingText, setDesignedTypingText] = useState("")
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  const headerRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const galleryTitleRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const partnersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger large text animation on load
    const timer1 = setTimeout(() => {
      setShowLargeText(true)
    }, 500)

    // Trigger small text animation after large text is done
    const timer2 = setTimeout(() => {
      setShowSmallText(true)
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Calculate opacity for different sections
      const calculateOpacity = (element: HTMLElement | null) => {
        if (!element) return 1

        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2

        const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
        const maxDistance = windowHeight / 3 // Reduced from /2 to /3 for better visibility

        // Ensure opacity reaches 1 when element is perfectly centered
        if (distanceFromCenter < 50) return 1

        return Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7)
      }

      setHeaderOpacity(calculateOpacity(headerRef.current))
      setIntroOpacity(calculateOpacity(introRef.current))
      setGalleryTitleOpacity(calculateOpacity(galleryTitleRef.current))
      setPlaceholderOpacity(calculateOpacity(placeholderRef.current))
      setPartnersOpacity(calculateOpacity(partnersRef.current))

      // Add this to the existing handleScroll function, after the existing opacity calculations
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const clientHeight = window.innerHeight
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

      // Hide scroll indicator when user is near the bottom (90% scrolled)
      setShowScrollIndicator(scrollPercentage < 90)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!showSmallText) return

    const lines = [
      "Bravest one.....",
      "You have chosen to embark on the quest to claim the most honorable of titles.",
      "Knight of Mira.",
      "I Sir Sherman, shall be your guide",
    ]

    let lineIndex = 0
    let charIndex = 0
    let currentText = ""

    const typingTimer = setInterval(() => {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          currentText += lines[lineIndex][charIndex]
          setTypingText(currentText)
          charIndex++
        } else {
          // Move to next line
          currentText += "\n"
          setTypingText(currentText)
          lineIndex++
          charIndex = 0
          // Small pause between lines
          setTimeout(() => {}, 300)
        }
      } else {
        clearInterval(typingTimer)
      }
    }, 80)

    return () => {
      clearInterval(typingTimer)
    }
  }, [showSmallText])

  useEffect(() => {
    const adventureTimer = setTimeout(() => {
      const lines = ["Embark on Your Epic Adventure"]

      const lineIndex = 0
      let charIndex = 0
      let currentText = ""

      const typingTimer = setInterval(() => {
        if (lineIndex < lines.length) {
          if (charIndex < lines[lineIndex].length) {
            currentText += lines[lineIndex][charIndex]
            setAdventureTypingText(currentText)
            charIndex++
          } else {
            clearInterval(typingTimer)
          }
        }
      }, 80)

      return () => {
        clearInterval(typingTimer)
      }
    }, 4000) // Start after intro animation

    return () => clearTimeout(adventureTimer)
  }, [])

  useEffect(() => {
    const designedTimer = setTimeout(() => {
      const fullText = ""
      let currentIndex = 0

      const typingTimer = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDesignedTypingText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingTimer)
        }
      }, 80)

      return () => {
        clearInterval(typingTimer)
      }
    }, 6000) // Start after adventure title animation

    return () => clearTimeout(designedTimer)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/forest-background.jpg" alt="Forest background" fill className="object-cover" priority />
        {/* Dimming overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Fixed Header */}
        <header
          ref={headerRef}
          className={`fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-gray-800/30 transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}
          style={{ opacity: headerHovered ? 1 : headerOpacity }}
          onMouseEnter={() => setHeaderHovered(true)}
          onMouseLeave={() => setHeaderHovered(false)}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Left side - Logo bubble with maximum opacity */}
              <div
                className={`rounded-full overflow-hidden transition-all duration-300 ${
                  isScrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"
                }`}
                style={{ opacity: 1 }} // Keep this at maximum opacity
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center - Website Title */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <h1
                  className={`font-bold text-white drop-shadow-lg transition-all duration-300 ${
                    isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl lg:text-3xl"
                  }`}
                >
                  The Knight's Path
                </h1>
              </div>

              {/* Right side - placeholder for balance */}
              <div className={`${isScrolled ? "w-10 h-10" : "w-12 h-12 md:w-14 md:h-14"}`}></div>
            </div>
          </div>
        </header>

        {/* Intro Section */}
        <section
          ref={introRef}
          className="min-h-screen flex flex-col justify-center items-center px-4 pt-20"
          style={{ opacity: introHovered ? 1 : introOpacity }}
          onMouseEnter={() => setIntroHovered(true)}
          onMouseLeave={() => setIntroHovered(false)}
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Large Text with Fade In */}
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 transition-all duration-1000 drop-shadow-2xl ${
                showLargeText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {"Welcome"}
            </h2>

            {/* Small Paragraph with Delayed Fade In */}
            <p
              className={`text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed transition-all duration-1000 drop-shadow-lg ${
                showSmallText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {typingText}
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div
            ref={galleryTitleRef}
            className="text-center mb-16"
            style={{ opacity: galleryTitleHovered ? 1 : galleryTitleOpacity }}
            onMouseEnter={() => setGalleryTitleHovered(true)}
            onMouseLeave={() => setGalleryTitleHovered(false)}
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              {"CHOOSE YOUR DESTINY"}
            </h3>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              {designedTypingText}
            </p>
          </div>

          {/* Gallery Section */}
          <div className="flex flex-col items-center space-y-12 md:space-y-16">
            {/* First row - Two bubbles side by side */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-40 lg:gap-48 w-full">
              <BubbleItem
                data={bubbleData[0]}
                showConnector={true}
                connectorDirection="diagonal-right"
                position="left"
                showNumber={false}
                showLinks={true}
              />
              <BubbleItem
                data={bubbleData[1]}
                showConnector={true}
                connectorDirection="diagonal-left"
                position="right"
                showNumber={false}
                showLinks={true}
              />
            </div>

            {/* Remaining bubbles - vertical layout with numbering starting from 1 */}
            {bubbleData.slice(2).map((bubble, index) => (
              <BubbleItem
                key={bubble.id}
                data={bubble}
                bubbleNumber={index + 1}
                showConnector={index < bubbleData.slice(2).length - 1}
                connectorDirection="down"
                position="center"
                showNumber={false}
                showLinks={true}
              />
            ))}
          </div>

          {/* Placeholder Text Section */}
          <div
            ref={placeholderRef}
            className="mt-16 md:mt-20 mb-12 md:mb-16"
            style={{ opacity: placeholderHovered ? 1 : placeholderOpacity }}
            onMouseEnter={() => setPlaceholderHovered(true)}
            onMouseLeave={() => setPlaceholderHovered(false)}
          >
            <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
                {adventureTypingText}
              </h2>
              <div className="text-gray-200 text-base md:text-lg leading-relaxed drop-shadow-md space-y-4">
                {placeholderContent.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div
            ref={partnersRef}
            style={{ opacity: partnersHovered ? 1 : partnersOpacity }}
            onMouseEnter={() => setPartnersHovered(true)}
            onMouseLeave={() => setPartnersHovered(false)}
          >
            <div className="bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
                Your Allies on this Journey
              </h2>

              {/* Eight small bubbles in a grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {partnersData.map((partner) => (
                  <PartnerBubble key={partner.id} partner={partner} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Social Links */}
        <div className="fixed bottom-4 left-4 z-50 flex gap-3">
          <a
            href="https://discord.gg/EAwmjGmH"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-black/40 backdrop-blur-sm border border-gray-600/30 rounded-full hover:bg-black/60 transition-all duration-300 hover:scale-110"
            title="Join our Discord"
          >
            <MessageCircle size={20} className="text-white" />
          </a>
          <a
            href="https://x.com/Mira_Network"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-black/40 backdrop-blur-sm border border-gray-600/30 rounded-full hover:bg-black/60 transition-all duration-300 hover:scale-110"
            title="Follow on Twitter"
          >
            <TwitterIcon size={20} />
          </a>
        </div>
        {/* Scroll Indicator */}
        <ScrollIndicator show={showScrollIndicator} />
      </div>
    </div>
  )
}
