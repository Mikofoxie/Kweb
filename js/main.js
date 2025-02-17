class Router {
    constructor() {
        this.app = document.querySelector('.app');
        this.isInitialLoad = true;
        this.routes = {
            home: '../js/pages/home.js',
            works: '../js/pages/works.js',
            video: '../js/pages/video.js'
        };
        this.init();
    }

    init() {
        document.querySelectorAll('a[data-route]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
    
                const routeLink = e.target.closest('a[data-route]');
                if (!routeLink) return;

                const route = routeLink.dataset.route;
                if (route && this.routes[route]) {
                    this.navigateTo(route);
                }
            });
        });

        // Hash event
        window.addEventListener('hashchange', () => {
            const route = window.location.hash.slice(1) || 'home';
            this.loadPage(route);
            
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 10);
        });

        const initialRoute = window.location.hash.slice(1) || 'home';
        this.loadPage(initialRoute);
    }

    navigateTo(route) {
        window.location.hash = route;
    }

    async loadPage(route) {
        const contentDiv = document.querySelector('.content');

        if (this.isInitialLoad) {
            this.app.classList.remove('loaded');
        }

        contentDiv.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 400));

        try {
            const module = await import(`./${this.routes[route]}`);
            contentDiv.innerHTML = await module.default();


            window.scrollTo({ top: 0, behavior: 'smooth' });


            if (this.isInitialLoad) {
                setTimeout(() => {
                    this.app.classList.add('loaded');
                    this.isInitialLoad = false;
                }, 50);
            }
        } catch (error) {
            contentDiv.innerHTML = '<h2>404 - Page Not Found</h2>';
            console.error("Error loading page:", error);
            if (this.isInitialLoad) {
                this.app.classList.add('loaded');
                this.isInitialLoad = false;
            }
        }

        contentDiv.classList.remove('fade-out');
    }
}

new Router();
