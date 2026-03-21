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
    const opt = {
      margin: 0,
      filename: 'Robert_Tony_MITALI_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }