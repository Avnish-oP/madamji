"use client"

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import Image from 'next/image';
import axios from 'axios';

const words = `Pata hai jab phli baar yu dekha to nhi socha tha is pyari bachi ke liye itta sab bhi karunga, but time aur mera pyar yaha tak le hi aya hai but i really want ki tu na aise mere sath hi rhe, to mam kya ap muje yu hi tang karte rehna pasand karoge, chhed ke, gudgudi karke, aur jo bhi apke aage ke experiments baki ho muje na in sabse ne pyar ho gya hai and apki wo smile se pyar ho gya hai, tera har ek touch se pyar ho gya hai, i love you meri cutie 🫰♥️`;

export default function ProposalPage() {
    const [showMessage, setShowMessage] = useState(false);
    const [feedbackPopup, setFeedbackPopup] = useState(false);

    const handleFeedback = async(response: string) => {
        // Send email using EmailJS
       const data = {
          message: response,
        };
        try {
          const response = await axios.post("/api/send-message", data);
          console.log("Response:", response);
         
          
        } catch (error) {
          console.error("Error:", error);
        }

        alert('Thank you for your response!');
    };

    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.6, scale: 1.2 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bg-pink-300 w-20 h-20 rounded-full top-10 left-10"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.8, y: 50 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bg-blue-300 w-16 h-16 rounded-full bottom-20 right-20"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 0.5, rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
                className="absolute bg-yellow-300 w-12 h-12 rounded-full top-1/2 left-1/3"
            ></motion.div>

            {feedbackPopup ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-pink-400 rounded-lg shadow-lg p-6 text-center relative max-w-sm w-full"
                >
                    <Image
                        src="/cute.png"
                        alt="Cute Cat Sticker"
                        width={80}
                        height={80}
                        className="mx-auto"
                    />
                    <p className="text-lg font-bold text-white mb-4 antialiased">Maza aaya ya mai khud aau? 🐾</p>
                    <div className="flex justify-around">
                        <button
                            onClick={() => handleFeedback('Ajao😘')}
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                        >
                            Ajao😘
                        </button>
                        <button
                            onClick={() => handleFeedback('Rehne do😒')}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                            Rehne do😒
                        </button>
                    </div>
                </motion.div>
            ) : showMessage ? (
              <>
              <div className='text-5xl font-bold text-pink-600 antialiased italic absolute top-16'>
              Hello ji, suno....
              </div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-pink-50 rounded-lg shadow-lg p-6 text-center max-w-md w-full"
                >
                    <TextGenerateEffect words={words} className="text-black z-20" filter={true} />

                    <button
                        onClick={() => setFeedbackPopup(true)}
                        className="bg-pink-500 mt-6 text-white z-20 py-2 px-4 rounded-lg hover:bg-pink-600"
                    >
                      sochlo, karna hai?
                    </button>
                    <audio autoPlay loop>
                        <source src="/soft-music.mp3" type="audio/mpeg" />
                    </audio>
                </motion.div>
                <Image

                    src="/in-love.png"
                    alt="Cute Cat"
                    width={200}
                    height={200}
                    className="absolute bottom-0 right-0" 
                />
                </>
            ) : (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-pink-400 rounded-lg shadow-lg p-6 text-center max-w-sm w-full"
                >
                    <Image
                        src="/love.png"
                        alt="Cute Cat Sticker"
                        width={80}
                        height={80}
                        className="mx-auto"
                    />
                    <p className="text-lg text-white font-bold mb-4 antialiased">Are you sure you want to see this? 🐾</p>
                    <button
                        onClick={() => setShowMessage(true)}
                        className="bg-pink-500 text-white z-20 py-2 px-4 rounded-lg hover:bg-pink-600"
                    >
                        Yes, I am ready
                    </button>
                </motion.div>
            )}
        </div>
    );
}
