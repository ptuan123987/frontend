import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const GoogleLanding = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  const navigate = useNavigate();

  useEffect(() => {
    async function sendTokenToLogin() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/callback/google",
          {
            params: {
              code: code,
            },
          }
        );
        console.log(response.json());
        navigate("/");
      } catch (error) {
        console.error("Error fetching Google login URL:", error);
      }
    }
    sendTokenToLogin();
  }, []);

  return (
    <div>
      <h2>Xác Thực Đăng Nhập Bằng Google...</h2>
    </div>
  );
};
export default GoogleLanding;
