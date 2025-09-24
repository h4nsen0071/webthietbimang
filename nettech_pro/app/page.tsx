"use client"
import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import NotificationSystem from "@/components/notification-system"
import { useNotifications } from "@/hooks/use-notifications"

export default function HomePage() {
  const { notifications, addNotification, removeNotification } = useNotifications()

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <FeaturedProducts />
      <AboutSection />
      <Footer />
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />
    </main>
  )
}
