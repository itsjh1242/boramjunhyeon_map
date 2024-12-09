import { snap_secure_default } from "../model/secure-model";

class SecureService {
  getSecurePassword = async () => {
    try {
      const snap = await snap_secure_default();

      if (snap.exists()) {
        return snap.data().secure_password;
      } else {
        console.error("데이터가 없습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export default new SecureService();
