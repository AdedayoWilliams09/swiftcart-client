import React from 'react';
import * as yup from 'yup';
import AuthForm from '../components/AuthForm';

import api from '../api'
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  password: yup.string().min(6).required('Password is required'),
});

const ResetPassword = () => {
  const { token } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/auth/reset-password/${token}`, data, { withCredentials: true });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
      toast.error(err.response?.data?.message || 'Error resetting password');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <AuthForm
        schema={schema}
        onSubmit={onSubmit}
        fields={[
          { name: 'password', label: 'New Password', type: 'password', autoComplete: 'new-password' },
        ]}
        buttonText="Reset Password"
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

export default ResetPassword;