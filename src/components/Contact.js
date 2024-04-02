import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_4kvtceh', 'template_mw14evb', form.current, {
        publicKey: 'OQTOXmPK2OPjM1_Zm',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="container px-10 py-10 text-white mx-auto gap-10 md:gap-40 items-center mb-20 md:mb-40 max-w-5xl p-8">
        <div>
            <div>
            <form class="w-full" ref={form} onSubmit={sendEmail}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none custom-background text-sm font-normal color-white py-4" type="text" name="user_name" placeholder="Name" required></input>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <input class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none custom-background text-sm font-normal color-white py-4" type="email" name="user_email" placeholder="Email" required></input>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <textarea name="message" className='appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none custom-background text-sm font-normal color-white py-4 h-40' placeholder="Your Message" required/>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Send Message" className='mx-auto cursor-pointer md:mt-8 align-middle text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-8 rounded-full bg-transparent text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 h-12 border-white border-2 hover-blue-background duration-300 self-center'/>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
};

export default ContactUs;