export { User };

class User {
    constructor(id, name, email, password, address, city, zip) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.zip = zip;
    }
}