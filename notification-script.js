// Notifications Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const notificationItems = document.querySelectorAll('.notification-item-page');

    function filterNotifications() {
        const selectedCategory = categoryFilter.value;
        const selectedStatus = statusFilter.value;

        notificationItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const isUnread = item.classList.contains('unread');
            
            let showItem = true;

            // Category filter
            if (selectedCategory !== 'all' && itemCategory !== selectedCategory) {
                showItem = false;
            }

            // Status filter
            if (selectedStatus === 'unread' && !isUnread) {
                showItem = false;
            } else if (selectedStatus === 'read' && isUnread) {
                showItem = false;
            }

            item.style.display = showItem ? 'flex' : 'none';
        });

        // Hide empty groups
        const groups = document.querySelectorAll('.notification-group');
        groups.forEach(group => {
            const visibleItems = group.querySelectorAll('.notification-item-page[style="display: flex"], .notification-item-page:not([style*="display: none"])');
            group.style.display = visibleItems.length > 0 ? 'block' : 'none';
        });

        updateStats();
    }

    categoryFilter.addEventListener('change', filterNotifications);
    statusFilter.addEventListener('change', filterNotifications);

    // Mark all as read
    const markAllReadBtn = document.getElementById('markAllRead');
    markAllReadBtn.addEventListener('click', function() {
        const unreadItems = document.querySelectorAll('.notification-item-page.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        updateStats();
        showToast('Bütün bildirişlər oxunmuş olaraq işarələndi');
    });

    // Delete selected notifications
    const deleteSelectedBtn = document.getElementById('deleteSelected');
    deleteSelectedBtn.addEventListener('click', function() {
        const selectedCheckboxes = document.querySelectorAll('.notification-checkbox input:checked');
        
        if (selectedCheckboxes.length === 0) {
            showToast('Silmək üçün bildirişləri seçin', 'warning');
            return;
        }

        if (confirm(`${selectedCheckboxes.length} bildirişi silmək istədiyinizə əminsiniz?`)) {
            selectedCheckboxes.forEach(checkbox => {
                const notificationItem = checkbox.closest('.notification-item-page');
                notificationItem.remove();
            });
            updateStats();
            showToast(`${selectedCheckboxes.length} bildirim silindi`);
        }
    });

    // Individual notification actions
    notificationItems.forEach(item => {
        const markReadBtn = item.querySelector('.action-btn.mark-read');
        const deleteBtn = item.querySelector('.action-btn.delete');

        // Mark as read/unread
        markReadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            item.classList.toggle('unread');
            updateStats();
            
            const isUnread = item.classList.contains('unread');
            showToast(isUnread ? 'Bildirim oxunmamış olaraq işarələndi' : 'Bildirim oxunmuş olaraq işarələndi');
        });

        // Delete notification
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Bu bildirimi silmək istədiyinizə əminsiniz?')) {
                item.remove();
                updateStats();
                showToast('Bildirim silindi');
            }
        });

        // Click on notification to mark as read and navigate
        item.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                updateStats();
            }
        });
    });

    // Select all checkbox functionality
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.id = 'selectAll';
    
    const selectAllLabel = document.createElement('label');
    selectAllLabel.htmlFor = 'selectAll';
    selectAllLabel.textContent = 'Hamısını seç';
    selectAllLabel.style.marginLeft = '0.5rem';
    selectAllLabel.style.fontSize = '0.875rem';
    selectAllLabel.style.color = '#374151';
    selectAllLabel.style.cursor = 'pointer';

    const selectAllContainer = document.createElement('div');
    selectAllContainer.style.display = 'flex';
    selectAllContainer.style.alignItems = 'center';
    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);

    const controlsLeft = document.querySelector('.controls-left');
    controlsLeft.appendChild(selectAllContainer);

    selectAllCheckbox.addEventListener('change', function() {
        const visibleCheckboxes = document.querySelectorAll('.notification-item-page:not([style*="display: none"]) .notification-checkbox input');
        visibleCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // Update stats
    function updateStats() {
        const totalNotifications = document.querySelectorAll('.notification-item-page').length;
        const unreadNotifications = document.querySelectorAll('.notification-item-page.unread').length;

        document.querySelector('.stat-item:first-child strong').textContent = totalNotifications;
        document.querySelector('.stat-item:last-child strong').textContent = unreadNotifications;
    }

    // Load more notifications
    const loadMoreBtn = document.getElementById('loadMoreNotifications');
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yüklənir...';
        this.disabled = true;

        // Simulate loading
        setTimeout(() => {
            // Add more notifications (mock data)
            const mockNotifications = [
                {
                    id: 'new-1',
                    category: 'technology',
                    title: 'Blockchain texnologiyasında yenilik',
                    text: 'Yeni blockchain protokolu təqdim edildi',
                    time: '1 həftə əvvəl',
                    unread: false
                },
                {
                    id: 'new-2',
                    category: 'sports',
                    title: 'Futbol liqasında yeni mövsüm',
                    text: 'Azərbaycan Premyer Liqasının yeni mövsümü başlayır',
                    time: '1 həftə əvvəl',
                    unread: true
                }
            ];

            const lastGroup = document.querySelector('.notification-group:last-child');
            mockNotifications.forEach(notif => {
                const notificationHTML = createNotificationHTML(notif);
                lastGroup.querySelector('.notification-item-page:last-child').insertAdjacentHTML('afterend', notificationHTML);
            });

            this.innerHTML = '<i class="fas fa-plus"></i> Daha çox bildirim yüklə';
            this.disabled = false;
            updateStats();
            showToast('Yeni bildirişlər yükləndi');
        }, 1500);
    });

    // Create notification HTML
    function createNotificationHTML(notification) {
        return `
            <div class="notification-item-page ${notification.unread ? 'unread' : 'read'}" data-category="${notification.category}" data-id="${notification.id}">
                <div class="notification-checkbox">
                    <input type="checkbox" id="notif-${notification.id}">
                    <label for="notif-${notification.id}"></label>
                </div>
                <div class="notification-icon ${notification.category}">
                    <i class="fas fa-${getIconForCategory(notification.category)}"></i>
                </div>
                <div class="notification-content-page">
                    <div class="notification-header-page">
                        <h4 class="notification-title-page">${notification.title}</h4>
                        <span class="notification-time-page">${notification.time}</span>
                    </div>
                    <p class="notification-text-page">${notification.text}</p>
                    <div class="notification-meta-page">
                        <span class="notification-category ${notification.category}">${getCategoryName(notification.category)}</span>
                        <a href="#" class="notification-link">Ətraflı oxu</a>
                    </div>
                </div>
                <div class="notification-actions-page">
                    <button class="action-btn mark-read" title="Oxunmuş et">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="action-btn delete" title="Sil">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function getIconForCategory(category) {
        const icons = {
            technology: 'microchip',
            sports: 'futbol',
            economy: 'chart-line',
            culture: 'palette',
            news: 'newspaper'
        };
        return icons[category] || 'bell';
    }

    function getCategoryName(category) {
        const names = {
            technology: 'Texnologiya',
            sports: 'İdman',
            economy: 'İqtisadiyyat',
            culture: 'Mədəniyyət',
            news: 'Xəbərlər'
        };
        return names[category] || 'Ümumi';
    }

    // Toast notification function
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#10b981' : '#f59e0b'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Hide toast
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Initialize stats
    updateStats();
});