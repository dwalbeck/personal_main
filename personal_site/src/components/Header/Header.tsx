import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      <nav className="bg-gray-50 p-3 relative">
        <div className="flex justify-between items-center">
          {/* Flex container for name and links */}
          <div className="flex items-center space-x-8">
            {/* Name section */}
            <a className="font-bold text-xl text-purple-800" href="/">Davey Walbeck</a>

            {/* Desktop navigation links (left-aligned) */}
            <div className="hidden lg:flex" id="navbarNav">
              <ul className="flex space-x-4">
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                    href="#home">Home</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                    href="#experience">Experience</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                    href="#skills">Skills</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                    href="#projects">Projects</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                     href="#meetdavey">Meet Davey</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                     href="#interests">Interests</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                    href="#qanda">Q & A</a>
                </li>
                <li>
                  <a className="text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline hover:scale-110 inline-block"
                    href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile menu button (custom burger icon) */}
          <button
            className="lg:hidden flex flex-col justify-center items-center p-2 border border-gray-300 rounded-md"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {/* Burger Icon */}
            <div className='space-y-1'>
              <span className="block w-6 h-0.5 bg-gray-500"></span>
              <span className="block w-6 h-0.5 bg-gray-500"></span>
              <span className="block w-6 h-0.5 bg-gray-500"></span>
            </div>
          </button>
        </div>

        {/* Mobile dropdown menu (fixed position, overlay) */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-50 z-50 shadow-md">
            <ul className="space-y-2 p-4">
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                  href="#home" onClick={closeMenu}>Home</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                  href="#experience" onClick={closeMenu}>Experience</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                  href="#skills" onClick={closeMenu}>Skills</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                  href="#projects" onClick={closeMenu}>Projects</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                   href="#meetdavey" onClick={closeMenu}>Meet Davey</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                   href="#interests" onClick={closeMenu}>Interests</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                   href="#qanda" onClick={closeMenu}>Q & A</a>
              </li>
              <li>
                <a className="block text-sm text-gray-500 hover:text-gray-600 no-underline hover:no-underline"
                   href="#contact" onClick={closeMenu}>Contact</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
