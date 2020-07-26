import {
    addNewContact,
    getContacts,
    getContactsByID,
    updateContact,
    deleteContact
} from  '../controllers/crmController';
import {
    register,
    login,
    loginRequired
} from '../controllers/userController';

const routes = (app) => {
    app.route('/contacts')
        .get(loginRequired, getContacts)
        
        .post(loginRequired, addNewContact);

    
    app.route('/contact/:contactID')
        .get(loginRequired, getContactsByID)

        .put(loginRequired, updateContact)
        
        .delete(loginRequired, deleteContact);

    app.route('/auth/register')
        .post(register);
    
    app.route('/auth/login')
        .post(login);

};

export default routes;