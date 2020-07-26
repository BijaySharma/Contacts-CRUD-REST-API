import {
    addNewContact,
    getContacts,
    getContactsByID,
    updateContact,
    deleteContact
} from  '../controllers/crmController';

const routes = (app) => {
    app.route('/contact')
        .get(getContacts)
        
        .post(addNewContact);

    
    app.route('/contact/:contactID')
        .get(getContactsByID)

        .put(updateContact)
        
        .delete(deleteContact);

};

export default routes;