document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Pricing Calculator Logic
    const dogInput = document.getElementById('dog-count');
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    const yardSelect = document.getElementById('yard-size');
    
    const priceWeekly = document.querySelector('#price-weekly .amount');
    const priceBiweekly = document.querySelector('#price-biweekly .amount');
    const priceMonthly = document.querySelector('#price-monthly .amount');

    // Base pricing logic (based on original table)
    // 1 dog: $20, $30, $40
    // +$5 for each additional dog per service
    const basePrices = {
        weekly: 20,
        biweekly: 30,
        monthly: 40
    };

    const yardAdjustments = {
        small: 0,
        medium: 5,
        large: 10
    };

    function updatePrices() {
        const dogs = parseInt(dogInput.value, 10);
        const yardMultiplier = yardAdjustments[yardSelect.value];
        
        // Calculate additional dog cost (0 for 1 dog, $5 for each extra)
        const extraDogCost = (dogs - 1) * 5;

        // Apply formula: Base + Extra Dogs + Yard Adjustment
        priceWeekly.textContent = basePrices.weekly + extraDogCost + yardMultiplier;
        priceBiweekly.textContent = basePrices.biweekly + extraDogCost + yardMultiplier;
        priceMonthly.textContent = basePrices.monthly + extraDogCost + yardMultiplier;
    }

    // Event Listeners
    btnMinus.addEventListener('click', () => {
        let val = parseInt(dogInput.value, 10);
        if (val > 1) {
            dogInput.value = val - 1;
            updatePrices();
        }
    });

    btnPlus.addEventListener('click', () => {
        let val = parseInt(dogInput.value, 10);
        if (val < 10) { // arbitrary max of 10 dogs
            dogInput.value = val + 1;
            updatePrices();
        }
    });

    yardSelect.addEventListener('change', updatePrices);

    // Initial calculation
    updatePrices();
});
