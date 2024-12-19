import { TeaController } from './controllers/teaController.js';

console.log('Checkout page loaded');

setTimeout(() => {
    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get delivery address details
        const addressLine1 = document.getElementById('addressLine1').value;
        const addressLine2 = document.getElementById('addressLine2').value;
        const city = document.getElementById('city').value;
        const county = document.getElementById('county').value;
        const eircode = document.getElementById('eircode').value;
    
        // Get payment details
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
    
        // For now, show a confirmation message and clear the basket
        let main = document.getElementById('main');
        main.innerHTML = `
            <h1>Order Confirmed</h1>
            <p>Your order has been confirmed and will be delivered to:</p>
            <p>${addressLine1}</p>
            <p>${addressLine2}</p>
            <p>${city}</p>
            <p>${county}</p>
            <p>${eircode}</p>
            <p>Thank you for shopping with us!</p>
            <a href="index.html" class="btn btn-primary">Return to home page</a>
        `;
    
        // Clear the basket
        TeaController.teasInBasket = [];
        TeaController.saveTeasToCookies();
        TeaController.updateCartCount();
    });
}, 0);