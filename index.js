const argv = require("yargs").argv;

const contactsOperation = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contacts = await contactsOperation.listContacts();
			console.table(contacts);
			break;

		case "get":
			const contactById = await contactsOperation.getContactById(id);
			if (!contactById) {
				throw new Error(`Contact with id - ${id} not found`);
			}
			break;

		case "add":
			const newContact = await contactsOperation.addContact(name, email, phone);
			break;

		case "remove":
			const removeContact = await contactsOperation.removeContact(id);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
