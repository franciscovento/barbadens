import { Details, Document } from './types/bsale/document.interface';
import { Order } from './types/order.interface';

const generateDocument = (order: Order): Document => {
  const cartProducts = order.checkout_info.cartDetails;

  let details: Details[] = [];
  cartProducts.forEach((product) => {
    details.push({
      variantId: product.idVarianteProducto,
      grossUnitValue: product.grossUnitValue,
      quantity: product.quantity,
    });
  });

  let date = new Date();
  let mls = date.getTime();
  let ms = Math.floor(mls / 1000);

  return {
    documentTypeId: 22,
    declare: 1,
    emissionDate: ms,
    expirationDate: ms,
    dispatch: 0, // si descuenta stock automáticamente o no
    client: {
      code: order.checkout_info.code,
      // city: order.checkout_info.clientCityZone || '',
      // municipality: order.checkout_info.clientState || '',
      // address:
      //   order.checkout_info.clientStreet +
      //   order.checkout_info.clientBuildingNumber,
      email: order.checkout_info.clientEmail,
      companyOrPerson: 0, // 0 | 1
      firstName: order.checkout_info.clientName,
      lastName: order.checkout_info.clientLastName,
    },
    details: details,
    sendEmail: 1,
  };
};

export { generateDocument };
