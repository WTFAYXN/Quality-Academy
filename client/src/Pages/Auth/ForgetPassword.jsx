import { useState } from 'react';
import axios from 'axios';
import Notification from '../../components/Notification/Notification';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const url = import.meta.env.VITE_BACKEND_URL; // Use process.env in CRA

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
    <div className="mt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto my-4 p-4 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl mb-4 font-semibold text-gray-700 text-center">
          Forgot Password
        </h2>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Submit
        </button>
      </form>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    </div>
  );
}

export default ForgetPassword;