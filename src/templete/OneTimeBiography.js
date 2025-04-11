import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base_url from "../SpringBootAPI";

const translations = {
  en: {
    title: "Sabita Cloud Kitchen",
    description: [
      "Cloud kitchens are delivery-only restaurants without a physical dine-in space.",
      "We operate by preparing food for online orders through WhatsApp or websites.",
      "Cost-effective solution for food entrepreneurs to start a business.",
      "Focuses on healthy, homely food and cost-effective.",
    ],
    button: "Click Here to Continue",
  },
  od: {
    title: "Sabita Cloud Kitchen",
    description: [
      "କ୍ଲାଉଡ୍ କିଚେନମାନେ କେବଳ ଡିଲିଭେରୀ ଭିତ୍ତିକ ଭୋଜନାଳୟ ଯେଉଁଠି ଏକ ଭୌତିକ ଖାଦ୍ୟାଗାର ନାହିଁ।",
      "ଆମେ ଅନଲାଇନ୍ ଅର୍ଡର ପାଇଁ ଭୋଜନ ପ୍ରସ୍ତୁତ କରିଥାଉଛୁ, ଯାହା ହ୍ଵାଟସ୍ଅପ୍ କିମ୍ବା ୱେବସାଇଟ୍ ମାଧ୍ୟମରେ ହୋଇଥାଏ।",
      "ଏହା ଖାଦ୍ୟ ଉଦ୍ୟୋଗପତିମାନଙ୍କ ପାଇଁ ଏକ ଅତ୍ୟନ୍ତ ଲାଭଜନକ ବିକଳ୍ପ।",
      "ଏହା ସ୍ୱାସ୍ଥ୍ୟକର, ଘରୋଇ ଭୋଜନ ଏବଂ ଅତ୍ୟନ୍ତ ଅର୍ଥନୀତିକ ଭାବରେ ଉପଯୋଗୀ।",
    ],
    button: "ଅଗ୍ରଗତି ପାଇଁ ଏଠି କ୍ଲିକ୍ କରନ୍ତୁ",
  },
};

const OneTimeBiography = () => {
  const [language, setLanguage] = useState("od");
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthentication = async () => {
    try {
      const { data } = await axios.get(`${base_url}/user`, { withCredentials: true });

      if (!data || (typeof data === "string" && data.includes("<!DOCTYPE html>"))) {
        throw new Error("Unauthorized");
      }

      toast.success(`Welcome, ${data.name || "User"}!`);
      navigate("/home"); 
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.status === 401 
        ? "You are not logged in. Redirecting..." 
        : "Failed to connect to the server"
      );

      if (error.response?.status === 401) {
        window.location.href = `${base_url}/oauth2/authorization/google`;
      }
    }
  };

  return (
    <div>
      {showSplash && (
        <div className="splash fade-out">
          <h1 className="fade-in">Welcome to Sabita's Kitchen</h1>
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
        <div className="absolute top-4 right-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded-md shadow-md bg-white text-black"
          >
            <option value="en">English</option>
            <option value="od">ଓଡିଆ</option>
          </select>
        </div>
        <div className="w-full max-w-2xl text-center bg-white bg-opacity-20 backdrop-blur-lg p-6 sm:p-10 rounded-lg shadow-2xl">
          <h2 className="text-xl sm:text-3xl font-extrabold text-black mb-4 drop-shadow-lg">
            {translations[language].title}
          </h2>
          <div className="text-left">
            <ul className="text-black text-sm sm:text-lg leading-relaxed list-disc pl-5">
              {translations[language].description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleAuthentication}
              className="bg-white text-purple-600 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition duration-300 transform hover:scale-105"
            >
              {translations[language].button}
            </button>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </div>
  );
};

export default OneTimeBiography;
