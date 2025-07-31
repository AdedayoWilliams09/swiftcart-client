import React from 'react';
import * as yup from 'yup';
import AuthForm from '../components/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required('Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Registration successful!');
      navigate('/profile');
    } else {
      toast.error(res.payload || 'Registration failed');
      dispatch(clearError());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <AuthForm
        schema={schema}
        onSubmit={onSubmit}
        fields={[
          { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
          { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
          { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
        ]}
        buttonText="Register"
        loading={loading}
        error={error}
      >
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-green-600 hover:underline">Login</Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default Register;