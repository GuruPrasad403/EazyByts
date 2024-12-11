import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Hero from '../assets/Chandu.jpeg';
import Styles from '../Components/About.module.css';
import Doc from '../assets/Guru Prasad G.pdf';

const About = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Fetch user data from the API
        fetch('https://eazy-byts-ten.vercel.app/api/users', {
            headers: {
                Authorization: `Bearer ${token}` // Send the token in the header
            }
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the data structure is the one you've shown
            if (data.users && data.users.length > 0) {
                setUser(data.users[0]); // Set the user data
            }
        })
        .catch(err => console.error('Error fetching user data:', err));
    }, []);

    // If user data is not available, render a loading state or an empty section
    if (!user) {
        return <div>Loading...</div>;
    }

    const info = [
        [
            {
                title: "Name",
                value: user.name
            },
            {
                title: "Phone",
                value: user.phone
            },
            {
                title: "Experience",
                value: user.experience
            }
        ],
        [
            {
                title: "Age",
                value: user.age
            },
            {
                title: "Address",
                value: user.address
            },
            {
                title: "Freelance",
                value: user.freelance ? 'Available' : 'Not Available'
            }
        ]
    ];

    return (
        <div id='About' className="grid place-content-center border-solid border-5 px-2 h-[220vh] sm:h-[120vh] transition-all duration-500 ease-in-out">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center">
                <div className='sm:my-2 my-3 sm:h-full'>
                    <img 
                        src={user.aboutSection || Hero}  // Use dynamic profile picture
                        alt={user.name}
                        className='sm:w-[600px] w-96 h-[500px] sm:h-[800px] rounded-3xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105'
                    />
                </div>
                <div className='flex flex-col justify-start sm:px-10'>
                    <div className='flex flex-col justify-center items-start sm:py-2'>
                        <h2 className='sm:text-6xl text-4xl text-yellow-500 my-2'>
                            Discover
                        </h2>
                        <h1 className='sm:text-8xl text-5xl relative text-white'>
                            <span className={Styles.parent}>Abo</span><span>ut Me</span>
                        </h1>
                    </div>
                    <div className='sm:w-[800px] w-92 mt-10'>
                        <p className='text-justify px-4 text-md sm:text-2xl text-white' style={{ lineHeight: "30px" }}>
                            {user.description}
                        </p>
                    </div>
                    <div className='flex sm:flex-row flex-col w-92 h-full justify-between sm:justify-between items-center my-10 border-solid sm:w-[800px]' style={{ border: "solid 2px #efa22d", borderRadius: "10px", backgroundColor: "#1b1b1b", padding: "20px" }}>
                        <div>
                            {
                                info[0].map((ele, index) => <Info key={index} title={ele.title} value={ele.value} />)
                            }
                        </div>
                        <div>
                            {
                                info[1].map((ele, index) => <Info key={index} title={ele.title} value={ele.value} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Info = ({ title, value }) => {
    return (
        <div className='flex flex-row w-72 justify-between sm:justify-between items-center sm:w-[400px] p-2 sm:px-6'>
            <h1 className='text-md sm:text-xl text-white my-1 text-right'>{title} :</h1>
            <h1 className='text-md sm:text-xl text-white my-1 text-right'>{value}</h1>
        </div>
    );
}

export default About;
