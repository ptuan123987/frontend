import axios from "axios";
import { API_URL,access_token } from "../../Constants";

const getLecture = async (lectureId) => {
    const response = await axios.get(API_URL +`api/lectures/${lectureId}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    const lecture = response.data.data;
    return lecture;
}
 const LectureService = {
    getLecture
}
export default LectureService;