import FileResizer from "react-image-file-resizer";

export const maxSizeBytes = 10 * 1024 * 1024;

export const acceptedFileTypes: any = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const resizeImage = (file: any) => {
  return new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      400, // New width
      400, // New height
      "webp", // Output format
      80, // Quality (0-100)
      0, // Rotation
      (resizedFile: any) => {
        resolve(resizedFile);
      },
      "file" // Output type
    );
  });
};
