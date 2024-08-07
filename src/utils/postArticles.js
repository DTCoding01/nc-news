export default function validateImageUrl(url) {
  const imageExtensions = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;

  if (typeof url !== "string" || !imageExtensions.test(url)) {
    return false;
  }

  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);

    img.src = url;
  });
}
