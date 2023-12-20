import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ lectureId }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch(`https://api-study.salyr.online/api/lectures/${lectureId}`);
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
        <div>
            {videoUrl ? (
                <ReactPlayer
                    url={videoUrl}
                    controls={true}
                    volume={1}
                    loop={true}
                    light={thumbnailUrl}
                />
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
}

export default VideoPlayer;
