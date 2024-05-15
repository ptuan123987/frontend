import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { API_URL,access_token } from '../../../Constants';
import axios from 'axios';
import LectureService from '../../services/LectureService';

const VideoPlayer = ({ lectureId }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const data = await LectureService.getLecture(lectureId); 
                if (data && data.video && data.video.url) {
                    setVideoUrl(data.video.url);
                    setThumbnailUrl(data.video.thumbnail_url);
                    console.log('Fetched video URL:', data.video.url);
                    console.log('Fetched thumbnail URL:', data.video.thumbnail_url);
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setIsLoading(false); 
            }
        };
        fetchVideoData();
    }, [lectureId]);

    return (
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            {videoUrl ? (
                <ReactPlayer
                    url={videoUrl}
                    controls={true}
                    volume={1}
                    loop={true}
                    light={thumbnailUrl}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
            ) : (
                // Skeleton
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}
        </div>
    );
}

export default VideoPlayer;
