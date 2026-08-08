import { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sun, Moon } from 'reicon-react';
import ClayButton from '../../ui/Button';
import { useTheme } from '../ThemeContext';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';

import BuyMeACoffeeIcon from '../../ui/BuyMeACoffeeIcon';

interface HeaderProps {
  className?: string;
}

const Header = forwardRef<HTMLElement, HeaderProps>(function Header({ className = '' }, ref) {
  const { theme, toggleTheme } = useTheme();
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/dqev/reicon')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-50 p-4 md:px-10 md:py-5 pointer-events-none bg-transparent transition-colors duration-300 ${className}`}>
      <div className="relative flex items-center justify-between pointer-events-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-text-base font-semibold text-[14px] bg-text-base/[0.04] backdrop-blur-lg rounded-full px-3.5 py-[7px] hover:bg-text-base/10 transition-all duration-150 shadow-2xs shrink-0"
        >
          <img src={theme === 'dark' ? '/icon-light.webp' : '/icon-dark.webp'} alt="Reicon" loading="lazy" className="w-4.5 h-4.5" />
          <span>Reicon</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 bg-text-base/[0.04] backdrop-blur-lg rounded-full p-1 shadow-2xs">
          <Link to="/docs" className="text-[13px] font-medium text-text-base/80 hover:text-text-base transition-colors px-3.5 py-1.5 rounded-full hover:bg-text-base/10">Docs</Link>
          <Link to="/icons" className="text-[13px] font-medium text-text-base/80 hover:text-text-base transition-colors px-3.5 py-1.5 rounded-full hover:bg-text-base/10">Icons</Link>
          <Link to="/illustration" className="text-[13px] font-medium text-text-base/80 hover:text-text-base transition-colors px-3.5 py-1.5 rounded-full hover:bg-text-base/10">Illustration</Link>
          <Link to="/logos" className="text-[13px] font-medium text-text-base/80 hover:text-text-base transition-colors px-3.5 py-1.5 rounded-full hover:bg-text-base/10">Logos</Link>
          <Link to="/packages" className="text-[13px] font-medium text-text-base/80 hover:text-text-base transition-colors px-3.5 py-1.5 rounded-full hover:bg-text-base/10">Packages</Link>
          <Link to="/faq" className="text-[13px] font-medium text-text-base/80 hover:text-text-base transition-colors px-3.5 py-1.5 rounded-full hover:bg-text-base/10">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-text-base/[0.04] backdrop-blur-lg hover:bg-text-base/10 text-text-base/80 hover:text-text-base transition-colors cursor-pointer hidden md:flex"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} color="currentColor" /> : <Moon size={15} color="currentColor" />}
          </button>
          <MobileMenu stars={stars} theme={theme} toggleTheme={toggleTheme} />
          <div className="hidden md:flex gap-2">
            <Link
              to="/support"
              className="text-[13px] text-text-base/80 bg-text-base/[0.04] backdrop-blur-lg rounded-full px-4 py-[7px] hover:bg-text-base/10 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <BuyMeACoffeeIcon size={15} />
              Support
            </Link>
            <a
              href="https://github.com/dqev/reicon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-text-base/80 bg-text-base/[0.04] backdrop-blur-lg rounded-full px-4 py-[7px] hover:bg-text-base/10 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              GitHub
              {stars !== null && (
                <span className="flex items-center gap-0.5 text-text-base/50 text-[11px] font-medium border-l border-text-base/15 pl-1.5">
                  <Star size={11} weight="Filled" color="#eab308" className="shrink-0 relative -top-[0.5px]" />
                  {stars}
                </span>
              )}
            </a>
            <ClayButton to="/icons" variant="primary" size="sm">Browse Icons</ClayButton>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
