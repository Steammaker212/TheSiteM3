document.addEventListener("DOMContentLoaded", function() {
    const parts = document.querySelectorAll(".form-part");
    const nextButtons = document.querySelectorAll(".next-button");
    let currentPart = 0;

    function showPart(index) {
        parts[currentPart].classList.remove("active");
        parts[index].classList.add("active");
        currentPart = index;
    }

    nextButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            if (index < nextButtons.length - 1) {
                showPart(index + 1);
            }
        });
    });

    // Signature pad handling
    const signaturePad = new SignaturePad(document.getElementById("signature-pad"));
    document.getElementById("clear-signature").addEventListener("click", function() {
        signaturePad.clear();
    });

    document.getElementById("ship-device-form").addEventListener("submit", function(event) {
        if (signaturePad.isEmpty()) {
            alert("Please provide a signature first.");
            event.preventDefault();
        } else {
            document.getElementById("signature-data").value = signaturePad.toDataURL();
        }
    });
});
