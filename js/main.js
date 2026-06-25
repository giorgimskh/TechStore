/**
 * TechStore - Core Interactive Frontend Controller
 * Built with  JavaScript, using Fetch API for dynamic data,
 * localStorage for state persistence, and responsive interactive components.
 */

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        products: [],
        cart: JSON.parse(localStorage.getItem('techstore_cart')) || [],
        payments: JSON.parse(localStorage.getItem('techstore_payments')) || [],
        submissions: JSON.parse(localStorage.getItem('techstore_registrations')) || [],
        language: localStorage.getItem('techstore_language') || 'EN',
        activeDeal: localStorage.getItem('techstore_active_deal') || 'none',
        activeCategory: 'all',
        searchQuery: '',
        minBudget: 0,
        maxBudget: 2000,
        compareList: [],
        recentlyViewed: JSON.parse(localStorage.getItem('techstore_recent')) || [],
        showAll: false,
        currentUser: localStorage.getItem('techstore_user') || null
    };

    //Translations
    const translations = {
        EN: {
            navHome: "Home",
            navProducts: "Products",
            navDeals: "Deals",
            navContact: "Contact",
            navSupport: "Support",
            addressLabel: "Delivery Address",
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
            authLogInBtn: "Log In",
            authRegisterBtn: "Register",
            usernameLabel: "Username",
            passwordLabel: "Password",
            emailLabel: "Email Address",
            signinToggleText: "Don't have an account?",
            registerToggleText: "Already have an account?",
            authSignInTitle: "Sign In",
            authRegisterTitle: "Register",
            signinUsernamePlaceholder: "Enter username",
            signinPasswordPlaceholder: "Enter password",
            registerUsernamePlaceholder: "Choose username",
            registerEmailPlaceholder: "Enter email",
            registerPasswordPlaceholder: "Create password",
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
            inventorySold: "Units Sold",

            heroEyebrow: "Modern devices. Smart prices.",
            heroTitle: "Upgrade Your Tech Life",
            heroDesc: "Discover laptops, smartphones, accessories, and smart devices in one modern online store.",
            heroBtn: "Explore Products",
            statPickup: "Fast pickup",
            statRating: "Customer rating",
            statDevices: "Devices",

            dealsEyebrow: "Student deals",
            dealsTitle: "Bundles Built for Everyday Work",
            dealsDesc: "Save on reliable tech combinations for learning, remote work, content creation, and gaming.",
            dealCardTitle1: "Study Starter",
            dealCardDesc1: "Laptop, wireless mouse, and protective backpack for classes and projects.",
            dealCardSave1: "Save 12%",
            dealCardTitle2: "Creator Kit",
            dealCardDesc2: "Fast laptop, headphones, and accessories for editing, streaming, and design work.",
            dealCardSave2: "Save 15%",
            dealCardTitle3: "Mobile Pro",
            dealCardDesc3: "Smartphone, smartwatch, case, and charger for a complete connected setup.",
            dealCardSave3: "Save 10%",

            mediaEyebrow: "How to Order",
            mediaTitle: "How to Order Your Tech in 3 Simple Steps",
            mediaDesc: "Watch our guide to see how easy it is to find devices, add them to your cart, apply active bundles, and complete your purchase securely.",

            reviewsEyebrow: "Customer reviews",
            reviewsTitle: "What Tech Lovers Say",
            reviewsDesc: "Real-time reviews fetched from our global database of creators, students, and professionals.",
            reviewName1: "Alex Johnson",
            reviewRole1: "Software Engineer",
            reviewText1: "The Lenovo Legion Pro laptop is incredibly fast. Very impressed with the quick checkout process and customer support!",
            reviewName2: "Sarah Miller",
            reviewRole2: "Creative Lead",
            reviewText2: "My new iPhone 15 Pro arrived within 2 days. The support team is very responsive. Will definitely purchase again.",
            reviewName3: "David Kim",
            reviewRole3: "IT Student",
            reviewText3: "Excellent noise cancellation on the Sony WH-1000XM5 headphones. The profile currency switcher makes ordering seamless.",

            supportTitle: "Support & Inquiries",
            supportFirstName: "First Name",
            supportLastName: "Last Name",
            supportEmail: "Email Address",
            supportInterest: "Product Interest",
            supportChoose: "Choose a category",
            supportGoal: "Shopping Goal",
            supportStudy: "Study",
            supportWork: "Work",
            supportGaming: "Gaming",
            supportExtras: "Extras",
            supportDelivery: "Delivery support",
            supportSetup: "Setup assistance",
            supportMsg: "Motivation Letter or Special Requests",
            supportSubmit: "Submit Request",

            footerAboutDesc: "Smart gear, sharp deals, and fast support for students, creators, and everyday tech lovers.",
            footerSupportTitle: "Support",
            footerHours: "Mon - Sat, 10:00 - 19:00",
            footerCopy: "TechStore 2026: All rights reserved",
            footerTop: "Back to top"
        },
        KA: {
            navHome: "მთავარი",
            navProducts: "პროდუქტები",
            navDeals: "აქციები",
            navContact: "კონტაქტი",
            navSupport: "მხარდაჭერა",
            addressLabel: "მიწოდების მისამართი",
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
            authLogInBtn: "შესვლა",
            authRegisterBtn: "რეგისტრაცია",
            usernameLabel: "მომხმარებლის სახელი",
            passwordLabel: "პაროლი",
            emailLabel: "ელ. ფოსტა",
            signinToggleText: "არ გაქვთ ანგარიში?",
            registerToggleText: "უკვე გაქვთ ანგარიში?",
            authSignInTitle: "შესვლა",
            authRegisterTitle: "რეგისტრაცია",
            signinUsernamePlaceholder: "შეიყვანეთ მომხმარებლის სახელი",
            signinPasswordPlaceholder: "შეიყვანეთ პაროლი",
            registerUsernamePlaceholder: "აირჩიეთ მომხმარებლის სახელი",
            registerEmailPlaceholder: "შეიყვანეთ ელ. ფოსტა",
            registerPasswordPlaceholder: "შექმენით პაროლი",
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
            inventorySold: "გაყიდული რაოდენობა",

            heroEyebrow: "თანამედროვე მოწყობილობები. გონივრული ფასები.",
            heroTitle: "განაახლე შენი ციფრული ცხოვრება",
            heroDesc: "აღმოაჩინე ლეპტოპები, სმარტფონები, აქსესუარები და ჭკვიანი მოწყობილობები ერთ სივრცეში.",
            heroBtn: "კატალოგის ნახვა",
            statPickup: "სწრაფი გატანა",
            statRating: "მომხმარებელთა შეფასება",
            statDevices: "მოწყობილობა",

            dealsEyebrow: "სტუდენტური ფასდაკლებები",
            dealsTitle: "აქციები ყოველდღიური მუშაობისთვის",
            dealsDesc: "დაზოგე თანხა საიმედო ნაკრებებზე სწავლისთვის, დისტანციური მუშაობისთვის, შემოქმედებისა და გეიმინგისთვის.",
            dealCardTitle1: "Study Starter",
            dealCardDesc1: "ლეპტოპი, უსადენო მაუსი და დამცავი ზურგჩანთა გაკვეთილებისა და პროექტებისთვის.",
            dealCardSave1: "დაზოგე 12%",
            dealCardTitle2: "Creator Kit",
            dealCardDesc2: "საწრაფი ლეპტოპი, ყურსასმენები და აქსესუარები მონტაჟისთვის, სტრიმინგისთვის და დიზაინისთვის.",
            dealCardSave2: "დაზოგე 15%",
            dealCardTitle3: "Mobile Pro",
            dealCardDesc3: "სმარტფონი, ჭკვიანი საათი, ქეისი და დამტენი სრული დაკავშირებულობისთვის.",
            dealCardSave3: "დაზოგე 10%",

            mediaEyebrow: "როგორ შეუკვეთოთ",
            mediaTitle: "როგორ შეუკვეთოთ ტექნიკა 3 მარტივ ნაბიჯში",
            mediaDesc: "უყურეთ ჩვენს გზამკვლევს, რათა ნახოთ რამდენად მარტივია სასურველი მოწყობილობის პოვნა, კალათაში დამატება, ფასდაკლების აქტივაცია და უსაფრთხო ყიდვა.",

            reviewsEyebrow: "მომხმარებელთა შეფასებები",
            reviewsTitle: "რას ამბობენ ტექნოლოგიების მოყვარულები",
            reviewsDesc: "რეალური შეფასებები ჩვენი გლობალური ბაზიდან: დეველოპერები, სტუდენტები და პროფესიონალები.",
            reviewName1: "ალექს ჯონსონი",
            reviewRole1: "პროგრამული ინჟინერი",
            reviewText1: "Lenovo Legion Pro ლეპტოპი საოცრად სწრაფია. ძალიან კმაყოფილი ვარ სწრაფი გადახდის პროცესით და მომხმარებელთა მხარდაჭერით!",
            reviewName2: "სარა მილერი",
            reviewRole2: "კრეატიული ლიდერი",
            reviewText2: "ჩემი ახალი iPhone 15 Pro 2 დღეში ჩამოვიდა. მხარდაჭერის გუნდი ძალიან სწრაფად რეაგირებს. აუცილებლად შევიძენ კიდევ.",
            reviewName3: "დავით კიმი",
            reviewRole3: "IT სტუდენტი",
            reviewText3: "Sony WH-1000XM5 ყურსასმენებს აქვს ხმაურის საუკეთესო იზოლაცია. ვალუტის გადამრთველი ყიდვის პროცესს ბევრად ამარტივებს.",

            supportTitle: "მხარდაჭერა და კითხვები",
            supportFirstName: "სახელი",
            supportLastName: "გვარი",
            supportEmail: "ელ. ფოსტის მისამართი",
            supportInterest: "პროდუქტის კატეგორია",
            supportChoose: "აირჩიეთ კატეგორია",
            supportGoal: "ყიდვის მიზანი",
            supportStudy: "სწავლა",
            supportWork: "მუშაობა",
            supportGaming: "გეიმინგი",
            supportExtras: "დამატებითი სერვისები",
            supportDelivery: "მიწოდების მხარდაჭერა",
            supportSetup: "ინსტალაციაში დახმარება",
            supportMsg: "მოტივაციის წერილი ან სპეციალური მოთხოვნები",
            supportSubmit: "მოთხოვნის გაგზავნა",

            footerAboutDesc: "ჭკვიანი ტექნიკა, საუკეთესო შეთავაზებები და სწრაფი მხარდაჭერა სტუდენტებისთვის, დეველოპერებისა და ყველასთვის.",
            footerSupportTitle: "მხარდაჭერა",
            footerHours: "ორშ - შაბ, 10:00 - 19:00",
            footerCopy: "TechStore 2026: ყველა უფლება დაცულია",
            footerTop: "მთავარ გვერდზე დაბრუნება"
        }
    };

    const showToast = (message, type = 'success') => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('active'), 50);

        const close = () => {
            toast.classList.remove('active');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        };

        toast.querySelector('.toast-close').addEventListener('click', close);
        setTimeout(close, 4000);
    };

    const formatPrice = (priceUSD) => {
        return `$${Number(priceUSD).toFixed(2)}`;
    };

    const getAvailableStock = (product) => {
        const cartItem = state.cart.find(item => item.product.id === product.id);
        const cartQty = cartItem ? cartItem.quantity : 0;
        return Math.max(0, product.stock - cartQty);
    };

    // -------------------------------------------------------------------------
    // 4. DATA FETCHING (PRODUCTS, CURRENCY, REVIEWS)
    // -------------------------------------------------------------------------
    const fetchProducts = async () => {
        try {
            // Fetch directly from Fake Store API (electronics category)
            const res = await fetch('https://fakestoreapi.com/products/category/electronics');
            if (!res.ok) throw new Error('Fake Store API network response was not ok');
            const data = await res.json();

            // Map the API data to match our application's expected tech product schema
            const mappedProducts = data.map(p => {
                const titleLower = p.title.toLowerCase();
                let category = 'accessories';
                let brand = 'Generic';

                // Categorize items based on keywords in title
                if (titleLower.includes('laptop') || titleLower.includes('book') || titleLower.includes('acer') || titleLower.includes('asus')) {
                    category = 'laptops';
                    brand = titleLower.includes('acer') ? 'Acer' : (titleLower.includes('asus') ? 'Asus' : 'Generic Laptop');
                } else if (titleLower.includes('phone') || titleLower.includes('mobile') || titleLower.includes('samsung') || titleLower.includes('iphone')) {
                    category = 'smartphones';
                    brand = titleLower.includes('samsung') ? 'Samsung' : (titleLower.includes('iphone') ? 'Apple' : 'Generic Mobile');
                } else if (titleLower.includes('watch') || titleLower.includes('fitbit')) {
                    category = 'wearables';
                    brand = titleLower.includes('fitbit') ? 'Fitbit' : 'Apple';
                } else if (titleLower.includes('drive') || titleLower.includes('ssd') || titleLower.includes('sandisk') || titleLower.includes('wd')) {
                    category = 'accessories';
                    brand = titleLower.includes('sandisk') ? 'SanDisk' : 'WD';
                }

                return {
                    id: String(p.id),
                    title: p.title,
                    description: p.description,
                    price: p.price,
                    image: p.image,
                    images: [p.image, p.image, p.image], // Product detail gallery images
                    category: category,
                    brand: brand,
                    stock: 12,
                    soldCount: p.rating ? Math.round(p.rating.count / 10) : 5,
                    badge: (p.rating && p.rating.rate > 4.0) ? 'Best Seller' : 'New',
                    screenSize: 'N/A',
                    processor: 'N/A',
                    ram: 'N/A'
                };
            });

            // Merge dynamic stock counts and sold counts from local storage overrides
            const savedStocks = JSON.parse(localStorage.getItem('techstore_product_stocks')) || {};
            const savedSoldCount = JSON.parse(localStorage.getItem('techstore_product_sold')) || {};

            state.products = mappedProducts.map(p => ({
                ...p,
                stock: savedStocks[p.id] !== undefined ? savedStocks[p.id] : p.stock,
                soldCount: savedSoldCount[p.id] !== undefined ? savedSoldCount[p.id] : p.soldCount
            }));

        } catch (err) {
            console.error('Error fetching from Fake Store API:', err);
            showToast('Unable to fetch product catalog from API.', 'error');
        }
    };



    const fetchReviews = async () => {
        const reviewsGrid = document.getElementById('reviews-grid');
        if (!reviewsGrid) return;

        const dict = translations[state.language];
        const fallbackReviews = [
            { name: dict.reviewName1, role: dict.reviewRole1, text: dict.reviewText1, rating: 5, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80' },
            { name: dict.reviewName2, role: dict.reviewRole2, text: dict.reviewText2, rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' },
            { name: dict.reviewName3, role: dict.reviewRole3, text: dict.reviewText3, rating: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' }
        ];

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
            if (res.ok) {
                const comments = await res.json();
                reviewsGrid.innerHTML = comments.map((c, i) => {
                    const fallback = fallbackReviews[i] || {};
                    const name = fallback.name || c.name.split(' ')[0];
                    const role = fallback.role || 'Verified Buyer';
                    const text = fallback.text || c.body;
                    const rating = fallback.rating || 5;
                    const avatar = fallback.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';
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
        } catch (err) {
            console.warn('Reviews API failed, using fallback ratings:', err);
        }

        reviewsGrid.innerHTML = fallbackReviews.map(r => {
            const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
            return `
                <div class="review-card">
                    <div class="review-header">
                        <img src="${r.avatar}" alt="${r.name}" class="review-avatar" loading="lazy">
                        <div class="review-user-info">
                           <h3 class="review-user-name">${r.name}</h3>
                           <p class="review-user-role">${r.role}</p>
                        </div>
                    </div>
                    <div class="review-rating" aria-label="${r.rating} stars">${stars}</div>
                    <p class="review-text">"${r.text}"</p>
                </div>
            `;
        }).join('');
    };

    // -------------------------------------------------------------------------
    // 5. INTERACTIVE DRAWERS & MODALS TOOGLE
    // -------------------------------------------------------------------------
    const toggleDrawer = (drawerId, open) => {
        const drawer = document.getElementById(drawerId);
        if (!drawer) return;
        const openClass = drawerId === 'recent-drawer' ? 'drawer-open' : 'modal-open';

        if (open) {
            drawer.classList.add(openClass);
            drawer.setAttribute('aria-hidden', 'false');
        } else {
            drawer.classList.remove(openClass);
            drawer.setAttribute('aria-hidden', 'true');
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('modal-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    const openProductModal = (id) => {
        state.activeModalProductId = id;
        addToRecentlyViewed(id);
        renderModalContent(id);

        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.add('modal-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    };

    const renderModalContent = (productId) => {
        const content = document.getElementById('modal-body-content');
        if (!content) return;

        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const dict = translations[state.language];
        const { title, brand, description, price, image, soldCount } = product;
        const availableStock = getAvailableStock(product);
        const isOutOfStock = availableStock <= 0;
        const productImages = product.images || [image];

        // Dynamic price history chart calculations (deterministic per product ID)
        const sumChars = (str) => [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const seed = sumChars(productId || "");

        // Days trend (90, 60, 30, 15, Today)
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
        const mapY = (val) => 90 - ((val - minP) / (maxP - minP || 1)) * 70;

        const y90 = mapY(p90);
        const y60 = mapY(p60);
        const y30 = mapY(p30);
        const y15 = mapY(p15);
        const yToday = mapY(pToday);

        // Months trend (5 months ago, 4 months ago, 3 months ago, 2 months ago, 1 month ago, Current)
        const monthNames = state.language === 'KA'
            ? ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"]
            : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const d = new Date();
        const mLabel5 = monthNames[d.getMonth()];
        d.setMonth(d.getMonth() - 1);
        const mLabel4 = monthNames[d.getMonth()];
        d.setMonth(d.getMonth() - 1);
        const mLabel3 = monthNames[d.getMonth()];
        d.setMonth(d.getMonth() - 1);
        const mLabel2 = monthNames[d.getMonth()];
        d.setMonth(d.getMonth() - 1);
        const mLabel1 = monthNames[d.getMonth()];
        d.setMonth(d.getMonth() - 1);
        const mLabel0 = monthNames[d.getMonth()];

        // 6 months of prices
        const pm0 = Math.round(price * (1.12 + ((seed % 9) / 100)));
        const pm1 = Math.round(price * (1.08 + (((seed + 2) % 9) / 100)));
        const pm2 = Math.round(price * (1.15 + (((seed + 4) % 9) / 100)));
        const pm3 = Math.round(price * (1.03 + (((seed + 6) % 9) / 100)));
        const pm4 = Math.round(price * (1.06 + (((seed + 1) % 9) / 100)));
        const pm5 = price;

        const mPricesArr = [pm0, pm1, pm2, pm3, pm4, pm5];
        const maxMP = Math.max(...mPricesArr);
        const minMP = Math.min(...mPricesArr);
        const mapMY = (val) => 90 - ((val - minMP) / (maxMP - minMP || 1)) * 70;

        const ym0 = mapMY(pm0);
        const ym1 = mapMY(pm1);
        const ym2 = mapMY(pm2);
        const ym3 = mapMY(pm3);
        const ym4 = mapMY(pm4);
        const ym5 = mapMY(pm5);

        content.innerHTML = `
            <div class="product-detail-modal-layout">
                <!-- Left Column: Gallery & Details -->
                <div>
                    <div id="zoom-container" style="position: relative; overflow: hidden; border-radius: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); cursor: zoom-in; display: flex; align-items: center; justify-content: center; height: 320px;">
                        <img id="main-product-detail-img" src="${image}" alt="${title}" style="max-height: 100%; max-width: 100%; object-fit: contain; transition: transform 0.1s ease;">
                    </div>

                    
                    <!-- Product Info directly below Gallery -->
                    <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;">
                        <h4 style="color: var(--electric-green); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; margin: 0 0 8px 0;">Description</h4>
                        <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.5; margin: 0 0 16px 0;">${description}</p>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #94a3b8;">
                            <span>${state.language === 'KA' ? 'მარაგშია' : 'Stock level'}: <strong style="color: #fff;">${availableStock}</strong></span>
                            <span>${state.language === 'KA' ? 'გაყიდულია' : 'Sold'}: <strong style="color: #fff;">${soldCount}</strong></span>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Specs, Purchase & Analytics -->
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0 0 6px 0;">${title}</h2>
                        <p style="color: var(--electric-green); font-weight: 700; margin: 0 0 16px 0;">${brand}</p>
                        
                        <!-- Specs -->
                        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                            ${product.screenSize && product.screenSize !== 'N/A' ? `<div style="display:flex; justify-content:space-between; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;"><span style="color:#64748b;">Screen Size</span><span style="color:#fff; font-weight:600;">${product.screenSize}</span></div>` : ''}
                            ${product.processor && product.processor !== 'N/A' ? `<div style="display:flex; justify-content:space-between; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;"><span style="color:#64748b;">Processor</span><span style="color:#fff; font-weight:600;">${product.processor}</span></div>` : ''}
                            ${product.ram && product.ram !== 'N/A' ? `<div style="display:flex; justify-content:space-between; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 4px;"><span style="color:#64748b;">RAM</span><span style="color:#fff; font-weight:600;">${product.ram}</span></div>` : ''}
                        </div>
                    </div>

                    <!-- Financial Stock Style Price Chart -->
                    <div class="price-history-chart-card" style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div>
                                <h4 style="margin: 0; font-size: 0.8rem; color: #64748b; text-transform: uppercase;">Price Analysis</h4>
                                <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                                    <span id="legend-price" style="font-size: 1.15rem; font-weight: 800; color: #fff;">${formatPrice(price)}</span>
                                    <span id="legend-change" style="font-size: 0.8rem; font-weight: 700; color: var(--electric-green);">0.00%</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 4px;">
                                <button id="btn-chart-days" style="padding: 4px 8px; font-size: 0.7rem; border-radius: 4px; border: none; background: var(--electric-green); color: #000; font-weight: 700; cursor: pointer;">90D</button>
                                <button id="btn-chart-months" style="padding: 4px 8px; font-size: 0.7rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #cbd5e1; font-weight: 700; cursor: pointer;">6M</button>
                            </div>
                        </div>

                        <!-- 90 Days Chart (Stock style) -->
                        <div id="chart-container-days" style="display: block;">
                            <svg viewBox="0 0 320 120" style="width: 100%; height: 110px; overflow: visible;">
                                <defs>
                                    <linearGradient id="chart-glow-days-${productId}" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="var(--electric-green)" stop-opacity="0.25"/>
                                        <stop offset="100%" stop-color="var(--electric-green)" stop-opacity="0"/>
                                    </linearGradient>
                                </defs>
                                <line x1="40" y1="20" x2="290" y2="20" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="2,2" />
                                <text x="35" y="23" fill="#64748b" font-size="7" font-weight="700" text-anchor="end">${formatPrice(maxP)}</text>
                                <line x1="40" y1="55" x2="290" y2="55" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="2,2" />
                                <text x="35" y="58" fill="#64748b" font-size="7" font-weight="700" text-anchor="end">${formatPrice(Math.round((maxP + minP) / 2))}</text>
                                <line x1="40" y1="90" x2="290" y2="90" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="2,2" />
                                <text x="35" y="93" fill="#64748b" font-size="7" font-weight="700" text-anchor="end">${formatPrice(minP)}</text>
                                <line x1="40" y1="100" x2="290" y2="100" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
                                <path d="M 40 ${y90} L 102.5 ${y60} L 165 ${y30} L 227.5 ${y15} L 290 ${yToday} L 290 100 L 40 100 Z" fill="url(#chart-glow-days-${productId})"></path>
                                <path d="M 40 ${y90} L 102.5 ${y60} L 165 ${y30} L 227.5 ${y15} L 290 ${yToday}" fill="none" stroke="var(--electric-green)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <line id="crosshair-x-days" x1="0" y1="10" x2="0" y2="100" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" stroke-dasharray="3,3" style="display: none;" />
                                <line id="crosshair-y-days" x1="40" y1="0" x2="290" y2="0" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" stroke-dasharray="3,3" style="display: none;" />
                                <circle id="tracking-dot-days" cx="290" cy="${yToday}" r="5" fill="var(--electric-green)" stroke="#ffffff" stroke-width="1.5" />
                                <rect x="40" y="10" width="250" height="90" fill="transparent" style="cursor: crosshair; pointer-events: all;" class="chart-overlay-rect" data-type="days" />
                            </svg>
                            <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: #64748b; margin-top: 6px; font-weight: 700; padding-left: 40px;">
                                <span>-90d</span>
                                <span>-60d</span>
                                <span>-30d</span>
                                <span>-15d</span>
                                <span>Today</span>
                            </div>
                        </div>

                        <!-- 6 Months Chart -->
                        <div id="chart-container-months" style="display: none;">
                            <svg viewBox="0 0 320 120" style="width: 100%; height: 110px; overflow: visible;">
                                <defs>
                                    <linearGradient id="chart-glow-months-${productId}" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="var(--violet)" stop-opacity="0.25"/>
                                        <stop offset="100%" stop-color="var(--violet)" stop-opacity="0"/>
                                    </linearGradient>
                                </defs>
                                <line x1="40" y1="20" x2="290" y2="20" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="2,2" />
                                <text x="35" y="23" fill="#64748b" font-size="7" font-weight="700" text-anchor="end">${formatPrice(maxMP)}</text>
                                <line x1="40" y1="55" x2="290" y2="55" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="2,2" />
                                <text x="35" y="58" fill="#64748b" font-size="7" font-weight="700" text-anchor="end">${formatPrice(Math.round((maxMP + minMP) / 2))}</text>
                                <line x1="40" y1="90" x2="290" y2="90" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="2,2" />
                                <text x="35" y="93" fill="#64748b" font-size="7" font-weight="700" text-anchor="end">${formatPrice(minMP)}</text>
                                <line x1="40" y1="100" x2="290" y2="100" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
                                <path d="M 40 ${ym0} L 90 ${ym1} L 140 ${ym2} L 190 ${ym3} L 240 ${ym4} L 290 ${ym5} L 290 100 L 40 100 Z" fill="url(#chart-glow-months-${productId})"></path>
                                <path d="M 40 ${ym0} L 90 ${ym1} L 140 ${ym2} L 190 ${ym3} L 240 ${ym4} L 290 ${ym5}" fill="none" stroke="var(--violet)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <line id="crosshair-x-months" x1="0" y1="10" x2="0" y2="100" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" stroke-dasharray="3,3" style="display: none;" />
                                <line id="crosshair-y-months" x1="40" y1="0" x2="290" y2="0" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" stroke-dasharray="3,3" style="display: none;" />
                                <circle id="tracking-dot-months" cx="290" cy="${ym5}" r="5" fill="var(--violet)" stroke="#ffffff" stroke-width="1.5" />
                                <rect x="40" y="10" width="250" height="90" fill="transparent" style="cursor: crosshair; pointer-events: all;" class="chart-overlay-rect" data-type="months" />
                            </svg>
                            <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: #64748b; margin-top: 6px; font-weight: 700; padding-left: 40px;">
                                <span>${mLabel0}</span>
                                <span>${mLabel1}</span>
                                <span>${mLabel2}</span>
                                <span>${mLabel3}</span>
                                <span>${mLabel4}</span>
                                <span>${mLabel5}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Price & Cart Button -->
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
                        <span style="font-size: 1.6rem; font-weight: 800; color: #fff;">${formatPrice(price)}</span>
                        <button id="modal-add-to-cart-btn" class="btn" style="background: #DAA520; color: #000; font-weight: 800; padding: 12px 24px; border-radius: 8px; cursor: pointer; transition: all 0.2s;" ${isOutOfStock ? 'disabled' : ''}>
                            ${isOutOfStock ? (state.language === 'KA' ? 'ამოიყიდა' : 'Out of Stock') : (state.language === 'KA' ? 'კალათაში დამატება' : 'Add to Cart')}
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Event listener for modal Add to Cart button
        document.getElementById('modal-add-to-cart-btn')?.addEventListener('click', () => {
            addToCart(productId);
            // Refresh modal content to update stock level visual
            renderModalContent(productId);
        });



        // Hover to Zoom logic
        const zoomContainer = document.getElementById('zoom-container');
        const mainImg = document.getElementById('main-product-detail-img');
        if (zoomContainer && mainImg) {
            zoomContainer.addEventListener('mousemove', (e) => {
                const rect = zoomContainer.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                mainImg.style.transformOrigin = `${x}% ${y}%`;
                mainImg.style.transform = 'scale(2)';
            });
            zoomContainer.addEventListener('mouseleave', () => {
                mainImg.style.transform = 'scale(1)';
                mainImg.style.transformOrigin = 'center center';
            });
        }

        const legendPrice = document.getElementById('legend-price');
        const legendChange = document.getElementById('legend-change');

        const resetLegend = (isDaysView) => {
            if (legendPrice) legendPrice.textContent = formatPrice(price);
            if (legendChange) {
                const firstP = isDaysView ? p90 : pm0;
                const pct = ((price - firstP) / firstP) * 100;
                legendChange.textContent = `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
                legendChange.style.color = pct >= 0 ? 'var(--electric-green)' : '#f87171';
            }
        };

        // Chart toggle event listeners
        const btnDays = document.getElementById('btn-chart-days');
        const btnMonths = document.getElementById('btn-chart-months');
        const containerDays = document.getElementById('chart-container-days');
        const containerMonths = document.getElementById('chart-container-months');

        if (btnDays && btnMonths && containerDays && containerMonths) {
            btnDays.addEventListener('click', () => {
                containerDays.style.display = 'block';
                containerMonths.style.display = 'none';
                btnDays.style.background = 'var(--electric-green)';
                btnDays.style.color = '#000';
                btnDays.style.border = 'none';
                btnMonths.style.background = 'transparent';
                btnMonths.style.color = '#cbd5e1';
                btnMonths.style.border = '1px solid rgba(255,255,255,0.1)';
                resetLegend(true);
            });
            btnMonths.addEventListener('click', () => {
                containerDays.style.display = 'none';
                containerMonths.style.display = 'block';
                btnMonths.style.background = 'var(--electric-green)';
                btnMonths.style.color = '#000';
                btnMonths.style.border = 'none';
                btnDays.style.background = 'transparent';
                btnDays.style.color = '#cbd5e1';
                btnDays.style.border = '1px solid rgba(255,255,255,0.1)';
                resetLegend(false);
            });
        }

        // Setup hover tracking for both SVGs
        const setupChartHover = (container, isDays) => {
            if (!container) return;
            const svg = container.querySelector('svg');
            if (!svg) return;

            const pts = isDays ? [
                { x: 40, y: y90, price: p90, label: '-90d' },
                { x: 102.5, y: y60, price: p60, label: '-60d' },
                { x: 165, y: y30, price: p30, label: '-30d' },
                { x: 227.5, y: y15, price: p15, label: '-15d' },
                { x: 290, y: yToday, price: pToday, label: 'Today' }
            ] : [
                { x: 40, y: ym0, price: pm0, label: mLabel0 },
                { x: 90, y: ym1, price: pm1, label: mLabel1 },
                { x: 140, y: ym2, price: pm2, label: mLabel2 },
                { x: 190, y: ym3, price: pm3, label: mLabel3 },
                { x: 240, y: ym4, price: pm4, label: mLabel4 },
                { x: 290, y: ym5, price: pm5, label: mLabel5 }
            ];

            const firstPrice = pts[0].price;
            const crosshairX = container.querySelector(isDays ? '#crosshair-x-days' : '#crosshair-x-months');
            const crosshairY = container.querySelector(isDays ? '#crosshair-y-days' : '#crosshair-y-months');
            const trackingDot = container.querySelector(isDays ? '#tracking-dot-days' : '#tracking-dot-months');

            svg.addEventListener('mousemove', (e) => {
                const rect = svg.getBoundingClientRect();
                if (!rect.width) return;

                // Normalize coordinate relative to the SVG's 320px width viewbox
                const mouseX = (e.clientX - rect.left) * (320 / rect.width);

                // Find closest data point
                let closest = pts[0];
                let minDiff = Math.abs(mouseX - closest.x);
                for (let i = 1; i < pts.length; i++) {
                    const diff = Math.abs(mouseX - pts[i].x);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closest = pts[i];
                    }
                }

                // If mouse is within active charting area range (approx 30px to 305px)
                if (mouseX >= 30 && mouseX <= 305) {
                    if (crosshairX) {
                        crosshairX.setAttribute('x1', closest.x);
                        crosshairX.setAttribute('x2', closest.x);
                        crosshairX.style.display = 'block';
                    }
                    if (crosshairY) {
                        crosshairY.setAttribute('y1', closest.y);
                        crosshairY.setAttribute('y2', closest.y);
                        crosshairY.style.display = 'block';
                    }
                    if (trackingDot) {
                        trackingDot.setAttribute('cx', closest.x);
                        trackingDot.setAttribute('cy', closest.y);
                    }
                    if (legendPrice) legendPrice.textContent = formatPrice(closest.price);
                    if (legendChange) {
                        const pct = ((closest.price - firstPrice) / firstPrice) * 100;
                        legendChange.textContent = `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
                        legendChange.style.color = pct >= 0 ? 'var(--electric-green)' : '#f87171';
                    }
                } else {
                    if (crosshairX) crosshairX.style.display = 'none';
                    if (crosshairY) crosshairY.style.display = 'none';
                }
            });

            svg.addEventListener('mouseleave', () => {
                if (crosshairX) crosshairX.style.display = 'none';
                if (crosshairY) crosshairY.style.display = 'none';
                if (trackingDot) {
                    const lastPt = pts[pts.length - 1];
                    trackingDot.setAttribute('cx', lastPt.x);
                    trackingDot.setAttribute('cy', lastPt.y);
                }
                resetLegend(isDays);
            });
        };

        setupChartHover(containerDays, true);
        setupChartHover(containerMonths, false);
    };

    // -------------------------------------------------------------------------
    // 6. DOM RENDERERS (CATALOG, CART, PAYMENTS, SUBMISSIONS, COMPARE)
    // -------------------------------------------------------------------------
    const renderCatalog = () => {
        const grid = document.getElementById('product-grid');
        if (!grid) return;

        const filtered = state.products.filter(p => {
            const catMatch = state.activeCategory === 'all' || p.category === state.activeCategory;
            const searchMatch = p.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
            const priceMatch = p.price >= state.minBudget && p.price <= state.maxBudget;
            return catMatch && searchMatch && priceMatch;
        });

        const visible = state.showAll ? filtered : filtered.slice(0, 8);

        const countMsg = document.getElementById('catalog-count-message');
        if (countMsg) {
            countMsg.textContent = state.language === 'KA'
                ? `ნაჩვენებია ${visible.length} / ${filtered.length} პროდუქტიდან`
                : `Showing ${visible.length} of ${filtered.length} products`;
        }

        grid.innerHTML = visible.map(p => {
            const stockLeft = getAvailableStock(p);
            const isOut = stockLeft <= 0;
            const isComparing = state.compareList.includes(p.id);

            return `
                <article class="product-card" data-id="${p.id}">
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                    <div class="product-image-container">
                        <img src="${p.image}" alt="${p.title}" class="product-card-img" loading="lazy">
                    </div>
                    <div class="product-card-content">
                        <h3 class="product-card-title">${p.title}</h3>
                        <p class="product-card-desc">${p.description}</p>
                        <div class="product-card-meta">
                            <span class="product-card-price">${formatPrice(p.price)}</span>
                            <span class="product-card-stock ${isOut ? 'out-of-stock' : ''}">
                                ${isOut ? (state.language === 'KA' ? 'ამოიყიდა' : 'Out of Stock') : `${state.language === 'KA' ? 'მარაგშია' : 'In Stock'}: ${stockLeft}`}
                            </span>
                        </div>
                        <div class="product-card-actions">
                            <label class="compare-checkbox-label">
                                <input type="checkbox" class="compare-checkbox" ${isComparing ? 'checked' : ''}>
                                <span>${state.language === 'KA' ? 'შედარება' : 'Compare'}</span>
                            </label>
                            <button class="btn add-to-cart-btn" ${isOut ? 'disabled' : ''}>
                                ${state.language === 'KA' ? 'კალათაში დამატება' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Dynamic event attachments
        grid.querySelectorAll('.product-card').forEach(card => {
            const id = card.getAttribute('data-id');
            card.addEventListener('click', (e) => {
                if (e.target.closest('button') || e.target.closest('input') || e.target.closest('label')) return;
                openProductModal(id);
            });
            card.querySelector('.add-to-cart-btn')?.addEventListener('click', () => addToCart(id));
            card.querySelector('.compare-checkbox')?.addEventListener('change', (e) => toggleCompare(id, e.target.checked));
        });
    };

    const calculateCartTotal = () => {
        const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        let discount = 0;
        if (state.activeDeal === 'student') discount = subtotal * 0.10;
        else if (state.activeDeal === 'wfh') discount = subtotal * 0.15;
        else if (state.activeDeal === 'gaming') discount = subtotal * 0.12;

        const netTotal = subtotal - discount;
        const vat = netTotal * 0.20;
        return { subtotal, discount, vat, total: netTotal };
    };

    const renderCart = () => {
        const list = document.getElementById('cart-items-list');
        const badge = document.getElementById('cart-badge-count');
        const emptyMsg = document.getElementById('cart-empty-message');
        const formSection = document.getElementById('cart-form-section');
        const summarySection = document.getElementById('cart-summary-section');

        if (badge) badge.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (!list) return;

        if (state.cart.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            if (formSection) formSection.style.display = 'none';
            if (summarySection) summarySection.style.display = 'none';
            list.innerHTML = '';
            return;
        }

        if (emptyMsg) emptyMsg.style.display = 'none';
        if (formSection) formSection.style.display = 'block';
        if (summarySection) summarySection.style.display = 'block';

        list.innerHTML = state.cart.map(item => {
            const { product, quantity } = item;
            const availableStock = getAvailableStock(product) + quantity;
            return `
                <div class="cart-item" style="display: flex; gap: 12px; align-items: center; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
                    <div style="flex-grow: 1;">
                        <h4 style="font-size: 0.9rem; font-weight: 800; color: #ffffff; margin: 0;">${product.title}</h4>
                        <span style="font-size: 0.8rem; color: var(--electric-green); font-weight: 700;">${formatPrice(product.price)}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="cart-qty-btn decrease-qty" data-id="${product.id}" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff; cursor: pointer;">-</button>
                        <span style="font-weight: 700; font-size: 0.9rem; color: #fff; min-width: 20px; text-align: center;">${quantity}</span>
                        <button class="cart-qty-btn increase-qty" data-id="${product.id}" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: #fff; cursor: pointer;" ${quantity >= availableStock ? 'disabled' : ''}>+</button>
                    </div>
                    <button class="remove-cart-item-btn" data-id="${product.id}" style="background: transparent; border: none; color: #f87171; font-size: 1.2rem; cursor: pointer; margin-left: 8px;">&times;</button>
                </div>
            `;
        }).join('');

        // Update Totals
        const totals = calculateCartTotal();
        const subtotalEl = document.getElementById('cart-subtotal');
        const discountEl = document.getElementById('cart-discount');
        const discountRow = document.getElementById('cart-discount-row');
        const taxEl = document.getElementById('cart-tax');
        const totalEl = document.getElementById('cart-total');

        if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
        if (taxEl) taxEl.textContent = formatPrice(totals.vat);
        if (totalEl) totalEl.textContent = formatPrice(totals.total);

        if (totals.discount > 0) {
            if (discountEl) discountEl.textContent = `-${formatPrice(totals.discount)}`;
            if (discountRow) discountRow.style.display = 'flex';
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

        const dealSelect = document.getElementById('cart-deal-select');
        if (dealSelect) dealSelect.value = state.activeDeal;

        // Attach quantity and delete click event listeners
        list.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = state.cart.find(i => i.product.id === id);
                if (item) {
                    if (item.quantity > 1) item.quantity -= 1;
                    else state.cart = state.cart.filter(i => i.product.id !== id);
                    localStorage.setItem('techstore_cart', JSON.stringify(state.cart));
                    translateInterface();
                }
            });
        });

        list.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = state.cart.find(i => i.product.id === id);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem('techstore_cart', JSON.stringify(state.cart));
                    translateInterface();
                }
            });
        });

        list.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                state.cart = state.cart.filter(i => i.product.id !== id);
                localStorage.setItem('techstore_cart', JSON.stringify(state.cart));
                translateInterface();
            });
        });
    };

    const addToCart = (id) => {
        const p = state.products.find(prod => prod.id === id);
        if (!p) return;

        const availableStock = getAvailableStock(p);
        if (availableStock <= 0) {
            showToast(translations[state.language].toastOutOfStock, 'error');
            return;
        }

        const existing = state.cart.find(item => item.product.id === id);
        if (existing) existing.quantity += 1;
        else state.cart.push({ product: p, quantity: 1 });

        localStorage.setItem('techstore_cart', JSON.stringify(state.cart));
        showToast(`"${p.title}" ${translations[state.language].toastAdded}`, 'success');
        translateInterface();
    };

    const renderPayments = () => {
        const list = document.getElementById('payment-items-list');
        const emptyMsg = document.getElementById('payment-empty-message');
        if (!list) return;

        if (state.payments.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            list.innerHTML = '';
            return;
        }

        if (emptyMsg) emptyMsg.style.display = 'none';
        list.innerHTML = state.payments.map(receipt => `
            <div class="payment-card" style="padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; margin-bottom: 12px; font-size: 0.85rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-weight:800; color:var(--electric-green);">
                    <span>Order: ${receipt.orderId}</span>
                    <span>${new Date(receipt.timestamp).toLocaleDateString()}</span>
                </div>
                <div style="color: #cbd5e1; margin-bottom: 6px;">
                    ${receipt.items.map(item => `<div>${item.title} x ${item.quantity} (${formatPrice(item.price)})</div>`).join('')}
                </div>
                <div style="text-align: right; font-weight: 800; color: #fff;">
                    Total Paid: ${formatPrice(receipt.total)} (Card: **** ${receipt.cardLast4})
                </div>
            </div>
        `).join('');
    };

    const renderSubmissions = () => {
        const list = document.getElementById('submissions-items-list');
        const emptyMsg = document.getElementById('submissions-empty-message');
        if (!list) return;

        if (state.submissions.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            list.innerHTML = '';
            return;
        }

        if (emptyMsg) emptyMsg.style.display = 'none';
        list.innerHTML = state.submissions.map((sub, idx) => `
            <div class="submission-card" style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:8px; margin-bottom:12px; font-size:0.85rem; position:relative;">
                <button class="delete-sub-btn" data-index="${idx}" style="position:absolute; top:8px; right:8px; background:transparent; border:none; color:#f87171; font-size:1.2rem; cursor:pointer;">&times;</button>
                <div style="font-weight:800; color:var(--violet); margin-bottom:4px;">Request Status: ${sub.review ? 'Reviewed' : 'Pending Review'}</div>
                <div style="color:#cbd5e1; margin-bottom:6px;">
                    <strong>Name:</strong> ${sub.firstName} ${sub.lastName}<br>
                    <strong>Email:</strong> ${sub.email}<br>
                    <strong>Category:</strong> ${sub.interest}<br>
                    <strong>Goal:</strong> ${sub.goal || 'N/A'}<br>
                    <strong>Message:</strong> "${sub.message || ''}"
                </div>
                
                <div style="margin-top:10px; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
                    ${sub.review ? `
                        <div style="color:#fbbf24;">
                            <strong>Rating:</strong> ${'★'.repeat(sub.review.rating)}${'☆'.repeat(5 - sub.review.rating)}<br>
                            <strong>Feedback:</strong> "${sub.review.comment}"
                        </div>
                    ` : `
                        <button class="btn btn-review-toggle" data-index="${idx}" style="padding:2px 8px; font-size:0.75rem; min-height:unset; background:transparent; border:1px solid var(--electric-green); color:var(--electric-green); border-radius:4px; cursor:pointer;">Leave Feedback</button>
                        <div class="review-form-wrapper hidden" id="review-form-${idx}" style="margin-top:8px;">
                            <div class="rating-input-stars" style="color:#fbbf24; font-size:1.1rem; cursor:pointer; margin-bottom:6px;" data-selected-rating="5">
                                <span class="star-btn" data-rating="1">★</span>
                                <span class="star-btn" data-rating="2">★</span>
                                <span class="star-btn" data-rating="3">★</span>
                                <span class="star-btn" data-rating="4">★</span>
                                <span class="star-btn" data-rating="5">★</span>
                            </div>
                            <textarea placeholder="Write feedback..." class="review-comment-input" style="width:100%; font-size:0.8rem; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:#fff; padding:6px; box-sizing:border-box; min-height:40px;"></textarea>
                            <button class="btn submit-sub-review-btn" data-index="${idx}" style="padding:2px 8px; font-size:0.75rem; min-height:unset; margin-top:4px; cursor:pointer;">Submit</button>
                        </div>
                    `}
                </div>
            </div>
        `).join('');

        // Event hooks for feedback and submission management
        list.querySelectorAll('.btn-review-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = btn.getAttribute('data-index');
                const form = document.getElementById(`review-form-${idx}`);
                if (form) form.classList.toggle('hidden');
            });
        });

        list.querySelectorAll('.rating-input-stars').forEach(wrapper => {
            const stars = wrapper.querySelectorAll('.star-btn');
            stars.forEach(star => {
                star.addEventListener('click', (e) => {
                    const rating = e.target.getAttribute('data-rating');
                    wrapper.setAttribute('data-selected-rating', rating);
                    stars.forEach((s, idx) => {
                        s.style.color = idx < rating ? '#fbbf24' : '#64748b';
                    });
                });
            });
        });

        list.querySelectorAll('.submit-sub-review-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = btn.getAttribute('data-index');
                const wrapper = document.getElementById(`review-form-${idx}`);
                const comment = wrapper.querySelector('.review-comment-input').value.trim();
                const rating = parseInt(wrapper.getAttribute('data-selected-rating')) || 5;

                if (comment.length < 5) {
                    showToast(state.language === 'KA' ? 'შეიყვანეთ მინიმუმ 5 სიმბოლო' : 'Please enter at least 5 characters', 'error');
                    return;
                }

                state.submissions[idx].review = { rating, comment };
                localStorage.setItem('techstore_registrations', JSON.stringify(state.submissions));
                showToast(state.language === 'KA' ? 'შეფასება დამატებულია!' : 'Feedback submitted successfully!', 'success');
                renderSubmissions();
            });
        });

        list.querySelectorAll('.delete-sub-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-index'));
                state.submissions.splice(idx, 1);
                localStorage.setItem('techstore_registrations', JSON.stringify(state.submissions));
                showToast(state.language === 'KA' ? 'ჩანაწერი წაშლილია' : 'Request deleted', 'success');
                renderSubmissions();
            });
        });
    };

    const toggleCompare = (id, checked) => {
        if (checked) {
            if (state.compareList.length >= 3) {
                showToast(state.language === 'KA' ? 'შედარება შესაძლებელია მაქსიმუმ 3 პროდუქტისთვის' : 'You can compare maximum 3 products', 'error');
                renderCatalog();
                return;
            }
            if (!state.compareList.includes(id)) state.compareList.push(id);
        } else {
            state.compareList = state.compareList.filter(pid => pid !== id);
        }
        updateCompareFab();
    };

    const updateCompareFab = () => {
        const fab = document.getElementById('compare-fab');
        const count = document.getElementById('compare-count');
        if (fab && count) {
            count.textContent = state.compareList.length;
            if (state.compareList.length > 0) fab.classList.remove('hidden');
            else fab.classList.add('hidden');
        }
    };

    const renderCompareTable = () => {
        const body = document.getElementById('compare-modal-body');
        if (!body) return;

        if (state.compareList.length === 0) {
            body.innerHTML = `<p style="text-align: center; color: #8b9bb4; padding: 20px;">No products selected for comparison.</p>`;
            return;
        }

        const productsToCompare = state.compareList.map(id => state.products.find(p => p.id === id)).filter(Boolean);

        body.innerHTML = `
            <table class="compare-table" style="width: 100%; border-collapse: collapse; margin-top: 16px; color: #ffffff;">
                <thead>
                    <tr>
                        <th style="padding: 12px; border-bottom: 2px solid rgba(57,255,20,0.3); text-align: left; color: var(--electric-green); font-weight: 800;">Feature</th>
                        ${productsToCompare.map(p => `
                            <th style="padding: 12px; border-bottom: 2px solid rgba(57,255,20,0.3); text-align: left; font-weight: 800;">
                                <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-start;">
                                    <img src="${p.image}" alt="${p.title}" style="width:50px; height:50px; object-fit:cover; border-radius:4px; border:1px solid rgba(255,255,255,0.1);">
                                    <span>${p.title}</span>
                                    <button class="btn remove-compare-btn" data-id="${p.id}" style="padding:2px 8px; font-size:0.7rem; min-height:unset; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#f87171; border-radius:4px; cursor:pointer;">Remove</button>
                                </div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">Price</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:800; color:var(--electric-green);">${formatPrice(p.price)}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">Brand</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${p.brand}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">Category</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); text-transform:capitalize;">${p.category}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">Screen Size</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${p.screenSize || 'N/A'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">Processor</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${p.processor || 'N/A'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">RAM</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${p.ram || 'N/A'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight:700;">Stock Status</td>
                        ${productsToCompare.map(p => `
                            <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);">${p.stock > 0 ? (state.language === 'KA' ? 'მარაგშია' : 'In Stock') : (state.language === 'KA' ? 'ამოიყიდა' : 'Out of Stock')}</td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        `;

        body.querySelectorAll('.remove-compare-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                state.compareList = state.compareList.filter(pid => pid !== id);
                updateCompareFab();
                renderCompareTable();
                renderCatalog();
            });
        });
    };

    const addToRecentlyViewed = (id) => {
        state.recentlyViewed = [id, ...state.recentlyViewed.filter(pid => pid !== id)].slice(0, 5);
        localStorage.setItem('techstore_recent', JSON.stringify(state.recentlyViewed));
        renderRecentlyViewed();
    };

    const renderRecentlyViewed = () => {
        const list = document.getElementById('recent-drawer-body');
        const badge = document.getElementById('recent-badge-count');
        if (badge) badge.textContent = state.recentlyViewed.length;
        if (!list) return;

        if (state.recentlyViewed.length === 0) {
            list.innerHTML = `<p style="text-align: center; color: #8b9bb4; padding: 20px;">No recently viewed products.</p>`;
            return;
        }

        const items = state.recentlyViewed.map(id => state.products.find(p => p.id === id)).filter(Boolean);
        list.innerHTML = items.map(p => `
            <div class="recent-item-card" style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); cursor: pointer;" data-id="${p.id}">
                <img src="${p.image}" alt="${p.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
                <div style="flex-grow: 1;">
                    <h4 style="font-size: 0.85rem; font-weight: 800; color: #ffffff; margin: 0;">${p.title}</h4>
                    <span style="font-size: 0.8rem; color: var(--electric-green); font-weight: 700;">${formatPrice(p.price)}</span>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('.recent-item-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                toggleDrawer('recent-drawer', false);
                openProductModal(id);
            });
        });
    };

    // -------------------------------------------------------------------------
    // 7. LANGUAGE TRANSLATION PIPELINE
    // -------------------------------------------------------------------------
    const translateInterface = () => {
        const dict = translations[state.language];

        const classMap = {
            'trans-support-title': 'supportTitle',
            'trans-first-name': 'supportFirstName',
            'trans-last-name': 'supportLastName',
            'trans-support-email': 'supportEmail',
            'trans-support-interest': 'supportInterest',
            'trans-choose-cat': 'supportChoose',
            'trans-cat-laptops': 'filterLaptops',
            'trans-cat-smartphones': 'filterSmartphones',
            'trans-cat-accessories': 'filterAccessories',
            'trans-cat-wearables': 'filterWearables',
            'trans-support-goal': 'supportGoal',
            'trans-goal-study': 'supportStudy',
            'trans-goal-work': 'supportWork',
            'trans-goal-gaming': 'supportGaming',
            'trans-support-extras': 'supportExtras',
            'trans-extra-delivery': 'supportDelivery',
            'trans-extra-setup': 'supportSetup',
            'trans-support-msg': 'supportMsg',
            'trans-support-submit': 'supportSubmit',
            'trans-footer-about': 'footerAboutDesc',
            'trans-footer-support-title': 'footerSupportTitle',
            'trans-footer-hours': 'footerHours',
            'trans-footer-copy': 'footerCopy',
            'trans-footer-top': 'footerTop',
            'trans-select-deal': 'selectDeal',
            'trans-deal-none': 'dealNone',
            'trans-deal-student': 'dealStudent',
            'trans-deal-wfh': 'dealWfh',
            'trans-deal-gaming': 'dealGaming',
            'trans-subtotal': 'subtotal',
            'trans-discount': 'discount',
            'trans-vat': 'vat',
            'trans-total': 'total',
            'trans-payment-empty-title': 'noTransactionsTitle',
            'trans-payment-empty-desc': 'noTransactionsDesc',
            'trans-service-empty-title': 'noSubmissionsTitle',
            'trans-service-empty-desc': 'noSubmissionsDesc'
        };

        Object.entries(classMap).forEach(([className, key]) => {
            document.querySelectorAll('.' + className).forEach(el => {
                el.textContent = dict[key] || '';
            });
        });

        // Main Navigation
        document.querySelectorAll('.nav-menu a, #nav-support-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#home') link.textContent = dict.navHome;
            else if (href === '#products') link.textContent = dict.navProducts;
            else if (href === '#deals') link.textContent = dict.navDeals;
            else if (href === '#support') link.textContent = dict.navSupport;
        });

        // Catalog Header Section
        const productsSec = document.getElementById('products');
        if (productsSec) {
            const eyebrow = productsSec.querySelector('.eyebrow');
            const title = productsSec.querySelector('.section-title');
            const desc = productsSec.querySelector('.section-description');
            if (eyebrow) eyebrow.textContent = dict.eyebrow;
            if (title) title.textContent = dict.catalogHeader;
            if (desc) desc.textContent = dict.catalogSub;
        }

        // Hero Section
        const heroEyebrow = document.querySelector('#home .eyebrow');
        const heroTitle = document.querySelector('#home .hero-title');
        const heroDesc = document.querySelector('#home .hero-description');
        const heroBtn = document.querySelector('#home .btn');
        if (heroEyebrow) heroEyebrow.textContent = dict.heroEyebrow;
        if (heroTitle) heroTitle.textContent = dict.heroTitle;
        if (heroDesc) heroDesc.textContent = dict.heroDesc;
        if (heroBtn) heroBtn.textContent = dict.heroBtn;

        const statPickup = document.querySelector('#home .hero-stats div:nth-child(1) span');
        const statRating = document.querySelector('#home .hero-stats div:nth-child(2) span');
        const statDevices = document.querySelector('#home .hero-stats div:nth-child(3) span');
        if (statPickup) statPickup.textContent = dict.statPickup;
        if (statRating) statRating.textContent = dict.statRating;
        if (statDevices) statDevices.textContent = dict.statDevices;

        // Deals Section
        const dealsEyebrow = document.querySelector('#deals .section-header .eyebrow');
        const dealsTitle = document.querySelector('#deals .section-header .section-title');
        const dealsDesc = document.querySelector('#deals .section-header .section-description');
        if (dealsEyebrow) dealsEyebrow.textContent = dict.dealsEyebrow;
        if (dealsTitle) dealsTitle.textContent = dict.dealsTitle;
        if (dealsDesc) dealsDesc.textContent = dict.dealsDesc;

        // Deals Info Cards
        const dealTitle1 = document.querySelector('#deals .deal-list article:nth-child(1) h3');
        const dealDesc1 = document.querySelector('#deals .deal-list article:nth-child(1) p');
        const dealSave1 = document.querySelector('#deals .deal-list article:nth-child(1) span');
        if (dealTitle1) dealTitle1.textContent = dict.dealCardTitle1;
        if (dealDesc1) dealDesc1.textContent = dict.dealCardDesc1;
        if (dealSave1) dealSave1.textContent = dict.dealCardSave1;

        const dealTitle2 = document.querySelector('#deals .deal-list article:nth-child(2) h3');
        const dealDesc2 = document.querySelector('#deals .deal-list article:nth-child(2) p');
        const dealSave2 = document.querySelector('#deals .deal-list article:nth-child(2) span');
        if (dealTitle2) dealTitle2.textContent = dict.dealCardTitle2;
        if (dealDesc2) dealDesc2.textContent = dict.dealCardDesc2;
        if (dealSave2) dealSave2.textContent = dict.dealCardSave2;

        const dealTitle3 = document.querySelector('#deals .deal-list article:nth-child(3) h3');
        const dealDesc3 = document.querySelector('#deals .deal-list article:nth-child(3) p');
        const dealSave3 = document.querySelector('#deals .deal-list article:nth-child(3) span');
        if (dealTitle3) dealTitle3.textContent = dict.dealCardTitle3;
        if (dealDesc3) dealDesc3.textContent = dict.dealCardDesc3;
        if (dealSave3) dealSave3.textContent = dict.dealCardSave3;

        // Video instructions Section
        const mediaEyebrow = document.querySelector('.media-section .section-header .eyebrow');
        const mediaTitle = document.querySelector('.media-section .section-header .section-title');
        const mediaDesc = document.querySelector('.media-section .section-header .section-description');
        if (mediaEyebrow) mediaEyebrow.textContent = dict.mediaEyebrow;
        if (mediaTitle) mediaTitle.textContent = dict.mediaTitle;
        if (mediaDesc) mediaDesc.textContent = dict.mediaDesc;

        // Reviews Static headers
        const reviewsEyebrow = document.querySelector('#reviews .section-header .eyebrow');
        const reviewsTitle = document.querySelector('#reviews .section-header .section-title');
        const reviewsDesc = document.querySelector('#reviews .section-header .section-description');
        if (reviewsEyebrow) reviewsEyebrow.textContent = dict.reviewsEyebrow;
        if (reviewsTitle) reviewsTitle.textContent = dict.reviewsTitle;
        if (reviewsDesc) reviewsDesc.textContent = dict.reviewsDesc;

        // Search inputs & Drawers labels
        const searchInput = document.getElementById('product-search');
        if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

        const cartTitle = document.querySelector('#cart-drawer .cart-drawer-header h2');
        if (cartTitle) cartTitle.textContent = dict.cartTitle;

        const cartEmptyTitle = document.querySelector('#cart-drawer .cart-empty-message h3');
        const cartEmptyDesc = document.querySelector('#cart-drawer .cart-empty-message p');
        const cartExplore = document.getElementById('cart-explore-btn');
        if (cartEmptyTitle) cartEmptyTitle.textContent = dict.cartEmptyTitle;
        if (cartEmptyDesc) cartEmptyDesc.textContent = dict.cartEmptyDesc;
        if (cartExplore) cartExplore.textContent = dict.cartExplore;

        const payHeader = document.querySelector('#cart-drawer .checkout-payment-form h3');
        if (payHeader) payHeader.textContent = dict.paymentDetailsHeader;

        const labelAddress = document.querySelector('label[for="checkout-address"] span');
        if (labelAddress) labelAddress.textContent = dict.addressLabel;

        const labelCardholder = document.querySelector('label[for="checkout-cardholder"]');
        if (labelCardholder) labelCardholder.textContent = dict.cardholderLabel;

        const labelCardnumber = document.querySelector('label[for="checkout-cardnumber"]');
        if (labelCardnumber) labelCardnumber.textContent = dict.cardnumberLabel;

        const labelExpiry = document.querySelector('label[for="checkout-expiry"]');
        if (labelExpiry) labelExpiry.textContent = dict.expiryLabel;

        const labelCvv = document.querySelector('label[for="checkout-cvv"]');
        if (labelCvv) labelCvv.textContent = dict.cvvLabel;

        const checkoutBtnText = document.querySelector('#checkout-btn .btn-text');
        if (checkoutBtnText) checkoutBtnText.textContent = dict.placeOrder;

        // Profile Panel Language Preferences
        const profileTitle = document.getElementById('profile-drawer-title');
        const profileLangLabel = document.getElementById('profile-lang-label');
        const profileTabPayments = document.getElementById('profile-tab-payments-btn');
        const profileTabSubmissions = document.getElementById('profile-tab-submissions-btn');

        if (profileTitle) profileTitle.textContent = dict.profileTitle;
        if (profileLangLabel) profileLangLabel.textContent = dict.langLabel;
        if (profileTabPayments) profileTabPayments.textContent = dict.tabPayments;
        if (profileTabSubmissions) profileTabSubmissions.textContent = dict.tabSubmissions;

        const profileWelcomeTitle = document.getElementById('profile-welcome-title');
        const profileWelcomeDesc = document.getElementById('profile-welcome-desc');
        const profileSignoutBtn = document.getElementById('profile-signout-btn');
        const profileSigninBtn = document.getElementById('profile-signin-btn');
        const profileRegisterBtn = document.getElementById('profile-register-btn');

        if (state.currentUser) {
            if (profileWelcomeTitle) profileWelcomeTitle.textContent = `${state.language === 'KA' ? 'მოგესალმებით,' : 'Welcome back,'} ${state.currentUser}!`;
            if (profileWelcomeDesc) profileWelcomeDesc.textContent = state.language === 'KA' ? 'თქვენ წარმატებით შესული ხართ სისტემაში.' : 'You are currently signed in.';
            if (profileSignoutBtn) profileSignoutBtn.style.display = 'block';
            if (profileSigninBtn) profileSigninBtn.style.display = 'none';
            if (profileRegisterBtn) profileRegisterBtn.style.display = 'none';
        } else {
            if (profileWelcomeTitle) profileWelcomeTitle.textContent = state.language === 'KA' ? 'მოგესალმებით, სტუმარო!' : 'Welcome, Guest!';
            if (profileWelcomeDesc) profileWelcomeDesc.textContent = state.language === 'KA' ? 'შედით სისტემაში ისტორიის სანახავად.' : 'Sign in to save your history and access exclusive rewards.';
            if (profileSignoutBtn) profileSignoutBtn.style.display = 'none';
            if (profileSigninBtn) profileSigninBtn.style.display = 'block';
            if (profileRegisterBtn) profileRegisterBtn.style.display = 'block';
        }

        renderCatalog();
        renderCart();
        renderPayments();
        renderSubmissions();
        fetchReviews();
    };

    // -------------------------------------------------------------------------
    // 8. FORMS VALIDATION & USER INTERACTIONS
    // -------------------------------------------------------------------------
    const setupCardFormatting = () => {
        const cardNum = document.getElementById('checkout-cardnumber');
        const expiry = document.getElementById('checkout-expiry');
        const cvv = document.getElementById('checkout-cvv');

        if (cardNum) {
            cardNum.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                if (val.length > 16) val = val.substring(0, 16);
                const matches = val.match(/.{1,4}/g);
                e.target.value = matches ? matches.join(' ') : '';
            });
        }

        if (expiry) {
            expiry.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                if (val.length > 4) val = val.substring(0, 4);
                if (val.length > 2) {
                    e.target.value = `${val.substring(0, 2)}/${val.substring(2)}`;
                } else {
                    e.target.value = val;
                }
            });
        }

        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
            });
        }
    };

    const setupEventListeners = () => {
        // Toggle Drawers & Modals handlers
        document.getElementById('cart-toggle-btn')?.addEventListener('click', () => toggleDrawer('cart-drawer', true));
        document.getElementById('cart-close-btn')?.addEventListener('click', () => toggleDrawer('cart-drawer', false));
        document.getElementById('cart-overlay')?.addEventListener('click', () => toggleDrawer('cart-drawer', false));
        document.getElementById('cart-explore-btn')?.addEventListener('click', () => toggleDrawer('cart-drawer', false));

        document.getElementById('profile-toggle-btn')?.addEventListener('click', () => toggleDrawer('profile-drawer', true));
        document.getElementById('profile-close-btn')?.addEventListener('click', () => toggleDrawer('profile-drawer', false));
        document.getElementById('profile-overlay')?.addEventListener('click', () => toggleDrawer('profile-drawer', false));

        document.getElementById('recent-toggle-btn')?.addEventListener('click', () => toggleDrawer('recent-drawer', true));
        document.getElementById('recent-drawer-close')?.addEventListener('click', () => toggleDrawer('recent-drawer', false));
        document.getElementById('recent-overlay')?.addEventListener('click', () => toggleDrawer('recent-drawer', false));
        document.getElementById('recent-clear-btn')?.addEventListener('click', () => {
            state.recentlyViewed = [];
            localStorage.removeItem('techstore_recent');
            renderRecentlyViewed();
        });

        document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
        document.getElementById('modal-overlay')?.addEventListener('click', closeModal);

        document.getElementById('compare-close-btn')?.addEventListener('click', () => toggleDrawer('compare-modal', false));
        document.getElementById('compare-modal-overlay')?.addEventListener('click', () => toggleDrawer('compare-modal', false));
        document.getElementById('compare-clear-btn')?.addEventListener('click', () => {
            state.compareList = [];
            updateCompareFab();
            toggleDrawer('compare-modal', false);
            renderCatalog();
        });
        document.getElementById('compare-fab')?.addEventListener('click', () => {
            renderCompareTable();
            toggleDrawer('compare-modal', true);
        });

        // Search and display show limit toggling
        document.getElementById('product-search')?.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderCatalog();
        });

        document.getElementById('show-more-btn')?.addEventListener('click', (e) => {
            state.showAll = !state.showAll;
            e.target.textContent = state.showAll
                ? (state.language === 'KA' ? 'რჩეული პროდუქტები' : 'Show Featured Products')
                : (state.language === 'KA' ? 'ყველა პროდუქტი' : 'Show All Products');
            renderCatalog();
        });

        // Expandable Filters Panel triggers
        document.getElementById('filter-toggle-btn')?.addEventListener('click', () => {
            const panel = document.getElementById('filter-dropdown-panel');
            if (!panel) return;
            if (panel.style.maxHeight === '0px' || !panel.style.maxHeight) {
                panel.style.maxHeight = '500px';
                panel.style.opacity = '1';
                panel.style.marginTop = '16px';
                panel.style.padding = '24px';
            } else {
                panel.style.maxHeight = '0px';
                panel.style.opacity = '0';
                panel.style.marginTop = '0px';
                panel.style.padding = '0 24px';
            }
        });

        // Category selection filters tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                state.activeCategory = e.target.getAttribute('data-category');
                renderCatalog();
            });
        });

        // Min Max budget ranges sliders
        const minRange = document.getElementById('min-price-range');
        const maxRange = document.getElementById('max-price-range');
        const minValText = document.getElementById('min-price-val');
        const maxValText = document.getElementById('max-price-val');

        if (minRange && maxRange) {
            minRange.addEventListener('input', (e) => {
                state.minBudget = parseInt(e.target.value);
                if (minValText) minValText.textContent = `$${state.minBudget}`;
                renderCatalog();
            });
            maxRange.addEventListener('input', (e) => {
                state.maxBudget = parseInt(e.target.value);
                if (maxValText) maxValText.textContent = `$${state.maxBudget}`;
                renderCatalog();
            });
        }

        // Language and Currency select listeners
        document.getElementById('profile-language-select')?.addEventListener('change', (e) => {
            state.language = e.target.value;
            localStorage.setItem('techstore_language', state.language);
            showToast(state.language === 'KA' ? 'ენა შეიცვალა ქართულად' : 'Switched language to English', 'success');
            translateInterface();
        });



        // Deal selectors dropdown inside cart drawer
        document.getElementById('cart-deal-select')?.addEventListener('change', (e) => {
            state.activeDeal = e.target.value;
            localStorage.setItem('techstore_active_deal', state.activeDeal);
            translateInterface();
        });

        // Profile navigation tabs switcher
        document.querySelectorAll('.profile-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.profile-tab-btn').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');

                const tab = e.target.getAttribute('data-tab');
                const pPane = document.getElementById('profile-pane-payments');
                const sPane = document.getElementById('profile-pane-submissions');

                if (tab === 'payments') {
                    pPane?.classList.add('active');
                    sPane?.classList.remove('active');
                    renderPayments();
                } else {
                    pPane?.classList.remove('active');
                    sPane?.classList.add('active');
                    renderSubmissions();
                }
            });
        });

        // Authentication triggers inside drawers & forms
        const signinToggleLink = document.getElementById('signin-toggle-link');
        const registerToggleLink = document.getElementById('register-toggle-link');
        const signinForm = document.getElementById('profile-signin-form');
        const registerForm = document.getElementById('profile-register-form');
        const authTitle = document.getElementById('auth-modal-title');

        const showAuthForm = (isSignIn) => {
            if (isSignIn) {
                if (signinForm) signinForm.style.display = 'block';
                if (registerForm) registerForm.style.display = 'none';
                if (authTitle) authTitle.textContent = state.language === 'KA' ? 'შესვლა' : 'Sign In';
            } else {
                if (signinForm) signinForm.style.display = 'none';
                if (registerForm) registerForm.style.display = 'block';
                if (authTitle) authTitle.textContent = state.language === 'KA' ? 'რეგისტრაცია' : 'Register';
            }
        };

        signinToggleLink?.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthForm(false);
        });

        registerToggleLink?.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthForm(true);
        });

        document.getElementById('profile-signin-btn')?.addEventListener('click', () => {
            toggleDrawer('profile-drawer', false);
            toggleDrawer('auth-modal', true);
            showAuthForm(true);
        });

        document.getElementById('profile-register-btn')?.addEventListener('click', () => {
            toggleDrawer('profile-drawer', false);
            toggleDrawer('auth-modal', true);
            showAuthForm(false);
        });

        document.getElementById('auth-close-btn')?.addEventListener('click', () => toggleDrawer('auth-modal', false));
        document.getElementById('auth-overlay')?.addEventListener('click', () => toggleDrawer('auth-modal', false));

        signinForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const userVal = document.getElementById('signin-username')?.value.trim();
            if (userVal) {
                state.currentUser = userVal;
                localStorage.setItem('techstore_user', userVal);
                toggleDrawer('auth-modal', false);
                showToast(state.language === 'KA' ? `მოგესალმებით, ${userVal}!` : `Welcome back, ${userVal}!`, 'success');
                translateInterface();
            }
        });

        registerForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const userVal = document.getElementById('register-username')?.value.trim();
            if (userVal) {
                state.currentUser = userVal;
                localStorage.setItem('techstore_user', userVal);
                toggleDrawer('auth-modal', false);
                showToast(state.language === 'KA' ? `რეგისტრაცია წარმატებულია, მოგესალმებით ${userVal}!` : `Registration successful, welcome ${userVal}!`, 'success');
                translateInterface();
            }
        });

        document.getElementById('profile-signout-btn')?.addEventListener('click', () => {
            state.currentUser = null;
            localStorage.removeItem('techstore_user');
            showToast(state.language === 'KA' ? 'სისტემიდან გამოსვლა წარმატებულია' : 'Signed out successfully', 'success');
            translateInterface();
        });

        // Contact Support Form handler submissions
        const supportForm = document.getElementById('support');
        if (supportForm) {
            supportForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const firstName = document.getElementById('first-name')?.value.trim();
                const lastName = document.getElementById('last-name')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                const interest = document.getElementById('interest')?.value;
                const goalEl = supportForm.querySelector('input[name="goal"]:checked');
                const goal = goalEl ? goalEl.value : '';
                const message = document.getElementById('message')?.value.trim();

                if (!firstName || !lastName || !email || !interest) {
                    showToast(state.language === 'KA' ? 'შეავსეთ სავალდებულო ველები' : 'Please fill in all required fields', 'error');
                    return;
                }

                const newSub = {
                    firstName,
                    lastName,
                    email,
                    interest,
                    goal,
                    message,
                    timestamp: new Date().toISOString(),
                    review: null
                };

                state.submissions.unshift(newSub);
                localStorage.setItem('techstore_registrations', JSON.stringify(state.submissions));

                showToast(state.language === 'KA' ? 'მოთხოვნა წარმატებით გაიგზავნა!' : 'Support request submitted successfully!', 'success');
                supportForm.reset();
                renderSubmissions();
            });
        }

        // Checkout Purchase Payment Order Form submissions handler
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', async () => {
                if (state.cart.length === 0) return;

                const address = document.getElementById('checkout-address')?.value.trim();
                const cardholder = document.getElementById('checkout-cardholder')?.value.trim();
                const cardnumber = document.getElementById('checkout-cardnumber')?.value.replace(/\s/g, '');
                const expiry = document.getElementById('checkout-expiry')?.value.trim();
                const cvv = document.getElementById('checkout-cvv')?.value.trim();

                const dict = translations[state.language];

                if (!address) {
                    showToast(state.language === 'KA' ? 'გთხოვთ მიუთითოთ მიწოდების მისამართი' : 'Please enter a delivery address', 'error');
                    return;
                }
                if (!cardholder || cardholder.length < 3) {
                    showToast(dict.toastEnterCard, 'error');
                    return;
                }
                if (!cardnumber || cardnumber.length !== 16) {
                    showToast(dict.toastCard16, 'error');
                    return;
                }
                const expParts = expiry.split('/');
                if (expParts.length !== 2 || expParts[0].length !== 2 || expParts[1].length !== 2) {
                    showToast(dict.toastExpiryFormat, 'error');
                    return;
                }
                const expMonth = parseInt(expParts[0]);
                if (expMonth < 1 || expMonth > 12) {
                    showToast(dict.toastExpiryMonth, 'error');
                    return;
                }
                if (!cvv || cvv.length !== 3) {
                    showToast(dict.toastCVV3, 'error');
                    return;
                }

                const btnText = checkoutBtn.querySelector('.btn-text');
                const btnSpinner = checkoutBtn.querySelector('.btn-spinner');

                checkoutBtn.disabled = true;
                if (btnText) btnText.textContent = dict.authorizing;
                if (btnSpinner) btnSpinner.classList.remove('hidden');

                // Simulate payment authorization processing delay
                setTimeout(() => {
                    const receipt = {
                        orderId: `TS-${Math.floor(100000 + Math.random() * 900000)}`,
                        status: 'paid',
                        cardLast4: cardnumber.slice(-4),
                        timestamp: new Date().toISOString(),
                        items: state.cart.map(item => ({
                            title: item.product.title,
                            price: item.product.price,
                            quantity: item.quantity
                        })),
                        total: calculateCartTotal().total
                    };

                    // Decrement stock levels and increment units sold
                    state.cart.forEach(item => {
                        const product = state.products.find(p => p.id === item.product.id);
                        if (product) {
                            product.stock = Math.max(0, product.stock - item.quantity);
                            product.soldCount += item.quantity;
                        }
                    });

                    // Persist updated inventories levels to local storage overrides
                    const updatedStocks = {};
                    const updatedSoldCount = {};
                    state.products.forEach(p => {
                        updatedStocks[p.id] = p.stock;
                        updatedSoldCount[p.id] = p.soldCount;
                    });
                    localStorage.setItem('techstore_product_stocks', JSON.stringify(updatedStocks));
                    localStorage.setItem('techstore_product_sold', JSON.stringify(updatedSoldCount));

                    state.payments.unshift(receipt);
                    localStorage.setItem('techstore_payments', JSON.stringify(state.payments));

                    state.cart = [];
                    localStorage.setItem('techstore_cart', JSON.stringify(state.cart));

                    checkoutBtn.disabled = false;
                    if (btnText) btnText.textContent = dict.placeOrder;
                    if (btnSpinner) btnSpinner.classList.add('hidden');

                    toggleDrawer('cart-drawer', false);
                    showToast(`${dict.toastPaymentSuccess} ${receipt.orderId}`, 'success');

                    translateInterface();
                }, 1500);
            });
        }

        // GPS Auto Detect button handler
        document.getElementById('gps-detect-btn')?.addEventListener('click', () => {
            const addressInput = document.getElementById('checkout-address');
            if (addressInput) {
                addressInput.value = state.language === 'KA' ? 'იტვირთება მისამართი...' : 'Detecting GPS Address...';
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                            if (res.ok) {
                                const data = await res.json();
                                addressInput.value = data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                            } else {
                                addressInput.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                            }
                        } catch (e) {
                            addressInput.value = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                        }
                    },
                    (err) => {
                        addressInput.value = state.language === 'KA' ? 'GPS მიუწვდომელია' : 'GPS location unavailable';
                        showToast(state.language === 'KA' ? 'GPS ლოკაცია ვერ განისაზღვრა' : 'Could not detect GPS location', 'error');
                    }
                );
            }
        });
    };

    // -------------------------------------------------------------------------
    // 9. ANIMATIONS & APPEARANCE (INTERSECTION OBSERVER)
    // -------------------------------------------------------------------------
    const initScrollAnimations = () => {
        const sections = document.querySelectorAll('.hero, .products-section, .deals-section, .media-section, .reviews-section, .contact-section');
        sections.forEach(sec => sec.classList.add('scroll-animate'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                } else {
                    entry.target.classList.remove('animated');
                }
            });
        }, { threshold: 0.08 });

        sections.forEach(sec => observer.observe(sec));
    };


    const init = async () => {
        await fetchProducts();
        setupEventListeners();
        setupCardFormatting();
        translateInterface();
        initScrollAnimations();

        // Sync preferences state to selectors
        const langSelect = document.getElementById('profile-language-select');
        if (langSelect) langSelect.value = state.language;

        renderRecentlyViewed();
        updateCompareFab();
    };

    init();
});