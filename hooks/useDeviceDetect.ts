
import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  os: string;
  browser: string;
}

export const useDeviceDetect = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    deviceType: 'Desktop',
    os: 'Unknown',
    browser: 'Unknown'
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    let os = 'Unknown OS';
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'macOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // Check screen width as secondary confirmation
    const width = window.innerWidth;
    let deviceType: 'Mobile' | 'Tablet' | 'Desktop' = 'Desktop';
    
    if (width < 768 || isMobile) {
        if (width > 480 && width < 1024) {
            deviceType = 'Tablet';
        } else {
            deviceType = 'Mobile';
        }
    }

    setDeviceInfo({
      isMobile,
      deviceType,
      os,
      browser: 'Chrome' // Simplification for demo
    });

  }, []);

  return deviceInfo;
};
