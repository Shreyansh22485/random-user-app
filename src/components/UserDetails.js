'use client';

import Image from 'next/image';

/**
 * UserDetails component to display detailed information about a selected user
 * @param {Object} props - Component props
 * @param {Object} props.user - Selected user object
 * @returns {JSX.Element} User details component
 */
export default function UserDetails({ user }) {  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200 shadow-sm h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-500 text-lg font-medium">Select a user to view details</p>
        <p className="text-gray-400 text-sm mt-2">Search and select a user from the dropdown</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 flex justify-center">
        <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden shadow-lg">
          <Image
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            width={144}
            height={144}
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {user.name.first} <span className="text-blue-600">{user.name.last}</span>
        </h2>
          <div className="space-y-5">
          <div className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 font-medium">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</span>
          </div>
          
          <div className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline font-medium">{user.email}</a>
          </div>
          
          <div className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href={`tel:${user.phone}`} className="text-blue-600 hover:underline font-medium">{user.phone}</a>
          </div>
          
          <div className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 font-medium">{user.location.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
