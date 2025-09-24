"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubscribeStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus("success")
      setEmail("")
      setTimeout(() => setSubscribeStatus("idle"), 3000)
    }, 1000)
  }

  const footerLinks = {
    products: [
      { name: "Routers", href: "#products" },
      { name: "Switches", href: "#products" },
      { name: "Firewalls", href: "#products" },
      { name: "Wireless", href: "#products" },
      { name: "Security", href: "#products" },
      { name: "Monitoring", href: "#products" },
    ],
    services: [
      { name: "Network Design", href: "#services" },
      { name: "Installation", href: "#services" },
      { name: "Maintenance", href: "#services" },
      { name: "24/7 Support", href: "#services" },
      { name: "Consulting", href: "#services" },
      { name: "Training", href: "#services" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "News", href: "#news" },
      { name: "Partners", href: "#partners" },
      { name: "Contact", href: "#contact" },
    ],
    support: [
      { name: "Help Center", href: "#support" },
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "System Status", href: "#status" },
      { name: "Security", href: "#security" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: "fab fa-facebook-f", href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "fab fa-twitter", href: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: "fab fa-linkedin-in", href: "#", color: "hover:text-blue-700" },
    { name: "Instagram", icon: "fab fa-instagram", href: "#", color: "hover:text-pink-600" },
    { name: "YouTube", icon: "fab fa-youtube", href: "#", color: "hover:text-red-600" },
  ]

  const contactInfo = [
    { icon: "fas fa-map-marker-alt", text: "123 Tech Street, Silicon Valley, CA 94000" },
    { icon: "fas fa-phone", text: "+1 (555) 123-4567" },
    { icon: "fas fa-envelope", text: "info@nettechpro.com" },
    { icon: "fas fa-clock", text: "Mon-Fri: 9AM-6PM PST" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 nettech-gradient rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-network-wired text-white text-xl" />
              </div>
              <span className="text-2xl font-bold">NetTech Pro</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in network infrastructure solutions. We provide cutting-edge technology and expert
              support to help your business thrive in the digital age.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <i className={`${item.icon} text-blue-400 mt-1 mr-3 w-4`} />
                  <span className="text-gray-400 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:mx-0">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest network technology insights and product updates.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                disabled={subscribeStatus === "loading"}
                className="px-6 py-3 nettech-gradient text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeStatus === "loading" ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2" />
                    Subscribing...
                  </>
                ) : subscribeStatus === "success" ? (
                  <>
                    <i className="fas fa-check mr-2" />
                    Subscribed!
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 NetTech Pro. All rights reserved. |
              <Link href="#privacy" className="hover:text-white ml-1">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="#terms" className="hover:text-white ml-1">
                Terms of Service
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700 ${social.color}`}
                  aria-label={social.name}
                >
                  <i className={social.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 nettech-gradient rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up" />
      </button>
    </footer>
  )
}

export default Footer
