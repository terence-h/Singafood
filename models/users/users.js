"use strict"

class User {

    constructor(id, username, password, address, firstName, lastName, email, gender, contact, profilePicture) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.contact = contact;
        this.profilePicture = profilePicture;
    }

    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getAddress() {
        return this.address;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getGender() {
        return this.gender;
    }
    getContact() {
        return this.contact;
    }
    getProfilePicture() {
        return this.profilePicture;
    }
    setUsername(username) {
        this.username = username;
    }
    setPassword(password) {
        this.password = password;
    }
    setAddress(address) {
        this.address = address;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    setGender(gender) {
        this.gender = gender;
    }
    setContact(contact) {
        this.contact = contact;
    }
    setProfilePicture(profilePicture) {
        this.profilePicture = profilePicture;
    }
}

module.exports = User;