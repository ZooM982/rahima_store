import { apiSlice } from './apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (orderId) => ({
        url: '/payment/initiate',
        method: 'POST',
        body: { orderId },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
