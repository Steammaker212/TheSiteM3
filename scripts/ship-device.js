document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling
    const form = document.getElementById('ship-device-form');
    const confirmationSection = document.getElementById('submission-confirmation');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch('scripts/submit-form.php', {
            method: 'POST',
            body: new FormData(form)
        })
       .then(response => response.text())
       .then(data => {
            form.style.display = 'none';
            confirmationSection.style.display = 'block';
            confirmationSection.innerHTML = data;
        })
       .catch(error => {
            console.error('Error:', error);
            confirmationSection.innerHTML = '<p>There was an error processing your request. Please try again later.</p>';
        });
    });

    // Form part navigation
    const formParts = document.querySelectorAll('.form-part');
    let currentPartIndex = 0;

    function showPart(index) {
        formParts.forEach((part, i) => {
            if (i === index) {
                part.classList.add('active');
                part.style.display = 'block'; // Show the current part
            } else {
                part.classList.remove('active');
                part.style.display = 'none'; // Hide all other parts
            }
        });
    }

    function verifyTerms() {
        const termsCheckbox = document.getElementById('terms-agree');
        const isTermsVerified = termsCheckbox.checked && currentPartIndex === 3;
        
        if (isTermsVerified) {
          // If terms are verified, move to the next part
          showPart(currentPartIndex + 1);
        } else {
          // If terms are not verified, display an error message or prompt
          alert('Please agree to the terms and conditions.');
        }
      }

    const nextButtons = document.querySelectorAll('.next-button');
    nextButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const currentPart = formParts[currentPartIndex];
            const requiredInputs = currentPart.querySelectorAll('input[required], select[required], textarea[required]');
            let allInputsValid = true;

            // Check if all required inputs are filled
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    allInputsValid = false;
                }
            });

            if (allInputsValid) {
                if (currentPartIndex === 0) {
                    // If on terms and conditions part, verify terms
                    verifyTerms();
                } else {
                    // Otherwise, move to the next part
                    currentPartIndex++;
                    showPart(currentPartIndex + 1);
                }
            } else {
                // If not all required inputs are filled, display an error message or prompt
                alert('Please fill in all required fields.');
            }
            if (allInputsValid) {
                if (currentPartIndex === 2) {
                    // If on terms and conditions part, verify terms
                    verifyTerms();
                } else {
                    // Otherwise, move to the next part
                    currentPartIndex++;
                    showPart(currentPartIndex + 1);
                }
            } else {
                // If not all required inputs are filled, display an error message or prompt
                alert('Please fill in all required fields.');
            }
        });
    });

    // Initialize the first part
    showPart(0);
});