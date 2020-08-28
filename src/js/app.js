import '../css/style.css';
import './plugins';
import locations from './store/location';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoriteTickets from './store/favoriteTickets';


document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;
    const ticketSection = document.querySelector('.tickets-sections');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Events
    form.addEventListener('submit', e => {
        e.preventDefault();
        onFormSubmit();
    });
    ticketSection.addEventListener('click', e => {
        onTicketClick(e);
    });
    dropdownContent.addEventListener('click', e => {
        onTicketClick(e);
    });

    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        ticketsUI.renderTickets(locations.lastSearch);
    }

    function onTicketClick(event) {
        favoriteTickets.checkEmptiness();
        const target = event.target;
        const actionBtn = target.closest('.add-favorite') || target.closest('.delete-favorite');
        if (target.closest('.add-favorite') && actionBtn) {
            const ticket = actionBtn.closest('.ticket-card');
            favoriteTickets.addToFavorite(ticket);
        }
        if (target.closest('.delete-favorite') && actionBtn) {
            const ticket = actionBtn.closest('.favorite-item');
            favoriteTickets.deleteFromFavorites(ticket);
        }
    }
});