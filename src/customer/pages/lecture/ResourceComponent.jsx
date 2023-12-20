import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

const ResourceComponent = ({ lectureId }) => {
    const [resourceInfo, setResourceInfo] = useState(null);

    useEffect(() => {
        const fetchResourceInfo = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await fetch(`https://api-study.salyr.online/api/lectures/${lectureId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setResourceInfo(data);
                    console.log('Fetched resources Info:', data);
                } else {
                    console.error('Failed to fetch Resources information');
                }
            } catch (error) {
                console.error('Error fetching resources information:', error);
            }
        };

        fetchResourceInfo();
    }, [lectureId]);

    return (
        <div>
            {resourceInfo ? (
                <div>
                    <h3>Resources:</h3>
                    {resourceInfo.data.resources.map((resource, index) => (
                        <div key={index}>
                            <p>Title: {resource.title}</p>
                            <p>Link: {resource.link}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ResourceComponent;
