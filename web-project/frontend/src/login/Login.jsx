import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
//import { GoogleLogin } from "@react-oauth/google";
function Login() {

    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/login",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json"
                    },
                    body:
                        JSON.stringify
                            ({
                                studentId,
                                password
                            })
                }
            );

            const data = await response.json();

            if (data.success) {
                localStorage.setItem(
                    "studentId",
                    studentId
                );

                if (autoLogin) {
                    localStorage.setItem(
                        "isLogin",
                        "true"
                    );
                }

                navigate("/")
            }
            else {
                alert("학번 또는 비밀번호가 틀렸습니다.");
            }

        } catch (error) {

            alert("서버 연결 실패");

            console.log(error);

        }

    };

    return (
        <div className="box">
            <h1>로그인/회원가입</h1>

            <input
                type="text"
                placeholder="학번 입력"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
            />

            <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleLogin();
                    }
                }}
            />

            <button onClick={handleLogin}>
                로그인
            </button>

            <button
                type="button"
                onClick={() => navigate("/")}
            >
                메인화면으로
            </button>

            {/*             <GoogleLogin
                onSuccess={(response) => {

                    localStorage.setItem(
                        "studentId",
                        "구글 로그인"
                    );

                    setIsLogin(true);
                }}

                onError={() => {
                    alert("구글 로그인 실패");
                }}
            /> */}

            <div className="bottom">
                <div className="autologin">
                    <input
                        type="checkbox"
                        checked={autoLogin}
                        onChange={() => setAutoLogin(!autoLogin)}
                        className="check"
                    />
                    <span>로그인 상태 유지</span>
                </div>

                <span
                    className="SingUp"
                    onClick={() => navigate("/signup")}
                >
                    회원가입
                </span>
            </div>
        </div>
    );
}

export default Login;