import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import useWishlistStore from '../../stores/useWishlistStore';
import { API_URL } from '../../../Constants';
import { CheckoutService } from '../../services/CheckoutService';
import useUserStore from '../../stores/useUserStore';
import WishlistService from '../../services/WishListService';
import CourseService from '../../services/CourseService';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Modal from '../../components/modal/Modal';
import momoImage from '../../pages/checkout/momo1.png';
import vietQrImage from '../../pages/checkout/vietqr1.png';

const CourseDescription = ({ courseId }) => {
    const [courseInfo, setCourseInfo] = useState(null);
    const [chapterData, setChapterData] = useState([]);
    const [isCourseInWishlist, setIsCourseInWishlist] = useState(false);
    const [isCoursePaid, setIsCoursePaid] = useState(false);
    const [isCheckingPaymentStatus,setIsCheckingPaymentStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore((state) => ({
        addToWishlist: state.addToWishlist,
        removeFromWishlist: state.removeFromWishlist,
        wishlist: state.wishlist,
    }));
    const userId = useUserStore(state => state.userData?.id);

    const toggleWishlist = async () => {
        if (isCourseInWishlist) {
            await removeFromWishlist(courseId);
            setIsCourseInWishlist(false);
            successRemoved();
        } else {
            if (courseInfo && courseInfo.data) {
                const { data } = courseInfo;
                const course = {
                    id: courseId,
                    description: data.description || '',
                    author: data.author || '',
                    price: data.price || 0,
                    thumbnail_url: data.thumbnail_url || '',
                    title: data.title || '',
                };
                await addToWishlist(course);
                setIsCourseInWishlist(true); 
                successAdded();
            }
        }
    };
    const handleLectureClick = (chapterId, lectureId) => {
        const lectureUrl = `/course/${courseId}/chapter/${chapterId}/lecture/${lectureId}`;
        window.location.href = lectureUrl;
    };

    const handleStartButtonClick = async () => {
        await CourseService.acceptCourse(courseId)
        if (chapterData.length > 0 && chapterData[0].lectures.length > 0) {
            const firstChapter = chapterData[0];
            const firstLecture = firstChapter.lectures[0];
            const lectureUrl = `/course/${courseId}/chapter/${firstChapter.id}/lecture/${firstLecture.id}`;
            window.location.href = lectureUrl;
        }
    };
    const successAdded = () => toast.success("Added To Wishlist!");
    const successRemoved = () => toast.success("Removed To Wishlist!")

    const handleCheckout = () => {
        setIsModalOpen(true);  
    };
    
    useEffect(() => {
        async function fetchCourseInfoAndCheckStatus() {
            setIsLoading(true);
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await axios.get(API_URL + `api/courses/${courseId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
    
                if (response.status === 200) {
                    const data = response.data;
                    setCourseInfo(data);
                } else {
                    console.error('Failed to fetch course information');
                }
    
                const isInWishlist = await WishlistService.checkCourseInWishList(courseId);
                setIsCourseInWishlist(isInWishlist);
                const isPaid = await CourseService.checkPaidCourse(courseId);
                setIsCoursePaid(isPaid);
            } catch (error) {
                console.error('Error fetching or checking course information:', error);
            } finally {
                setIsCheckingPaymentStatus(false);
                setIsLoading(false); 
            }
        }
    
        fetchCourseInfoAndCheckStatus();
    }, [courseId]);;

    useEffect(() => {
        async function checkCoursePaidStatus() {
            try {
                setIsCheckingPaymentStatus(true);

                const isPaid = await CourseService.checkPaidCourse(courseId);
                setIsCoursePaid(isPaid);
            } catch (error) {
                console.error('Error checking course payment status:', error);
            } finally {
                setIsCheckingPaymentStatus(false);
            }
        }

        checkCoursePaidStatus();
    }, [courseId]);

    
    const checkOutMomo = async (course) => {
        try {
          const res = await CheckoutService.MomoCheckoutCourse(course.price, [course.id]);
          const payUrl = res.data.payUrl;
          console.log(payUrl);
          window.location.href = payUrl;
        } catch (error) {
          console.error("Error occurred during checkout:", error);
        }                                     
    }
    const checkOutVietQr = async (course) => {
    try {
        const res = await CheckoutService.VietQrCheckoutCourse(course.price, [course.id]);
        const payUrl = res.data.payUrl;
        console.log(payUrl);
        window.location.href = payUrl;
    } catch (error) {
        console.error("Error occurred during checkout:", error);
    }                                     
    }

    if (isLoading) {
        return  (
            <div className="relative mb-[50px]">
                <div className="flex absolute inset-0 items-center justify-center m-10 ">
                    <ReactLoading type="spin" color="#000" height={50} width={50} />
                </div>
            </div>
        )
    }

    return (
        <div className="relative space-y-8 flex flex-col">
            <div>
                {courseInfo ? (
                    <div className="bg-black text-white p-4 rounded-md shadow-md">
                        <h1 className="text-3xl font-bold my-4 font-serif text-white">{courseInfo.data.title}</h1>
                        <p className="text-xl font-bold text-white">{courseInfo.data.description}</p>
                        <div className="flex justify-between items-end mt-4 border-t-2">
                            <div className="text-gray-200 font-semibold">
                                Price:
                                <p className="mb-3 font-UdemySansBold font-black">
                                    <span className="text-sm font-light align-text-top">đ</span> {courseInfo.data.price}{' '}
                                    <span className="line-through text-gray-400 text-sm font-normal ms-1"></span>
                                </p>
                                <p>Author: {courseInfo.data.author}</p>
                                <p>Total Video Duration: {courseInfo.data.total_video_duration} hours</p>
                                <p>{courseInfo.data.user_count} Participants</p>
                            </div>
                            <div className="flex space-x-4">
                                {isCoursePaid ? (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleStartButtonClick}
                                    >
                                        Start Now
                                    </button>
                                ) : (
                                    <button
                                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
                                        onClick={() => handleCheckout()}
                                    >
                                        Buy Now
                                    </button>
                                )}
                              <button
                                className={`font-bold py-2 px-4 rounded ${!isCourseInWishlist ? 'bg-pink-500 hover:bg-pink-700 text-white' : 'bg-red-500 text-white hover:bg-red-700'}`}
                                onClick={toggleWishlist}
                            >
                                {isCourseInWishlist  ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>


                             
                            </div>
                        </div>
                        {isModalOpen && (
                            <Modal setOpenModal={setIsModalOpen}>
                                <div className="title text-2xl font-bold mb-4 text-black">
                                    <h1>Confirm Checkout</h1>
                                </div>
                              <div className="body text-sm mb-4 li leading-8  text-black">
                                <p>Are you sure you want to checkout the selected items?</p>
                              </div>
                              <div className="footer gap-10">
                                <img 
                                    src={momoImage} 
                                    alt="momo" 
                                    className="w-32 h-32 cursor-pointer" 
                                    onClick={() => checkOutMomo(courseInfo.data)}
                                />
                                <img 
                                    src={vietQrImage} 
                                    alt="vietqr" 
                                    className="w-32 h-32 cursor-pointer" 
                                    onClick={() => checkOutVietQr(courseInfo.data)}
                                />
                              </div>
                            </Modal>
                          )}
                    </div>
                ) : (
                    <div className="relative mb-[50px]">
                        <div className="flex absolute inset-0 items-center justify-center m-10 ">
                            <ReactLoading type="spin" color="#000" height={50} width={50} />
                        </div>
                    </div>
                )}
            </div>
            <div className=" p-4 rounded-md border-2">
                <h2 className="text-xl font-bold
                    mb-2 border-b-2 border-black">Course content</h2>
                     <ChapterList courseId={courseId} setChapterData={setChapterData} />
                <div className="space-y-2 mt-4">
                    {chapterData.map((chapter, index) => (
                        <Accordion
                            key={index}
                            title={chapter.title}
                            content={chapter.lectures}
                            onClickLecture={(chapterId, lectureId) => handleLectureClick(chapterId, lectureId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;


const ChapterList = ({courseId, setChapterData}) => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken();
                const response = await fetch(API_URL + `api/courses/${courseId}/chapters`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.data) {
                        setChapters(data.data);
                        setChapterData(data.data); 
                        console.log('Fetched chapters:', data.data);
                    }
                } else {
                    console.error('Failed to fetch chapters');
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        fetchChapters();
    }, [courseId, setChapterData]);

    return null; 
};

const Accordion = ({title, content, onClickLecture}) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded-md my-2">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
                <span>{title}</span>
                <svg
                    className={`fill-current h-4 w-4 transition-transform ${
                        accordionOpen ? 'rotate-90' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-max-height ease-out duration-300 ${
                    accordionOpen ? 'h-auto' : 'h-0'
                }`}
            >
                <div className="border-t border-gray-300">
                    {content.map((lecture, index) => (
                        <div key={index} className={`${index !== 0 ? 'border-t border-gray-300' : ''} p-4`}>
                            <button
                                onClick={() => onClickLecture(lecture.chapter_id, lecture.id)}>{lecture.title}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};