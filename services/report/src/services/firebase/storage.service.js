import { getStorage } from 'firebase-admin/storage';

const bucket = getStorage().bucket();

export const uploadFile = async (path) => {
  const fileName = path.split('/').pop();
  await bucket.upload(path, {
    destination: fileName,
  });
  const file = bucket.file(fileName);
  const signedUrls = await file.getSignedUrl({
    action: 'read',
    expires: '03-09-2050',
  });
  return signedUrls?.[0];
};
