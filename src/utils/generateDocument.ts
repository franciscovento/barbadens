import { Details, Document } from './types/bsale/document.interface';
import { GetDocumentWithDetailsResponse } from './types/document.interface';

const generateDocument = (
  documentWeb: GetDocumentWithDetailsResponse,
  { payment_type_id, order_id }: { payment_type_id: number; order_id: number }
): Document => {
  let details: Details[] = [];
  documentWeb.details.items.forEach((detail) => {
    details.push({
      detailId: detail.id,
      // variantId: detail.variant.id,
      // grossUnitValue: detail.totalAmount,
      quantity: detail.quantity,
      comment: ` - orden: ${order_id}`,
    });
  });

  let date = new Date();
  let mls = date.getTime();
  let ms = Math.floor(mls / 1000);

  return {
    documentTypeId: 22,
    emissionDate: ms,
    expirationDate: ms,
    payments: [
      {
        paymentTypeId: payment_type_id,
        amount: documentWeb.totalAmount,
        recordDate: ms,
      },
    ],
    clientId: Number(documentWeb.client.id),
    declare: 1,
    details,
    dispatch: 0,
    sendEmail: 1,
    // officeId: 1,
    // priceListId: 1,
  };
};

// return {
//   documentTypeId: 22,
//   emissionDate: ms,
//   expirationDate: ms,
//   declare: 1,
//   dispatch: 0,
//   clientId: 42,
//   details: [
//     {
//       detailId: 166,
//       quantity: 1,
//     },
//   ],
//   payments: [
//     {
//       paymentTypeId: 8,
//       amount: 560,
//       recordDate: ms,
//     },
//   ],
//   sendEmail: 1,
// };
// };

export { generateDocument };
