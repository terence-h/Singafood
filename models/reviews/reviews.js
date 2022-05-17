"use strict"

class Review {

    constructor(id, restId, userId, comment, rating, datePosted) {
        this.id = id;
        this.restId = restId;
        this.userId = userId;
        this.comment = comment;
        this.rating = rating;
        this.datePosted = datePosted;
    }

    getId() {
        return this.id;
    }
    getRestId() {
        return this.restId;
    }
    getUserId() {
        return this.userId;
    }
    getComment() {
        return this.comment;
    }
    getRating() {
        return this.rating;
    }
    getDatePosted() {
        return this.datePosted;
    }
    setRestId(restId) {
        this.restId = restId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setComment(comment) {
        this.comment = comment;
    }
    setRating(rating) {
        this.rating = rating;
    }
    setDatePosted(datePosted) {
        this.datePosted = datePosted;
    }
}

module.exports = Review;