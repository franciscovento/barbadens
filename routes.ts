export const routes = {
  home: '/',
  create: {
    home: '/create',
    fabric: {
      measures: '/create/[fabric_id]/medidas',
      personalize: '/create/[fabric_id]/personaliza',
    },
  },
  checkout: {
    home: '/checkout',
    resume: '/checkout/resume/[order_id]',
  },
  account: {
    home: '/account',
    orders: '/account/orders',
  },
  auth: {
    login: '/auth/login',
    changuePassword: '/auth/change-password',
    forgotPassword: '/auth/forgot-password',
    verifyEmail: '/auth/verify-email',
  },
  blog: {
    home: '/blog',
    post: '/blog/[slug]',
  },
  api: {
    cart: '/api/cart',
    checkout: '/api/checkout',
    clients: '/api/clients',
    payments: '/api/payments',
    products: '/api/products',
  },
};
