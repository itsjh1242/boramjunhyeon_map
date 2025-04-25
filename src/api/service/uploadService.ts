import { storage } from "@/lib/db";
import { ImageWithUUID, UploadedImage } from "@/schema/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImage(
  image: ImageWithUUID,
): Promise<UploadedImage> {
  const { id, file } = image;
  const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return { id, url };
}

export async function uploadImages(
  images: ImageWithUUID[],
): Promise<UploadedImage[]> {
  const uploadTasks = images.map(async ({ id, file }) => {
    const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { id, url };
  });

  return Promise.all(uploadTasks);
}
