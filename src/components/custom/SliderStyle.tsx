import { useState } from "react";

import watercolor from "./../../assets/watercolor.jpg";
import ModernGradientSlider from "./../../assets/gradient.webp";
import techSlider from "./../../assets/futuristic.jpeg";
import DarkSlider from "./../../assets/dark.jpg";
import minimalist from "./../../assets/minimalist.jpg";
import glassmorphism from "./../../assets/glassmorphism.jpg";

const Design_Styles = [
  {
    styleName: "Futuristic Neon ",
    colors: {
      primary: "#00FFFF",
      secondary: "#FF00FF",
      accent: "#0A0A1A",
      background: "#010101",
      gradient: "linear-gradient(135deg, #00FFFF, #FF00FF)",
    },
    designGuide:
      "🧠 Generate a futuristic neon-style PPT with glowing text, cyberpunk colors, and dark glass backgrounds. Use modern sans-serif fonts and motion-inspired visuals.",
    icon: "Zap",
    bannerImage: techSlider,
  },
  {
    styleName: "Modern Glassmorphism ",
    colors: {
      primary: "#FFFFFF", // White
      secondary: "#E0E0E0", // Light Grey
      accent: "#8A2BE2", // Vibrant Purple
      background: "#F5F5F5", // Light Background
      gradient: "linear-gradient(135deg, #8A2BE2, #00C9FF, #92FE9D)",
    },
    designGuide:
      "💎 Design a modern, tech-savvy presentation. Use a bright, colorful abstract gradient (purple, blue, green) as the main background. Place content on semi-transparent, frosted glass (glassmorphism) overlays. Use white text, minimal icons, and blur effects for a clean, futuristic, UI-inspired look.",
    icon: "Sparkle",
    bannerImage: glassmorphism,
  },
  {
    styleName: "Minimalist Bauhaus ",
    colors: {
      primary: "#1C1C1C", // Black
      secondary: "#E20613", // Bold Red
      accent: "#F8D41D", // Primary Yellow
      background: "#F5F5F5", // Light Cream/Beige
      gradient: "linear-gradient(135deg, #F5F5F5, #FEFBF1)",
    },
    designGuide:
      "🟥 Generate a minimalist, Bauhaus-style presentation. Use a light cream or beige background. Focus on strong, black sans-serif typography, grid-based layouts, and simple geometric shapes (circles, squares, triangles) in primary colors (red, yellow, blue) as accents. Emphasize whitespace and functional clarity.",
    icon: "Triangle",
    bannerImage: minimalist,
  },
  {
    styleName: "Modern Gradient ",
    colors: {
      primary: "#8A2BE2",
      secondary: "#00C9FF",
      accent: "#92FE9D",
      background: "#FFFFFF",
      gradient: "linear-gradient(135deg, #8A2BE2, #00C9FF, #92FE9D)",
    },
    designGuide:
      "🧠 Design a modern gradient-style PPT with vibrant gradient backgrounds, glassmorphism overlays, and smooth transitions. Use modern typography and bright gradients for an innovative, tech-savvy vibe.",
    icon: "Sparkle",
    bannerImage: ModernGradientSlider,
  },
  {
    styleName: "Elegant Dark ",
    colors: {
      primary: "#D0D0D0",
      secondary: "#1F1F1F",
      accent: "#FFD700",
      background: "#0D0D0D",
      gradient: "linear-gradient(135deg, #0D0D0D, #1F1F1F)",
    },
    designGuide:
      "♠️ Create a luxury-style dark presentation with black and gold accents, serif fonts, and subtle lighting effects. Keep it premium, cinematic, and elegant.",
    icon: "Star",
    bannerImage: DarkSlider,
  },
  {
    styleName: "Abstract Watercolor ",
    colors: {
      primary: "#005F73", // Deep Teal
      secondary: "#94D2BD", // Soft Mint
      accent: "#E9D8A6", // Pale Gold
      background: "#FAF9F6", // Off-white/Paper Texture
      gradient: "linear-gradient(135deg, #94D2BD, #E9D8A6)",
    },
    designGuide:
      "🎨 Build an artistic and creative presentation. Use a textured, off-white paper background. Generate soft, abstract watercolor washes (or 'blooms') in teal, mint, and pale gold for backgrounds and accents. Pair with a clean sans-serif font for a gentle, hand-crafted, and approachable aesthetic.",
    icon: "Palette",
    bannerImage: watercolor,
  },
];

type Props = {
  selectStyle: any;
};

export type DesignStyle = {
  styleName: string;
  colors: any;
  designGuide: string;
  icon: string;
  bannerImage: any;
};

function SliderStyle({ selectStyle }: Props) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  return (
    <div className="mt-6">
      <h2 className="font-bold text-3xl text-foreground mb-4 flex items-center gap-2">
        <span className="bg-primary w-1 h-6 rounded-full"></span>
        <span>Select Slide Design Style</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Design_Styles.map((design, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
              design.styleName === selectedStyle
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "hover:shadow-lg"
            } `}
            onClick={() => {
              setSelectedStyle(design.styleName);
              selectStyle(design);
            }}
          >
            <div className="relative">
              <img
                src={design.bannerImage}
                alt={design.styleName}
                width={300}
                height={120}
                className="w-full h-[120px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h2 className="absolute bottom-2 left-0 right-0 text-center text-white font-semibold text-sm px-2">
                {design.styleName}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderStyle;
