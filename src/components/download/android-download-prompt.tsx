import { getAndroidAppDownload } from "@/config/downloads";
import { AndroidDownloadBar } from "@/components/download/android-download-bar";

/** Site-wide phone prompt — renders only when an Android APK is available. */
export function AndroidDownloadPrompt() {
  const android = getAndroidAppDownload();
  if (!android) {
    return null;
  }

  return <AndroidDownloadBar href={android.href} fileName={android.fileName} />;
}
