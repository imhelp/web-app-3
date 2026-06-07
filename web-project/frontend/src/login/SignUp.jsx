import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function SignUp({ setIsSignUp }) {

    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        studentId,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("회원가입 성공");

                setIsSignUp(false);

            } else {

                alert("이미 존재하는 학번입니다.");

            }

        } catch (error) {

            console.log(error);

            alert("회원가입 실패");

        }

    };

    return (

        <div className="box">

            <h1>회원가입</h1>

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
                        handleSignUp();
                    }
                }}
            />

            <button onClick={handleSignUp}>
                회원가입
            </button>

            <div className="bottom">

                <span
                    className="join"
                    onClick={() => navigate("/login")}
                >
                    로그인으로 돌아가기
                </span>

            </div>

        </div>
    );
}

export default SignUp;