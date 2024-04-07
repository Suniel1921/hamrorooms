import React, { useEffect, useState } from 'react';
import '../roomDetails/roomDetails.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Features from './Features';
import Location from './Location';
import Loading from '../../components/auth/signup/Loading';

const RoomDetails = () => {
    const { slug } = useParams(); // Use 'slug' instead of 'id'
    const [singleRoom, setSingleRoom] = useState({});
    const [selectedSection, setSelectedSection] = useState("features");
    const [isLoading, setIsLoading] = useState(true); // Loading state

    const getSingleRoom = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/upload/singleRoom/${slug}`); // Use 'slug' instead of 'id'
            // console.log(response)
            if (response.data.success) {
                setSingleRoom(response.data.singleRoom);
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
    }

    useEffect(() => {
        if (slug) getSingleRoom();
    }, [slug])

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

    return (
        <>
            {isLoading ? ( 
                <Loading/>
                
            ) : (
                <div className='singleRoomcontainer'>
                    <h3 className='roomTitle'>{singleRoom.address}</h3>
                    <div className='roomImage'>
                        <div className='room'>
                            <img className='singleImg' src={singleRoom.imageUrl} alt="" loading="lazy" />
                        </div>
                        <div className='multiroom'>
                            <div className='twoimg'>
                                <img src={singleRoom.imageUrl} alt="" loading="lazy" />
                                <img src={singleRoom.imageUrl} alt="" loading="lazy" />
                            </div>
                            <div className='twoimg'>
                                <img src={singleRoom.imageUrl} alt="" loading="lazy" />
                                <img src={singleRoom.imageUrl} alt="" loading="lazy" />
                            </div>
                        </div>
                    </div>

                    <div className='feature_locationContainer'>
                        <h4 
                            onClick={() => setSelectedSection('features')} 
                            style={{color: selectedSection === 'features' ? '#7571f9' : 'black'}}
                        >
                            Features
                        </h4>
                        <h4 
                            onClick={() => setSelectedSection('location')} 
                            style={{color: selectedSection === 'location' ? '#7571f9' : 'black'}}
                        >
                            Location
                        </h4>
                    </div>

                    {selectedSection === 'features' ? (
                        <Features singleRoom={singleRoom}/>
                    ) : (
                        <Location singleRoom={singleRoom}/>
                    )}

                    <h3>Share with your friends</h3>
                    <div className='socialMediaIcons'>
                        <i style={{color: '#1877F2'}}><FaFacebook onClick={() => shareRoom('facebook')} /></i>
                        <i style={{color:'#1DA1F2'}}><FaTwitter onClick={() => shareRoom('twitter')} /></i>
                        <i style={{color: '#25D366'}}><FaWhatsapp onClick={() => shareRoom('whatsapp')} /></i>
                    </div>
                </div>
            )}
        </>
    )
}

export default RoomDetails;
