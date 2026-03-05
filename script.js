document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewSection = document.getElementById('preview-section');
    const originalPreview = document.getElementById('original-preview');
    const resultPreview = document.getElementById('result-preview');
    const processBtn = document.getElementById('process-btn');
    const clearBtn = document.getElementById('clear-btn');
    const downloadSection = document.getElementById('download-section');
    const downloadLink = document.getElementById('download-link');
    const loadingOverlay = document.getElementById('loading-overlay');
    const themeToggle = document.getElementById('theme-toggle');

    let currentFile = null;

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }

    // Drag and Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFile(file);
    });

    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPG, PNG).');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('File is too large. Max size is 10MB.');
            return;
        }

        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            originalPreview.src = e.target.result;
            resultPreview.src = e.target.result; // Temporarily show original
            resultPreview.style.opacity = '0.5';
            
            dropZone.classList.add('hidden');
            previewSection.classList.remove('hidden');
            downloadSection.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    // Process Image
    processBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        const formData = new FormData();
        formData.append('image', currentFile);

        loadingOverlay.classList.remove('hidden');
        processBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:5000/remove-background', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process image');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            resultPreview.src = url;
            resultPreview.style.opacity = '1';
            downloadLink.href = url;
            
            downloadSection.classList.remove('hidden');
            // Scroll to download section
            downloadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        } finally {
            loadingOverlay.classList.add('hidden');
            processBtn.disabled = false;
        }
    });

    // Clear Image
    clearBtn.addEventListener('click', () => {
        currentFile = null;
        originalPreview.src = '';
        resultPreview.src = '';
        dropZone.classList.remove('hidden');
        previewSection.classList.add('hidden');
        fileInput.value = '';
    });
});
