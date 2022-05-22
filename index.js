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
			console.log(`Contact with id - ${id}:`, contactById);
			break;

		case "add":
			const newContact = await contactsOperation.addContact(name, email, phone);
			console.log("This contact has been added to the database:", newContact);
			break;

		case "remove":
			const removeContact = await contactsOperation.removeContact(id);
			console.log(
				`The contact with this id - ${id}  has been deleted:`,
				removeContact
			);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
