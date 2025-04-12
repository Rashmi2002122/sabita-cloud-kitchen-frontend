import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import Profile from "./Profile"; 
import base_url  from "../SpringBootAPI"


const MainMenu = () => {
  // State variables
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [Location, setLocation] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

 
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await axios.get(`${base_url}/getmenu/`, {
          withCredentials: true,
        });
        console.log("Food Items:", data);
        setFoodItems(data);
      } catch (error) {
        console.error("Failed to fetch food items", error);
        toast.error("Failed to load food catalog.");
      }
    };

    fetchFood();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${base_url}/user`, {
          withCredentials: true,
        });

        console.log("User Data:", data);

        if (
          !data ||
          (typeof data === "string" && data.includes("<!DOCTYPE html>"))
        ) {
          throw new Error("Unauthorized");
        }

        setUser(data);
      } catch (error) {
        toast.error("You are not logged in. Redirecting...");
        window.location.href =
         `${base_url}/oauth2/authorization/google`;
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            console.log("Accuracy:", accuracy);

            if (accuracy > 100) {
              toast.warning("Location accuracy is too low. Please try again.");
            }

            var config = {
              method: "get",
              url: `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=7d93046c50f14da2bb5e98bf5b9e696f`,
            };

            axios(config)
              .then(function (response) {
                setLocation(response.data.features[0].properties);
              })
              .catch(function (error) {
                console.error("Error fetching location data:", error);
                toast.error("Unable to fetch location details.");
              });
          },
          (error) => {
            console.log("Error getting location:", error);
            toast.error(
              "Unable to retrieve location. Please allow location access."
            );
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  console.log("Location:", Location);
  if (!user) return null;

  
  return (
    <div>
      <ToastContainer />

      <div className="absolute top-0 left-0 ">
        
        {Location ? (
          <div className="flex p-2">
          <Link to="Map"><img className="w-10 h-10" src="/google-maps.png" />
          
          </Link>
            <p>{Location.plus_code}<br></br>{Location.postcode}</p>
          </div>
        ) : (
          <p>Loading location...</p>
        )}
      </div>

      {showSplash && (
        <div className="splash fade-out">
          <img src="/LogoIcon.png" alt="Cart" className="fade-in w-500 h-50 " />
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
        <div className="fixed top-4 right-4 flex items-center space-x-3">
          <img src="/shopping-bag.png" alt="Cart" className="w-10 h-10" />
          <Link onClick={toggleProfile}>
            {user.picture ? (
              <img
                src={user.picture}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ) : (
              <img
                src="https://via.placeholder.com/40"
                alt="Placeholder"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            )}
          </Link>
        </div>

        <Container className="mt-16 rounded-lg shadow-lg p-6 max-w-3xl w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foodItems.length > 0 ? (
              foodItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-lg shadow-md p-4"
                >
                  <img
                    src={item.foodImage || "https://via.placeholder.com/150"}
                    alt={item.foodName}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-black">
                    {item.foodName}
                  </h3>
                  <p className="text-sm text-gray-600">{item.foodDescription}</p>
                  <p className="mt-2 text-lg font-bold text-green-600">
                    ₹ {item.foodPrice}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No food items available.
              </p>
            )}
          </div>
        </Container>
      </div>

      {isProfileOpen && <Profile user={user} toggleProfile={toggleProfile} />}
    </div>
  );
};

export default MainMenu;
