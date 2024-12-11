
import React from 'react';
import message from '../assets/Contact/msg-icon.png';
import mailIcon from '../assets/Contact/msg-icon.png';
import phoneIcon from '../assets/Contact/phone-icon.png';
import locationIcon from '../assets/Contact/location-icon.png';
import EmailSender from './Mail';
import Styles from './About.module.css'

function Contact() {
    const links = [
        {
            src: mailIcon,
            link: "guruprasas27@gmail.com"
        },
        {
            src: phoneIcon,
            link: "+91 8951657957"
        },
        {
            src: locationIcon,
            link: "Vishal Nagar 8th Cross, Near Telugu Chruch, Bellary "
        },
    ];

    return (
        < div id="Contact" className=' pl-[15px] sm:pr-[100px] sm:pl-[250px] flex flex-col justify-around sm:gap-20 sm:my-48 w-[98vw] h-[160vh] sm:h-[80vh]'>
         <div className='flex flex-col   items-start  sm:py-2'>
                        <h2 className='sm:text-6xl text-4xl text-yellow-500 my-2'>
                            Get In
                        </h2>
                        <h1 className='sm:text-8xl text-5xl  relative text-white'>
                            <span className={Styles.parent}>To</span><span>uch </span>
                        </h1>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 items-start w-full h-auto lg:h-[60vh] mt-8 lg:mt-12">
                <div className="flex flex-col justify-between basis-full lg:basis-[40%] items-start w-full lg:w-[30vw] h-auto px-4 lg:px-8">
                    <div className="flex flex-row justify-start items-center mb-4">
                        <h1 className="text-2xl text-yellow-500 lg:text-4xl font-bold">Send Me a message</h1>
                        <span><img src={message} className="w-6 lg:w-8 h-6 lg:h-8 ml-2" alt="Message Icon" /></span>
                    </div>
                    <p className="text-base lg:text-lg text-justify text-white mb-6">
                    Feel free to reach out through the contact form or find my contact information below. Your feedback, questions, and suggestions are invaluable as I continuously work to improve my skills and provide exceptional services. Whether you're interested in collaboration, have a project in mind, or just want to connect, I look forward to hearing from you.
                    </p>
                    <div className="flex flex-col space-y-3">
                        {links.map((ele, index) => <Line key={index} src={ele.src} link={ele.link} />)}
                    </div>
                </div>
                <div className="flex justify-center items-center basis-full lg:basis-[30%] w-full px-4 lg:px-8">
                    <div className="w-full lg:w-[25vw]">
                        <EmailSender />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Line = ({ src, link }) => {
    return (
        <div className="flex flex-row items-center my-1 text-white">
            <img src={src} className="w-5 h-5 mr-2 lg:w-6 lg:h-6" alt="Contact Icon" />
            <p className="text-base lg:text-lg">{link}</p>
        </div>
    );
};

export default Contact;