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
        const teas = this.getTeas();
            teas.forEach(tea => {
                where.innerHTML += tea.render();
            });
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

    // Basket features
    // =====================================================================================
    static addTeaToBasket(tea) {
        this.loadTeasFromCookies();
        this.teasInBasket.push(tea);
        this.saveTeasToCookies();
    }

    static loadTeasFromCookies() {
        const cookies = document.cookie.split(';');
        const teasInBasket = cookies.find(cookie => cookie.includes('teasInBasket'));
        if (teasInBasket) {
            const teaData = JSON.parse(teasInBasket.split('=')[1]);
            this.teasInBasket = teaData.map(tea => new Tea(tea.id, tea.name, tea.description, tea.price, tea.image));
        }
    }

    static saveTeasToCookies() {
        document.cookie = `teasInBasket=${JSON.stringify(this.teasInBasket)}; path=/`;
    }

    static removeTeaFromBasket(teaId) {
        this.teasInBasket = this.teasInBasket.filter(id => id != teaId);
        this.saveTeasToCookies();
        this.loadTeasFromCookies();
    }

    static renderTeasInBasket(where){
        this.loadTeasFromCookies();
        console.log(this.teasInBasket);

        this.teasInBasket.forEach(tea => {
            where.innerHTML += tea.renderForCart();
        });
    }
}