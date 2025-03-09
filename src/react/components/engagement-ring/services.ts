export type RingConfiguration = {
  variantId?: string | null;
  productId?: string | null;
  diamondId?: string | null;
};

export class RingBuilderService {
  private readonly variantId: string | null;
  private readonly productId: string | null;
  private readonly diamondId: string | null;

  constructor({
    variantId = null,
    productId = null,
    diamondId = null,
  }: RingConfiguration | undefined = {}) {
    const searchParams = new URLSearchParams(window.location.search);
    this.variantId =
      variantId ||
      searchParams.get('variant') ||
      searchParams.get('variant_id') ||
      null;
    this.productId = productId || searchParams.get('product_id') || null;
    this.diamondId = diamondId || searchParams.get('diamond_id') || null;
  }

  public getVariantId(): string | null {
    return this.variantId;
  }

  public getProductId(): string | null {
    return this.productId;
  }

  public getCurrentConfiguration(): [
    typeof this.productId,
    typeof this.variantId,
    typeof this.diamondId,
  ] {
    return [this.productId, this.variantId, this.diamondId];
  }

  public hasProductId(): boolean {
    return this.productId !== null;
  }

  public hasVariantId(): boolean {
    return this.variantId !== null;
  }

  public hasDiamondId(): boolean {
    return this.diamondId !== null;
  }

  public reconstructURL(fromExistingUrl?: string): URL {
    const searchParams = fromExistingUrl
      ? new URL(fromExistingUrl).searchParams
      : new URLSearchParams();

    return new URL(
      `?${this.appendConfiguration(searchParams).toString()}`,
      window.location.href,
    );
  }

  public routeToSelectDiamond(
    productId: string,
    diamondShapeGid: string,
  ): void {
    const url = new URLSearchParams(window.location.search);
    url.append('sort_by', 'price-ascending');
    url.append('filter.p.m.custom.diamond_shape', diamondShapeGid);
    url.append('product_id', productId);

    // Build relative path using current location as base
    const basePath = window.location.pathname.split('/').slice(0, -1)[0];
    const href = `${basePath}/collections/lab-diamonds?${url.toString()}`;
    window.history.pushState({}, '', href);
  }

  public appendConfiguration(
    searchParams: URLSearchParams = new URLSearchParams(),
  ): URLSearchParams {
    // prettier-ignore
    if (this.productId && this.hasProductId() && !searchParams.has('product_id')) {
      searchParams.append('product_id', this.productId);
    }

    // prettier-ignore
    if (this.variantId && this.hasVariantId() && !searchParams.has('variant')) {
      searchParams.append('variant', this.variantId);
    }

    // prettier-ignore
    if (this.diamondId && this.hasDiamondId() && !searchParams.has('diamond_id')) {
      searchParams.append('diamond_id', this.diamondId);
    }

    return searchParams;
  }
}
