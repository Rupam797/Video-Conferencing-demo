import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 py-4 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">VideoMeet</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/support"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => console.log("Join meeting clicked")}
            >
              Join Meeting
            </Button>
            <AuthModal
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              }
              defaultTab="login"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/support"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full"
                onClick={() => {
                  console.log("Join meeting clicked");
                  setIsMenuOpen(false);
                }}
              >
                Join Meeting
              </Button>
              <AuthModal
                trigger={
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                }
                defaultTab="login"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
