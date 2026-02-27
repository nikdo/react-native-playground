// Shim for @utils/tenant — always selects the "Denizen" variant.

type TenantVariants<T> = { Aroundtown: T; Denizen: T };

class Tenant {
  public static select<T>(specifics: TenantVariants<T>): T {
    return specifics.Denizen;
  }
}

export default Tenant;
