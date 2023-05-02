import fs from 'fs';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { traced, bindKey } from '@sliit-foss/functions';
import { getTransactionDetails } from '../../repository';
import { sendEmail, uploadFile } from '../../../../services';
import { constructOrderReportEmailPayload } from './mappers/email';

export const serviceGenerateOrderReport = async (email) => {
  const data = await traced(getTransactionDetails)();
  const dir = '/tmp/reports';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const path = `${dir}/orders_${new Date().getTime()}.csv`;
  const csvWriter = createCsvWriter({
    path,
    header: [
      { id: 'user', title: 'Customer' },
      { id: 'total', title: 'Total Value (LKR)' },
      { id: 'status', title: 'Status' },
      { id: 'created_at', title: 'Date' },
    ],
  });
  await traced(bindKey(csvWriter, 'writeRecords'))(data.map((o) => ({ ...o, user: o.user?.name })));
  const url = await traced(uploadFile)(path);
  traced(sendEmail)(constructOrderReportEmailPayload(email, url));
  fs.unlinkSync(path);
  return;
};
