"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import AnimatedSection from "./animated-section"
import SearchBar from "./search-bar"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description?: string
  features?: string[]
  inStock: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Enterprise Router",
    price: 1299.99,
    image: "/enterprise-router-network-device.jpg",
    category: "Routers",
    description: "High-performance enterprise router with advanced routing capabilities",
    features: ["Gigabit Ethernet", "VPN Support", "QoS Management", "24/7 Support"],
    inStock: true,
  },
  {
    id: 2,
    name: "24-Port Managed Switch",
    price: 899.99,
    image: "/managed-switch-24-port-network.jpg",
    category: "Switches",
    description: "Professional managed switch with 24 ports for enterprise networks",
    features: ["24 Gigabit Ports", "VLAN Support", "Web Management", "PoE+ Ready"],
    inStock: true,
  },
  {
    id: 3,
    name: "Security Firewall",
    price: 2199.99,
    image: "/security-firewall-enterprise-protection.jpg",
    category: "Security",
    description: "Advanced firewall solution for comprehensive network security",
    features: ["Deep Packet Inspection", "Intrusion Prevention", "VPN Gateway", "Threat Intelligence"],
    inStock: true,
  },
  {
    id: 4,
    name: "WiFi 6 Access Point",
    price: 449.99,
    image: "/wifi-access-point-wireless-network.jpg",
    category: "Wireless",
    description: "Next-generation WiFi 6 access point for high-speed wireless connectivity",
    features: ["WiFi 6 Standard", "MU-MIMO", "Beamforming", "Cloud Management"],
    inStock: true,
  },
  {
    id: 5,
    name: "Load Balancer",
    price: 1799.99,
    image: "/load-balancer-network-optimization.jpg",
    category: "Optimization",
    description: "Intelligent load balancer for optimal traffic distribution",
    features: ["SSL Offloading", "Health Monitoring", "Auto Scaling", "API Integration"],
    inStock: false,
  },
  {
    id: 6,
    name: "Network Monitor",
    price: 999.99,
    image: "/network-monitor-management-system.jpg",
    category: "Monitoring",
    description: "Comprehensive network monitoring and management solution",
    features: ["Real-time Monitoring", "Alert System", "Performance Analytics", "Custom Reports"],
    inStock: true,
  },
]

const FeaturedProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))]

  const handleSearch = (query: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === "All") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.category === category))
    }
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <div className="w-20 h-1 nettech-gradient mx-auto rounded-full mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of enterprise-grade network equipment from leading manufacturers
              worldwide.
            </p>
          </div>
        </AnimatedSection>

        {/* Search and Filter Controls */}
        <AnimatedSection delay={200}>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-12">
            <SearchBar onSearch={handleSearch} className="w-full sm:w-auto" />

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <AnimatedSection>
            <div className="text-center py-16">
              <div className="text-6xl text-gray-300 mb-4">
                <i className="fas fa-search" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts
