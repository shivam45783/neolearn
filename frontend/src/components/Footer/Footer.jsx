import React from 'react'
import { Mail, Phone } from "lucide-react";
import { assets } from '../../assets/assets';
import "../../index.css";
const Footer = () => {
  return (
    <footer className="bg-[var(--footer-color)] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
          <div className="app-branding flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <img src={assets.logo} alt="" className="w-[40px]" />
              <h1 className="text-xl font-semibold">NeoLearn</h1>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              “Trusted by 10,000+ learners”
            </p>
          </div>

          <div className="footer-links flex flex-col items-center md:items-start">
            <h2 className="text-sm font-bold mb-3">NeoLearn</h2>
            <ul className="flex flex-col gap-2 text-gray-300 text-sm">
              <li className="cursor-pointer hover:underline hover:text-white">
                Home
              </li>
              <li className="cursor-pointer hover:underline hover:text-white">
                About us
              </li>
              <li className="cursor-pointer hover:underline hover:text-white">
                Privacy Policy
              </li>
            </ul>
          </div>

          <div className="footer-contact-links flex flex-col items-center md:items-start">
            <h2 className="text-sm font-bold mb-3">GET IN TOUCH</h2>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Phone size={16} />
              <span>+1-222-472894</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <Mail size={16} />
              <span>neolearn.service@gmail.com</span>
            </div>
          </div>
        </div>

        <hr
          className="my-4 border-t"
          style={{ borderColor: "var(--color-divider)", opacity: 0.3 }}
        />

        <div className="footer-quote mt-5 text-center text-gray-300 text-xs">
          <p className="italic mb-2">
            Empowering learning through technology and innovation.
          </p>
          <p>© 2025 NeoLearn. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer