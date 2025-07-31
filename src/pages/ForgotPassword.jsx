import React from 'react';
import * as yup from 'yup';
import AuthForm from '../components/AuthForm';
// import axios from 'axios';
import api from '../api'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/forgot-password', data, { withCredentials: true });
      toast.success('Password reset email sent!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending email');
      toast.error(err.response?.data?.message || 'Error sending email');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <AuthForm
        schema={schema}
        onSubmit={onSubmit}
        fields={[
          { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
        ]}
        buttonText="Send Reset Email"
        loading={loading}
        error={error}
      >
        <div className="mt-4 text-center">
          <Link to="/login" className="text-green-600 hover:underline">Back to Login</Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default ForgotPassword;