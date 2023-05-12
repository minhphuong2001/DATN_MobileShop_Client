import { Facebook, Instagram, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="row-row">
          <div className="footer-col">
            <h4>Về DTMP Shop</h4>
            <ul>
              <li>
                <a href="/">Giới thiệu</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
              <li>
                <a href="/">Tuyển dụng</a>
              </li>
              <li>
                <a href="/">Tin tức</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li>
                <a href="/">Hướng dẫn chọn size</a>
              </li>
              <li>
                <a href="/">Chính sách đổi/trả</a>
              </li>
              <li>
                <a href="/">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="/">Thanh toán, giao nhận</a>
              </li>
              <li>
                <a href="/">Khách hàng thân thiết</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Tổng đài hỗ trợ</h4>
            <ul>
              <li>
                <a href="/contact">Liên hệ đặt hàng: 0389247621</a>
              </li>
              <li>
                <a href="/contact">Thắc mắc đơn hàng: 0389247621</a>
              </li>
              <li>
                <a href="/contact">
                  Ý kiến, khiếu nại: 0389247621
                  <br style={{ textTransform: "lowercase" }}/> (minhphuongdo2001@gmail.com)
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kết nối với chúng tôi</h4>
            <div className="social-links">
              <a href="/">
                {" "}
                <Facebook className="icon" />{" "}
              </a>
              <a href="/">
                {" "}
                <YouTube />{" "}
              </a>
              <a href="/">
                {" "}
                <Instagram />{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
