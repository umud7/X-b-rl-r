// Vacancies Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Position Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const positionCards = document.querySelectorAll('.position-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter positions
            positionCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Application Form Functionality
    const applicationForm = document.getElementById('applicationForm');
    const positionTitle = document.getElementById('positionTitle');
    const applyButtons = document.querySelectorAll('.position-apply-btn');
    const cancelButton = document.getElementById('cancelApplication');
    const jobApplicationForm = document.getElementById('jobApplicationForm');

    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const position = this.getAttribute('data-position');
            positionTitle.textContent = position;
            applicationForm.style.display = 'block';
            applicationForm.scrollIntoView({ behavior: 'smooth' });
        });
    });

    cancelButton.addEventListener('click', function() {
        applicationForm.style.display = 'none';
        jobApplicationForm.reset();
    });

    // Form Submission
    jobApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Göndərilir...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Müraciətiniz uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.');
            this.reset();
            applicationForm.style.display = 'none';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle i');

        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.display = 'none';
                toggle.className = 'fas fa-plus';
            } else {
                answer.style.display = 'block';
                toggle.className = 'fas fa-minus';
            }
        });
    });

    // File Upload Validation
    const cvInput = document.getElementById('cv');
    
    cvInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024; // MB
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (fileSize > 5) {
                alert('Fayl ölçüsü 5MB-dan böyük ola bilməz.');
                this.value = '';
                return;
            }
            
            if (!allowedTypes.includes(file.type)) {
                alert('Yalnız PDF və DOC formatları qəbul edilir.');
                this.value = '';
                return;
            }
        }
    });
});