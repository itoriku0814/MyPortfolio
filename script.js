document.addEventListener('DOMContentLoaded', function() {

    // 1. ハンバーガーメニューの機能
    const burgerMenu = document.getElementById('burger-menu');
    const navList = document.querySelector('.nav-list');

    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('is-active');
        navList.classList.toggle('is-active');
    });

    // メニュー項目クリックでメニューを閉じる
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('is-active');
            navList.classList.remove('is-active');
        });
    });

    // 2. スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
        threshold: 0.1 // 要素が10%見えたら発火
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

});