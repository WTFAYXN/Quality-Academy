import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';
import './Password.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL; // Use process.env in CRA
  const { id, token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    axios
      .post(`${url}/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setNotification({
            message: 'Password has been reset successfully. Redirecting to login...',
            type: 'success',
            visible: true,
          });
          setTimeout(() => {
            setNotification({ ...notification, visible: false });
            navigate('/login');
          }, 5000);
        } else {
          setMessage('Failed to reset password. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage('An error occurred. Please try again later.');
      });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div className="forget-password-container">
      <div className="form-wrapper">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Reset Password
          </button>
        </form>
        {message && <p className="form-error-message">{message}</p>}
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

export default ResetPassword;
