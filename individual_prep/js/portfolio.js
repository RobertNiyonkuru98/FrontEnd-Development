  let editMode = false;

  function toggleEdit() {
    editMode = !editMode;
    const resume = document.getElementById('resume');
    const btn = document.getElementById('edit-btn');
    const badge = document.getElementById('edit-badge');
    const fields = resume.querySelectorAll('[contenteditable]');

    if (editMode) {
      resume.classList.add('edit-mode');
      fields.forEach(f => f.setAttribute('contenteditable', 'true'));
      btn.textContent = '✅ Done Editing';
      btn.classList.remove('ghost');
      btn.classList.add('primary');
      badge.style.display = 'block';
    } else {
      resume.classList.remove('edit-mode');
      fields.forEach(f => f.setAttribute('contenteditable', 'false'));
      btn.textContent = '✏️ Edit Mode';
      btn.classList.add('ghost');
      btn.classList.remove('primary');
      badge.style.display = 'none';
    }
  }

  function downloadPDF() {
    // Turn off edit mode before exporting
    if (editMode) toggleEdit();

    const element = document.getElementById('resume');
    
    // 1 CSS pixel is equal to 0.264583 millimeters
    const pxToMm = 0.264583;
    
    // Define the white space margin around the resume in mm
    const margin = 10;
    
    // Calculate the exact PDF page dimensions needed
    const pdfWidth = (element.offsetWidth * pxToMm) + (margin * 2);
    const pdfHeight = (element.offsetHeight * pxToMm) + (margin * 2);

    const opt = {
      margin: margin,
      filename: 'Robert_Tony_MITALI_Resume.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        scrollY: 0, // Prevents vertical shift
        letterRendering: true
      },
      jsPDF: { unit: 'mm', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }