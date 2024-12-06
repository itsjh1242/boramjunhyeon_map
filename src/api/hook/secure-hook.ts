import SecureService from "@/api/service/secure-service";

export const isAuthorized = async (password: string) => {
  const storedPassword = await SecureService.getSecurePassword();

  if (password === storedPassword) return true;
  return false;
};
