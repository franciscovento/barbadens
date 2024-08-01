import { DOCUMENT_TYPE_ID } from '../../constants';
import { Details, Document } from './types/bsale/document.interface';
import { GetDocumentWithDetailsResponse } from './types/document.interface';

const generateDocument = (
  documentWeb: GetDocumentWithDetailsResponse,
  { payment_type_id }: { payment_type_id: number }
): Document => {
  let details: Details[] = [];
  documentWeb.details.items.forEach((detail) => {
    details.push({
      detailId: detail.id,
      quantity: detail.quantity,
    });
  });

  let date = new Date();
  let mls = date.getTime();
  let ms = Math.floor(mls / 1000);

  return {
    documentTypeId: DOCUMENT_TYPE_ID,
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
    // officeId: OFFICE_ID,
    // priceListId: 1,
  };
};

export { generateDocument };
