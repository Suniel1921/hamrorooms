// import React, { useEffect, useState } from 'react';
// import '../roomDetails/roomDetails.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
// import Features from './Features';
// import Location from './Location';
// import Loading from '../../components/auth/signup/Loading';

// const RoomDetails = () => {
//     const { slug } = useParams();
//     const [singleRoom, setSingleRoom] = useState({});
//     const [selectedSection, setSelectedSection] = useState("features");
//     const [isLoading, setIsLoading] = useState(true); // Loading state

//     const getSingleRoom = async () => {
//         setIsLoading(true); // Set loading state to true
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/singleRoom/${slug}`); // Use 'slug' instead of 'id'
//             // console.log(response)
//             if (response.data.success) {
//                 setSingleRoom(response.data.singleRoom);
//             } else {
//                 toast.error("Something went wrong");
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error("Something went wrong");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (slug) getSingleRoom();
//     }, [slug])

//     const shareRoom = async (platform) => {
//         const shareText = `I found this amazing room located at ${singleRoom.address} on Hamro Rooms website. Check it out!`;
//         const shareUrl = window.location.href;

//         let shareContent = {
//             title: 'Check out this room!',
//             text: shareText,
//             url: shareUrl
//         };

//         if (platform === 'whatsapp') {
//             shareContent = {
//                 text: `${shareText} ${shareUrl}`
//             };
//         }

//         if (navigator.share) {
//             try {
//                 await navigator.share(shareContent);
//             } catch (error) {
//                 console.error(`Error sharing room on ${platform}:`, error);
//                 toast.error(`Failed to share room on ${platform}. Please try again.`);
//             }
//         } else {
//             const shareUrlEncoded = encodeURIComponent(shareUrl);
//             let shareLink = '';
//             switch (platform) {
//                 case 'facebook':
//                     shareLink = `https://facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`;
//                     break;
//                 case 'twitter':
//                     shareLink = `https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${encodeURIComponent(shareText)}`;
//                     break;
//                 case 'whatsapp':
//                     shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
//                     break;
//                 default:
//                     return;
//             }
//             window.open(shareLink, '_blank');
//         }
//     };

//     return (
//         <>
//             {isLoading ? (
//                 <Loading />

//             ) : (
//                 <div className='singleRoomcontainer'>
//                     <h3 className='roomTitle'>{singleRoom.address}</h3>
//                     <div className='roomImage'>
//                         <div className='room'>
//                             <img className='singleImg' src={singleRoom.images[0]} alt="" loading="lazy" />
//                         </div>
//                         <div className='multiroom'>
//                             <div className='twoimg'>
//                                 <img src={singleRoom.images[1]} alt="" loading="lazy" />
//                                 <img src={singleRoom.images[2]} alt="" loading="lazy" />
//                             </div>
//                             <div className='twoimg'>
//                                 <img src={singleRoom.images[3]} alt="" loading="lazy" />
//                                 <img src={singleRoom.images[4]} alt="" loading="lazy" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='feature_locationContainer'>
//                         <h4
//                             onClick={() => setSelectedSection('features')}
//                             style={{ color: selectedSection === 'features' ? '#7571f9' : 'black' }}
//                         >
//                             Features
//                         </h4>
//                         <h4
//                             onClick={() => setSelectedSection('location')}
//                             style={{ color: selectedSection === 'location' ? '#7571f9' : 'black' }}
//                         >
//                             Location
//                         </h4>
//                     </div>

//                     {selectedSection === 'features' ? (
//                         <Features singleRoom={singleRoom} />
//                     ) : (
//                         <Location singleRoom={singleRoom} />
//                     )}

//                     <h3>Share with your friends</h3>
//                     <div className='socialMediaIcons'>
//                         <i style={{ color: '#1877F2' }}><FaFacebook onClick={() => shareRoom('facebook')} /></i>
//                         <i style={{ color: '#1DA1F2' }}><FaTwitter onClick={() => shareRoom('twitter')} /></i>
//                         <i style={{ color: '#25D366' }}><FaWhatsapp onClick={() => shareRoom('whatsapp')} /></i>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default RoomDetails;








