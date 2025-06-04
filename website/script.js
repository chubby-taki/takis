// モバイルメニューの制御
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
});

// ギャラリーフィルター機能
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // アクティブクラスの管理
            const filterGroup = this.closest('.filter-group');
            filterGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 動物種別フィルター
            if (filterValue === 'all' || filterValue === 'all-finish') {
                galleryItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else if (['dog', 'cat', 'bird', 'rabbit', 'other'].includes(filterValue)) {
                galleryItems.forEach(item => {
                    const animalType = item.getAttribute('data-animal');
                    if (animalType === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else if (['hoop', 'frame'].includes(filterValue)) {
                // 仕上げ方法フィルター
                galleryItems.forEach(item => {
                    const finishType = item.getAttribute('data-finish');
                    if (finishType === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
});

// フォーム送信処理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(this);
            const formObject = {};
            
            // 基本項目
            formObject.name = formData.get('name');
            formObject.email = formData.get('email');
            formObject.phone = formData.get('phone');
            formObject.petType = formData.get('pet-type');
            formObject.message = formData.get('message');
            
            // チェックボックス項目の処理
            const finishMethods = formData.getAll('finish-method');
            const contactMethods = formData.getAll('contact-method');
            
            formObject.finishMethods = finishMethods;
            formObject.contactMethods = contactMethods;
            
            // 簡単なバリデーション
            if (!formObject.name || !formObject.email || !formObject.petType || !formObject.message) {
                alert('必須項目をすべて入力してください。');
                return;
            }
            
            // 実際の送信処理（ここではアラートで代用）
            alert('お問い合わせありがとうございます。\n確認後、24時間以内にご連絡いたします。');
            
            // フォームのリセット
            this.reset();
            
            console.log('送信データ:', formObject);
        });
    }
});

// スムーススクロール
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ヘッダーの背景変更（スクロール時）
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// アニメーション効果（Intersection Observer）
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.feature-card, .portfolio-item, .testimonial-card, .process-step, .pricing-card');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// ファイルアップロードの処理
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('photo');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > maxSize) {
                    alert(`ファイル "${files[i].name}" は5MBを超えています。別のファイルを選択してください。`);
                    this.value = '';
                    return;
                }
            }
            
            if (files.length > 0) {
                console.log(`${files.length}個のファイルが選択されました`);
            }
        });
    }
});

// カウントアップアニメーション
function countUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function animate() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(animate);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    animate();
}

// 数値表示要素のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const countElements = document.querySelectorAll('.count-number');
    
    const countObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                countUp(entry.target, target);
                countObserver.unobserve(entry.target);
            }
        });
    });
    
    countElements.forEach(element => {
        countObserver.observe(element);
    });
});

// ローディング表示
document.addEventListener('DOMContentLoaded', function() {
    // ページ読み込み完了時の処理
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
        
        // ページが完全に読み込まれた後にアニメーションクラスを追加
        document.body.classList.add('loaded');
    });
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript エラー:', e.error);
});

// その他のユーティリティ関数
const utils = {
    // デバウンス関数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // スロットル関数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}; 