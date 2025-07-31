import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';

const AuthForm = ({
  schema,
  onSubmit,
  fields,
  buttonText,
  loading,
  error,
  children,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {fields.map(({ name, label, type, autoComplete }) => (
        <div key={name} className="mb-4">
          <label className="block mb-1 font-semibold">{label}</label>
          <input
            type={type}
            autoComplete={autoComplete}
            {...register(name)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors[name] && (
            <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
          )}
        </div>
      ))}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? 'Loading...' : buttonText}
      </button>
      {children}
    </motion.form>
  );
};

export default AuthForm;