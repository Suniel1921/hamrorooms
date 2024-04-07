// import React, { useEffect, useState } from 'react';
// import CategoryList from '../../components/scrollCategory/CategoryList';
// import '../home/home.css';
// import CardSkeleton from '../../components/skeleton/CardSkeleton';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSearchGlobally } from '../../context/SearchContext';

// const Home = () => {
//   const { searchQuery, setSearchQuery } = useSearchGlobally();

//   const [isLoading, setIsLoading] = useState(true);
//   const [roomList, setRoomList] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 200000]);
//   const navigate = useNavigate();

//   const getAllRoom = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/getAllRoom`);
//       if (response.data.success) {
//         setRoomList(response.data.allRoom);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllRoom();
//   }, [selectedCategory, roomList]);
  

//   useEffect(() => {
//   }, [roomList]);

//   useEffect(() => {
//   }, [selectedCategory]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAllClick = () => {
//     setSelectedCategory(null);
//   };

//   const filteredRoomList = roomList.filter((room) =>
//     (!selectedCategory || room.city._id.toString() === selectedCategory._id) &&
//     room.rent >= priceRange[0] &&
//     room.rent <= priceRange[1] &&
//     room.verified &&
//     // room.city.name.toLowerCase().includes(searchQuery.toLowerCase()) // search by city
//     room.address.toLowerCase().includes(searchQuery.toLowerCase()) //search by address
//   );

//   return (
//     <>
//       <div className='scrollCategory'>
//         <CategoryList
//           onCategoryClick={handleCategoryClick}
//           onAllClick={handleAllClick}
//           products={products}
//           setPriceRange={setPriceRange}
//         />
//       </div>

//       <section className='mainSection'>
//         <div className='cardParents'>
//           {isLoading ? (
//             <>
//               {[...Array(8)].map((_, index) => (
//                 <CardSkeleton key={index} />
//               ))}
//             </>
//           ) : (
//             <>
//               {filteredRoomList.length === 0 ? (
//                 <div className='roomNotFound'><h2>Oops! 🤔 No Room Found!</h2></div>
//               ) : (
//                 <>
//                   {filteredRoomList.map((room) => (
//                     <div className='chilCard' key={room.slug} onClick={() => navigate(`/roomDetails/${room.slug}`)}>
//                       <img src={room.imageUrl} alt='room image' loading="lazy"  />
//                       <h3>{room.address}</h3>
//                       <p>Rent.{room.rent}/month</p>
//                       <p>{room.city.name}</p>
//                     </div> 
//                   ))}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;






// ************optimze code for better performance******************


import React, { useEffect, useState, useMemo, useCallback } from 'react';
import CategoryList from '../../components/scrollCategory/CategoryList';
import '../home/home.css';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearchGlobally } from '../../context/SearchContext';
import { Helmet } from "react-helmet";
import useOnlineOfflineStatus from '../../components/onlineOfflineStatus/useOnlineOfflineStatus';
import { Modal } from 'antd';
import { FaRegEye } from "react-icons/fa";


