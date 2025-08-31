import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from "lucide-react";

const Dropdown = ({
  trigger = <ChevronDown size={20} className="text-textDark" />,
  children,
}) => {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState('left-0');

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const dropdownWidth = 192; // w-48 = 192px
      const screenWidth = window.innerWidth;
      
      // Check if dropdown would overflow on the right
      if ((rect.left + dropdownWidth ) >( screenWidth - 16)) {
        setPosition('right-2');
      } else {
        setPosition('left-2');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <section className='relative isolate' ref={dropdownRef}>
      <div onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className={`absolute top-full ${position} mt-1 w-48 bg-white border border-accentDark rounded-lg shadow-lg z-50`}>
          {children}
        </div>
      )}
    </section>
  )
}

export default Dropdown