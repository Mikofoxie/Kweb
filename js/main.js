class Router {
    constructor() {
        this.app = document.querySelector('.app');
        this.contentDiv = document.querySelector('.content');
        this.isInitialLoad = true;
        this.routes = {
            home: '../js/pages/home.js',
            works: '../js/pages/works.js',
            video: '../js/pages/video.js'
        };
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');
            if (!link) return;

            e.preventDefault();
        
            const href = link.getAttribute('href');
            if (href) {
        
                window.location.hash = href.slice(1);
            }
        });

        // (hashchange)
        window.addEventListener('hashchange', () => this.handleRouteChange());

        
        this.handleRouteChange();
    }

    navigateTo(route) {
        window.location.hash = route;
    }

    async handleRouteChange() {
        const hash = window.location.hash.slice(1) || 'home';
        let [routeName, slug] = hash.includes('/') ? hash.split('/') : [hash, null];

        if (!this.routes[routeName]) {
            this.showNotFound();
            return;
        }

        await this.loadPage(routeName, slug);
    }

    async loadPage(routeName, slug) {
        if (this.isInitialLoad) {
            this.app.classList.remove('loaded');
        }

        this.contentDiv.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 400));

        try {
            const module = await import(`./${this.routes[routeName]}`);
            this.contentDiv.innerHTML = slug ? await module.default(slug) : await module.default();

            setTimeout(() => {
                window.scrollTo({top: 0,behavior: "smooth"});
            }, 10);

            if (this.isInitialLoad) {
                setTimeout(() => {
                    this.app.classList.add('loaded');
                    this.isInitialLoad = false;
                }, 50);
            }
        } catch (error) {
            this.showNotFound();
            console.error("Error loading page:", error);
        }

        this.contentDiv.classList.remove('fade-out');
    }

    showNotFound() {
        this.contentDiv.innerHTML = '<div class="error-message"><h2>404 - Page Not Found</h2></div>';
        if (this.isInitialLoad) {
            this.app.classList.add('loaded');
            this.isInitialLoad = false;
        }
    }
}

new Router();
