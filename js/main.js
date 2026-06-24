/**
 * TechStore - Core Interactive JavaScript Logic
 * Demonstrates: DOM manipulation, Advanced ES6+, Asynchronous JS (Callbacks, Promises, Async/Await),
 * API Integration (Fetch), and Web Storage (localStorage).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if the cached products list contains the old generic names (Gaming Laptop etc.)
    // If it does, clear the cache to load our specific brand products (Lenovo, Apple, Samsung etc.)
    const cachedProducts = localStorage.getItem('techstore_products_state');
    if (cachedProducts && (cachedProducts.includes("Gaming Laptop") || cachedProducts.includes("Smartphone Pro"))) {
        localStorage.removeItem('techstore_products_state');
    }

    // -------------------------------------------------------------------------
    // 1. APPLICATION STATE
    // -------------------------------------------------------------------------
    const AppState = {
        products: [],
        cart: [],
        payments: [],
        submissions: [],
        currency: 'USD',
        language: 'EN',
        activeDeal: 'none',
        exchangeRates: { USD: 1, EUR: 0.92, GEL: 2.75 },
        activeCategory: 'all',
        searchQuery: '',
        showAll: false,
        activeModalProductId: null
    };

    // Logger utilizing rest parameters (ES6+ Spread/Rest)
    const logAppEvent = (type, ...details) => {
        console.log(`[TechStore App][${type}]`, ...details);
    };

    // -------------------------------------------------------------------------
    // 2. DOM ELEMENT SELECTION
    // -------------------------------------------------------------------------
    const elements = {
        productGrid: document.getElementById('product-grid'),
        productSearch: document.getElementById('product-search'),
        filterTabs: document.querySelectorAll('.filter-tab'),
        cartToggleBtn: document.getElementById('cart-toggle-btn'),
        cartCloseBtn: document.getElementById('cart-close-btn'),
        cartOverlay: document.getElementById('cart-overlay'),
        cartDrawer: document.getElementById('cart-drawer'),
        cartItemsList: document.getElementById('cart-items-list'),
        cartBadgeCount: document.getElementById('cart-badge-count'),
        cartEmptyMessage: document.getElementById('cart-empty-message'),
        cartSummarySection: document.getElementById('cart-summary-section'),
        cartSubtotal: document.getElementById('cart-subtotal'),
        cartDiscountRow: document.getElementById('cart-discount-row'),
        cartDiscount: document.getElementById('cart-discount'),
        cartTax: document.getElementById('cart-tax'),
        cartTotal: document.getElementById('cart-total'),
        checkoutBtn: document.getElementById('checkout-btn'),
        registerForm: document.getElementById('register'),
        reviewsGrid: document.getElementById('reviews-grid'),
        toastContainer: document.getElementById('toast-container'),
        countMessage: document.getElementById('catalog-count-message'),
        
        // Sizing
        showMoreBtn: document.getElementById('show-more-btn'),
        
        // Profile drawer selectors
        profileToggleBtn: document.getElementById('profile-toggle-btn'),
        profileCloseBtn: document.getElementById('profile-close-btn'),
        profileOverlay: document.getElementById('profile-overlay'),
        profileDrawer: document.getElementById('profile-drawer'),
        profileLanguageSelect: document.getElementById('profile-language-select'),
        profileCurrencySelect: document.getElementById('profile-currency-select'),
        profileTabButtons: document.querySelectorAll('.profile-tab-btn'),
        
        paymentEmptyMessage: document.getElementById('payment-empty-message'),
        paymentItemsList: document.getElementById('payment-items-list'),
        submissionsEmptyMessage: document.getElementById('submissions-empty-message'),
        submissionsItemsList: document.getElementById('submissions-items-list'),
        
        // Details Modal
        productModal: document.getElementById('product-modal'),
        modalOverlay: document.getElementById('modal-overlay'),
        modalCloseBtn: document.getElementById('modal-close-btn'),
        modalBodyContent: document.getElementById('modal-body-content'),
        
        // Payment Card Details Form
        cardholderInput: document.getElementById('checkout-cardholder'),
        cardnumberInput: document.getElementById('checkout-cardnumber'),
        expiryInput: document.getElementById('checkout-expiry'),
        cvvInput: document.getElementById('checkout-cvv')
    };

    // -------------------------------------------------------------------------
    // 3. TRANSLATION DICTIONARIES (Localization System)
    // -------------------------------------------------------------------------
    const translations = {
        EN: {
            navHome: "Home",
            navProducts: "Products",
            navDeals: "Deals",
            navContact: "Contact",
            navRegister: "Register",
            eyebrow: "Featured products",
            catalogHeader: "Popular Tech Picks",
            catalogSub: "Explore our most popular tech products selected for students, professionals, and gamers.",
            searchPlaceholder: "Search products by title or description...",
            filterAll: "All Tech",
            filterLaptops: "Laptops",
            filterSmartphones: "Smartphones",
            filterAccessories: "Accessories",
            filterWearables: "Wearables",
            showAll: "Show All Products",
            showFeatured: "Show Featured Products",
            cartTitle: "Your Cart",
            cartEmptyTitle: "Your cart is empty",
            cartEmptyDesc: "Add some high-performance tech to get started!",
            cartExplore: "Explore Catalog",
            selectDeal: "Select Active Deal",
            dealNone: "No Deal Applied",
            dealStudent: "Student Bundle (10% Off)",
            dealWfh: "Work From Home (15% Off)",
            dealGaming: "Gaming Essentials (12% Off)",
            subtotal: "Subtotal",
            discount: "Discount",
            vat: "VAT (20% Inc.)",
            total: "Total",
            cardholderLabel: "Cardholder Name",
            cardnumberLabel: "Card Number",
            expiryLabel: "Expiry Date",
            cvvLabel: "CVV",
            paymentDetailsHeader: "Payment Details",
            placeOrder: "Place Order Now",
            authorizing: "Authorizing card...",
            
            profileTitle: "User Profile & Settings",
            langLabel: "Interface Language",
            currLabel: "Display Currency",
            tabPayments: "Payment History",
            tabSubmissions: "Service Requests",
            noTransactionsTitle: "No past transactions",
            noTransactionsDesc: "When you complete a purchase, your receipt details will be displayed here.",
            noSubmissionsTitle: "No service requests",
            noSubmissionsDesc: "Any interest forms or contact requests you submit will appear here.",
            
            brand: "Brand",
            availableStock: "Available Stock",
            unitsSold: "Items Sold",
            units: "units",
            outOfStock: "Out of Stock",
            addToCart: "Add to Cart",
            modalClose: "Close details",
            
            toastAdded: "added to your cart!",
            toastRemoved: "removed from cart.",
            toastCurrency: "Switched currency to",
            toastLanguage: "Switched language to English",
            toastPaymentSuccess: "Payment Approved! Invoice:",
            toastLimitReached: "Purchase limit reached. Only",
            toastUnitsInStock: "items exist in stock.",
            toastCannotAdd: "Cannot add more. Only",
            toastOutOfStock: "Sorry, this product is out of stock.",
            toastEnterCard: "Please enter a valid cardholder name.",
            toastCard16: "Please enter a valid 16-digit card number.",
            toastExpiryFormat: "Please enter expiry date in MM/YY format.",
            toastExpiryMonth: "Invalid expiry month. Use 01 - 12.",
            toastCVV3: "Please enter a valid 3-digit CVV number."
        },
        KA: {
            navHome: "მთავარი",
            navProducts: "პროდუქტები",
            navDeals: "აქციები",
            navContact: "კონტაქტი",
            navRegister: "რეგისტრაცია",
            eyebrow: "რჩეული მოდელები",
            catalogHeader: "პოპულარული ტექნიკა",
            catalogSub: "აღმოაჩინეთ საუკეთესო მოწყობილობები სტუდენტებისთვის, დეველოპერებისთვის და გეიმერებისთვის.",
            searchPlaceholder: "ძებნა დასახელებით ან აღწერით...",
            filterAll: "ყველა",
            filterLaptops: "ლეპტოპები",
            filterSmartphones: "სმარტფონები",
            filterAccessories: "აქსესუარები",
            filterWearables: "საათები",
            showAll: "ყველა პროდუქტი",
            showFeatured: "რჩეული პროდუქტები",
            cartTitle: "კალათა",
            cartEmptyTitle: "თქვენი კალათა ცარიელია",
            cartEmptyDesc: "დაამატეთ სასურველი ტექნიკა კალათაში!",
            cartExplore: "კატალოგის დათვალიერება",
            selectDeal: "აირჩიეთ ფასდაკლება",
            dealNone: "ფასდაკლების გარეშე",
            dealStudent: "სტუდენტური პაკეტი (10% Off)",
            dealWfh: "დისტანციური მუშაობა (15% Off)",
            dealGaming: "გეიმერული ნაკრები (12% Off)",
            subtotal: "ჯამი",
            discount: "ფასდაკლება",
            vat: "დღგ (20% ჩათვლით)",
            total: "საბოლოო ჯამი",
            cardholderLabel: "ბარათის მფლობელი",
            cardnumberLabel: "ბარათის ნომერი",
            expiryLabel: "ვადა",
            cvvLabel: "CVV კოდი",
            paymentDetailsHeader: "გადახდის დეტალები",
            placeOrder: "ყიდვა",
            authorizing: "ტრანზაქცია მუშავდება...",
            
            profileTitle: "მომხმარებლის პროფილი",
            langLabel: "ინტერფეისის ენა",
            currLabel: "ვალუტა",
            tabPayments: "გადახდების ისტორია",
            tabSubmissions: "სერვისის მოთხოვნები",
            noTransactionsTitle: "ტრანზაქციები არ არის",
            noTransactionsDesc: "ყიდვის დასრულების შემდეგ, თქვენი ქვითრები აქ გამოჩნდება.",
            noSubmissionsTitle: "მოთხოვნები არ არის",
            noSubmissionsDesc: "თქვენ მიერ შევსებული სარეგისტრაციო ფორმები აქ გამოჩნდება.",
            
            brand: "ბრენდი",
            availableStock: "ხელმისაწვდომია",
            unitsSold: "გაყიდულია",
            units: "ცალი",
            outOfStock: "ამოიყიდა",
            addToCart: "კალათაში დამატება",
            modalClose: "დახურვა",
            
            toastAdded: "დაემატა კალათაში!",
            toastRemoved: "ამოიშალა კალათიდან.",
            toastCurrency: "ვალუტა შეიცვალა:",
            toastLanguage: "ენა შეიცვალა ქართულად",
            toastPaymentSuccess: "გადახდა წარმატებულია! ქვითარი:",
            toastLimitReached: "ლიმიტი ამოიწურა. მხოლოდ",
            toastUnitsInStock: "ცალი დარჩა მარაგში.",
            toastCannotAdd: "მეტს ვერ დაამატებთ. მხოლოდ",
            toastOutOfStock: "სამწუხაროდ, პროდუქტი მარაგში აღარ არის.",
            toastEnterCard: "გთხოვთ მიუთითოთ ბარათის მფლობელის სახელი.",
            toastCard16: "ბარათის ნომერი უნდა შედგებოდეს 16 ციფრისგან.",
            toastExpiryFormat: "შეიყვანეთ ვადა MM/YY ფორმატში.",
            toastExpiryMonth: "არასწორი თვე. გამოიყენეთ 01 - 12.",
            toastCVV3: "CVV კოდი უნდა შედგებოდეს 3 ციფრისგან."
        }
    };

    // Apply translations to the DOM
    const translateInterface = () => {
        const lang = AppState.language;
        const dict = translations[lang];

        // Nav Menu
        const navLinks = document.querySelectorAll('.nav-menu a');
        if (navLinks.length >= 5) {
            navLinks[0].textContent = dict.navHome;
            navLinks[1].textContent = dict.navProducts;
            navLinks[2].textContent = dict.navDeals;
            navLinks[3].textContent = dict.navContact;
            navLinks[4].textContent = dict.navRegister;
        }

        // Section header info
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const eyebrow = productsSection.querySelector('.eyebrow');
            const title = productsSection.querySelector('.section-title');
            const desc = productsSection.querySelector('.section-description');
            if (eyebrow) eyebrow.textContent = dict.eyebrow;
            if (title) title.textContent = dict.catalogHeader;
            if (desc) desc.textContent = dict.catalogSub;
        }

        // Search Input
        if (elements.productSearch) {
            elements.productSearch.placeholder = dict.searchPlaceholder;
        }

        // Category Tabs
        const categoryTabs = document.querySelectorAll('.filter-tab');
        if (categoryTabs.length >= 5) {
            categoryTabs[0].textContent = dict.filterAll;
            categoryTabs[1].textContent = dict.filterLaptops;
            categoryTabs[2].textContent = dict.filterSmartphones;
            categoryTabs[3].textContent = dict.filterAccessories;
            categoryTabs[4].textContent = dict.filterWearables;
        }

        // Cart Drawer
        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) {
            const h2 = cartDrawer.querySelector('.cart-drawer-header h2');
            if (h2) h2.textContent = dict.cartTitle;

            const emptyH3 = cartDrawer.querySelector('.cart-empty-message h3');
            const emptyP = cartDrawer.querySelector('.cart-empty-message p');
            const emptyBtn = cartDrawer.querySelector('#cart-explore-btn');
            if (emptyH3) emptyH3.textContent = dict.cartEmptyTitle;
            if (emptyP) emptyP.textContent = dict.cartEmptyDesc;
            if (emptyBtn) emptyBtn.textContent = dict.cartExplore;

            // Deals texts
            const dealH3 = cartDrawer.querySelector('.trans-select-deal');
            const dealNone = cartDrawer.querySelector('.trans-deal-none');
            const dealStudent = cartDrawer.querySelector('.trans-deal-student');
            const dealWfh = cartDrawer.querySelector('.trans-deal-wfh');
            const dealGaming = cartDrawer.querySelector('.trans-deal-gaming');
            if (dealH3) dealH3.textContent = dict.selectDeal;
            if (dealNone) dealNone.textContent = dict.dealNone;
            if (dealStudent) dealStudent.textContent = dict.dealStudent;
            if (dealWfh) dealWfh.textContent = dict.dealWfh;
            if (dealGaming) dealGaming.textContent = dict.dealGaming;

            // Total Labels
            const labelSub = cartDrawer.querySelector('.trans-subtotal');
            const labelDisc = cartDrawer.querySelector('.trans-discount');
            const labelVat = cartDrawer.querySelector('.trans-vat');
            const labelTot = cartDrawer.querySelector('.trans-total');
            if (labelSub) labelSub.textContent = dict.subtotal;
            if (labelDisc) labelDisc.textContent = dict.discount;
            if (labelVat) labelVat.textContent = dict.vat;
            if (labelTot) labelTot.textContent = dict.total;

            // Form Headers
            const payHeader = cartDrawer.querySelector('.checkout-payment-form h3');
            if (payHeader) payHeader.textContent = dict.paymentDetailsHeader;

            const labels = cartDrawer.querySelectorAll('.cart-form-group label');
            if (labels.length >= 4) {
                labels[0].textContent = dict.cardholderLabel;
                labels[1].textContent = dict.cardnumberLabel;
                labels[2].textContent = dict.expiryLabel;
                labels[3].textContent = dict.cvvLabel;
            }

            const checkoutText = elements.checkoutBtn.querySelector('.btn-text');
            if (checkoutText && !elements.checkoutBtn.disabled) {
                checkoutText.textContent = dict.placeOrder;
            }
        }

        // Profile Drawer
        if (elements.profileDrawer) {
            const title = document.getElementById('profile-drawer-title');
            const langLabel = document.getElementById('profile-lang-label');
            const currLabel = document.getElementById('profile-curr-label');
            const tabPayments = document.getElementById('profile-tab-payments-btn');
            const tabSubmissions = document.getElementById('profile-tab-submissions-btn');
            
            const emptyPayTitle = elements.profileDrawer.querySelector('.trans-payment-empty-title');
            const emptyPayDesc = elements.profileDrawer.querySelector('.trans-payment-empty-desc');
            const emptySrvTitle = elements.profileDrawer.querySelector('.trans-service-empty-title');
            const emptySrvDesc = elements.profileDrawer.querySelector('.trans-service-empty-desc');

            if (title) title.textContent = dict.profileTitle;
            if (langLabel) langLabel.textContent = dict.langLabel;
            if (currLabel) currLabel.textContent = dict.currLabel;
            if (tabPayments) tabPayments.textContent = dict.tabPayments;
            if (tabSubmissions) tabSubmissions.textContent = dict.tabSubmissions;
            
            if (emptyPayTitle) emptyPayTitle.textContent = dict.noTransactionsTitle;
            if (emptyPayDesc) emptyPayDesc.textContent = dict.noTransactionsDesc;
            if (emptySrvTitle) emptySrvTitle.textContent = dict.noSubmissionsTitle;
            if (emptySrvDesc) emptySrvDesc.textContent = dict.noSubmissionsDesc;
        }

        // Refresh dynamic UI elements
        renderCatalog();
        renderCart();
    };

    // -------------------------------------------------------------------------
    // 4. UTILITIES & HELPER FUNCTIONS
    // -------------------------------------------------------------------------

    // Callback demonstration: Custom toast notifications
    const showToast = (message, type = 'success', callback = null) => {
        if (!elements.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close" aria-label="Dismiss alert">&times;</button>
        `;

        elements.toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('active'), 50);

        const dismissToast = () => {
            toast.classList.remove('active');
            toast.addEventListener('transitionend', () => {
                toast.remove();
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }, { once: true });
        };

        toast.querySelector('.toast-close').addEventListener('click', dismissToast);
        setTimeout(dismissToast, 4000);
    };

    // Price conversion utility using Destructuring and Template Literals
    const formatPrice = (priceInUSD) => {
        const { currency, exchangeRates } = AppState;
        const rate = exchangeRates[currency] || 1;
        const converted = (priceInUSD * rate).toFixed(2);

        const symbols = {
            USD: `$${converted}`,
            EUR: `€${converted}`,
            GEL: `₾${converted}`
        };

        return symbols[currency] || `$${converted}`;
    };

    // Web Storage Helpers
    const saveCartToStorage = () => {
        localStorage.setItem('techstore_cart', JSON.stringify(AppState.cart));
    };

    const loadCartFromStorage = () => {
        const storedCart = localStorage.getItem('techstore_cart');
        if (storedCart) {
            try {
                AppState.cart = JSON.parse(storedCart);
            } catch (error) {
                AppState.cart = [];
            }
        }
    };

    const saveProductsToStorage = () => {
        localStorage.setItem('techstore_products_state', JSON.stringify(AppState.products));
    };

    const loadProductsFromStorage = () => {
        const storedProducts = localStorage.getItem('techstore_products_state');
        if (storedProducts) {
            try {
                AppState.products = JSON.parse(storedProducts);
                logAppEvent('WebStorage', 'Loaded customized product stocks/sales state');
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    };

    const savePaymentsToStorage = () => {
        localStorage.setItem('techstore_payments', JSON.stringify(AppState.payments));
    };

    const loadPaymentsFromStorage = () => {
        const storedPayments = localStorage.getItem('techstore_payments');
        if (storedPayments) {
            try {
                AppState.payments = JSON.parse(storedPayments);
            } catch (e) {
                AppState.payments = [];
            }
        }
    };

    const saveLanguageToStorage = () => {
        localStorage.setItem('techstore_language', AppState.language);
    };

    const loadLanguageFromStorage = () => {
        const storedLang = localStorage.getItem('techstore_language');
        if (storedLang) {
            AppState.language = storedLang;
            if (elements.profileLanguageSelect) {
                elements.profileLanguageSelect.value = storedLang;
            }
        }
    };

    const loadCurrencyFromStorage = () => {
        const storedCurrency = localStorage.getItem('techstore_currency');
        if (storedCurrency) {
            AppState.currency = storedCurrency;
            if (elements.profileCurrencySelect) {
                elements.profileCurrencySelect.value = storedCurrency;
            }
        }
    };

    const loadSubmissionsFromStorage = () => {
        const stored = localStorage.getItem('techstore_registrations');
        if (stored) {
            try {
                AppState.submissions = JSON.parse(stored);
            } catch (e) {
                AppState.submissions = [];
            }
        }
    };

    // Helper to get available stock of a product, accounting for cart quantities
    const getAvailableStock = (product) => {
        const cartItem = AppState.cart.find(item => item.product.id === product.id);
        const cartQty = cartItem ? cartItem.quantity : 0;
        return Math.max(0, product.stock - cartQty);
    };

    // -------------------------------------------------------------------------
    // 5. API INTEGRATION & ASYNC OPERATIONS
    // -------------------------------------------------------------------------

    // Fetch Products (Async/Await)
    const fetchProducts = async () => {
        // Try to load cached product stocks first
        if (loadProductsFromStorage()) {
            return;
        }

        logAppEvent('API', 'Fetching products database...');
        try {
            const response = await fetch('data/products.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            AppState.products = await response.json();
            saveProductsToStorage();
            logAppEvent('API', 'Products catalog synced successfully', AppState.products);
        } catch (error) {
            logAppEvent('API', 'Error fetching products, utilizing local fallback state', error);
            AppState.products = [
                { id: "prod-1", title: "Lenovo Legion Pro 5", description: "High performance gaming laptop featuring RTX 4070 graphics and AMD Ryzen 7 processor.", price: 1399, category: "laptops", badge: "Top Choice", brand: "Lenovo", stock: 6, soldCount: 15, image: "images/laptop.jpg" },
                { id: "prod-2", title: "Apple iPhone 15 Pro", description: "Titanium design, A17 Pro chip, customizable Action button, and a powerful camera system.", price: 999, category: "smartphones", badge: "New Arrival", brand: "Apple", stock: 12, soldCount: 48, image: "images/smartphone.jpg" },
                { id: "prod-3", title: "Sony WH-1000XM5", description: "Industry leading noise canceling wireless headphones with crystal clear hands-free calling.", price: 349, category: "accessories", badge: "Top Rated", brand: "Sony", stock: 20, soldCount: 95, image: "images/headphones.jpg" },
                { id: "prod-4", title: "Logitech G502 X Plus", description: "Iconic gaming mouse upgraded with hybrid optical-mechanical switches and LIGHTSPEED wireless.", price: 149, category: "accessories", badge: "Pro Gear", brand: "Logitech", stock: 25, soldCount: 142, image: "images/gaming-mouse.jpg" },
                { id: "prod-5", title: "Corsair Vengeance DDR5", description: "High performance RGB desktop memory kit optimized for Intel and AMD motherboards.", price: 129, category: "accessories", badge: "Performance", brand: "Corsair", stock: 18, soldCount: 64, image: "images/ram.jpg" },
                { id: "prod-6", title: "Samsung Galaxy Watch 6", description: "Advanced health tracking smartwatch with customized heart rate zones and sleek design.", price: 299, category: "wearables", badge: "Best Tracker", brand: "Samsung", stock: 15, soldCount: 50, image: "images/smartwatch.jpg" },
                { id: "prod-7", title: "Apple MacBook Pro M3", description: "Supercharged by the M3 chip with a beautiful Liquid Retina XDR screen and massive battery life.", price: 1599, category: "laptops", badge: "Premium", brand: "Apple", stock: 8, soldCount: 22, image: "images/laptop.jpg" },
                { id: "prod-8", title: "Samsung Galaxy S24 Ultra", description: "Ultimate Galaxy smartphone featuring built-in S Pen, titanium body, and Galaxy AI features.", price: 1199, category: "smartphones", badge: "AI Powered", brand: "Samsung", stock: 9, soldCount: 30, image: "images/smartphone.jpg" },
                { id: "prod-9", title: "Apple Watch Ultra 2", description: "Most rugged and capable Apple Watch designed for outdoor adventures and athletic training.", price: 799, category: "wearables", badge: "Extreme Tech", brand: "Apple", stock: 7, soldCount: 14, image: "images/smartwatch.jpg" },
                { id: "prod-10", title: "Asus Zephyrus G14", description: "Ultra-portable 14-inch gaming powerhouse featuring gorgeous OLED display and AMD Ryzen 9.", price: 1499, category: "laptops", badge: "OLED Edition", brand: "Asus", stock: 5, soldCount: 11, image: "images/laptop.jpg" },
                { id: "prod-11", title: "Keychron Q1 Pro Keyboard", description: "Full aluminum QMK/VIA wireless mechanical keyboard with double-gasket custom design.", price: 189, category: "accessories", badge: "Custom Deck", brand: "Keychron", stock: 10, soldCount: 38, image: "images/ram.jpg" }
            ];
            saveProductsToStorage();
        }
    };

    // Fetch Live Exchange Rates (Async/Await)
    const fetchExchangeRates = async () => {
        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD');
            if (!response.ok) throw new Error('Currency API error');
            const data = await response.json();
            const { rates } = data;
            AppState.exchangeRates = {
                USD: 1,
                EUR: rates.EUR || 0.92,
                GEL: rates.GEL || 2.75
            };
        } catch (error) {
            logAppEvent('API', 'Failed fetching live currency rates, using defaults', error);
        }
    };

    // Fetch Reviews from public API (Async/Await) - Guarantees reviews are in ENGLISH
    const fetchReviews = async () => {
        if (!elements.reviewsGrid) return;
        try {
            // Fetch layout comment triggers
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
            if (!response.ok) throw new Error('Reviews fetch failed');
            const comments = await response.json();
            
            const reviewerCardsData = [
                { name: "Sandro K.", role: "Software Developer", rating: 5, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" },
                { name: "Mariam T.", role: "Creative Lead", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
                { name: "Luka M.", role: "IT Student", rating: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" }
            ];

            // Specific English reviews to ensure readability and contextual validity
            const englishReviews = [
                "The Lenovo Legion Pro laptop is incredibly fast. Very impressed with the quick checkout process and customer support!",
                "iPhone 15 Pro arrived within 2 days. The support team is very responsive. Will definitely purchase again.",
                "Excellent noise cancellation on the Sony WH-1000XM5 headphones. The profile currency switcher makes ordering from Tbilisi seamless."
            ];

            elements.reviewsGrid.innerHTML = comments.map((comment, index) => {
                const profile = reviewerCardsData[index] || {
                    name: comment.email.split('@')[0],
                    role: "TechStore Client",
                    rating: 5,
                    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
                };

                const stars = '★'.repeat(profile.rating) + '☆'.repeat(5 - profile.rating);
                const reviewText = englishReviews[index] || comment.body;

                return `
                    <div class="review-card">
                        <div class="review-header">
                            <img src="${profile.avatar}" alt="${profile.name}" class="review-avatar" loading="lazy">
                            <div class="review-user-info">
                                <h3 class="review-user-name">${profile.name}</h3>
                                <p class="review-user-role">${profile.role}</p>
                            </div>
                        </div>
                        <div class="review-rating" aria-label="${profile.rating} stars">${stars}</div>
                        <p class="review-text">"${reviewText}"</p>
                    </div>
                `;
            }).join('');
        } catch (error) {
            logAppEvent('API', 'Error displaying reviews, utilizing testimonials cache');
        }
    };

    // Simulated Checkout API returning custom Promise
    const submitOrderAPI = (cartData, cardDetails) => {
        return new Promise((resolve, reject) => {
            logAppEvent('Checkout', 'Routing payment and validating inputs...', cardDetails);
            
            setTimeout(() => {
                const isSuccessful = Math.random() > 0.05; // 95% success rate
                if (isSuccessful) {
                    resolve({
                        orderId: `TS-${Math.floor(100000 + Math.random() * 900000)}`,
                        status: 'paid',
                        cardLast4: cardDetails.cardNumber.slice(-4),
                        timestamp: new Date().toISOString()
                    });
                } else {
                    reject(new Error('Transaction declined: Card processor rejected payment.'));
                }
            }, 1800);
        });
    };

    // -------------------------------------------------------------------------
    // 6. INTERACTIVE RENDERING ACTIONS (DOM & ES6+)
    // -------------------------------------------------------------------------

    // Render Products Catalog Grid
    const renderCatalog = () => {
        if (!elements.productGrid) return;
        const dict = translations[AppState.language];

        // Apply filters
        const filtered = AppState.products.filter(product => {
            const matchesCategory = AppState.activeCategory === 'all' || product.category === AppState.activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                                  product.description.toLowerCase().includes(AppState.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        // Slice list according to catalog sizing (3 initially, or all matching)
        const visibleList = AppState.showAll ? filtered : filtered.slice(0, 3);

        // Update counts
        if (elements.countMessage) {
            elements.countMessage.textContent = AppState.language === 'KA' 
                ? `ნაჩვენებია ${visibleList.length} / ${filtered.length} პროდუქტიდან`
                : `Showing ${visibleList.length} of ${filtered.length} products`;
        }

        // Render products
        elements.productGrid.innerHTML = visibleList.map(product => {
            const { id, title, price, description, image, badge } = product;
            const availableStock = getAvailableStock(product);
            const isOutOfStock = availableStock <= 0;

            return `
                <article class="product-card" data-id="${id}" style="cursor: pointer;">
                    ${badge ? `<span class="product-badge">${badge}</span>` : ''}
                    <div class="product-image-container">
                        <img src="${image}" alt="${title}" class="product-image" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${title}</h3>
                        <p class="product-text">${description}</p>
                        <div class="product-purchase-row">
                            <span class="product-price">${formatPrice(price)}</span>
                            <button class="btn add-to-cart-btn" data-id="${id}" ${isOutOfStock ? 'disabled' : ''}>
                                ${isOutOfStock ? dict.outOfStock : dict.addToCart}
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Attach event listeners
        elements.productGrid.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.add-to-cart-btn')) return;
                const productId = card.getAttribute('data-id');
                openProductModal(productId);
            });
        });

        elements.productGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-id');
                addToCart(productId);
            });
        });

        // Sync showMoreBtn label
        if (elements.showMoreBtn) {
            elements.showMoreBtn.textContent = AppState.showAll ? dict.showFeatured : dict.showAll;
        }
    };

    // Open & Render Product Details Modal
    const openProductModal = (productId) => {
        AppState.activeModalProductId = productId;
        renderModalContent(productId);
        
        if (elements.productModal) {
            elements.productModal.classList.add('modal-open');
            elements.productModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const renderModalContent = (productId) => {
        if (!elements.modalBodyContent) return;
        const product = AppState.products.find(p => p.id === productId);
        if (!product) return;

        const dict = translations[AppState.language];
        const { title, brand, description, price, badge, image, soldCount } = product;
        const availableStock = getAvailableStock(product);
        const isOutOfStock = availableStock <= 0;

        elements.modalBodyContent.innerHTML = `
            <div class="modal-grid">
                <div class="modal-img-wrapper">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="modal-details">
                    ${badge ? `<span class="modal-badge">${badge}</span>` : ''}
                    <h2 class="modal-title">${title}</h2>
                    <p class="modal-brand">${dict.brand}: ${brand}</p>
                    <p class="modal-desc">${description}</p>
                    
                    <div class="modal-stats">
                        <div class="modal-stat-box">
                            <span class="modal-stat-label">${dict.availableStock}</span>
                            <span class="modal-stat-val ${isOutOfStock ? 'stock-out' : (availableStock <= 3 ? 'stock-alert' : '')}">
                                ${isOutOfStock ? dict.outOfStock : `${availableStock} ${dict.units}`}
                            </span>
                        </div>
                        <div class="modal-stat-box">
                            <span class="modal-stat-label">${dict.unitsSold}</span>
                            <span class="modal-stat-val">${soldCount} ${dict.units}</span>
                        </div>
                    </div>

                    <div class="modal-purchase-row">
                        <span class="modal-price">${formatPrice(price)}</span>
                        <button class="btn modal-action-btn add-to-cart-btn" data-id="${productId}" ${isOutOfStock ? 'disabled' : ''}>
                            ${isOutOfStock ? dict.outOfStock : dict.addToCart}
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Bind event listeners inside modal
        elements.modalBodyContent.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(productId);
            renderModalContent(productId);
        });
    };

    const closeProductModal = () => {
        if (elements.productModal) {
            elements.productModal.classList.remove('modal-open');
            elements.productModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            AppState.activeModalProductId = null;
        }
    };

    // Render Shopping Cart Contents (with dynamic Deals checkout logic)
    const renderCart = () => {
        const dict = translations[AppState.language];
        const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (elements.cartBadgeCount) {
            elements.cartBadgeCount.textContent = totalItems;
            elements.cartBadgeCount.classList.remove('badge-pop');
            void elements.cartBadgeCount.offsetWidth;
            elements.cartBadgeCount.classList.add('badge-pop');
        }

        if (AppState.cart.length === 0) {
            if (elements.cartEmptyMessage) elements.cartEmptyMessage.style.display = 'flex';
            if (elements.cartSummarySection) elements.cartSummarySection.style.display = 'none';
            if (elements.cartItemsList) elements.cartItemsList.innerHTML = '';
            return;
        }

        if (elements.cartEmptyMessage) elements.cartEmptyMessage.style.display = 'none';
        if (elements.cartSummarySection) elements.cartSummarySection.style.display = 'block';

        if (elements.cartItemsList) {
            elements.cartItemsList.innerHTML = AppState.cart.map(item => {
                const { product, quantity } = item;
                const { id, title, price, image } = product;

                return `
                    <div class="cart-item" data-id="${id}">
                        <img src="${image}" alt="${title}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${title}</h4>
                            <p class="cart-item-price">${formatPrice(price)}</p>
                            <div class="cart-item-controls">
                                <div class="quantity-selector">
                                    <button class="quantity-btn dec-qty-btn" data-id="${id}">-</button>
                                    <span class="quantity-val">${quantity}</span>
                                    <button class="quantity-btn inc-qty-btn" data-id="${id}">+</button>
                                </div>
                                <button class="cart-item-remove" data-id="${id}" aria-label="${dict.toastRemoved}">${AppState.language === 'KA' ? 'ამოშლა' : 'Remove'}</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            elements.cartItemsList.querySelectorAll('.dec-qty-btn').forEach(btn => {
                btn.addEventListener('click', (e) => adjustCartQuantity(e.target.getAttribute('data-id'), -1));
            });
            elements.cartItemsList.querySelectorAll('.inc-qty-btn').forEach(btn => {
                btn.addEventListener('click', (e) => adjustCartQuantity(e.target.getAttribute('data-id'), 1));
            });
            elements.cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', (e) => removeFromCart(e.target.getAttribute('data-id')));
            });
        }

        // Calculate Subtotals & Deals
        const subtotal = AppState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
        let discountRate = 0;
        if (AppState.activeDeal === 'student') discountRate = 0.10;
        else if (AppState.activeDeal === 'wfh') discountRate = 0.15;
        else if (AppState.activeDeal === 'gaming') discountRate = 0.12;

        const discount = subtotal * discountRate;
        const discountedSubtotal = subtotal - discount;
        const vatRate = 0.20;
        const tax = discountedSubtotal * vatRate;
        const total = discountedSubtotal + tax;

        if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatPrice(subtotal);
        
        if (elements.cartDiscountRow && elements.cartDiscount) {
            if (discount > 0) {
                elements.cartDiscountRow.style.display = 'flex';
                elements.cartDiscount.textContent = `-${formatPrice(discount)}`;
            } else {
                elements.cartDiscountRow.style.display = 'none';
            }
        }
        
        if (elements.cartTax) elements.cartTax.textContent = formatPrice(tax);
        if (elements.cartTotal) elements.cartTotal.textContent = formatPrice(total);
    };

    // Render Past Payments/Transactions inside user Profile Pane
    const renderPayments = () => {
        if (!elements.paymentItemsList) return;

        if (AppState.payments.length === 0) {
            if (elements.paymentEmptyMessage) elements.paymentEmptyMessage.style.display = 'flex';
            elements.paymentItemsList.innerHTML = '';
            return;
        }

        if (elements.paymentEmptyMessage) elements.paymentEmptyMessage.style.display = 'none';

        elements.paymentItemsList.innerHTML = AppState.payments.map(order => {
            const { orderId, timestamp, items, totalCharge, cardLast4 } = order;
            const dateStr = new Date(timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="payment-order-card">
                    <div class="payment-order-header">
                        <span class="payment-order-id">${orderId}</span>
                        <span class="payment-order-date">${dateStr}</span>
                    </div>
                    <div class="payment-order-body">
                        ${items.map(item => `
                            <div class="payment-order-item">
                                <span>${item.title} (x${item.qty})</span>
                                <span>${formatPrice(item.price * item.qty)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="payment-order-footer">
                        <span>${AppState.language === 'KA' ? 'გადახდილია ბარათით' : 'Paid with'} **** ${cardLast4}</span>
                        <span class="payment-order-total">${formatPrice(totalCharge)}</span>
                    </div>
                </div>
            `;
        }).join('');
    };

    // Render Customer Service History inside user Profile Pane
    const renderSubmissions = () => {
        if (!elements.submissionsItemsList) return;

        if (AppState.submissions.length === 0) {
            if (elements.submissionsEmptyMessage) elements.submissionsEmptyMessage.style.display = 'flex';
            elements.submissionsItemsList.innerHTML = '';
            return;
        }

        if (elements.submissionsEmptyMessage) elements.submissionsEmptyMessage.style.display = 'none';

        elements.submissionsItemsList.innerHTML = AppState.submissions.map(sub => {
            const { firstName, lastName, email, interest, goal, message, timestamp } = sub;
            const dateStr = new Date(timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="submission-card">
                    <div class="submission-card-header">
                        <span class="submission-card-interest">${interest}</span>
                        <span class="submission-card-date">${dateStr}</span>
                    </div>
                    <div class="submission-card-body">
                        <div class="submission-card-field">
                            <strong>${AppState.language === 'KA' ? 'სახელი' : 'Name'}:</strong>
                            <span>${firstName} ${lastName}</span>
                        </div>
                        <div class="submission-card-field">
                            <strong>Email:</strong>
                            <span>${email}</span>
                        </div>
                        ${goal ? `
                        <div class="submission-card-field">
                            <strong>${AppState.language === 'KA' ? 'მიზანი' : 'Goal'}:</strong>
                            <span>${goal}</span>
                        </div>
                        ` : ''}
                        ${message ? `
                        <div class="submission-card-field" style="flex-direction: column; margin-top: 4px;">
                            <strong>${AppState.language === 'KA' ? 'შეტყობინება' : 'Message'}:</strong>
                            <span style="font-style: italic; color: #cbd5e1; margin-top: 2px;">"${message}"</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    };

    // Toggle Profile Drawer Tabs View
    const handleProfileTabSwitch = (tabName) => {
        elements.profileTabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const panePayments = document.getElementById('profile-pane-payments');
        const paneSubmissions = document.getElementById('profile-pane-submissions');

        if (tabName === 'payments') {
            panePayments.classList.add('active');
            paneSubmissions.classList.remove('active');
            renderPayments();
        } else {
            panePayments.classList.remove('active');
            paneSubmissions.classList.add('active');
            renderSubmissions();
        }
    };

    // -------------------------------------------------------------------------
    // 7. CART SYSTEM MUTATORS (ES6+ Spread & Rest)
    // -------------------------------------------------------------------------

    const addToCart = (productId) => {
        const dict = translations[AppState.language];
        const product = AppState.products.find(p => p.id === productId);
        if (!product) return;

        const availableStock = getAvailableStock(product);
        if (availableStock <= 0) {
            showToast(dict.toastOutOfStock, 'error');
            return;
        }

        const existingIndex = AppState.cart.findIndex(item => item.product.id === productId);

        if (existingIndex > -1) {
            const updatedCart = [...AppState.cart];
            updatedCart[existingIndex].quantity += 1;
            AppState.cart = updatedCart;
        } else {
            AppState.cart = [...AppState.cart, { product, quantity: 1 }];
        }

        saveCartToStorage();
        renderCart();
        renderCatalog();

        showToast(`${product.title} ${dict.toastAdded}`, 'success');
    };

    const removeFromCart = (productId) => {
        const dict = translations[AppState.language];
        const itemToRemove = AppState.cart.find(item => item.product.id === productId);
        AppState.cart = AppState.cart.filter(item => item.product.id !== productId);
        
        saveCartToStorage();
        renderCart();
        renderCatalog();

        if (AppState.activeModalProductId === productId) {
            renderModalContent(productId);
        }

        if (itemToRemove) {
            showToast(`${itemToRemove.product.title} ${dict.toastRemoved}`, 'success');
        }
    };

    const adjustCartQuantity = (productId, adjustment) => {
        const dict = translations[AppState.language];
        const targetIndex = AppState.cart.findIndex(item => item.product.id === productId);
        if (targetIndex === -1) return;

        const item = AppState.cart[targetIndex];
        const newQty = item.quantity + adjustment;

        if (adjustment > 0) {
            // Check stock limits before adding
            if (newQty > item.product.stock) {
                showToast(`${dict.toastLimitReached} ${item.product.stock} ${dict.toastUnitsInStock}`, 'error');
                return;
            }
        }

        if (newQty <= 0) {
            removeFromCart(productId);
        } else {
            const updatedCart = [...AppState.cart];
            updatedCart[targetIndex].quantity = newQty;
            AppState.cart = updatedCart;
            saveCartToStorage();
            renderCart();
            renderCatalog();

            if (AppState.activeModalProductId === productId) {
                renderModalContent(productId);
            }
        }
    };

    // Open/Close Drawers
    const toggleCartDrawer = (isOpen) => {
        if (!elements.cartDrawer) return;
        elements.cartDrawer.setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            elements.cartDrawer.classList.add('drawer-open');
            document.body.style.overflow = 'hidden';
        } else {
            elements.cartDrawer.classList.remove('drawer-open');
            document.body.style.overflow = '';
        }
    };

    const toggleProfileDrawer = (isOpen) => {
        if (!elements.profileDrawer) return;
        elements.profileDrawer.setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            elements.profileDrawer.classList.add('drawer-open');
            document.body.style.overflow = 'hidden';
            // Open default tab
            handleProfileTabSwitch('payments');
        } else {
            elements.profileDrawer.classList.remove('drawer-open');
            document.body.style.overflow = '';
        }
    };

    // -------------------------------------------------------------------------
    // 8. CARD DETAILS VALIDATIONS
    // -------------------------------------------------------------------------
    const validatePaymentDetails = () => {
        const dict = translations[AppState.language];
        const name = elements.cardholderInput.value.trim();
        const number = elements.cardnumberInput.value.replace(/\s+/g, '');
        const expiry = elements.expiryInput.value.trim();
        const cvv = elements.cvvInput.value.trim();

        if (name.length < 3) {
            showToast(dict.toastEnterCard, 'error');
            elements.cardholderInput.focus();
            return null;
        }

        if (number.length !== 16 || !/^\d+$/.test(number)) {
            showToast(dict.toastCard16, 'error');
            elements.cardnumberInput.focus();
            return null;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            showToast(dict.toastExpiryFormat, 'error');
            elements.expiryInput.focus();
            return null;
        }

        const [month, year] = expiry.split('/').map(Number);
        if (month < 1 || month > 12) {
            showToast(dict.toastExpiryMonth, 'error');
            elements.expiryInput.focus();
            return null;
        }

        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            showToast(dict.toastCVV3, 'error');
            elements.cvvInput.focus();
            return null;
        }

        return { cardholder: name, cardNumber: number, expiry, cvv };
    };

    // Auto-spacing inputs formatting
    const formatCardInputs = () => {
        if (elements.cardnumberInput) {
            elements.cardnumberInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                let matches = val.match(/\d{4,16}/g);
                let match = matches && matches[0] || '';
                let parts = [];
                for (let i = 0, len = match.length; i < len; i += 4) {
                    parts.push(match.substring(i, i + 4));
                }
                e.target.value = parts.length > 0 ? parts.join(' ') : val;
            });
        }

        if (elements.expiryInput) {
            elements.expiryInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
                if (val.length > 2) {
                    e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
                } else {
                    e.target.value = val;
                }
            });
        }
    };

    // -------------------------------------------------------------------------
    // 9. EVENT LISTENERS SETUP
    // -------------------------------------------------------------------------

    const setupEventListeners = () => {
        // Toggle Cart Click Handlers
        if (elements.cartToggleBtn) {
            elements.cartToggleBtn.addEventListener('click', () => toggleCartDrawer(true));
        }
        if (elements.cartCloseBtn) {
            elements.cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
        }
        if (elements.cartOverlay) {
            elements.cartOverlay.addEventListener('click', () => toggleCartDrawer(false));
        }

        // Toggle User Profile Click Handlers
        if (elements.profileToggleBtn) {
            elements.profileToggleBtn.addEventListener('click', () => toggleProfileDrawer(true));
        }
        if (elements.profileCloseBtn) {
            elements.profileCloseBtn.addEventListener('click', () => toggleProfileDrawer(false));
        }
        if (elements.profileOverlay) {
            elements.profileOverlay.addEventListener('click', () => toggleProfileDrawer(false));
        }

        // Tab Switching inside Profile Drawer
        elements.profileTabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.getAttribute('data-tab');
                handleProfileTabSwitch(tab);
            });
        });

        // Language Select Listener
        if (elements.profileLanguageSelect) {
            elements.profileLanguageSelect.addEventListener('change', (e) => {
                AppState.language = e.target.value;
                saveLanguageToStorage();
                translateInterface();
                showToast(translations[AppState.language].toastLanguage, 'success');
            });
        }

        // Currency Select Listener
        if (elements.profileCurrencySelect) {
            elements.profileCurrencySelect.addEventListener('change', (e) => {
                AppState.currency = e.target.value;
                localStorage.setItem('techstore_currency', AppState.currency);
                renderCatalog();
                renderCart();
                renderPayments();
                
                if (AppState.activeModalProductId) {
                    renderModalContent(AppState.activeModalProductId);
                }

                const dict = translations[AppState.language];
                showToast(`${dict.toastCurrency} ${AppState.currency}`, 'success');
            });
        }

        // Deal Selector (Radio click handler - click only one)
        const dealRadios = document.querySelectorAll('input[name="cart-deal"]');
        dealRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                AppState.activeDeal = e.target.value;
                renderCart();
            });
        });

        // Toggle Product Details Modal Close Click
        if (elements.modalCloseBtn) {
            elements.modalCloseBtn.addEventListener('click', closeProductModal);
        }
        if (elements.modalOverlay) {
            elements.modalOverlay.addEventListener('click', closeProductModal);
        }

        // Catalog Sizing Toggle Button
        if (elements.showMoreBtn) {
            elements.showMoreBtn.addEventListener('click', () => {
                AppState.showAll = !AppState.showAll;
                renderCatalog();
            });
        }

        // Search Input Change Handler (DOM Search)
        if (elements.productSearch) {
            elements.productSearch.addEventListener('input', (e) => {
                AppState.searchQuery = e.target.value;
                renderCatalog();
            });
        }

        // Category Tabs Click Filter Handlers
        elements.filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                elements.filterTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                AppState.activeCategory = e.target.getAttribute('data-category');
                renderCatalog();
            });
        });

        // Format Payment Inputs
        formatCardInputs();

        // Checkout Button Listener (Promise Consumption)
        if (elements.checkoutBtn) {
            elements.checkoutBtn.addEventListener('click', async () => {
                const dict = translations[AppState.language];
                
                // 1. Validate payment card details form
                const cardDetails = validatePaymentDetails();
                if (!cardDetails) return; // Exit if invalid

                const btnText = elements.checkoutBtn.querySelector('.btn-text');
                const btnSpinner = elements.checkoutBtn.querySelector('.btn-spinner');

                // Visual Loading State transition
                elements.checkoutBtn.disabled = true;
                if (btnText) btnText.textContent = dict.authorizing;
                if (btnSpinner) btnSpinner.classList.remove('hidden');

                try {
                    // Consume Promise using async/await
                    const receipt = await submitOrderAPI(AppState.cart, cardDetails);
                    
                    // 2. Decrement real stock levels and update soldCount inside AppState.products
                    AppState.cart.forEach(item => {
                        const product = AppState.products.find(p => p.id === item.product.id);
                        if (product) {
                            product.stock = Math.max(0, product.stock - item.quantity);
                            product.soldCount += item.quantity;
                        }
                    });

                    // Cache product changes to localStorage
                    saveProductsToStorage();

                    // Calculate Total Charge with active deal discount
                    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
                    let discountRate = 0;
                    if (AppState.activeDeal === 'student') discountRate = 0.10;
                    else if (AppState.activeDeal === 'wfh') discountRate = 0.15;
                    else if (AppState.activeDeal === 'gaming') discountRate = 0.12;
                    
                    const chargeAmount = (subtotal * (1 - discountRate)) * 1.20; // with 20% VAT

                    // 3. Compile payment history object
                    const paymentRecord = {
                        orderId: receipt.orderId,
                        timestamp: receipt.timestamp,
                        cardLast4: receipt.cardLast4,
                        totalCharge: chargeAmount,
                        items: AppState.cart.map(item => ({
                            title: item.product.title,
                            qty: item.quantity,
                            price: item.product.price
                        }))
                    };

                    // Add record to state
                    AppState.payments = [paymentRecord, ...AppState.payments];
                    savePaymentsToStorage();

                    showToast(`${dict.toastPaymentSuccess} ${receipt.orderId}.`, 'success');
                    
                    // Reset cart and checkout form fields
                    AppState.cart = [];
                    AppState.activeDeal = 'none';
                    const defaultRadio = document.querySelector('input[name="cart-deal"][value="none"]');
                    if (defaultRadio) defaultRadio.checked = true;
                    
                    saveCartToStorage();
                    
                    if (elements.cardholderInput) elements.cardholderInput.value = '';
                    if (elements.cardnumberInput) elements.cardnumberInput.value = '';
                    if (elements.expiryInput) elements.expiryInput.value = '';
                    if (elements.cvvInput) elements.cvvInput.value = '';

                    renderCart();
                    renderCatalog();
                    toggleCartDrawer(false);

                    // Re-render modal details if it was open during checkout
                    if (AppState.activeModalProductId) {
                        renderModalContent(AppState.activeModalProductId);
                    }
                } catch (error) {
                    logAppEvent('Checkout', 'Order payment declined:', error);
                    showToast(error.message || 'Checkout failed. Please check card limits.', 'error');
                } finally {
                    elements.checkoutBtn.disabled = false;
                    if (btnText) btnText.textContent = dict.placeOrder;
                    if (btnSpinner) btnSpinner.classList.add('hidden');
                }
            });
        }

        // Form Submission Interception (Customer Service Request Tracker)
        if (elements.registerForm) {
            elements.registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(elements.registerForm);
                const firstName = formData.get('first-name');
                const interest = formData.get('interest');

                const registrationDetails = {
                    firstName,
                    lastName: formData.get('last-name'),
                    email: formData.get('email'),
                    interest,
                    goal: formData.get('goal'),
                    extras: formData.getAll('extras'),
                    message: formData.get('message'),
                    timestamp: new Date().toISOString()
                };

                // Store registration locally
                AppState.submissions = [registrationDetails, ...AppState.submissions];
                localStorage.setItem('techstore_registrations', JSON.stringify(AppState.submissions));

                const dict = translations[AppState.language];
                const msg = AppState.language === 'KA'
                    ? `გმადლობთ, ${firstName}! თქვენი მოთხოვნა კატეგორიაზე "${interest}" შენახულია.`
                    : `Thank you, ${firstName}! We've stored your interest in ${interest}.`;
                
                showToast(msg, 'success');
                elements.registerForm.reset();
                
                // Refresh service request rendering
                renderSubmissions();
            });
        }
    };

    // -------------------------------------------------------------------------
    // 10. APPLICATION INITIALIZATION PIPELINE
    // -------------------------------------------------------------------------
    const initApp = async () => {
        logAppEvent('Init', 'Initializing TechStore database...');
        
        loadCartFromStorage();
        loadPaymentsFromStorage();
        loadSubmissionsFromStorage();
        loadLanguageFromStorage();
        loadCurrencyFromStorage();
        
        await Promise.all([
            fetchProducts(),
            fetchExchangeRates()
        ]);
        
        translateInterface();
        setupEventListeners();
        fetchReviews();
        
        logAppEvent('Init', 'App ready.');
    };

    initApp();
});
