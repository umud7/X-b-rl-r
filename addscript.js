// Search Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create search modal
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-modal-overlay">
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Axtarış</h3>
                    <button class="search-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-modal-body">
                    <div class="search-input-container">
                        <i class="fas fa-search search-input-icon"></i>
                        <input type="text" class="search-modal-input" placeholder="Xəbər, məqalə və ya mövzu axtarın...">
                    </div>
                    <div class="search-suggestions">
                        <h4>Populyar Axtarışlar</h4>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag">Qarabağ FK</span>
                            <span class="suggestion-tag">Süni intellekt</span>
                            <span class="suggestion-tag">İqtisadiyyat</span>
                            <span class="suggestion-tag">Mədəniyyət</span>
                            <span class="suggestion-tag">Texnologiya</span>
                        </div>
                    </div>
                    <div class="search-results" style="display: none;">
                        <h4>Axtarış Nəticələri</h4>
                        <div class="search-results-list"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(searchModal);

    // Search button click
    const searchBtn = document.querySelector('.header-actions .icon-btn:first-child');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                searchModal.querySelector('.search-modal-input').focus();
            }, 100);
        });
    }

    // Close search modal
    const closeSearchBtn = searchModal.querySelector('.search-modal-close');
    const searchOverlay = searchModal.querySelector('.search-modal-overlay');
    
    closeSearchBtn.addEventListener('click', closeSearchModal);
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearchModal();
        }
    });

    function closeSearchModal() {
        searchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        searchModal.querySelector('.search-modal-input').value = '';
        searchModal.querySelector('.search-results').style.display = 'none';
        searchModal.querySelector('.search-suggestions').style.display = 'block';
    }

    // Search functionality
    const searchInput = searchModal.querySelector('.search-modal-input');
    const searchResults = searchModal.querySelector('.search-results');
    const searchSuggestions = searchModal.querySelector('.search-suggestions');
    const searchResultsList = searchModal.querySelector('.search-results-list');

    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length > 2) {
            // Simulate search results
            const mockResults = [
                {
                    title: `"${query}" ilə bağlı ən son xəbərlər`,
                    category: 'Ümumi',
                    date: '2024-01-20'
                },
                {
                    title: `${query} haqqında analitik məqalələr`,
                    category: 'Analitik',
                    date: '2024-01-19'
                },
                {
                    title: `${query} sahəsində yeniliklər`,
                    category: 'Yeniliklər',
                    date: '2024-01-18'
                }
            ];

            searchResultsList.innerHTML = mockResults.map(result => `
                <div class="search-result-item">
                    <h5>${result.title}</h5>
                    <div class="search-result-meta">
                        <span class="result-category">${result.category}</span>
                        <span class="result-date">${result.date}</span>
                    </div>
                </div>
            `).join('');

            searchSuggestions.style.display = 'none';
            searchResults.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'block';
            searchResults.style.display = 'none';
        }
    });

    // Suggestion tags click
    const suggestionTags = searchModal.querySelectorAll('.suggestion-tag');
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.textContent;
            searchInput.dispatchEvent(new Event('input'));
        });
    });

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.style.display === 'flex') {
            closeSearchModal();
        }
    });
});

// Notifications Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create notifications dropdown
    const notificationsDropdown = document.createElement('div');
    notificationsDropdown.className = 'notifications-dropdown';
    notificationsDropdown.innerHTML = `
        <div class="notifications-header">
            <h4>Bildirişlər</h4>
            <button class="mark-all-read">Hamısını oxunmuş et</button>
        </div>
        <div class="notifications-list">
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-newspaper"></i>
                </div>
                <div class="notification-content">
                    <h5>Yeni xəbər dərc edildi</h5>
                    <p>Texnologiya sahəsində yeni məqalə əlavə edildi</p>
                    <span class="notification-time">5 dəq əvvəl</span>
                </div>
                <div class="notification-dot"></div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon">
                    <i class="fas fa-futbol"></i>
                </div>
                <div class="notification-content">
                    <h5>İdman xəbəri</h5>
                    <p>Qarabağ FK-nın oyunu başladı</p>
                    <span class="notification-time">15 dəq əvvəl</span>
                </div>
                <div class="notification-dot"></div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="notification-content">
                    <h5>İqtisadi xəbər</h5>
                    <p>Yeni iqtisadi göstəricilər açıqlandı</p>
                    <span class="notification-time">1 saat əvvəl</span>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-palette"></i>
                </div>
                <div class="notification-content">
                    <h5>Mədəni hadisə</h5>
                    <p>Yeni sərgi açıldı</p>
                    <span class="notification-time">2 saat əvvəl</span>
                </div>
            </div>
        </div>
        <div class="notifications-footer">
            <a href="notifications.html" class="view-all-notifications">Bütün bildirişləri gör</a>
        </div>
    `;

    // Add to header
    const headerActions = document.querySelector('.header-actions');
    const notificationBtn = headerActions.querySelector('.icon-btn:nth-child(2)');
    
    // Add notification badge
    const notificationBadge = document.createElement('span');
    notificationBadge.className = 'notification-badge';
    notificationBadge.textContent = '2';
    notificationBtn.style.position = 'relative';
    notificationBtn.appendChild(notificationBadge);
    notificationBtn.appendChild(notificationsDropdown);

    // Toggle notifications dropdown
    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsDropdown.classList.toggle('active');
        
        // Close other dropdowns
        document.querySelectorAll('.user-dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Mark all as read
    const markAllReadBtn = notificationsDropdown.querySelector('.mark-all-read');
    markAllReadBtn.addEventListener('click', function() {
        const unreadItems = notificationsDropdown.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        notificationBadge.style.display = 'none';
    });

    // Click on notification item
    const notificationItems = notificationsDropdown.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            // Update badge count
            const unreadCount = notificationsDropdown.querySelectorAll('.notification-item.unread').length;
            if (unreadCount === 0) {
                notificationBadge.style.display = 'none';
            } else {
                notificationBadge.textContent = unreadCount;
            }
        });
    });
});

