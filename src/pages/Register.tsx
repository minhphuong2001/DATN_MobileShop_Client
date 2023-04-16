import React from "react";
import Helmet from "../components/helmet/Helmet";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const navigate = useNavigate();
	
  return (
    <div className="auth">
      <Helmet title="Đăng ký">
        <div className="auth-container" id="authContainer">
          <div className="form-container sign-up-container">
            <form>
              <h1>Tạo tài khoản</h1>
              <br />
              <input
                type="text"
                placeholder="Username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* {error ? <span style={{color: 'red'}}>{error}</span> : ''} */}
              <button type="submit">Đăng ký</button>
            </form>
          </div>
          <div className="overlay-container2">
            <div className="overlay2">
              <div className="overlay-panel2 overlay-left">
                <h1>Chào mừng quay trở lại với Mimin!</h1>
                <p>
                  Để giữ kết nối với Mimin, vui lòng đăng nhập bằng thông tin cá
                  nhân của bạn
                </p>
                <button className="ghost" id="signIn" onClick={() => navigate("/dang-nhap")}>
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </div>
  );
}
