import { useState } from 'react';
import axios from 'axios';
import Notification from '../../components/Notification/Notification';
import './Password.css';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const url = import.meta.env.VITE_API_URL; // Use process.env in CRA

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/forgot-password`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 200) {
        setNotification({
          message: 'Please check your email to reset your password.',
          type: 'success',
          visible: true,
        });
      }
    } catch (error) {
      setNotification({
        message: 'An error occurred. Please try again.',
        type: 'error',
        visible: true,
      });
    }
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div className="forget-password-container">
      <div className="form-wrapper">
        <h2 className="form-title">Forgot Password</h2>
        <p className="form-subtitle">
          Enter your email below to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Send Reset Link
          </button>
        </form>
        <Notification
          message={notification.message}
          type={notification.type}
          visible={notification.visible}
          onClose={closeNotification}
        />
      </div>
    </div>
  );
}

export default ForgetPassword;