// import React, { useEffect, useState } from 'react';
// import '../roomDetails/roomDetails.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaBed, FaHome, FaUser, FaLocationArrow, FaSearchLocation } from "react-icons/fa";
// import Loading from '../../components/auth/signup/Loading';
// import Features from './Features'; 
// import Location from './Location';

// const RoomDetails = () => {
//     const { slug } = useParams();
//     const [singleRoom, setSingleRoom] = useState({});
//     const [mainImage, setMainImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const getSingleRoom = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/singleRoom/${slug}`);
//                 if (response.data.success) {
//                     setSingleRoom(response.data.singleRoom);
//                     if (response.data.singleRoom.images.length > 0) {
//                         setMainImage(response.data.singleRoom.images[0]);
//                     }
//                 } else {
//                     toast.error("Something went wrong");
//                 }
//             } catch (error) {
//                 if (error.response) {
//                     toast.error(error.response.data.message);
//                 } else {
//                     toast.error("Something went wrong");
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (slug) getSingleRoom();
//     }, [slug]);

//     const handleThumbnailClick = (image) => {
//         setMainImage(image);
//     };

//     const shareRoom = async (platform) => {
//         const shareText = `I found this amazing room located at ${singleRoom.address} on Hamro Rooms website. Check it out!`;
//         const shareUrl = window.location.href;

//         let shareContent = {
//             title: 'Check out this room!',
//             text: shareText,
//             url: shareUrl
//         };

//         if (platform === 'whatsapp') {
//             shareContent = {
//                 text: `${shareText} ${shareUrl}`
//             };
//         }

//         if (navigator.share) {
//             try {
//                 await navigator.share(shareContent);
//             } catch (error) {
//                 console.error(`Error sharing room on ${platform}:`, error);
//                 toast.error(`Failed to share room on ${platform}. Please try again.`);
//             }
//         } else {
//             const shareUrlEncoded = encodeURIComponent(shareUrl);
//             let shareLink = '';
//             switch (platform) {
//                 case 'facebook':
//                     shareLink = `https://facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`;
//                     break;
//                 case 'twitter':
//                     shareLink = `https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${encodeURIComponent(shareText)}`;
//                     break;
//                 case 'whatsapp':
//                     shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
//                     break;
//                 default:
//                     return;
//             }
//             window.open(shareLink, '_blank');
//         }
//     };

//     if (isLoading) {
//         return <Loading />;
//     }

//     if (!singleRoom || !singleRoom.images) {
//         return <div>No room found.</div>;
//     }

//     return (
//         <div className='singleListing_container'>
//             <div className='propertyimgAndDetailsContainer'>
//                 <div className='left_listing'>
//                     <div className='single_listing'>
//                         <div className='main_image_container'>
//                             <img className='main_image' src={mainImage} alt='Room' />
//                         </div>
//                         <div className='thumbnail_container'>
//                             {singleRoom.images.map((image, index) => (
//                                 <img
//                                     key={index}
//                                     className='thumbnail_image'
//                                     src={image}
//                                     alt={`Room Thumbnail ${index}`}
//                                     onClick={() => handleThumbnailClick(image)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='right_listing'>
//                     <div className='right_listing_header'>
//                         <h3><FaHome /> Room Details</h3>
//                     </div>
//                     <div className='property_details'>
//                     <Features singleRoom={singleRoom} /> {/* Include Features component */}
//                     </div>                   
//                 </div>
//             </div>
//             <div className="roomLocation">
//                 <h3> <FaSearchLocation/> Room Location</h3>
//             <Location singleRoom={singleRoom}/>
//             </div>


//             <h3>Share with your friends</h3>
//             <div className='socialMediaIcons'>
//                 <i style={{ color: '#1877F2' }}><FaFacebook onClick={() => shareRoom('facebook')} /></i>
//                 <i style={{ color: '#1DA1F2' }}><FaTwitter onClick={() => shareRoom('twitter')} /></i>
//                 <i style={{ color: '#25D366' }}><FaWhatsapp onClick={() => shareRoom('whatsapp')} /></i>
//             </div>
//         </div>
//     );
// };

// export default RoomDetails;





import React, { useEffect, useState } from 'react';
import '../roomDetails/roomDetails.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaWhatsapp, FaHome, FaSearchLocation } from "react-icons/fa";
import Loading from '../../components/auth/signup/Loading';
import Features from './Features'; 
import Location from './Location';

