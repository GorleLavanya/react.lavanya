import { useNavigate } from "react-router-dom";

function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary">📞 Contact Us</h1>

      {/* Contact Numbers */}
      <div className="mt-4">
        <p className="fs-5">☎️ <strong>+91 9177323788</strong></p>
        <p className="fs-5">☎️ <strong>+91 8657465321</strong></p>
        <p className="fs-5">☎️ <strong>+91 7765489034</strong></p>
      </div>
    </div>
  )
}
export default ContactUs;

