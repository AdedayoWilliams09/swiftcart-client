import React from 'react';
import * as yup from 'yup';
import AuthForm from '../components/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await dispatch(loginUser(data));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Login successful!');
      navigate('/profile');
    } else {
      toast.error(res.payload || 'Login failed');
      dispatch(clearError());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <AuthForm
        schema={schema}
        onSubmit={onSubmit}
        fields={[
          { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
          { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
        ]}
        buttonText="Login"
        loading={loading}
        error={error}
      >
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-green-600 hover:underline">Forgot Password?</Link>
        </div>
        <div className="mt-2 text-center">
          New user? <Link to="/register" className="text-green-600 hover:underline">Register</Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default Login;