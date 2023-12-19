import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../Constants";
const GitLanding = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  const navigate = useNavigate();

  useEffect(() => {
    async function sendTokenToLogin() {
      try {
        const response = await axios.get(
            API_URL + "api/callback/github",
          {
            params: {
              code: code,
            },
          }
        );
        console.log(response);
        // navigate("/");
        
      } catch (error) {
        console.error("Error fetching Github login URL:", error);
      }
    }
    sendTokenToLogin();
  }, []);

  return (
    <div>
      <h2>Xác Thực Đăng Nhập...</h2>
    </div>
  );
};
export default GitLanding;
