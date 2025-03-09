export class RingBuilderService {
  private readonly variantId: string | null;
  private readonly productId: string | null;

  constructor() {
    const searchParams = new URLSearchParams(window.location.search);
    const variantId = searchParams.get('variant') || null;
    const productId = searchParams.get('product_id') || null;

    this.variantId = variantId;
    this.productId = productId;
  }

  public getVariantId(): string | null {
    return this.variantId;
  }

  public getProductId(): string | null {
    return this.productId;
  }

  public getAll(): [string | null, string | null] {
    return [this.productId, this.variantId];
  }

  public hasProductId(): boolean {
    return this.productId !== null;
  }

  public hasVariantId(): boolean {
    return this.variantId !== null;
  }

  public reconstructURL(fromExistingUrl?: string): URL {
    const searchParams = fromExistingUrl
      ? new URL(fromExistingUrl).searchParams
      : new URLSearchParams();
    // prettier-ignore
    if (this.productId && this.hasProductId() && !searchParams.has('product_id')) {
      searchParams.append('product_id', this.productId);
    }
    // prettier-ignore
    if (this.variantId && this.hasVariantId() && !searchParams.has('variant')) {
      searchParams.append('variant', this.variantId);
    }
    return new URL(`?${searchParams.toString()}`, window.location.href);
  }
}
