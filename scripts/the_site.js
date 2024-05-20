const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    menu.style.transition = 'left 0.3s ease-out';
    menu.style.left = menu.style.left === '-290px'? '0' : '-290px';
  };
  

  function redirectToLogin() {
    window.location.href = 'login.html';
  }
  
  function redirectToCart() {
    window.location.href = 'addtocart.html';
  }
  