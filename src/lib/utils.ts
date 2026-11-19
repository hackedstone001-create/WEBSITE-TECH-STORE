import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = "INR"): string {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateOrderNumber(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `TS-${randomNum}`;
}

export function generateLicenseKey(category: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = (len = 5) => {
    let s = "";
    for (let i = 0; i < len; i++) {
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return s;
  };

  if (category === "windows-keys") {
    return `${segment(5)}-${segment(5)}-${segment(5)}-${segment(5)}-${segment(5)}`;
  }
  if (category === "ai-tools") {
    return `AI-PRO-${segment(4)}-${segment(4)}-${segment(4)}`;
  }
  if (category === "software") {
    return `SOFT-${segment(4)}-${segment(4)}-${segment(4)}-${segment(4)}`;
  }
  return `TS-DIG-${segment(6)}-${segment(6)}`;
}
