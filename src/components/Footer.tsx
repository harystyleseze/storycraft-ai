"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Heart,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "API", href: "#api" },
        { label: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "#help" },
        { label: "Documentation", href: "#docs" },
        { label: "Tutorials", href: "#tutorials" },
        { label: "Blog", href: "#blog" },
        { label: "Community", href: "#community" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Press Kit", href: "#press" },
        { label: "Contact", href: "#contact" },
        { label: "Partners", href: "#partners" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "GDPR", href: "#gdpr" },
        { label: "Licenses", href: "#licenses" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
    { icon: Youtube, href: "#youtube", label: "YouTube" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.0, 0.0, 0.2, 1.0] as any,
      },
    },
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-xl text-slate-300 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new features, AI improvements, and
              creative inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-600 text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 group">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StoryCraft AI
              </span>
            </div>
            <p className="text-slate-300 dark:text-slate-400 mb-6 leading-relaxed">
              Empowering everyone to transform their imagination into beautiful,
              shareable stories. No technical skills required—just your
              creativity and our AI.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-800 dark:bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-semibold text-white dark:text-slate-100 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: sectionIndex * 0.1 + linkIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4 text-sm text-slate-400 dark:text-slate-500">
              <span>
                © {new Date().getFullYear()} StoryCraft AI. All rights reserved.
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center">
                Made for storytellers everywhere
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#status"
                className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-200 transition-colors"
              >
                System Status
              </a>
              <span className="text-slate-600 dark:text-slate-500">•</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-400 dark:text-slate-500">
                  All systems operational
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 text-6xl text-purple-500/10"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            y: [20, -20, 20],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-3/4 right-1/4 text-4xl text-pink-500/10"
        >
          🎬
        </motion.div>
      </div>
    </footer>
  );
}
