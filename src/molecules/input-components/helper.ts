import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";

export const maxSizeBytes = (n: number) => n * 1024 * 1024;

export default async function generateSignedUrl(filename: String) {
  const payload = {
    file_name: filename,
    expires: 1000,
  };

  const response = await RequestServer(
    APIRoutes.generateSignedUrl,
    "POST",
    payload
  );

  if (response.success) {
    return response?.data;
  } else {
    return "";
  }
}

export const acceptedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "application/pdf",
];
