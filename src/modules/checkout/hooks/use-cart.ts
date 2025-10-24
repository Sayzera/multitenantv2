import { useCartStore } from '../store/use-cart-store'

export const useCart = (tenantSlug: string) => {
  const { getCartByTenant, addProduct, removeProduct, clearAllCarts, clearCart } = useCartStore()

  const productIds = getCartByTenant(tenantSlug)

  const addToCart = (productId: string) => {
    const toggleProduct = (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId)
      } else {
        addProduct(tenantSlug, productId)
      }
    }
  }

  const isProductInCart = (productId: string) => {
    return productIds.includes(productId)
  }

  const clearTenantCart = (tenantSlug: string) => {
    clearCart(tenantSlug)
  }

  return {
    productIds,
  }
}