// Define the Home component
const Home = () => {
  const onlineOfflineMode = useOnlineOfflineStatus();  // checking user is online or offline mode 
  // Use the useSearchGlobally hook to access the searchQuery and setSearchQuery functions
  const { searchQuery, setSearchQuery } = useSearchGlobally();

  // Define state variables using the useState hook
  const [isLoading, setIsLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const navigate = useNavigate();

  // Define a memoized getAllRoom function using useCallback
  const getAllRoom = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/getAllRoom`);
      if (response.data.success) {
        setRoomList(response.data.allRoom);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use the useEffect hook to fetch all rooms when the component mounts
  useEffect(() => {
    getAllRoom();
  }, [getAllRoom]);

  // Define a function to handle the category click event
  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Define a function to handle the all click event
  const handleAllClick = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  // Define a memoized filteredRoomList using useMemo
  const filteredRoomList = useMemo(() => {
    return roomList.filter((room) =>
      (!selectedCategory || room.city._id.toString() === selectedCategory._id) &&
      room.rent >= priceRange[0] &&
      room.rent <= priceRange[1] &&
      room.verified &&
      room.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [roomList, selectedCategory, priceRange, searchQuery]);
  



  return (
    <>
      <Helmet>
        <title>Hamro Rooms</title>
        <meta name="description" content="Find affordable rooms for rent on Hamro Rooms. Search by city, rent, and more." />
      </Helmet>
      
      <div className='scrollCategorys'>
        <CategoryList
          onCategoryClick={handleCategoryClick}
          onAllClick={handleAllClick}
          products={products}
          setPriceRange={setPriceRange}
        />
      </div>

      <section className='mainSection'>
        <div className='cardParents'>
          {isLoading ? (
            // Show loading skeleton cards if isLoading is true
            <>
              {[...Array(8)].map((_, index) => (
                <div className='zindexskeleton' key={index}><CardSkeleton key={index} /></div>
              ))}
            </>
          ) : (
            // Show filtered room list if isLoading is false
            <>
              {filteredRoomList.length === 0 ? (
                // Show a message if no rooms are found in the filtered list
                <div className='roomNotFound'><h2>Oops! 🤔 No Room Found!</h2></div>
              ) : (
                // Render the room cards if there are rooms in the filtered list
                <>
                  {filteredRoomList.map((room) => (
                    <div className='chilCard' key={room.slug} onClick={() => navigate(`/roomDetails/${room.slug}`)}>
                      <img src={room.imageUrl} alt='room image' loading="lazy"  />
                      <h3>{room.address}</h3>
                      <p className='paraText'>Rent.{room.rent}/month</p>
                      <p className='paraText'>{room.city.name}</p>
                    </div> 
                  ))}               
                 
                </>
                
              )}
            </>
          )}
        </div>
      </section>
      {/* ****************showing user offline modal**********************/}
      {!onlineOfflineMode && (
    <Modal
      title="Offline 🔴"
      open={!onlineOfflineMode}
      onCancel={() => {}} // Make onCancel an empty function to prevent closing the modal by clicking outside or pressing ESC key
      footer={null}
    >
      <h5>You are currently offline. Please check your internet connection.</h5>
    </Modal>
  )}
      {/* ****************************************************************/}
    
    </>
  );
};

export default Home;








// **********khalti payment integration******

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import CategoryList from '../../components/scrollCategory/CategoryList';
// import '../home/home.css';
// import CardSkeleton from '../../components/skeleton/CardSkeleton';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSearchGlobally } from '../../context/SearchContext';
// import { Helmet } from "react-helmet";
// import KhaltiCheckout from "khalti-checkout-web";


// const Home = () => {
//   // Use the useSearchGlobally hook to access the searchQuery and setSearchQuery functions
//   const { searchQuery, setSearchQuery } = useSearchGlobally();

//   // Define state variables using the useState hook
//   const [isLoading, setIsLoading] = useState(true);
//   const [roomList, setRoomList] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 20000]);
//   const navigate = useNavigate();


//   const handleKhaltiPayment = (slug) => {
//     const config = {
//       "publicKey": "test_public_key_24256488db2a42469d3dc9c103ab39d4",
//       "productIdentity": "1234567890", // Replace with your product identity
//       "productName": "HamroRooms", // Replace with your product name
//       "productUrl": "http://gameofthrones.wikia.com/wiki/Dragons", // Replace with your product URL
//       "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"], // Payment preferences
//       "eventHandler": {
//         onSuccess: (payload) => {
//           console.log(payload); // Handle success
//           // setTimeout(() => {
//           //   navigate(`/roomDetails/${slug}`); // Redirect to room details page
//           // }, 0); // Delay for 0 second before redirecting
//           navigate(`/roomDetails/${slug}`);
//           toast.success('Payment successful!'); // Show success toast message
//         },
//         onError: (error) => {
//           console.log(error); // Handle error
//         },
//         onClose: () => {
//           console.log('widget is closing'); // Handle widget closing
//         }
//       }
//     };

//     const checkout = new KhaltiCheckout(config);
//     checkout.show({ amount: 1000 }); // Show Khalti checkout with an amount (in paisa)
//   };




//   // Define a memoized getAllRoom function using useCallback
//   const getAllRoom = useCallback(async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/getAllRoom`);
//       if (response.data.success) {
//         setRoomList(response.data.allRoom);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Use the useEffect hook to fetch all rooms when the component mounts
//   useEffect(() => {
//     getAllRoom();
//   }, [getAllRoom]);

//   // Define a function to handle the category click event
//   const handleCategoryClick = useCallback((category) => {
//     setSelectedCategory(category);
//   }, []);

//   // Define a function to handle the all click event
//   const handleAllClick = useCallback(() => {
//     setSelectedCategory(null);
//   }, []);

//   // Define a memoized filteredRoomList using useMemo
//   const filteredRoomList = useMemo(() => {
//     return roomList.filter((room) =>
//       (!selectedCategory || room.city._id.toString() === selectedCategory._id) &&
//       room.rent >= priceRange[0] &&
//       room.rent <= priceRange[1] &&
//       room.verified &&
//       room.address.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [roomList, selectedCategory, priceRange, searchQuery]);

//   // Render the component
//   return (
//     <>
//       <Helmet>
//         <title>Hamro Rooms</title>
//         <meta name="description" content="Find affordable rooms for rent on Hamro Rooms. Search by city, rent, and more." />
//       </Helmet>
//       <div className='scrollCategory'>
//         <CategoryList
//           onCategoryClick={handleCategoryClick}
//           onAllClick={handleAllClick}
//           products={products}
//           setPriceRange={setPriceRange}
//         />
//       </div>

//       <section className='mainSection'>
//         <div className='cardParents'>
//           {isLoading ? (
//             // Show loading skeleton cards if isLoading is true
//             <>
//               {[...Array(8)].map((_, index) => (
//                 <CardSkeleton key={index} />
//               ))}
//             </>
//           ) : (
//             // Show filtered room list if isLoading is false
//             <>
//               {filteredRoomList.length === 0 ? (
//                 // Show a message if no rooms are found in the filtered list
//                 <div className='roomNotFound'><h2>Oops! 🤔 No Room Found!</h2></div>
//               ) : (
//                 // Render the room cards if there are rooms in the filtered list
//                 <>
//                   {filteredRoomList.map((room) => (
//                     <div className='chilCard' onClick={() => handleKhaltiPayment(room.slug)} key={room.slug}>
//                       <img src={room.imageUrl} alt='room image' loading="lazy" />
//                       <h3>{room.address}</h3>
//                       <p>Rent.{room.rent}/month</p>
//                       <p>{room.city.name}</p>
//                     </div>
//                   ))}

//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// // Export the Home component
// export default Home;


