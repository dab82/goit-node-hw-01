const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
	try {
		const dataString = await fs.readFile(contactsPath, "utf-8");
		const data = JSON.parse(dataString);
		return data;
	} catch (error) {
		console.error(error.massage);
	}
}

async function getContactById(contactId) {
	try {
		const allContacts = await listContacts();
		const contactById = allContacts.find(
			(contact) => contact.id === `${contactId}`
		);
		return contactById;
	} catch (error) {
		console.error(error.massage);
	}
}

async function removeContact(contactId) {
	try {
		const allContacts = await listContacts();
		const idx = allContacts.findIndex(
			(contact) => contact.id === `${contactId}`
		);
		const removeContactById = allContacts[idx];
		if (idx !== -1) {
			allContacts.splice(idx, 1);
			await fs.writeFile(contactsPath, JSON.stringify(allContacts));
		}
	} catch (error) {
		console.error(error.massage);
	}
}

async function addContact(name, email, phone) {
	try {
		const newContact = {
			id: uuid.v4(),
			name,
			email,
			phone,
		};
		const allContacts = await listContacts();
		allContacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(allContacts));
	} catch (error) {
		console.error(error.massage);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
