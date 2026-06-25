/**
 * TechStore - Core Interactive JavaScript Logic
 * Demonstrates: DOM manipulation, Advanced ES6+, Asynchronous JS (Callbacks, Promises, Async/Await),
 * API Integration (Fetch), and Web Storage (localStorage).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Clear localStorage completely to reset storage on every project run/load
    localStorage.clear();

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
        minBudget: 0,
        maxBudget: 2000,
        compareList: [],
        recentlyViewed: [],
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
        inventoryTableBody: document.getElementById('inventory-table-body'),
        
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
        cvvInput: document.getElementById('checkout-cvv'),
        
        // Price Filter and Compare Selectors
        minPriceRange: document.getElementById('min-price-range'),
        minPriceVal: document.getElementById('min-price-val'),
        maxPriceRange: document.getElementById('max-price-range'),
        maxPriceVal: document.getElementById('max-price-val'),
        compareFab: document.getElementById('compare-fab'),
        compareCount: document.getElementById('compare-count'),
        compareModal: document.getElementById('compare-modal'),
        compareModalOverlay: document.getElementById('compare-modal-overlay'),
        compareCloseBtn: document.getElementById('compare-close-btn'),
        compareModalBody: document.getElementById('compare-modal-body'),

        // Filter Dropdown Panel
        filterToggleBtn: document.getElementById('filter-toggle-btn'),
        filterDropdownPanel: document.getElementById('filter-dropdown-panel'),
        filterTabs: document.querySelectorAll('.filter-tab'),

        // Recently Viewed Selectors
        recentToggleBtn: document.getElementById('recent-toggle-btn'),
        recentBadgeCount: document.getElementById('recent-badge-count'),
        recentDrawer: document.getElementById('recent-drawer'),
        recentOverlay: document.getElementById('recent-overlay'),
        recentCloseBtn: document.getElementById('recent-drawer-close'),
        recentItemsList: document.getElementById('recent-drawer-body')
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
            toastCVV3: "Please enter a valid 3-digit CVV number.",
            inventoryProduct: "Product",
            inventoryCategory: "Category",
            inventoryPrice: "Price",
            inventoryAvailability: "Availability",
            inventorySold: "Units Sold"
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
            toastCVV3: "CVV კოდი უნდა შედგებოდეს 3 ციფრისგან.",
            inventoryProduct: "პროდუქტი",
            inventoryCategory: "კატეგორია",
            inventoryPrice: "ფასი",
            inventoryAvailability: "ხელმისაწვდომობა",
            inventorySold: "გაყიდული რაოდენობა"
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

        // Translate Inventory Table Headers
        const thProduct = document.getElementById('inventory-th-product');
        const thCategory = document.getElementById('inventory-th-category');
        const thPrice = document.getElementById('inventory-th-price');
        const thAvailability = document.getElementById('inventory-th-availability');
        const thSold = document.getElementById('inventory-th-sold');

        if (thProduct) thProduct.textContent = dict.inventoryProduct;
        if (thCategory) thCategory.textContent = dict.inventoryCategory;
        if (thPrice) thPrice.textContent = dict.inventoryPrice;
        if (thAvailability) thAvailability.textContent = dict.inventoryAvailability;
        if (thSold) thSold.textContent = dict.inventorySold;

        // Refresh dynamic UI elements
        renderCatalog();
        renderCart();
        renderInventoryTable();
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
                { id: "prod-1", title: "Lenovo Legion Pro 5", description: "High performance gaming laptop featuring RTX 4070 graphics and AMD Ryzen 7 processor.", price: 1399, category: "laptops", badge: "Top Choice", brand: "Lenovo", stock: 6, soldCount: 15, image: "images/laptop.jpg", images: ["images/laptop.jpg", "images/hero-tech.jpg", "images/keyboard.png"], screenSize: "16.0 inches", processor: "AMD Ryzen 7 7745HX", ram: "16GB DDR5" },
                { id: "prod-2", title: "Apple iPhone 15 Pro", description: "Titanium design, A17 Pro chip, customizable Action button, and a powerful camera system.", price: 999, category: "smartphones", badge: "New Arrival", brand: "Apple", stock: 12, soldCount: 48, image: "images/smartphone.jpg", images: ["images/smartphone.jpg", "images/hero-tech.jpg", "images/galaxy_s24.png"], screenSize: "6.1 inches", processor: "Apple A17 Pro", ram: "8GB LPDDR5" },
                { id: "prod-3", title: "Sony WH-1000XM5", description: "Industry leading noise canceling wireless headphones with crystal clear hands-free calling.", price: 349, category: "accessories", badge: "Top Rated", brand: "Sony", stock: 20, soldCount: 95, image: "images/headphones.jpg", images: ["images/headphones.jpg", "images/hero-tech.jpg", "images/gaming-mouse.jpg"], screenSize: "N/A", processor: "Sony V1 Processor", ram: "N/A" },
                { id: "prod-4", title: "Logitech G502 X Plus", description: "Iconic gaming mouse upgraded with hybrid optical-mechanical switches and LIGHTSPEED wireless.", price: 149, category: "accessories", badge: "Pro Gear", brand: "Logitech", stock: 25, soldCount: 142, image: "images/gaming-mouse.jpg", images: ["images/gaming-mouse.jpg", "images/hero-tech.jpg", "images/headphones.jpg"], screenSize: "N/A", processor: "HERO 25K Sensor", ram: "N/A" },
                { id: "prod-5", title: "Corsair Vengeance DDR5", description: "High performance RGB desktop memory kit optimized for Intel and AMD motherboards.", price: 129, category: "accessories", badge: "Performance", brand: "Corsair", stock: 18, soldCount: 64, image: "images/ram.jpg", images: ["images/ram.jpg", "images/hero-tech.jpg", "images/keyboard.png"], screenSize: "N/A", processor: "N/A", ram: "32GB (2x16GB) DDR5" },
                { id: "prod-6", title: "Samsung Galaxy Watch 6", description: "Advanced health tracking smartwatch with customized heart rate zones and sleek design.", price: 299, category: "wearables", badge: "Best Tracker", brand: "Samsung", stock: 15, soldCount: 50, image: "images/smartwatch.jpg", images: ["images/smartwatch.jpg", "images/hero-tech.jpg", "images/apple_watch_ultra.png"], screenSize: "1.3 inches", processor: "Exynos W930 Dual-Core", ram: "2GB RAM" },
                { id: "prod-7", title: "Apple MacBook Pro M3", description: "Supercharged by the M3 chip with a beautiful Liquid Retina XDR screen and massive battery life.", price: 1599, category: "laptops", badge: "Premium", brand: "Apple", stock: 8, soldCount: 22, image: "images/macbook.png", images: ["images/macbook.png", "images/hero-tech.jpg", "images/keyboard.png"], screenSize: "14.2 inches", processor: "Apple M3 Chip", ram: "8GB Unified Memory" },
                { id: "prod-8", title: "Samsung Galaxy S24 Ultra", description: "Ultimate Galaxy smartphone featuring built-in S Pen, titanium body, and Galaxy AI features.", price: 1199, category: "smartphones", badge: "AI Powered", brand: "Samsung", stock: 9, soldCount: 30, image: "images/galaxy_s24.png", images: ["images/galaxy_s24.png", "images/hero-tech.jpg", "images/smartphone.jpg"], screenSize: "6.8 inches", processor: "Snapdragon 8 Gen 3", ram: "12GB LPDDR5X" },
                { id: "prod-9", title: "Apple Watch Ultra 2", description: "Most rugged and capable Apple Watch designed for outdoor adventures and athletic training.", price: 799, category: "wearables", badge: "Extreme Tech", brand: "Apple", stock: 7, soldCount: 14, image: "images/apple_watch_ultra.png", images: ["images/apple_watch_ultra.png", "images/hero-tech.jpg", "images/smartwatch.jpg"], screenSize: "1.92 inches", processor: "Apple S9 SiP", ram: "64GB Storage" },
                { id: "prod-10", title: "Asus Zephyrus G14", description: "Ultra-portable 14-inch gaming powerhouse featuring gorgeous OLED display and AMD Ryzen 9.", price: 1499, category: "laptops", badge: "OLED Edition", brand: "Asus", stock: 5, soldCount: 11, image: "images/asus_zephyrus.png", images: ["images/asus_zephyrus.png", "images/hero-tech.jpg", "images/keyboard.png"], screenSize: "14.0 inches", processor: "AMD Ryzen 9 8945HS", ram: "16GB DDR5" },
                { id: "prod-11", title: "Keychron Q1 Pro Keyboard", description: "Full aluminum QMK/VIA wireless mechanical keyboard with double-gasket custom design.", price: 189, category: "accessories", badge: "Custom Deck", brand: "Keychron", stock: 10, soldCount: 38, image: "images/keyboard.png", images: ["images/keyboard.png", "images/hero-tech.jpg", "images/ram.jpg"], screenSize: "N/A", processor: "ARM Cortex-M4 MCU", ram: "N/A" }
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

    // Fetch Reviews from public API - Guarantees reviews are ALWAYS in ENGLISH
    const fetchReviews = async () => {
        if (!elements.reviewsGrid) return;
        
        const defaultReviews = [
            {
                name: "Alex Johnson",
                role: "Software Engineer",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
                text: "The Lenovo Legion Pro laptop is incredibly fast. Very impressed with the quick checkout process and customer support!"
            },
            {
                name: "Sarah Miller",
                role: "Creative Lead",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
                text: "My new iPhone 15 Pro arrived within 2 days. The support team is very responsive. Will definitely purchase again."
            },
            {
                name: "David Kim",
                role: "IT Student",
                rating: 4,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
                text: "Excellent noise cancellation on the Sony WH-1000XM5 headphones. The profile currency switcher makes ordering seamless."
            }
        ];

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
            if (response.ok) {
                const comments = await response.json();
                elements.reviewsGrid.innerHTML = comments.map((comment, index) => {
                    const name = defaultReviews[index] ? defaultReviews[index].name : comment.name.split(' ')[0];
                    const role = defaultReviews[index] ? defaultReviews[index].role : "TechStore Client";
                    const rating = defaultReviews[index] ? defaultReviews[index].rating : 5;
                    const avatar = defaultReviews[index] ? defaultReviews[index].avatar : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80`;
                    const text = defaultReviews[index] ? defaultReviews[index].text : "Great product, excellent build quality and highly recommended!";
                    
                    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                    return `
                        <div class="review-card">
                            <div class="review-header">
                                <img src="${avatar}" alt="${name}" class="review-avatar" loading="lazy">
                                <div class="review-user-info">
                                    <h3 class="review-user-name">${name}</h3>
                                    <p class="review-user-role">${role}</p>
                                </div>
                            </div>
                            <div class="review-rating" aria-label="${rating} stars">${stars}</div>
                            <p class="review-text">"${text}"</p>
                        </div>
                    `;
                }).join('');
                return;
            }
        } catch (error) {
            logAppEvent('API', 'Error displaying reviews, using default local reviews', error);
        }

        // Fallback render of default reviews (always in English)
        elements.reviewsGrid.innerHTML = defaultReviews.map(review => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            return `
                <div class="review-card">
                    <div class="review-header">
                        <img src="${review.avatar}" alt="${review.name}" class="review-avatar" loading="lazy">
                        <div class="review-user-info">
                            <h3 class="review-user-name">${review.name}</h3>
                            <p class="review-user-role">${review.role}</p>
                        </div>
                    </div>
                    <div class="review-rating" aria-label="${review.rating} stars">${stars}</div>
                    <p class="review-text">"${review.text}"</p>
                </div>
            `;
        }).join('');
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
            const matchesBudget = product.price >= AppState.minBudget && product.price <= AppState.maxBudget;
            return matchesCategory && matchesSearch && matchesBudget;
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
            const isChecked = AppState.compareList.includes(id);

            return `
                <article class="product-card" data-id="${id}" style="cursor: pointer;">
                    ${badge ? `<span class="product-badge">${badge}</span>` : ''}
                    <div class="compare-checkbox-wrapper" style="position: absolute; top: 14px; right: 14px; z-index: 5; background: rgba(9, 3, 13, 0.85); padding: 5px 8px; border-radius: 6px; color: #ffffff; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border: 1px solid rgba(57, 255, 20, 0.4);">
                        <input type="checkbox" class="compare-checkbox" data-id="${id}" ${isChecked ? 'checked' : ''} style="cursor: pointer; accent-color: var(--electric-green);">
                        <span style="font-weight: 700; cursor: pointer;">Compare</span>
                    </div>
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
                if (e.target.closest('.compare-checkbox-wrapper') || e.target.closest('.compare-checkbox')) return;
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

        // Compare checkbox listener
        elements.productGrid.querySelectorAll('.compare-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const productId = cb.getAttribute('data-id');
                if (cb.checked) {
                    if (!AppState.compareList.includes(productId)) {
                        AppState.compareList.push(productId);
                    }
                } else {
                    AppState.compareList = AppState.compareList.filter(id => id !== productId);
                }
                updateCompareFAB();
            });
        });

        // Sync showMoreBtn label
        if (elements.showMoreBtn) {
            elements.showMoreBtn.textContent = AppState.showAll ? dict.showFeatured : dict.showAll;
        }

        // Keep inventory table in sync
        renderInventoryTable();
    };

    // Dynamic Inventory Table Status Renderer
    const renderInventoryTable = () => {
        if (!elements.inventoryTableBody) return;
        const dict = translations[AppState.language];
        
        elements.inventoryTableBody.innerHTML = AppState.products.map(product => {
            const { title, category, price, stock, soldCount } = product;
            
            let availabilityText = "";
            let availabilityClass = "";
            if (stock <= 0) {
                availabilityText = dict.outOfStock;
                availabilityClass = "stock-out";
            } else if (stock <= 3) {
                availabilityText = AppState.language === 'KA' ? 'ლიმიტირებული' : 'Limited';
                availabilityClass = "stock-alert";
            } else {
                availabilityText = AppState.language === 'KA' ? 'მარაგშია' : 'In Stock';
                availabilityClass = "stock-in";
            }
            
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            
            return `
                <tr>
                    <td style="color: #ffffff; font-weight: 700;">${title}</td>
                    <td>${formattedCategory}</td>
                    <td>${formatPrice(price)}</td>
                    <td class="${availabilityClass}">${availabilityText} (${stock})</td>
                    <td style="font-weight: 700; color: #ffffff;">${soldCount}</td>
                </tr>
            `;
        }).join('');
    };

    // Open & Render Product Details Modal
    const openProductModal = (productId) => {
        AppState.activeModalProductId = productId;
        
        // Add to recently viewed (prevent duplicates, keep top 5)
        AppState.recentlyViewed = [productId, ...AppState.recentlyViewed.filter(id => id !== productId)].slice(0, 5);
        updateRecentlyViewed();

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
        const productImages = product.images || [image];

        // Dynamic price history chart calculations (deterministic per product ID)
        const sumChars = (str) => [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const seed = sumChars(productId || "");
        const f90 = 1.10 + ((seed % 10) / 100);
        const f60 = 1.05 + (((seed + 3) % 10) / 100);
        const f30 = 1.15 + (((seed + 7) % 10) / 100);
        const f15 = 1.02 + (((seed + 1) % 10) / 100);

        const p90 = Math.round(price * f90);
        const p60 = Math.round(price * f60);
        const p30 = Math.round(price * f30);
        const p15 = Math.round(price * f15);
        const pToday = price;

        const pricesArr = [p90, p60, p30, p15, pToday];
        const maxP = Math.max(...pricesArr);
        const minP = Math.min(...pricesArr);
        const rangeP = maxP - minP || 1;
        const mapY = (val) => 70 - ((val - minP) / rangeP) * 60;

        const y90 = mapY(p90);
        const y60 = mapY(p60);
        const y30 = mapY(p30);
        const y15 = mapY(p15);
        const yToday = mapY(pToday);

        const chartHtml = `
            <div class="price-history-chart-card" style="margin: 16px 0; background: rgba(33, 1, 36, 0.4); border: 1px solid rgba(57, 255, 20, 0.25); border-radius: 10px; padding: 12px 16px; box-sizing: border-box;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h4 style="margin: 0; color: #ffffff; font-size: 0.85rem; font-weight: 800; display: flex; align-items: center; gap: 4px;">
                        <span style="color: var(--electric-green);">📊</span> 90-Day Price Trend
                    </h4>
                    <span style="font-size: 0.72rem; color: var(--electric-green); font-weight: 700; background: rgba(57, 255, 20, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(57, 255, 20, 0.2);">
                        Genuinely Good Deal
                    </span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; margin-bottom: 6px;">
                    <span>90 Days Ago: <strong style="color: #cbd5e1;">${formatPrice(p90)}</strong></span>
                    <span>Today: <strong style="color: var(--mint);">${formatPrice(pToday)}</strong></span>
                </div>
                <svg viewBox="0 0 300 80" style="width: 100%; height: 60px; overflow: visible; display: block;">
                    <defs>
                        <linearGradient id="chart-glow-${productId}" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--electric-green)" stop-opacity="0.35"/>
                            <stop offset="100%" stop-color="var(--electric-green)" stop-opacity="0"/>
                        </linearGradient>
                    </defs>
                    <!-- Fill gradient -->
                    <path d="M 10 ${y90} L 80 ${y60} L 150 ${y30} L 220 ${y15} L 290 ${yToday} L 290 80 L 10 80 Z" fill="url(#chart-glow-${productId})"></path>
                    <!-- Stroke path -->
                    <path d="M 10 ${y90} L 80 ${y60} L 150 ${y30} L 220 ${y15} L 290 ${yToday}" fill="none" stroke="var(--electric-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 0px 4px var(--electric-green));"></path>
                    <!-- Data points -->
                    <circle cx="10" cy="${y90}" r="3" fill="#ffffff" stroke="var(--violet)" stroke-width="1"></circle>
                    <circle cx="80" cy="${y60}" r="3" fill="#ffffff" stroke="var(--violet)" stroke-width="1"></circle>
                    <circle cx="150" cy="${y30}" r="3" fill="#ffffff" stroke="var(--violet)" stroke-width="1"></circle>
                    <circle cx="220" cy="${y15}" r="3" fill="#ffffff" stroke="var(--violet)" stroke-width="1"></circle>
                    <circle cx="290" cy="${yToday}" r="4" fill="var(--electric-green)" stroke="var(--mint)" stroke-width="1"></circle>
                </svg>
                <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: #64748b; margin-top: 6px; font-weight: 600;">
                    <span>-90 days</span>
                    <span>-60 days</span>
                    <span>-30 days</span>
                    <span>-15 days</span>
                    <span>Today</span>
                </div>
            </div>
        `;

        elements.modalBodyContent.innerHTML = `
            <div class="modal-grid">
                <div class="modal-img-wrapper" style="display: flex; flex-direction: column; align-items: center;">
                    <div class="main-image-zoom-container" id="zoom-container" style="position: relative; overflow: hidden; border-radius: 10px; cursor: zoom-in; width: 100%; border: 1px solid rgba(57, 255, 20, 0.25); background: rgba(9, 3, 13, 0.4);">
                        <img src="${image}" alt="${title}" id="main-modal-img" class="zoom-image" style="width: 100%; height: auto; display: block; transition: transform 0.1s ease; transform-origin: center center;">
                    </div>
                    <div class="modal-thumbnails" style="display: flex; gap: 8px; margin-top: 12px; justify-content: center; flex-wrap: wrap;">
                        ${productImages.map(imgSrc => `
                            <img src="${imgSrc}" class="modal-thumbnail-img" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; transition: border-color 0.2s;" alt="${title} thumbnail">
                        `).join('')}
                    </div>
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

                    ${chartHtml}

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

        // Clickable thumbnails logic
        const mainImg = elements.modalBodyContent.querySelector('#main-modal-img');
        const thumbs = elements.modalBodyContent.querySelectorAll('.modal-thumbnail-img');
        if (thumbs.length > 0) {
            thumbs[0].style.borderColor = 'var(--electric-green)';
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    mainImg.src = thumb.src;
                    thumbs.forEach(t => t.style.borderColor = 'rgba(255,255,255,0.2)');
                    thumb.style.borderColor = 'var(--electric-green)';
                });
            });
        }

        // Hover-to-Zoom logic
        const zoomContainer = elements.modalBodyContent.querySelector('#zoom-container');
        if (zoomContainer && mainImg) {
            zoomContainer.addEventListener('mousemove', (e) => {
                const rect = zoomContainer.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                mainImg.style.transformOrigin = `${x}% ${y}%`;
                mainImg.style.transform = 'scale(2.2)';
            });
            zoomContainer.addEventListener('mouseleave', () => {
                mainImg.style.transform = 'scale(1)';
                mainImg.style.transformOrigin = 'center center';
            });
        }
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

        // Sync radio checked state
        const activeRadio = document.querySelector(`input[name="cart-deal"][value="${AppState.activeDeal}"]`);
        if (activeRadio) activeRadio.checked = true;
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

        elements.submissionsItemsList.innerHTML = AppState.submissions.map((sub, index) => {
            const { firstName, lastName, email, interest, goal, message, timestamp, review } = sub;
            const dateStr = new Date(timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const hasReview = !!review;
            const statusBadgeText = hasReview 
                ? (AppState.language === 'KA' ? 'განხილული' : 'Reviewed') 
                : (AppState.language === 'KA' ? 'განხილვის პროცესში' : 'Pending Review');
            
            const statusBadgeClass = hasReview ? 'status-reviewed' : 'status-pending';

            return `
                <div class="submission-card" data-index="${index}">
                    <div class="submission-card-status-row">
                        <span class="status-badge ${statusBadgeClass}">${statusBadgeText}</span>
                        <button class="delete-sub-btn" data-index="${index}" title="${AppState.language === 'KA' ? 'წაშლა' : 'Delete Request'}">&times;</button>
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
                        <div class="submission-card-field">
                            <strong>${AppState.language === 'KA' ? 'კატეგორია' : 'Category'}:</strong>
                            <span style="text-transform: capitalize; color: var(--electric-green); font-weight: 700;">${interest}</span>
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
                        
                        <!-- Review Component inside Service request card -->
                        <div class="submission-review-section">
                            ${hasReview ? `
                                <div class="completed-review-box">
                                    <div class="stars-display">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                                    <p class="review-comment">"${review.comment}"</p>
                                </div>
                            ` : `
                                <button class="btn btn-review-toggle" data-index="${index}">
                                    ${AppState.language === 'KA' ? 'შეფასება' : 'Leave a Review'}
                                </button>
                                <div class="review-form-wrapper hidden" id="review-form-${index}">
                                    <div class="rating-input-stars">
                                        <span class="star-btn" data-rating="1">★</span>
                                        <span class="star-btn" data-rating="2">★</span>
                                        <span class="star-btn" data-rating="3">★</span>
                                        <span class="star-btn" data-rating="4">★</span>
                                        <span class="star-btn" data-rating="5">★</span>
                                    </div>
                                    <textarea placeholder="${AppState.language === 'KA' ? 'დაწერეთ თქვენი აზრი სერვისზე...' : 'Write your feedback on support...'}" class="review-comment-input"></textarea>
                                    <button class="btn submit-sub-review-btn" data-index="${index}" style="margin-top: 6px;">
                                        ${AppState.language === 'KA' ? 'გაგზავნა' : 'Submit Review'}
                                    </button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach listeners for review forms toggle
        elements.submissionsItemsList.querySelectorAll('.btn-review-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                const form = document.getElementById(`review-form-${idx}`);
                if (form) {
                    form.classList.toggle('hidden');
                }
            });
        });

        // Attach listeners for star rating selections
        elements.submissionsItemsList.querySelectorAll('.review-form-wrapper').forEach(wrapper => {
            let selectedRating = 5; // Default rating
            const stars = wrapper.querySelectorAll('.star-btn');
            
            // Set initial all gold
            stars.forEach((s, idx) => {
                s.style.color = '#fbbf24';
            });
            
            stars.forEach(star => {
                star.addEventListener('click', (e) => {
                    selectedRating = parseInt(e.target.getAttribute('data-rating'));
                    stars.forEach((s, idx) => {
                        if (idx < selectedRating) {
                            s.style.color = '#fbbf24';
                        } else {
                            s.style.color = '#64748b';
                        }
                    });
                    wrapper.setAttribute('data-selected-rating', selectedRating);
                });
            });
            
            wrapper.setAttribute('data-selected-rating', selectedRating);
        });

        // Attach submit review listeners
        elements.submissionsItemsList.querySelectorAll('.submit-sub-review-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                const wrapper = document.getElementById(`review-form-${idx}`);
                const rating = parseInt(wrapper.getAttribute('data-selected-rating')) || 5;
                const comment = wrapper.querySelector('.review-comment-input').value.trim();
                
                if (comment.length < 5) {
                    showToast(AppState.language === 'KA' ? 'გთხოვთ შეიყვანოთ უფრო გრძელი კომენტარი (მინ. 5 სიმბოლო)' : 'Please enter a longer comment (min 5 chars)', 'error');
                    return;
                }

                // Update AppState
                AppState.submissions[idx].review = { rating, comment };
                localStorage.setItem('techstore_registrations', JSON.stringify(AppState.submissions));
                
                showToast(AppState.language === 'KA' ? 'შეფასება დამატებულია!' : 'Review submitted successfully!', 'success');
                renderSubmissions();
            });
        });

        // Attach delete submission listeners
        elements.submissionsItemsList.querySelectorAll('.delete-sub-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                AppState.submissions.splice(idx, 1);
                localStorage.setItem('techstore_registrations', JSON.stringify(AppState.submissions));
                showToast(AppState.language === 'KA' ? 'ჩანაწერი წაშლილია' : 'Record removed successfully', 'success');
                renderSubmissions();
            });
        });
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

    const toggleRecentDrawer = (isOpen) => {
        if (!elements.recentDrawer) return;
        elements.recentDrawer.setAttribute('aria-hidden', !isOpen);
        if (isOpen) {
            elements.recentDrawer.classList.add('drawer-open');
            document.body.style.overflow = 'hidden';
            updateRecentlyViewed();
        } else {
            elements.recentDrawer.classList.remove('drawer-open');
            document.body.style.overflow = '';
        }
    };

    const updateRecentlyViewed = () => {
        if (elements.recentBadgeCount) {
            elements.recentBadgeCount.textContent = AppState.recentlyViewed.length;
        }

        if (!elements.recentItemsList) return;

        if (AppState.recentlyViewed.length === 0) {
            elements.recentItemsList.innerHTML = `
                <div class="cart-empty-message" style="text-align: center; padding: 24px;">
                    <div class="cart-empty-icon" style="font-size: 2.5rem; margin-bottom: 12px;">⏳</div>
                    <h3 style="color: #ffffff; margin-bottom: 6px;">No recently viewed items</h3>
                    <p style="color: var(--muted); font-size: 0.85rem;">Products you click to view will show up here.</p>
                </div>
            `;
            return;
        }

        const dict = translations[AppState.language];

        elements.recentItemsList.innerHTML = AppState.recentlyViewed.map(id => {
            const product = AppState.products.find(p => p.id === id);
            if (!product) return '';
            
            const availableStock = getAvailableStock(product);
            const isOutOfStock = availableStock <= 0;
            const stockContext = isOutOfStock 
                ? `<span style="color: #ef4444; font-size: 0.72rem; font-weight: 700; background: rgba(239, 68, 68, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(239, 68, 68, 0.2);">${dict.outOfStock}</span>` 
                : `<span style="color: var(--electric-green); font-size: 0.72rem; font-weight: 700; background: rgba(57, 255, 20, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(57, 255, 20, 0.2);">In Stock (${availableStock} left)</span>`;

            return `
                <div class="cart-item" style="display: flex; gap: 12px; background: rgba(33, 1, 36, 0.4); border: 1px solid rgba(138, 255, 193, 0.15); padding: 12px; border-radius: 8px; align-items: center; justify-content: space-between;">
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 6px; background: rgba(255,255,255,0.05); padding: 2px; border: 1px solid rgba(255,255,255,0.1);">
                        <div>
                            <h4 style="margin: 0 0 4px 0; font-size: 0.85rem; color: #ffffff; font-weight: 700; line-height: 1.2;">${product.title}</h4>
                            <p style="margin: 0 0 4px 0; font-size: 0.7rem; color: var(--muted); font-weight: 500;">Category: ${product.category}</p>
                            ${stockContext}
                        </div>
                    </div>
                    <div style="text-align: right; display: flex; flex-direction: column; gap: 6px; align-items: flex-end;">
                        <span style="color: var(--mint); font-weight: 800; font-size: 0.9rem;">${formatPrice(product.price)}</span>
                        <button class="btn recent-view-btn" data-id="${product.id}" style="padding: 4px 8px; font-size: 0.7rem; min-height: unset; border-radius: 4px; background: linear-gradient(135deg, var(--violet) 0%, var(--pink) 100%); border: none; color: white; cursor: pointer; font-weight: 700;">View</button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach event listeners to view buttons
        elements.recentItemsList.querySelectorAll('.recent-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                toggleRecentDrawer(false);
                openProductModal(id);
            });
        });
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

    // Compare Feature helper functions
    const updateCompareFAB = () => {
        if (!elements.compareFab || !elements.compareCount) return;
        elements.compareCount.textContent = AppState.compareList.length;
        if (AppState.compareList.length > 0) {
            elements.compareFab.classList.remove('hidden');
        } else {
            elements.compareFab.classList.add('hidden');
        }
    };

    const openCompareModal = () => {
        if (!elements.compareModal) return;
        renderCompareTable();
        elements.compareModal.classList.add('modal-open');
        elements.compareModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeCompareModal = () => {
        if (!elements.compareModal) return;
        elements.compareModal.classList.remove('modal-open');
        elements.compareModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const renderCompareTable = () => {
        if (!elements.compareModalBody) return;
        const productsToCompare = AppState.compareList.map(id => AppState.products.find(p => p.id === id)).filter(Boolean);

        if (productsToCompare.length === 0) {
            elements.compareModalBody.innerHTML = `<p style="text-align: center; color: var(--muted); font-size: 1.1rem; padding: 24px;">No products selected for comparison.</p>`;
            return;
        }

        const dict = translations[AppState.language];

        let tableHtml = `<div class="table-wrapper compare-table-wrapper" style="overflow-x: auto; background: rgba(20, 1, 30, 0.95); border: 1px solid rgba(57, 255, 20, 0.4); border-radius: 12px; padding: 12px;"><table class="product-table compare-table" style="width: 100%; min-width: 600px; border-collapse: collapse;">`;

        // Row 1: Image & Remove button
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Product</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="text-align: center; padding: 14px; vertical-align: top;">
                <div class="compare-img-cell" style="position: relative; display: inline-block;">
                    <img src="${p.image}" alt="${p.title}" style="max-height: 80px; width: auto; object-fit: contain; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); padding: 4px;">
                    <br>
                    <button class="compare-remove-btn" data-id="${p.id}" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #f87171; cursor: pointer; font-size: 0.75rem; font-weight: 700; margin-top: 8px; padding: 4px 8px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='#ef4444'; this.style.color='#ffffff';" onmouseout="this.style.background='rgba(239, 68, 68, 0.2)'; this.style.color='#f87171';">Remove</button>
                </div>
            </td>`;
        });
        tableHtml += `</tr>`;

        // Row 2: Name
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Name</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="color: #ffffff; font-weight: 700; padding: 14px; font-size: 1rem;">${p.title}</td>`;
        });
        tableHtml += `</tr>`;

        // Row 3: Price
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Price</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="color: var(--mint); font-weight: 800; font-size: 1.1rem; padding: 14px;">${formatPrice(p.price)}</td>`;
        });
        tableHtml += `</tr>`;

        // Row 4: Brand
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Brand</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="color: #cbd5e1; padding: 14px;">${p.brand}</td>`;
        });
        tableHtml += `</tr>`;

        // Row 5: Screen Size
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Screen Size</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="color: #ffffff; font-weight: 600; padding: 14px;">${p.screenSize || 'N/A'}</td>`;
        });
        tableHtml += `</tr>`;

        // Row 6: Processor
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Processor</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="color: #ffffff; font-weight: 600; padding: 14px;">${p.processor || 'N/A'}</td>`;
        });
        tableHtml += `</tr>`;

        // Row 7: RAM
        tableHtml += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.1);"><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">RAM</th>`;
        productsToCompare.forEach(p => {
            tableHtml += `<td style="color: #ffffff; font-weight: 600; padding: 14px;">${p.ram || 'N/A'}</td>`;
        });
        tableHtml += `</tr>`;

        // Row 8: Action
        tableHtml += `<tr><th style="background: transparent; color: var(--electric-green); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">Action</th>`;
        productsToCompare.forEach(p => {
            const availableStock = getAvailableStock(p);
            const isOutOfStock = availableStock <= 0;
            tableHtml += `<td style="padding: 14px;">
                <button class="btn compare-add-to-cart" data-id="${p.id}" ${isOutOfStock ? 'disabled' : ''} style="padding: 6px 12px; font-size: 0.85rem; min-height: unset; border-radius: 6px;">
                    ${isOutOfStock ? dict.outOfStock : dict.addToCart}
                </button>
            </td>`;
        });
        tableHtml += `</tr>`;

        tableHtml += `</table></div>`;
        elements.compareModalBody.innerHTML = tableHtml;

        // Attach listeners inside compared table
        elements.compareModalBody.querySelectorAll('.compare-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                AppState.compareList = AppState.compareList.filter(pid => pid !== id);
                updateCompareFAB();
                
                // Uncheck main grid check box
                const cb = document.querySelector(`.compare-checkbox[data-id="${id}"]`);
                if (cb) cb.checked = false;

                if (AppState.compareList.length === 0) {
                    closeCompareModal();
                } else {
                    renderCompareTable();
                }
            });
        });

        elements.compareModalBody.querySelectorAll('.compare-add-to-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                addToCart(id);
                renderCompareTable();
            });
        });
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
                localStorage.setItem('techstore_active_deal', AppState.activeDeal);
                renderCart();
            });
        });

        // Home Page Deal Cards Click Handler
        const dealCards = document.querySelectorAll('.deal-card');
        dealCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const dealType = card.getAttribute('data-deal');
                if (dealType) {
                    AppState.activeDeal = dealType;
                    localStorage.setItem('techstore_active_deal', AppState.activeDeal);
                    renderCart();
                    
                    // Highlight selected radio button in cart
                    const radio = document.querySelector(`input[name="cart-deal"][value="${dealType}"]`);
                    if (radio) radio.checked = true;
                    
                    showToast(
                        AppState.language === 'KA' 
                            ? `აქცია წარმატებით გააქტიურდა!` 
                            : `Deal applied successfully!`,
                        'success'
                    );
                    
                    // Open cart drawer so they can see the deal applied
                    toggleCartDrawer(true);
                }
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

        // Min Price Range Slider listener
        if (elements.minPriceRange) {
            elements.minPriceRange.addEventListener('input', (e) => {
                AppState.minBudget = parseInt(e.target.value);
                if (elements.minPriceVal) {
                    elements.minPriceVal.textContent = formatPrice(AppState.minBudget);
                }
                // Keep min <= max
                if (AppState.minBudget > AppState.maxBudget) {
                    AppState.maxBudget = AppState.minBudget;
                    if (elements.maxPriceRange) {
                        elements.maxPriceRange.value = AppState.maxBudget;
                    }
                    if (elements.maxPriceVal) {
                        elements.maxPriceVal.textContent = formatPrice(AppState.maxBudget);
                    }
                }
                renderCatalog();
            });
        }

        // Max Price Range Slider listener
        if (elements.maxPriceRange) {
            elements.maxPriceRange.addEventListener('input', (e) => {
                AppState.maxBudget = parseInt(e.target.value);
                if (elements.maxPriceVal) {
                    elements.maxPriceVal.textContent = formatPrice(AppState.maxBudget);
                }
                // Keep max >= min
                if (AppState.maxBudget < AppState.minBudget) {
                    AppState.minBudget = AppState.maxBudget;
                    if (elements.minPriceRange) {
                        elements.minPriceRange.value = AppState.minBudget;
                    }
                    if (elements.minPriceVal) {
                        elements.minPriceVal.textContent = formatPrice(AppState.minBudget);
                    }
                }
                renderCatalog();
            });
        }

        // Filters Panel Toggle listener
        if (elements.filterToggleBtn && elements.filterDropdownPanel) {
            elements.filterToggleBtn.addEventListener('click', () => {
                const isOpen = elements.filterDropdownPanel.style.maxHeight !== '0px' && elements.filterDropdownPanel.style.maxHeight !== '';
                if (isOpen) {
                    elements.filterDropdownPanel.style.maxHeight = '0px';
                    elements.filterDropdownPanel.style.opacity = '0';
                    elements.filterDropdownPanel.style.marginTop = '0px';
                } else {
                    elements.filterDropdownPanel.style.maxHeight = '300px';
                    elements.filterDropdownPanel.style.opacity = '1';
                    elements.filterDropdownPanel.style.marginTop = '16px';
                }
            });
        }

        // Recently Viewed toggle listeners
        if (elements.recentToggleBtn) {
            elements.recentToggleBtn.addEventListener('click', () => {
                toggleRecentDrawer(true);
            });
        }
        if (elements.recentCloseBtn) {
            elements.recentCloseBtn.addEventListener('click', () => {
                toggleRecentDrawer(false);
            });
        }
        if (elements.recentOverlay) {
            elements.recentOverlay.addEventListener('click', () => {
                toggleRecentDrawer(false);
            });
        }

        // Compare FAB click listener
        if (elements.compareFab) {
            elements.compareFab.addEventListener('click', () => {
                openCompareModal();
            });
        }

        // Compare Close listeners
        if (elements.compareCloseBtn) {
            elements.compareCloseBtn.addEventListener('click', () => {
                closeCompareModal();
            });
        }
        if (elements.compareModalOverlay) {
            elements.compareModalOverlay.addEventListener('click', () => {
                closeCompareModal();
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
                    localStorage.setItem('techstore_active_deal', 'none');
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
        AppState.activeDeal = localStorage.getItem('techstore_active_deal') || 'none';
        
        await Promise.all([
            fetchProducts(),
            fetchExchangeRates()
        ]);
        
        translateInterface();
        setupEventListeners();
        fetchReviews();
        renderSubmissions();
        
        logAppEvent('Init', 'App ready.');
    };

    initApp();
});
