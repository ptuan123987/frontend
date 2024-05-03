import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { API_URL } from '../../../Constants';

const ResourceComponent = ({ lectureId }) => {
    const [resourceInfo, setResourceInfo] = useState(null);

    useEffect(() => {
        const fetchResourceInfo = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await fetch(API_URL + `api/lectures/${lectureId}`, {
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
                    console.error('Failed to fetch resources information');
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
                <div className="grid gap-4 mt-4">
                    {resourceInfo.data.resources.map((resource, index) => (
                        <div key={index} className="border p-4">
                            <p className="font-bold">Title: {resource.title}</p>
                            <p>
                                Link:{' '}
                                <a href={resource.link} className="text-blue-500 underline">
                                    {resource.link}
                                </a>
                            </p>
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
