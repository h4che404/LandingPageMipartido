"use client";
import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Loader2, Apple, Monitor, Terminal, AlertCircle, RefreshCcw } from "lucide-react";
import Link from 'next/link';

type OS = 'windows' | 'mac' | 'linux';

interface OSDownloadInfo {
  url: string;
  installerUrl?: string;
}

interface LatestVersion {
  version: string;
  downloads: {
    windows?: OSDownloadInfo;
    mac?: OSDownloadInfo;
    linux?: OSDownloadInfo;
  }
}

export default function DownloadButton() {
  const [downloads, setDownloads] = useState<LatestVersion['downloads'] | null>(null);
  const [detectedOs, setDetectedOs] = useState<OS>("windows");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const detectOS = () => {
    if (typeof window === 'undefined') return "windows";
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes("mac")) return "mac";
    if (userAgent.includes("linux")) return "linux";
    return "windows";
  };

  const fetchLatestVersion = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/updates/latest.json');
      if (!res.ok) throw new Error('Network response was not ok');
      const data: LatestVersion = await res.json();
      setDownloads(data.downloads);
      setDetectedOs(detectOS());
    } catch (err) {
      console.error("Failed to fetch latest version data", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestVersion();
  }, [fetchLatestVersion]);

  const trackDownload = (os: OS) => {
    console.log(`download_${os}`);
    // In the future, send this to an analytics service (e.g. Google Analytics, Plausible, etc.)
  };

  // 1. Loading State
  if (loading) {
    return (
      <Button disabled size="lg" className="w-full sm:w-auto min-h-[56px]">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Buscando versión...
      </Button>
    );
  }

  // 2. Error State / Fallback UI
  if (error || !downloads) {
    return (
      <div className="flex flex-col items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
        <div className="flex items-center text-red-400 gap-2">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium text-sm">No se pudo cargar descargas</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={fetchLatestVersion}
            variant="outline"
            size="sm"
            className="border-red-500/20 text-red-400 hover:bg-red-500/10 w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground w-full sm:w-auto"
          >
            <Link href="#contact">Soporte</Link>
          </Button>
        </div>
      </div>
    );
  }

  // 3. Normal State
  const osLabels: Record<OS, string> = {
    mac: "macOS",
    windows: "Windows",
    linux: "Linux"
  };

  const detectedOsUrl = downloads[detectedOs]?.installerUrl || downloads[detectedOs]?.url;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main OS Button */}
      {detectedOsUrl ? (
        <Button
          asChild
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-lg py-7 px-10 shadow-[0_0_20px_rgba(22,163,74,0.3)] transition-all hover:scale-105"
          onClick={() => trackDownload(detectedOs)}
        >
          <a href={detectedOsUrl}>
            <Download className="mr-3 h-6 w-6" />
            Descargar para {osLabels[detectedOs]}
          </a>
        </Button>
      ) : (
        <Button disabled size="lg" className="w-full sm:w-auto text-lg py-7 px-10">
          Versión para {osLabels[detectedOs]} no disponible
        </Button>
      )}

      {/* Explicit OS Links */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground mr-2 w-full text-center sm:w-auto">También disponible para:</span>

        {/* Windows */}
        {(() => { const winUrl = downloads.windows?.installerUrl || downloads.windows?.url; return (
        <Button
          asChild={!!winUrl}
          disabled={!winUrl}
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs bg-card/50"
          onClick={() => winUrl && trackDownload('windows')}
        >
          {winUrl ? (
            <a href={winUrl}>
              <Monitor className="w-3.5 h-3.5" />
              Windows
            </a>
          ) : (
            <span>
              <Monitor className="w-3.5 h-3.5 mr-1.5" />
              Windows (Pronto)
            </span>
          )}
        </Button>
        ); })()}

        {/* macOS */}
        {(() => { const macUrl = downloads.mac?.installerUrl || downloads.mac?.url; return (
        <Button
          asChild={!!macUrl}
          disabled={!macUrl}
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs bg-card/50"
          onClick={() => macUrl && trackDownload('mac')}
        >
          {macUrl ? (
            <a href={macUrl}>
              <Apple className="w-3.5 h-3.5 mb-0.5" />
              macOS
            </a>
          ) : (
            <span>
              <Apple className="w-3.5 h-3.5 mb-0.5 mr-1.5" />
              macOS (Pronto)
            </span>
          )}
        </Button>
        ); })()}

        {/* Linux */}
        {(() => { const linuxUrl = downloads.linux?.installerUrl || downloads.linux?.url; return (
        <Button
          asChild={!!linuxUrl}
          disabled={!linuxUrl}
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs bg-card/50"
          onClick={() => linuxUrl && trackDownload('linux')}
        >
          {linuxUrl ? (
            <a href={linuxUrl}>
              <Terminal className="w-3.5 h-3.5" />
              Linux
            </a>
          ) : (
            <span>
              <Terminal className="w-3.5 h-3.5 mr-1.5" />
              Linux (Pronto)
            </span>
          )}
        </Button>
        ); })()}
      </div>
    </div>
  );
}
