import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { API_URL } from '../../../Constants';
import LectureService from '../../services/LectureService';
import ReactLoading from 'react-loading';

const ResourceComponent = ({ lectureId }) => {
    const [resourceInfo, setResourceInfo] = useState(null);

    useEffect(() => {
        const fetchResourceInfo = async () => {
            try {
                const res = await LectureService.getLecture(lectureId);
                setResourceInfo(res);
                console.log('Fetched resources Info:', res);
               
            } catch (error) {
                console.error('Error fetching resources information:', error);
            }
        };
        fetchResourceInfo();
    }, [lectureId]);

    return (
        <div className='relative'>
            {resourceInfo ? (
                <div className="grid gap-4 mt-4">
                    {resourceInfo.resources.map((resource, index) => (
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
                <div className="flex absolute inset-0 items-center justify-center mt-20 ">
                        <ReactLoading type="spin" color="#000" height={50} width={50} />
                </div>
            )}
        </div>
    );
};

export default ResourceComponent;
