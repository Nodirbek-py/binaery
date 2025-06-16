document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.double-tab__tab');
    const cards = document.querySelectorAll('.double-tab__card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedTab = tab.getAttribute('data-tab');

            cards.forEach(card => {
                if (card.getAttribute('data-tab') === selectedTab) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const initialTab = document.querySelector('.double-tab__tab.active');
    if (initialTab) initialTab.click();

    const variantSelectors = document.querySelectorAll('.double-tab__card-variant-select');
    if (variantSelectors.length > 0) {
        Array.from(variantSelectors).forEach((variantSelector) => {
            variantSelector.addEventListener('change', function (e) {
                const selectedOption = this.options[this.selectedIndex];
                const pricePerUnit = parseInt(selectedOption.getAttribute('data-price'), 10);
                const match = this.value.match(/^(\d+)\s/);
                let quantity = 1;
                if (match) {
                    quantity = parseInt(match[1], 10);
                }
                const totalPrice = pricePerUnit * quantity;
                console.log(pricePerUnit, quantity, totalPrice);
                const card = this.closest('.double-tab__card');
                if (card) {
                    const priceEl = card.querySelector('.double-tab__card-price');
                    if (priceEl) {
                        const currencySpan = priceEl.querySelector('span');
                        const perPriceSpan = priceEl.querySelector('.double-tab__card-per--price');
                        if (perPriceSpan) {
                            perPriceSpan.innerHTML =
                                ' (' + (pricePerUnit / 100).toLocaleString() + ' / Test)';
                        }
                        priceEl.innerHTML =
                            (totalPrice / 100).toLocaleString() + (currencySpan ? ' ' + currencySpan.outerHTML + perPriceSpan.outerHTML : '');
                    }
                }
            });
        })
    }
});