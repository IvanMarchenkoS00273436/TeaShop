export {Tea}

class Tea {
    constructor(id,name,description, price, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    render() {
        return `<div class="col">
            <div class="card h-100">
                <img src="images/${this.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p id="${this.id}" hidden></p>
                    <h5 class="card-title bg-warning-subtle">${this.name}</h5>
                    <p class="card-text">${this.description}</p>
                    <p class="card-text bg-info-subtle">Price: ${this.price}€</p>
                    <a href="#" class="btn btn-primary add-to-basket-btn" data-tea-id="${this.id}"
                        id="add-to-basket-btn">
                        Add to your basket
                    </a>
                </div>
            </div>
        </div>`
    }

    renderForCart() {
        return `
            <div class="card m-3 h-100">
                <div class="row">
                    <div class="col-xs-12 col-md-4 col-lg-3 col-xl-2">
                        <img src="images/${this.image}" class="card-img-top rounded" alt="...">
                    </div>
                    <div class="col-xs-12 col-md-8 col-lg-9 col-xl-10">
                        <div class="card-body">
                            <h5 class="card-title bg-warning-subtle">${this.name}</h5>
                            <p class="card-text">${this.description}</p>
                            <p class="card-text bg-info-subtle">Price: ${this.price}€</p>
                            <a href="#" class="btn btn-danger remove-from-basket-btn" 
                                data-tea-id="${this.id}">
                                Remove from basket
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}