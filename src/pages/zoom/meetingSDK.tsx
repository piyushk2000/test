import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ZoomMtg } from '@zoom/meetingsdk';
import { APIRoutes, AppRoutes } from '../../constants';
import { RequestServer } from '../../utils/services';
import FullPageLoading from "../../atoms/full-page-loading";


interface MeetingSDKProps {
  meetingNumber: string;
  passWord: string;
  sdkKey: string;
  role: number;
  userName: string;
  isNickName: boolean;
  zoomObj:any;
  setZoomObj:any
}
interface ZoomObj {
  [key: string]: string;
}

const MeetingSDK: React.FC<MeetingSDKProps> = ({ meetingNumber, passWord, sdkKey, role, userName, isNickName , zoomObj , setZoomObj}) => {
  const zmmtgRootRef = useRef<HTMLDivElement | null>(null);

  // const [zoomObj, setZoomObj] = useState<ZoomObj>(() => {
  //   const storedData = localStorage.getItem('zoom_counter_obj');
  //   return storedData ? JSON.parse(storedData) : {};
  // });

  const shouldIncrementCounter = () => {
    let str = zoomObj?.[meetingNumber] || ''
    let nameToMatch = str.substring(0, str.lastIndexOf(' '))
    return ( !(nameToMatch == userName) && !isNickName );
  }




  useEffect(() => {
    initializeZoomMeeting();
  }, []);

  const initializeZoomMeeting = async () => {
    try {
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();

      const resp = await getSignature();
      if (resp) {
        joinMeeting(resp.signature, (resp.current_counter || ''));
      }
    } catch (error) {
      console.error('Error initializing Zoom meeting:', error);
    }
  };

  const getSignature = async () => {
    const authEndpoint = APIRoutes.zoomAuth;
    let authBody = {
      meetingNumber: meetingNumber,
      role: role,
      ...(shouldIncrementCounter() && { joinName: userName }),
    };

    try {
      const resp = await RequestServer(authEndpoint, "POST", authBody);
      return resp;
    } catch (error) {
      console.error('Error getting signature:', error);
      return null;
    }
  };

  const joinMeeting = (signature: string, current_counter: string) => {
    let finalZoomName: string;
  
    if (shouldIncrementCounter()) {
      finalZoomName =  `${userName} ${current_counter || ''}`;      
      const updatedZoomObj = { ...zoomObj, [meetingNumber]: finalZoomName };
      setZoomObj(updatedZoomObj);
      localStorage.setItem('zoom_counter_obj', JSON.stringify(updatedZoomObj));
    } else {
      finalZoomName = isNickName ? userName : zoomObj?.[meetingNumber] || userName;
    }
  
    ZoomMtg.init({
      leaveUrl: `${window.location.href}${window.location.href.includes('?') ? '&' : '?'}left=true`,      success: (success: any) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: finalZoomName, 
          sdkKey: sdkKey,
          userEmail: '',
          passWord: passWord,
          tk: '',
          zak: '',
          success: (success: any) => {
            console.log(success);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  };

  return (
    <>
      <FullPageLoading />
      <div ref={zmmtgRootRef} id="zmmtg-root"></div>
    </>
  );
};

export default MeetingSDK;