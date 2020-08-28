import ticketsUI from '../views/tickets';

class FavoriteTickets {
    constructor() {
        this.container = document.querySelector('.dropdown-content');
        this.emptyMsg = document.querySelector('.empty-fav-msg');
    }

    addToFavorite(ticket) {
        const airlineImg = ticket.querySelector('.ticket-airline-img').src;
        const origin = ticket.querySelectorAll('.ticket-city')[0].textContent;
        const destination = ticket.querySelectorAll('.ticket-city')[1].textContent;
        const date = ticket.querySelector('.ticket-time-departure').textContent;
        const price = ticket.querySelector('.ticket-price').textContent;
        const transfers = ticket.querySelector('.ticket-transfers').textContent;
        const flightNumber = ticket.querySelector('.ticket-flight-number').textContent;
        const template = FavoriteTickets.favoriteTicketTemplate(airlineImg, origin, destination, date, price, transfers, flightNumber);
        this.container.insertAdjacentHTML('beforeend', template);
    }

    deleteFromFavorites(ticket) {
        ticket.remove();
    }

    checkEmptiness() {
        if (!this.container.firstChild) {
            this.emptyMsg.style.di1splay = 'block !important';
        } else {
            this.emptyMsg.style.display = 'none';
        }
    }

    static favoriteTicketTemplate(airlineImg, origin, destination, date, price, transfers, flightNumber) {
        return `<div class="favorite-item  d-flex align-items-start">
                    <img src="${airlineImg}" class="favorite-item-airline-img" />
                    <div class="favorite-item-info d-flex flex-column">
                        <div class="favorite-item-destination d-flex align-items-center">
                            <div class="d-flex align-items-center mr-auto">
                                <span class="favorite-item-city">${origin}</span>
                                <i class="medium material-icons">flight_takeoff</i>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="medium material-icons">flight_land</i>
                                <span class="favorite-item-city">${destination}</span>
                            </div>
                        </div>
                        <div class="ticket-time-price d-flex align-items-center">
                            <span class="ticket-time-departure">${date}</span>
                            <span class="ticket-price ml-auto">${price}</span>
                        </div>
                        <div class="ticket-additional-info">
                            <span class="ticket-transfers">${transfers}</span>
                            <span class="ticket-flight-number">${flightNumber}</span>
                        </div>
                        <a
                            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
                    </div>
                </div>`;
    }
}

const favoriteTickets = new FavoriteTickets(ticketsUI);

export default favoriteTickets;