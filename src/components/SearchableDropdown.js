'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/**
 * Custom debounce hook to delay function execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function useDebounce(func, delay) {
  const debounceRef = useRef(null);
  
  return useCallback((...args) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);
}

/**
 * SearchableDropdown component for filtering and selecting users
 * @param {Object} props - Component props
 * @param {Array} props.users - Array of user objects
 * @param {Function} props.onSelectUser - Callback function when a user is selected
 * @returns {JSX.Element} Searchable dropdown component
 */
export default function SearchableDropdown({ users, onSelectUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);
  
  // Debounce the search term updates
  const debouncedSetSearch = useDebounce((value) => {
    setDebouncedSearchTerm(value);
  }, 300);
  
  // Update the debounced search term when the input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearch(value);
    setActiveIndex(-1);
  };
  // Handle key navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < filteredUsers.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredUsers.length) {
          handleSelectUser(filteredUsers[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeElement = listRef.current.children[activeIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  // Filter users based on debounced search term
  useEffect(() => {
    if (!users) return;
    
    const filtered = debouncedSearchTerm.trim() === '' 
      ? users 
      : users.filter(user => 
          user.name.first.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    
    setFilteredUsers(filtered);
    setActiveIndex(-1);
  }, [debouncedSearchTerm, users]);
  // Handle focus events
  const handleFocus = () => {
    if (filteredUsers.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle user selection
  const handleSelectUser = (user) => {
    onSelectUser(user);
    setIsOpen(false);
    setSearchTerm('');
  };
  return (
    <div className="relative w-full" ref={dropdownRef}><div className="relative">        <input
          type="text"
          placeholder="Search users by first name..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-800 font-medium placeholder:text-gray-500 placeholder:font-normal text-base"
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(true)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={isOpen ? "user-search-dropdown" : undefined}
          aria-activedescendant={activeIndex >= 0 ? `user-item-${activeIndex}` : undefined}
        /><svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-500 flex items-center justify-between">
            <span>{filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found</span>
            {searchTerm !== debouncedSearchTerm && (
              <span className="text-xs text-blue-500 flex items-center">
                <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            )}
          </div>
          {filteredUsers.length > 0 ? (
            <ul className="py-1 divide-y divide-gray-100">
              {filteredUsers.map((user) => (                <li 
                  key={user.login.uuid}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-4 border-2 border-blue-100 flex-shrink-0">
                    <Image 
                      src={user.picture.thumbnail} 
                      alt={`${user.name.first} ${user.name.last}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <span className="font-semibold text-gray-900">{user.name.first} <span className="font-bold text-blue-700">{user.name.last}</span></span>
                </li>
              ))}            </ul>
          ) : (
            <p className="px-4 py-3 text-gray-500 text-center">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}
