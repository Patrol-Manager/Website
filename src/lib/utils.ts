import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getBrowserPlatformInfo = () => {
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  const arch = ua.includes("arm") || ua.includes("aarch64") ? "arm64" : ua.includes("x86_64") || ua.includes("win64") || ua.includes("intel") ? "x64" : "unknown";

  let os: string;
  if (platform.includes("mac")) os = "darwin";
  else if (platform.includes("win")) os = "windows";
  else if (platform.includes("linux")) os = "linux";
  else os = "Unknown";

  return { os, arch };
};

export const repos = ["lincon07/patrol-manager", "doj-liamr/patrolManager", "Patrol-Manager/Application"];