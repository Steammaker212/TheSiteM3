document.getElementById('track-progress-btn').addEventListener('click', function() {
    document.getElementById('tracking-section').style.display = 'block';
    window.scrollTo({
        top: document.getElementById('tracking-section').offsetTop,
        behavior: 'smooth'
    });
});

document.getElementById('tracking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const trackingCode = document.getElementById('tracking-code').value;

    fetch('scripts/track-device.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'tracking-code': trackingCode
        })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('tracking-result').innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('tracking-result').innerHTML = '<p>There was an error processing your request. Please try again later.</p>';
    });
});
