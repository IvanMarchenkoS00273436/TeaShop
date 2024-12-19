import {Tea} from '../models/tea.js';
export {TeaController}

class TeaController {
    static teas = []; // Array of Tea objects
    static teasInBasket = []; // Array of teas in basket

    static addTea = (tea) => this.teas.push(tea);
    static getTeas = () => this.teas;
    static getTeaById = (id) => this.teas.find(tea => tea.id == id);
    static updateTea = (id, tea) => this.teas[this.teas.findIndex(tea => tea.id == id)] = tea;
    static deleteTea = (id) => this.teas = this.teas.filter(tea => tea.id != id);

    static async renderTeas(where) {
        // Filtering
        where.innerHTML = '';
        let teas = this.getTeas();

        let filterPrice = document.getElementById('filter-price').value;
        let regexPrice = /[+-]?([0-9]*[.])?[0-9]+/;
        
        let filterNames = [];
        for (let i = 0; i < this.getTeas().length; i++) {
            let teaName = this.getTeas()[i].name;
            let checkbox = document.getElementById(teaName);
            if (checkbox && checkbox.checked) {
                filterNames.push(teaName);
            }
        }


        if(regexPrice.test(filterPrice)) {
            teas = this.getTeas().filter(tea => tea.price <= filterPrice);
        } 
        if(filterNames.length > 0) {
            teas = teas.filter(tea => filterNames.includes(tea.name));
        }
        teas.forEach(tea => { where.innerHTML += tea.render(); });
    }

    static async renderThreeTeas(where) {
        const teas = this.getTeas();
        for (let i = 0; i < 3; i++) {
            where.innerHTML += teas[i].render();
        }
    }

    static async loadTeasFromJSON(){
        await fetch('data/teas.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(tea => {
                const newTea = new Tea(tea.id, tea.name, tea.description, tea.price, tea.image);
                this.addTea(newTea);
            });
        })
        .catch(error => console.error(error));
    }

    static async renderNamesForFilter() {
        const where = document.getElementById('filter-names');
        const teas = this.getTeas();

        teas.forEach(tea => {
            where.innerHTML += `
                <label class="form-check-label" for="${tea.name}">${tea.name}</label>
                <input type="checkbox" class="form-check-input" id="${tea.name}"><br>
            `;
        });
    }

    // Basket features
    // =====================================================================================
    static addTeaToBasket(tea) {
        this.loadTeasFromCookies();

        const existingTea = this.teasInBasket.find(teaInBasket => teaInBasket.id == tea.id);

        if(existingTea) {
            existingTea.amount = existingTea.amount + 1;
            console.log('Tea amount increased!');
            console.log(this.teasInBasket);
        } else {
            tea.amount = 1;
            this.teasInBasket.push(tea);
        }

        this.saveTeasToCookies();
        this.updateCartCount();
    }

    static loadTeasFromCookies() {
        const cookies = document.cookie.split(';');
        const teasInBasket = cookies.find(cookie => cookie.includes('teasInBasket'));
        if (teasInBasket) {
            const teaData = JSON.parse(teasInBasket.split('=')[1]);
            this.teasInBasket = teaData.map(tea => new Tea(tea.id, tea.name, tea.description, tea.price, tea.image, tea.amount));
        }
    }

    static saveTeasToCookies() {
        document.cookie = `teasInBasket=${JSON.stringify(this.teasInBasket)}; path=/`;
    }

    static removeTeaFromBasket(teaId) {
        this.teasInBasket = this.teasInBasket.filter(tea => tea.id != teaId);
        this.saveTeasToCookies();
        this.loadTeasFromCookies();
        
        this.renderTeasInBasket(document.getElementById('cart-container'));
        this.updateCartCount();
    }

    static renderTeasInBasket(where){
        this.loadTeasFromCookies();
        where.innerHTML = '';

        document.getElementById('total-price').textContent = "Total price: " + this.getTotalPrice() + "€";
        this.teasInBasket.forEach(tea => {
            where.innerHTML += tea.renderForCart();

            setTimeout(() => {
                document.getElementById(`amount${tea.id}`).value = tea.amount;
                document.getElementById(`amount${tea.id}`).addEventListener('change', () => {
                    const newAmount = parseInt(document.getElementById(`amount${tea.id}`).value);
                    if (newAmount > 0) {
                        tea.amount = newAmount;
                    } else {
                        tea.amount = 1;
                        document.getElementById(`amount${tea.id}`).value = 1;
                    }
                    this.saveTeasToCookies();
                    document.getElementById('total-price').textContent = "Total price: " + this.getTotalPrice() + "€";
                });
                document.querySelectorAll('.remove-from-basket-btn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const teaId = parseInt(event.target.getAttribute('data-tea-id'));
                        TeaController.removeTeaFromBasket(teaId);
                    });
                });
            }, 0);
        });
    }

    static getAmountOfTeasInBasket() {
        this.loadTeasFromCookies();
        return this.teasInBasket.length;
    }

    static updateCartCount() {
        document.getElementById('cart-count').textContent = this.getAmountOfTeasInBasket();
    }

    static getTotalPrice() {
        return this.teasInBasket.reduce((total, tea) => total + tea.price * tea.amount, 0).toFixed(2);
    }
}