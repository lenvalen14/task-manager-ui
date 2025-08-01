import { HeaderSection } from "../components/section/header"
import { FooterSection } from "../components/section/footer"
import { HeroSection } from "@/components/section/hero"
import { FeatureSection } from "@/components/section/feature"
import { TestimonialSection } from "@/components/section/testimonial"
export default function HomePage() {
  return (

    <div className="min-h-screen">
      <HeaderSection />
      <main>
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
      </main>
      <FooterSection />
    </div>
  )
}
