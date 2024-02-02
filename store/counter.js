import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useStateCart = defineStore('cart', {
    state: () => {
        return {
            cart: []
        };
    },

    getters: {
        count (state) {
            return state.cart.length;
        },
        getItems(state) {
            return state.cart;
        },
        totalPrice: (state) => {
            return state.cart.reduce((total, product) => {
                return product.is_sale ? total + (product.sale_price * product.qty) : total + (product.price * product.qty);
            }, 0);
        }
    },

    actions: {
        addToCart (product, count) {
            this.cart.push({
                ...product,
                qty: count
            });
            toast.success('محصول شما به سبد خرید اضافه شد');
            console.log(this.cart, 'Cart');
        },
        remove (id) {
            this.cart = this.cart.filter(item => item.id != id);
        },
    },

    persist: {
        // eslint-disable-next-line no-undef
        storage: persistedState.localStorage,
        key: 'shopping-cart'
    },
});

