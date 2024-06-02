import { MercadoPagoConfig } from 'mercadopago';

const mpClient = () => {
  return new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || '',
  });
};

export default mpClient;
