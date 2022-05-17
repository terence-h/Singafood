"use strict"

class Restaurant {
    
    constructor(id, name, address, region, priceRange, rating, contact, description, thumb, url){
        this.id = id;
        this.name = name;
        this.address = address;
        this.region = region;
        this.priceRange = priceRange;
        this.rating = rating;
        this.contact = contact;
        this.description = description;
        this.thumb = thumb;
        this.url = url;
    }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    getRegion() {
        return this.region;
    }
    getPriceRange() {
        return this.priceRange;
    }
    getRating() {
        return this.rating;
    }
    getContact() {
        return this.contact;
    }
    getDescription() {
        return this.description;
    }
    getThumb() {
        return this.thumb;
    }
    getUrl() {
        return this.url;
    }
}

module.exports = Restaurant;