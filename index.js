const yargs = require('yargs');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const { argv } = yargs(process.argv.slice(2));

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contactsList = await listContacts();
        console.table(contactsList);
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    case 'get':
      try {
        const contact = await getContactById(id);
        if (contact) {
          console.log('Contact by ID:', contact);
        } else {
          console.log('Contact not found.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    case 'add':
      try {
        const newContact = await addContact(name, email, phone);
        console.log('Added contact:', newContact);
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    case 'remove':
      try {
        const removedContact = await removeContact(id);
        if (removedContact) {
          console.log('Removed contact:', removedContact);
        } else {
          console.log('Contact not found.');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
