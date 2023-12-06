const priceFormat = (number) => {
    return new Intl.NumberFormat().format(number);
};

export {priceFormat};