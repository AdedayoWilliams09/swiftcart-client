import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
  phone: yup.string().required(),
});

const AddressForm = ({ onSubmit, defaultValues = {}, buttonText = "Save Address" }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register('fullName')} placeholder="Full Name" className="w-full border rounded px-3 py-2" />
      {errors.fullName && <div className="text-red-500">{errors.fullName.message}</div>}
      <input {...register('street')} placeholder="Street" className="w-full border rounded px-3 py-2" />
      {errors.street && <div className="text-red-500">{errors.street.message}</div>}
      <input {...register('city')} placeholder="City" className="w-full border rounded px-3 py-2" />
      {errors.city && <div className="text-red-500">{errors.city.message}</div>}
      <input {...register('state')} placeholder="State" className="w-full border rounded px-3 py-2" />
      {errors.state && <div className="text-red-500">{errors.state.message}</div>}
      <input {...register('postalCode')} placeholder="Postal Code" className="w-full border rounded px-3 py-2" />
      {errors.postalCode && <div className="text-red-500">{errors.postalCode.message}</div>}
      <input {...register('country')} placeholder="Country" className="w-full border rounded px-3 py-2" />
      {errors.country && <div className="text-red-500">{errors.country.message}</div>}
      <input {...register('phone')} placeholder="Phone" className="w-full border rounded px-3 py-2" />
      {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{buttonText}</button>
    </form>
  );
};

export default AddressForm;