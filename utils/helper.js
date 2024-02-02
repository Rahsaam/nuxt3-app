const priceFormat = (number) => {
    return new Intl.NumberFormat().format(number);
};

const salePercent = (price, sale) => {
    return Math.round(((price - sale) / price) * 100);
};

export {priceFormat, salePercent};