export default async function uploadImage(file: File | null) {
  let imageUrl = '';

  if (!file) return imageUrl;

  if (file.name) {
    const cloudinaryData = new FormData();
    cloudinaryData.append('file', file);
    cloudinaryData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    cloudinaryData.append(
      'api_key',
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: cloudinaryData,
        }
      );

      const result = await response.json();
      imageUrl = result.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  return imageUrl;
}
