import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { API_URL } from '../../../Constants';

const VideoPlayer = ({ lectureId }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch(API_URL + `api/lectures/${lectureId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.data && data.data.video && data.data.video.url) {
                        setVideoUrl(data.data.video.url);
                        setThumbnailUrl(data.data.video.thumbnail_url);
                        console.log('Fetched video URL:', data.data.video.url);
                        console.log('Fetched thumbnail URL:', data.data.video.thumbnail_url);
                    }
                } else {
                    console.error('Failed to fetch video data');
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
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