// User Login/Profile Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create user dropdown
    const userDropdown = document.createElement('div');
    userDropdown.className = 'user-dropdown';
    userDropdown.innerHTML = `
        <div class="user-info">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-details">
                <h4>Qonaq İstifadəçi</h4>
                <p>Hesabınıza daxil olun</p>
            </div>
        </div>
        <div class="user-menu">
            <a href="#" class="user-menu-item login-btn">
                <i class="fas fa-sign-in-alt"></i>
                Daxil ol
            </a>
            <a href="#" class="user-menu-item register-btn">
                <i class="fas fa-user-plus"></i>
                Qeydiyyat
            </a>
            <div class="menu-divider"></div>
            <a href="#" class="user-menu-item">
                <i class="fas fa-bookmark"></i>
                Saxlanmış məqalələr
            </a>
            <a href="#" class="user-menu-item">
                <i class="fas fa-cog"></i>
                Tənzimləmələr
            </a>
            <a href="#" class="user-menu-item">
                <i class="fas fa-question-circle"></i>
                Kömək
            </a>
        </div>
    `;

    // Add to header
    const userBtn = document.querySelector('.header-actions .icon-btn:last-child');
    userBtn.style.position = 'relative';
    userBtn.appendChild(userDropdown);

    // Toggle user dropdown
    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
        
        // Close other dropdowns
        document.querySelectorAll('.notifications-dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Login modal
    const loginModal = document.createElement('div');
    loginModal.className = 'login-modal';
    loginModal.innerHTML = `
        <div class="login-modal-overlay">
            <div class="login-modal-content">
                <div class="login-modal-header">
                    <h3>Hesabınıza Daxil Olun</h3>
                    <button class="login-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="login-modal-body">
                    <form class="login-form">
                        <div class="form-group">
                            <label for="email">E-poçt ünvanı</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Şifrə</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" name="remember">
                                <span class="checkmark"></span>
                                Məni xatırla
                            </label>
                            <a href="#" class="forgot-password">Şifrəni unutmusunuz?</a>
                        </div>
                        <button type="submit" class="btn btn-primary btn-large">Daxil ol</button>
                    </form>
                    <div class="login-divider">
                        <span>və ya</span>
                    </div>
                    <div class="social-login">
                        <button class="btn btn-outline social-btn">
                            <i class="fab fa-google"></i>
                            Google ilə daxil ol
                        </button>
                        <button class="btn btn-outline social-btn">
                            <i class="fab fa-facebook"></i>
                            Facebook ilə daxil ol
                        </button>
                    </div>
                    <div class="login-footer">
                        <p>Hesabınız yoxdur? <a href="#" class="register-link">Qeydiyyatdan keçin</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(loginModal);

    // Login button click
    const loginBtn = userDropdown.querySelector('.login-btn');
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        userDropdown.classList.remove('active');
    });

    // Close login modal
    const closeLoginBtn = loginModal.querySelector('.login-modal-close');
    const loginOverlay = loginModal.querySelector('.login-modal-overlay');
    
    closeLoginBtn.addEventListener('click', closeLoginModal);
    loginOverlay.addEventListener('click', function(e) {
        if (e.target === loginOverlay) {
            closeLoginModal();
        }
    });

    function closeLoginModal() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Login form submission
    const loginForm = loginModal.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.email.value;
        const password = this.password.value;
        
        // Simulate login
        if (email && password) {
            alert('Uğurla daxil oldunuz!');
            closeLoginModal();
            
            // Update user dropdown
            userDropdown.querySelector('.user-details h4').textContent = email.split('@')[0];
            userDropdown.querySelector('.user-details p').textContent = 'İstifadəçi';
            
            // Update menu
            const userMenu = userDropdown.querySelector('.user-menu');
            userMenu.innerHTML = `
                <a href="#" class="user-menu-item">
                    <i class="fas fa-user"></i>
                    Profil
                </a>
                <a href="#" class="user-menu-item">
                    <i class="fas fa-bookmark"></i>
                    Saxlanmış məqalələr
                </a>
                <a href="#" class="user-menu-item">
                    <i class="fas fa-cog"></i>
                    Tənzimləmələr
                </a>
                <div class="menu-divider"></div>
                <a href="#" class="user-menu-item logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Çıxış
                </a>
            `;
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.notifications-dropdown.active, .user-dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});