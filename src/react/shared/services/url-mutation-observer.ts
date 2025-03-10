
export class URLMutationObserver {
  private url: string | null = null;
  private callbackFunction: () => void = () => {};
  private readonly observer: MutationObserver;
  private readonly config: { subtree: boolean; childList: boolean };

  constructor(params?: Record<string, string | null>) {
    this.observer = this.constructObserver(params);
    this.config = { subtree: true, childList: true };
  }

  private constructObserver(params?: Record<string, string | null>) {
    return new MutationObserver(() => {
      if (window.location.href !== this.url) {
        this.url = window.location.href;
        const newUrl = this.appendQueryParams(params);
        this.callbackFunction();
        this.url = newUrl;
      }
    });
  }

  public listenForChanges(callbackFunction: () => void = () => {}) {
    console.log('Start listening for URL changes...');
    this.callbackFunction = callbackFunction;
    this.observer.observe(document, this.config);
  }

  public disconnect() {
    console.log('Disconnecting observer');
    this.observer.disconnect();
  }

  public appendQueryParams(params?: Record<string, string | null>) {
    const href = window.location.href;
    if (!params) {
      return href;
    }
    const url = new URL(href);
    Object.entries(params).forEach(([key, value]) => {
      if (!url.searchParams.has(key) && value !== null) {
        url.searchParams.set(key, value);
      }
    });
    const newUrl = url.toString();
    console.log(`Replacing state URL from ${href} to ${newUrl}`);
    window.history.replaceState(null, '', newUrl);
    return newUrl;
  }
}
