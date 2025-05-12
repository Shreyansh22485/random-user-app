/**
 * Service for fetching user data from the Random User API
 */

/**
 * Fetches 100 random users from the API
 * @returns {Promise<Array>} Promise that resolves to an array of user objects
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
