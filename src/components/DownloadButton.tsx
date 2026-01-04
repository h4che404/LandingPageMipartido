"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

type OS = 'windows' | 'mac' | 'linux';

interface LatestVersion {
  version: string;
  downloads: {
    [key in OS]: {
      url: string;
    }
  }
}

export default function DownloadButton() {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [osLabel, setOsLabel] = useState<string>("Windows");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Detect user OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    let osKey: OS = "windows";
    let label = "Windows";

    if (userAgent.includes("mac")) {
      osKey = "mac";
      label = "macOS";
    } else if (userAgent.includes("linux")) {
      osKey = "linux";
      label = "Linux";
    }

    setOsLabel(label);

    // 2. Fetch latest version
    fetch('/updates/latest.json')
      .then(res => res.json())
      .then((data: LatestVersion) => {
        const url = data.downloads[osKey]?.url;
        if (url) setDownloadUrl(url);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Button disabled size="lg" className="w-full sm:w-auto">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Buscando versión...
      </Button>
    );
  }
  
  if (!downloadUrl) {
    return (
      <Button disabled variant="secondary" size="lg" className="w-full sm:w-auto">
        No disponible temporalmente
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button 
        asChild 
        size="lg" 
        className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-lg py-6 px-8"
      >
        <a href={downloadUrl}>
          <Download className="mr-2 h-5 w-5" />
          Descargar para {osLabel}
        </a>
      </Button>
      <p className="text-xs text-muted-foreground">
        Versión más reciente. También disponible para Windows, Mac y Linux.
      </p>
    </div>
  );
}
