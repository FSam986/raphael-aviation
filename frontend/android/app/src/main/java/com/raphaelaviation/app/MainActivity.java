package com.raphaelaviation.app;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    // Android 14+: told when the user takes a screenshot of this activity.
    private Activity.ScreenCaptureCallback captureCallback;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Anti-piracy: FLAG_SECURE blocks screenshots AND screen recording, and
        // hides the app content in the recent-apps switcher on Android.
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );
    }

    @Override
    public void onStart() {
        super.onStart();
        if (Build.VERSION.SDK_INT >= 34) {
            // The web app (ScreenshotGuard) listens for this and records a strike.
            captureCallback = () -> {
                if (bridge != null) bridge.triggerWindowJSEvent("raScreenshot");
            };
            registerScreenCaptureCallback(getMainExecutor(), captureCallback);
        }
    }

    @Override
    public void onStop() {
        if (Build.VERSION.SDK_INT >= 34 && captureCallback != null) {
            unregisterScreenCaptureCallback(captureCallback);
            captureCallback = null;
        }
        super.onStop();
    }
}