const RoomDetails = () => {
    const { slug } = useParams();
    const [singleRoom, setSingleRoom] = useState({});
    const [mainImage, setMainImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const getSingleRoom = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/singleRoom/${slug}`);
                if (response.data.success) {
                    setSingleRoom(response.data.singleRoom);
                    if (response.data.singleRoom.images.length > 0) {
                        setMainImage(response.data.singleRoom.images[0]);
                    }
                } else {
                    toast.error("Something went wrong");
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
        };

        if (slug) getSingleRoom();
    }, [slug]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % singleRoom.images.length);
        }, 4000); // Change image every 6 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [singleRoom.images]);

    const handleThumbnailClick = (image, index) => {
        setMainImage(image);
        setCurrentImageIndex(index);
    };

    const handleSlide = (direction) => {
        const newIndex = (currentImageIndex + direction + singleRoom.images.length) % singleRoom.images.length;
        setMainImage(singleRoom.images[newIndex]);
        setCurrentImageIndex(newIndex);
    };

    const shareRoom = async (platform) => {
        const shareText = `I found this amazing room located at ${singleRoom.address} on Hamro Rooms website. Check it out!`;
        const shareUrl = window.location.href;

        let shareContent = {
            title: 'Check out this room!',
            text: shareText,
            url: shareUrl
        };

        if (platform === 'whatsapp') {
            shareContent = {
                text: `${shareText} ${shareUrl}`
            };
        }

        if (navigator.share) {
            try {
                await navigator.share(shareContent);
            } catch (error) {
                console.error(`Error sharing room on ${platform}:`, error);
                toast.error(`Failed to share room on ${platform}. Please try again.`);
            }
        } else {
            const shareUrlEncoded = encodeURIComponent(shareUrl);
            let shareLink = '';
            switch (platform) {
                case 'facebook':
                    shareLink = `https://facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`;
                    break;
                case 'twitter':
                    shareLink = `https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${encodeURIComponent(shareText)}`;
                    break;
                case 'whatsapp':
                    shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                    break;
                default:
                    return;
            }
            window.open(shareLink, '_blank');
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!singleRoom || !singleRoom.images || singleRoom.images.length === 0) {
        return <div>No room found.</div>;
    }

    return (
        <div className='singleListing_container'>
            <div className='propertyimgAndDetailsContainer'>
                <div className='left_listing'>
                    <div className='single_listing'>
                        <div className='main_image_container'>
                            <img className='main_image' src={mainImage} alt='Room' />
                            <div className='navigation_dots'>
                                {singleRoom.images.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(singleRoom.images[index], index)}
                                    ></span>
                                ))}
                            </div>
                            <div className='slide_controls'>
                                <button onClick={() => handleSlide(-1)}>‹</button>
                                <button onClick={() => handleSlide(1)}>›</button>
                            </div>
                        </div>
                        <div className='thumbnail_container'>
                            {singleRoom.images.map((image, index) => (
                                <img
                                    key={index}
                                    className={`thumbnail_image ${index === currentImageIndex ? 'active' : ''}`}
                                    src={image}
                                    alt={`Room Thumbnail ${index}`}
                                    onClick={() => handleThumbnailClick(image, index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='right_listing'>
                    <div className='right_listing_header'>
                        <h3><FaHome /> Room Details</h3>
                    </div>
                    <div className='property_details'>
                        <Features singleRoom={singleRoom} /> 
                    </div>                   
                </div>
            </div>
            <div className="roomLocation">
                <h3 className='locationHeading'> <FaSearchLocation/> Room Location</h3>
                <Location singleRoom={singleRoom}/>
            </div>
            <h3>Share with your friends</h3>
            <div className='socialMediaIcons'>
                <i style={{ color: '#1877F2' }}><FaFacebook onClick={() => shareRoom('facebook')} /></i>
                <i style={{ color: '#1DA1F2' }}><FaTwitter onClick={() => shareRoom('twitter')} /></i>
                <i style={{ color: '#25D366' }}><FaWhatsapp onClick={() => shareRoom('whatsapp')} /></i>
            </div>
        </div>
    );
};

export default RoomDetails;

