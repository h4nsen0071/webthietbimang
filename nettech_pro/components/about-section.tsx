"use client"

import { useState } from "react"
import Image from "next/image"
import AnimatedSection from "./animated-section"

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("mission")

  const stats = [
    { number: "15+", label: "Years Experience", icon: "fas fa-calendar-alt" },
    { number: "500+", label: "Happy Clients", icon: "fas fa-users" },
    { number: "1000+", label: "Projects Completed", icon: "fas fa-project-diagram" },
    { number: "24/7", label: "Support Available", icon: "fas fa-headset" },
  ]

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "At NetTech Pro, we're dedicated to providing cutting-edge network solutions that empower businesses to thrive in the digital age. Our mission is to bridge the gap between complex technology and practical business needs, delivering reliable, scalable, and secure network infrastructure that drives success.",
      highlights: [
        "Innovative network solutions tailored to your business",
        "Commitment to excellence in every project",
        "Building long-term partnerships with our clients",
        "Staying ahead of technology trends and innovations",
      ],
    },
    vision: {
      title: "Our Vision",
      content:
        "We envision a world where seamless connectivity enables unlimited possibilities. Our vision is to be the leading provider of network solutions that not only meet today's demands but anticipate tomorrow's challenges, creating a foundation for digital transformation and growth.",
      highlights: [
        "Leading the future of network technology",
        "Enabling digital transformation for all businesses",
        "Creating sustainable and scalable solutions",
        "Fostering innovation through collaboration",
      ],
    },
    values: {
      title: "Our Values",
      content:
        "Our core values guide everything we do, from the products we select to the services we provide. We believe in integrity, innovation, and excellence, ensuring that every client receives the highest quality solutions and support.",
      highlights: [
        "Integrity in all our business practices",
        "Innovation driving our solution development",
        "Excellence as our standard of service",
        "Customer success as our primary goal",
      ],
    },
  }

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About NetTech Pro</h2>
            <div className="w-20 h-1 nettech-gradient mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in network infrastructure solutions, delivering excellence since 2008.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content Side */}
          <AnimatedSection>
            <div className="space-y-8">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200">
                {Object.entries(tabContent).map(([key, content]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 font-semibold rounded-t-lg transition-all duration-300 ${
                      activeTab === key
                        ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    {content.title}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white p-8 rounded-lg nettech-shadow-light">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tabContent[activeTab as keyof typeof tabContent].title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tabContent[activeTab as keyof typeof tabContent].content}
                </p>
                <ul className="space-y-3">
                  {tabContent[activeTab as keyof typeof tabContent].highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check-circle text-blue-600 mt-1 mr-3" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Image Side */}
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden nettech-shadow-heavy">
                <Image
                  src="/network-operations-center-team.jpg"
                  alt="NetTech Pro team working in network operations center"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl nettech-shadow-heavy">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 nettech-gradient rounded-full flex items-center justify-center">
                    <i className="fas fa-award text-white text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">ISO 27001</div>
                    <div className="text-sm text-gray-600">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats Section */}
        <AnimatedSection delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl nettech-shadow-light hover:nettech-shadow-heavy transition-all duration-300 group"
              >
                <div className="w-16 h-16 nettech-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${stat.icon} text-white text-2xl`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={600}>
          <div className="text-center mt-16">
            <div className="bg-white p-8 rounded-2xl nettech-shadow-light max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Network Infrastructure?</h3>
              <p className="text-gray-600 mb-6">
                Let our experts help you design and implement a network solution that grows with your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 nettech-gradient text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                  <i className="fas fa-phone mr-2" />
                  Contact Us Today
                </button>
                <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <i className="fas fa-download mr-2" />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default AboutSection
