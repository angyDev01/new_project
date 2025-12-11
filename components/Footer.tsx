
import React from 'react';
import { SparklesIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <SparklesIcon className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold">Pure Store</span>
          </div>
          <p className="text-sm text-secondary/70">
            © {new Date().getFullYear()} Pure Store, Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-secondary/70 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-secondary/70 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
