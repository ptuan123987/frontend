import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { API_URL ,access_token } from "../../../Constants";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
const PaymentLanding = () => {
  const [searchParams] = useSearchParams();
  const token= searchParams.get("token");
  console.log(token);

  const navigate = useNavigate();

  useEffect(() => {
    async function sendTokenToPayment() {
      try {
        const response = await axios.get(
          API_URL + "api/user/check-out/success",
          {
            params: {
              token: token,
            },
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log(response.data);
        toast.success("Course is paid!")
       navigate("/my-learning");
      } catch (error) {
        console.error("Error fetching payment URL:", error);
      }
    }
    sendTokenToPayment();
  }, []);

  return (
    <div className="flex fixed inset-0 items-center justify-center ">
        <h2 className="text-lg">Xác Thực Thanh Toán Thành Công...</h2>
    </div>
  );
};
export default PaymentLanding;
