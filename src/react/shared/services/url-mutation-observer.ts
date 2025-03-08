export class URLMutationObserver {
  private url: string | null = null;
  private readonly observer: MutationObserver;
  private readonly config: { subtree: boolean; childList: boolean };

  constructor(params: Record<string, string | null>) {
    console.log(`Params:`, params);
    const observer = new MutationObserver(() => {
      if (window.location.href !== this.url) {
        this.url = window.location.href;
        const newUrl = this.appendQueryParams(params);
        console.log(`Pushing new URL: ${newUrl}`);
        window.history.pushState({}, '', newUrl);
        this.url = newUrl;
      }
    });
    this.observer = observer;
    this.config = { subtree: true, childList: true };
  }

  public listenForChanges() {
    console.log('Start listening for URL changes...');
    this.observer.observe(document, this.config);
  }

  public disconnect() {
    console.log('Disconnecting observer');
    this.observer.disconnect();
  }

  public appendQueryParams(params: Record<string, string | null>) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (!url.searchParams.has(key) && value !== null) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  }
}
