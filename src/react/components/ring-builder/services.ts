import { isNil } from 'rambda';

export type RingConfiguration = {
  variantId?: string | null;
  productId?: string | null;
  productVariantId?: string | null;
  diamondId?: string | null;
};

export class RingBuilderService {
  private readonly variantId: string | null;
  private readonly productId: string | null;
  private readonly productVariantId: string | null;
  private readonly diamondId: string | null;

  constructor({
    variantId = null,
    productId = null,
    productVariantId = null,
    diamondId = null,
  }: RingConfiguration | undefined = {}) {
    const searchParams = new URLSearchParams(window.location.search);
    this.variantId = variantId || searchParams.get('variant') || searchParams.get('variant_id') || null;
    this.productId = productId || searchParams.get('product_id') || null;
    this.productVariantId = productVariantId || searchParams.get('product_variant_id') || null;
    this.diamondId = diamondId || searchParams.get('diamond_id') || null;
  }

  public getVariantId(): string | null {
    return this.variantId;
  }

  public getProductId(): string | null {
    return this.productId;
  }

  public getProductVariantId(): string | null {
    return this.productVariantId;
  }

  public getDiamondId(): string | null {
    return this.diamondId;
  }

  public getCurrentConfiguration(): [
    typeof this.productId,
    typeof this.productVariantId,
    typeof this.variantId,
    typeof this.diamondId,
  ] {
    return [this.productId, this.productVariantId, this.variantId, this.diamondId];
  }

  public hasProductId(): boolean {
    return this.productId !== null;
  }

  public hasProductVariantId(): boolean {
    return this.productVariantId !== null;
  }

  public hasVariantId(): boolean {
    return this.variantId !== null;
  }

  public hasDiamondId(): boolean {
    return this.diamondId !== null;
  }

  public routeToSelectDiamond(
    productId: string,
    selectedOrFirstAvailableVariant: string,
    diamondShapeGid: string,
  ): void {  
    const url = new URLSearchParams(window.location.search);
    url.append('sort_by', 'price-ascending');
    url.append('filter.p.m.custom.diamond_shape', diamondShapeGid);
    url.append('product_id', productId);
    url.append('product_variant_id', selectedOrFirstAvailableVariant);

    // Build relative path using current location as base
    window.history.replaceState({}, '', `/collections/lab-diamonds?${url.toString()}`);
  }

  public appendConfiguration(searchParams: URLSearchParams = new URLSearchParams()): URLSearchParams {
    if (this.productId && this.hasProductId() && !searchParams.has('product_id')) {
      searchParams.append('product_id', this.productId);
    }
    if (this.productVariantId && this.hasProductVariantId() && !searchParams.has('product_variant_id')) {
      searchParams.append('product_variant_id', this.productVariantId);
    }
    if (this.variantId && this.hasVariantId() && !searchParams.has('variant')) {
      searchParams.append('variant', this.variantId);
    }
    if (this.diamondId && this.hasDiamondId() && !searchParams.has('diamond_id')) {
      searchParams.append('diamond_id', this.diamondId);
    }

    return searchParams;
  }

  public isConfigurationComplete() {
    return !isNil(this.productId) && (!isNil(this.variantId) || !isNil(this.productVariantId)) && !isNil(this.diamondId);
  }

  private deserializeFromStorage(): RingConfiguration | null {
    const ringConfigurationSession = sessionStorage.getItem('engagement.ring.configuration');
    const ringBuilder = !isNil(ringConfigurationSession)
      ? (JSON.parse(ringConfigurationSession) as RingConfiguration | null)
      : null;

    return ringBuilder;
  }

  /**
   * Store attributes in sessionStorage - not ideal, but pagination and possibly other selections on the collections page is stripping the URL queries
   */
  public serializeToStorage(): RingConfiguration {
    const current = this.deserializeFromStorage() ?? {};
    const changes = {
      variantId: this.variantId,
      productId: this.productId,
      productVariantId: this.productVariantId,
      diamondId: this.diamondId,
    };
    const payload: RingConfiguration = {
      ...(current ?? {}),
      ...changes,
    };
    sessionStorage.setItem('engagement.ring.builder', JSON.stringify(payload));
    return payload;
  }
}
