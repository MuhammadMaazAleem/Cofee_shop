import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: '/orders/myorders',
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
    updateOrderToPaid: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/pay`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderToDelivered: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useGetOrderDetailsQuery, 
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderToPaidMutation,
  useUpdateOrderToDeliveredMutation,
} = ordersApiSlice;
