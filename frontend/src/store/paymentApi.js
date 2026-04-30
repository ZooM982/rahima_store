import { apiSlice } from './apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: '/payment/initiate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
