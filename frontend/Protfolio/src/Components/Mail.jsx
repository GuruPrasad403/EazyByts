import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailSender = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [date] = useState(new Date().toISOString().split('T')[0]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const isFormValid = () => {
    return (
      nameRegex.test(name) &&
      emailRegex.test(toEmail) &&
      message.length >= 25
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setToEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill out all fields correctly.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const templateParams = {
      to_email: toEmail,
      message: `Name: ${name}\nDate: ${date}\n\n${message}`,
    };

    emailjs.send('Admin@8951', 'template_i2v31c7', templateParams, 'LCpL_BeBXMwgb-7d7')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success("Email sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setName('');
        setMessage('');
        setToEmail('');
      }, (err) => {
        console.log('FAILED...', err);
        if (err.text.includes('Quota')) {
          toast.error("API quota exceeded. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(`Failed to send email. Error: ${err.text}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });
  };

  return (
    <>
      <form onSubmit={sendEmail} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none ${
              name && !nameRegex.test(name) ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {name && !nameRegex.test(name) && (
            <p className="text-red-600 text-sm mt-1">Name can only contain letters and spaces.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Date</label>
          <input
            type="date"
            value={date}
            readOnly
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Recipient Email</label>
          <input
            type="email"
            value={toEmail}
            onChange={handleEmailChange}
            placeholder="Enter recipient's email"
            className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none ${
              toEmail && !emailRegex.test(toEmail) ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {toEmail && !emailRegex.test(toEmail) && (
            <p className="text-red-600 text-sm mt-1">Invalid email address.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Message</label>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter your message"
            className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none ${
              message && message.length < 25 ? 'border-red-500' : 'border-gray-300'
            } min-h-[150px]`}
          />
          {message && message.length < 25 && (
            <p className="text-red-600 text-sm mt-1">Message must be at least 25 characters long.</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 rounded-lg font-semibold transition ease-in-out duration-300 ${
            isFormValid() ? 'bg-yellow-500 text-white hover:bg-yellow-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          Send Email
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default EmailSender;