import { AddressData } from "@/schema/kakao-addr";
import { useDaumPostcodePopup } from "react-daum-postcode";

export const useKakaoAddr = (props: {
  setLocation: (addr: string) => void;
  setAddress: (addr: AddressData) => void;
}) => {
  const postcodeScriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: AddressData) => {
    let fullAddr = data.address;
    let extraAddr = "";
    // const localAddr = data.sido + " " + data.sigungu;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      // fullAddr = fullAddr.replace(localAddr, "");
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    if (extraAddr !== "") {
      props.setLocation(extraAddr);
    }
    props.setAddress({
      address: fullAddr,
      sido: data.sido,
      sigungu: data.sigungu,
      addressType: data.addressType,
      bname: data.bname,
      buildingName: data.buildingName,
    });
  };

  const openKakaoSearch = () => {
    open({ onComplete: handleComplete });
  };

  return { openKakaoSearch };
};
