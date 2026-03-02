export function trackEvent(eventName: string, payload?: Record<string, any>) {
  try {
    // Lightweight tracker: replace with real analytics (GA / Segment / Amplitude) later
    console.log("[analytics]", eventName, payload ?? {});

    // Example integration hook (no-op if not available)
    // @ts-ignore
    if (typeof (global as any).gtag === "function") {
      // @ts-ignore
      (global as any).gtag("event", eventName, payload ?? {});
    }
  } catch (e) {
    // swallow errors to avoid breaking UI
  }
}
