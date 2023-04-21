export const base64EncodeImage = (e) => {
  return new Promise((resolve, reject) => {
    if (e?.[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => resolve(e.target.result);
      };
      reader.readAsDataURL(e[0]);
    }
    reject('Error reading image data');
  });
};
