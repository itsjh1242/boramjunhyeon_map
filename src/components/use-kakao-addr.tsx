import { useDaumPostcodePopup } from "react-daum-postcode";

export const useKakaoAddr = (props: { setAddr: (addr: string) => void }) => {
  const postcodeScriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  interface AddressData {
    address: string;
    sido: string;
    sigungu: string;
    addressType: string;
    bname: string;
    buildingName: string;
  }

  const handleComplete = (data: AddressData) => {
    let fullAddr = data.address;
    let extraAddr = "";
    const localAddr = data.sido + " " + data.sigungu;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr = fullAddr.replace(localAddr, "");
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }
    props.setAddr(fullAddr);
  };

  const openKakaoSearch = () => {
    open({ onComplete: handleComplete });
  };

  return { openKakaoSearch };
};
