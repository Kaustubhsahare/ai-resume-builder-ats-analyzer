import html2pdf from 'html2pdf.js';

export const downloadPDF = (elementId, filename = 'resume.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
};
