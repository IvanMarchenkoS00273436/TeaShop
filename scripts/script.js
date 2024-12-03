import { Tea } from './models/tea.js';
import { TeaController } from './controllers/teaController.js';

console.clear();

await TeaController.loadTeasFromJSON();

TeaController.updateCartCount();

let path = window.location.pathname;
let page = path.split("/").pop();


if (page == 'index.html' || page == '') {
    TeaController.renderThreeTeas(document.getElementById('main-page-container-for-teas'));
} else if (page == 'store.html') {
    TeaController.renderTeas(document.getElementById('container-for-teas'));
} else if (page == 'cart.html') {
    TeaController.renderTeasInBasket(document.getElementById('cart-container'));
    
    document.querySelectorAll('.remove-from-basket-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const teaId = parseInt(event.target.getAttribute('data-tea-id'));
            TeaController.removeTeaFromBasket(teaId);
        });
    });
}

document.querySelectorAll('.add-to-basket-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const teaId = parseInt(event.target.getAttribute('data-tea-id'));
            const tea = TeaController.getTeaById(teaId);
            TeaController.addTeaToBasket(tea);
            console.log('Tea added to basket! with id ' + teaId);
        
            TeaController.updateCartCount();
        });
    }
);
