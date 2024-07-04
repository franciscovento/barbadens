import * as crypto from 'crypto';

const isRequestFromMercadoPago = (
  xSignature: string,
  xRequestId: string,
  dataId: string
) => {
  const parts = xSignature.split(',');

  let ts;
  let hash;
  parts.forEach((part) => {
    // Split each part into key and value
    const [key, value] = part.split('=');
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === 'ts') {
        ts = trimmedValue;
      } else if (trimmedKey === 'v1') {
        hash = trimmedValue;
      }
    }
  });

  // Obtain the secret key for the user/application from Mercadopago developers site
  const secret = process.env.MP_HOOK_SECRET || '';

  // Generate the manifest string
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  // Create an HMAC signature
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(manifest);

  // Obtain the hash result as a hexadecimal string
  const sha = hmac.digest('hex');

  return sha === hash;
};

export { isRequestFromMercadoPago };
