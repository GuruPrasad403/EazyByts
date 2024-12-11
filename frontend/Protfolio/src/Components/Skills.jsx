import React, { useEffect, useState } from 'react';
import Styles from './About.module.css';
import axios from 'axios';

function Skill() {
    const [skills, setSkills] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleScroll = () => {
        const skillsSection = document.getElementById("Skills");
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            setVisible(true);
            window.removeEventListener('scroll', handleScroll); 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        const token = "";  // Ensure this is prefixed with REACT_APP_
        
        const fetchSkills = async () => {
            try {
                const response = await axios.get('https://eazy-byts-ten.vercel.app/api/skills', {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Use the token here
                    }
                });
                console.log(response.data);  // Log the response to check the structure
                setSkills(response.data.skills);  // Set the skills data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching skills:', error);
                setLoading(false);
            }
        };
        
        fetchSkills();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="Skills" className='pl-[15px] sm:pr-[100px] sm:pl-[250px] flex flex-col justify-around sm:gap-20 mt-52 mb-20 sm:my-48 w-[98vw] h-[90vh] sm:h-[70vh]'>
            <div className="flex justify-between items-start"> 
                <div className='flex flex-col items-start sm:py-2'>
                    <h2 className='sm:text-6xl text-4xl text-yellow-500 my-2'>
                        About
                    </h2>
                    <h1 className='sm:text-8xl text-5xl relative text-white'>
                        <span className={Styles.parent}>MY </span><span>Skills </span>
                    </h1>
                </div>
            </div>
            <div className='flex flex-row flex-wrap sm:flex-nowrap justify-around items-center sm:w-full h-full'>
                {
                    skills.map((ele, i) => {
                        return (
                            <Image
                                title={ele.name}
                                key={i}
                                src={ele.imageUrl}
                                percentage={ele.level}
                                isVisible={visible}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

const Image = ({ title, src, percentage, isVisible }) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-3 sm:gap-5 ${isVisible ? Styles.skillVisible : ''}`}>
            <div className={`${Styles.skillEffect} w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] relative`}>
                <img
                    className={`${
                        title === "Tailwind" ? "object-contain" : "object-cover"
                    } bg-transparent w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full transition-all duration-300 ease-in-out`}
                    src={src}
                    alt={title}
                />
                {/* Percentage Text */}
                <div className={`${Styles.percentage}`}>
                    {percentage}
                </div>
            </div>
            <div>
                <h1 className='sm:text-4xl text-xl text-white'>
                    {title}
                </h1>
            </div>
        </div>
    );
}

export default Skill;
