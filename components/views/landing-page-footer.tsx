import Link from "next/link"

const features = [
  {
    number: "1",
    title: "Bilingual Learning",
    description: "All courses available in both English and Spanish with our innovative EchoLines format.",
  },
  {
    number: "2",
    title: "Completion Certificates",
    description: "Earn a certificate upon successful completion of each course.",
  },
  {
    number: "3",
    title: "Learn Anywhere",
    description: "Access your courses on any device, anytime. Complete at your own pace.",
  },
]

const footerLinks = {
  platform: [
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export default function LandingFooter() {
  return (
    <div className="bg-white">
      {/* Why Choose CertWorld Section */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CertWorld?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.number} className="bg-white rounded-lg p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">{feature.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-bold text-blue-500 mb-4 block">
                CertWorld
              </Link>
              <p className="text-gray-500">Discovery a world of opportunities</p>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">PLATFORM</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-700 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">SUPPORT</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-700 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">LEGAL</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-700 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">© 2025 CertWorld. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
