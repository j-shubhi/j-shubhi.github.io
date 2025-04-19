import React from 'react';
import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';
import emailjs from 'emailjs-com';

export default function Contact() {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_u8ziqig',
        'template_fjfxpkr',
        e.target as HTMLFormElement,
        'mceY_ONcpR44D7pYZ' 
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.error('Error sending email:', error.text);
          alert('Failed to send message. Please try again later.');
        }
      );

    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6" onSubmit={sendEmail}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600">
                  <Mail className="w-5 h-5" />
                  <span>shubhijain10march@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/j-shubhi" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/being_shubhi_" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600">
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a href="https://www.x.com/simply_shubhi" className="flex items-center space-x-3 text-gray-600 hover:text-purple-600">
                  <Twitter className="w-5 h-5" />
                  <span>X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}