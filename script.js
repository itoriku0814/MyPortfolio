document.addEventListener('DOMContentLoaded', function() {

    // 1. ハンバーガーメニューの機能
    const burgerMenu = document.getElementById('burger-menu');
    const navList = document.querySelector('.nav-list');

    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('is-active');
        navList.classList.toggle('is-active');
    });

    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('is-active');
            navList.classList.remove('is-active');
        });
    });

    // 2. スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // トップに戻るボタンは別の処理があるので除外
            if (this.getAttribute('id') === 'back-to-top') return;

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. スクロールに応じたアニメーション機能
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 4. 機能追加: トップに戻るボタンの機能
    const backToTopBtn = document.getElementById('back-to-top');

    // スクロール量に応じてボタンの表示/非表示を切り替える
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // 300pxスクロールしたら表示
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    });

    // ボタンクリックでトップへスムーズにスクロール
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});