import { useState, useEffect } from 'react';
import Hero from '../assets/Hero.jpeg';

function HeroSection() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to control navbar visibility
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Function to toggle navigation menu
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (token) {
        try {
          const response = await fetch('https://eazy-byts-ten.vercel.app/api/users', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the request header
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data.users[0]); // Assuming we're only fetching one user
            setLoading(false); // Set loading to false after data is fetched
          } else {
            console.error('Failed to fetch user data');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      } else {
        console.error('No token found');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Disable body scroll when the navigation is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }, [isNavOpen]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <>
      <div
        className={`relative grid grid-cols-1 py-4 text-white grid-rows-[2fr_15fr_2fr] bg-no-repeat bg-cover  w-[99vw] h-screen`}
        style={{ backgroundImage: `url(${Hero})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-800 bg-opacity-80"></div>

        {/* Navbar */}
        <div className="h-20 bg-transparent grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_6fr]  md:grid-cols-[2fr_4fr] relative z-10">
          <div className="flex justify-start px-10 sm:px-20 items-center p-3">
            <h1 className="text-4xl sm:text-4xl md:text-5xl">
              {userData ? (
                <>
                  G<span className="text-yellow-500 px-1 text-3xl">uruprasad</span>
                </>
              ) : (
                'Loading...'
              )}
            </h1>
          </div>

          {/* Hamburger Menu for mobile */}
          <div className="flex md:hidden justify-end items-center px-10">
            <button onClick={toggleNav}>
              {isNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden sm:hidden md:flex flex-row justify-evenly items-center">
            <h3 className="text-lg sm:text-2xl md:text-3xl hover:text-yellow-400">
              <a href="#home">Home</a>
            </h3>
            <h3 className="text-lg sm:text-2xl md:text-3xl hover:text-yellow-400">
              <a href="#About">About</a>
            </h3>
            <h3 className="text-lg sm:text-2xl md:text-3xl hover:text-yellow-400">
              <a href="#Project">Project</a>
            </h3>
            <h3 className="text-lg sm:text-2xl md:text-3xl hover:text-yellow-400">
              <a href="#Skills">Skills</a>
            </h3>
            
            <h3 className="text-lg sm:text-2xl md:text-3xl hover:text-yellow-400">
              <a href="#Blog">Blog</a>
            </h3>
            <h3 className="text-lg sm:text-2xl md:text-3xl hover:text-yellow-400">
              <a href="#Contact">Contact</a>
            </h3>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 flex flex-col justify-center items-center z-50 transition-transform duration-500 ease-in-out ${
            isNavOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          {/* Close Button */}
          <button onClick={toggleNav} className="absolute top-5 right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links for Mobile */}
          <h3
            className="text-3xl text-white py-4 hover:text-yellow-400 transition-opacity duration-300 ease-in-out"
            onClick={toggleNav}
          >
            <a href="#home">Home</a>
          </h3>
          <h3
            className="text-3xl text-white py-4 hover:text-yellow-400 transition-opacity duration-300 ease-in-out"
            onClick={toggleNav}
          >
            <a href="#About">About</a>
          </h3>
          
          <h3
            className="text-3xl text-white py-4 hover:text-yellow-400 transition-opacity duration-300 ease-in-out"
            onClick={toggleNav}
          >
            <a href="#Project">Project</a>
          </h3>
          <h3
            className="text-3xl text-white py-4 hover:text-yellow-400 transition-opacity duration-300 ease-in-out"
            onClick={toggleNav}
          >
            <a href="#Skills">Skills</a>
          </h3>
          <h3
            className="text-3xl text-white py-4 hover:text-yellow-400 transition-opacity duration-300 ease-in-out"
            onClick={toggleNav}
          >
            <a href="#Contact">Contact</a>
          </h3>
          <h3
            className="text-3xl text-white py-4 hover:text-yellow-400 transition-opacity duration-300 ease-in-out"
            onClick={toggleNav}
          >
            <a href="#blog">Blog</a>
          </h3>
          
        </div>

        {/* Profile Section */}
        <div className="flex justify-center items-center z-10">
          <div className="flex flex-col justify-center items-center gap-6 md:gap-10">
            <img
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[310px] rounded-full object-top"
              src={userData ? userData.profilePicture : "Loading"} // Display the profile picture from the user data
              alt="Profile"
            />
            <div className="flex flex-col justify-between gap-4 md:gap-6 items-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl text-yellow-500">
                {userData ? userData.name : 'Loading...'}
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl">
                {userData ? userData.mainStack : 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="z-10 flex justify-start items-center px-4 md:px-10">
          <h1 className="px-2">_______</h1>
          <h1 className="pt-3 text-sm sm:text-base md:text-lg">Scroll Down</h1>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
