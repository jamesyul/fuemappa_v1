import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-neutral-700 pt-4">
          <div className="text-sm text-neutral-400 mb-4 md:mb-0">
            © fuem2025 todos los derechos reservados.
          </div>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com"
              className="text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://twitter.com"
              className="text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://instagram.com"
              className="text-neutral-400 hover:text-neutral-100 transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;