import { FileSystemUploadType, uploadAsync } from "expo-file-system/legacy";

const CMS_API_URL = "https://kway-cms.vercel.app/api/r2";

export async function uploadToR2(
  fileUri: string,
  key: string,
  contentType = "image/jpeg",
) {
  const response = await fetch(`${CMS_API_URL}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, contentType }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`CMS API Error (${response.status}): ${errorText}`);
  }

  const { uploadUrl, error } = await response.json();
  if (error || !uploadUrl) throw new Error(error || "Could not get upload URL");

  const uploadResult = await uploadAsync(uploadUrl, fileUri, {
    httpMethod: "PUT",
    uploadType: FileSystemUploadType.BINARY_CONTENT,
    headers: {
      "Content-Type": contentType,
    },
  });

  if (uploadResult.status < 200 || uploadResult.status >= 300) {
    throw new Error(`Upload failed with HTTP status ${uploadResult.status}`);
  }

  return key;
}

export async function deleteFromR2(key: string) {
  if (!key) return;
  try {
    await fetch(`${CMS_API_URL}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
  } catch (error) {
    console.error("Failed to delete object from R2:", error);
  }
}
