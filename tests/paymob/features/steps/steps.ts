import { Before, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { OurWorld } from "../type";

// Before(async function () {
//     this.browser = await chromium.launch();
//     this.page = await this.browser.newPage();
// })
const body = {
    // "auditDate": "2022-01-16T22:00:00.000Z",
    // "addNew": false,
    // "saved": false,
    // "mode": "edit from listing",
    // "stateReadonly": false,
    // "check_in_time": "14:00:00",
    // "check_out_time": "12:00:00",
    // "purpose_of_stay": "1",
    // "rate_confirmation": "Confirmed",
    // "reservation_confirmation": "Confirmed",
    // "guarantee_type": 2,
    // "reservation_mode": "daily",
    "arrival_date": "2022-01-17",
    "departure_date": "2022-01-18",
    "room_nights": [
        {
            "room_type": 1,
            "rate": undefined,
            "room_number": undefined,
            "actual_room_type": 1,
            "from_date": "2022-01-17",
            "to_date": "2022-01-17",
            "children": [],
            "number_of_adults": 1,
            "number_of_children": 0,
            "manual_rate": true,
            "daily_charges_posted": false,
            "upgrade": false,
            "currency": '1',
            "rate_amount": '100',
            "parent_room_type": undefined,
            "parent_room_category": 1,
            "discount_amount": 0,
            "discount_percentage": 0
        }
    ],
    // "market": "",
    // "source": "",
    // "channel": 2,
    // "voucher_no": null,
    // "block": "",
    // "country": "AS",
    // "arrival_flight_number": null,
    // "arrival_flight_time": null,
    // "departure_flight_number": null,
    // "departure_flight_time": null,
    // "attachment": null,
    // "actual_departure_date": null,
    // "booker": "",
    // "name": 426,
    // "other_names": [],
    // "group_reservation": "",
    // "credit_card": "",
    // "guest_flag": "",
    // "order": "",
    // "created_on": "2023-04-01\n             21:59:35.2458",
    // "updated_on": "2023-04-01T21:59:35.262658Z",
    // "closed_to_cashiering": false,
    // "first_meal": 2,
    // "language": "",
    // "bulk_rate": false,
    // "company": "",
    // "confirmation_sent": false,
    // "remarks": "",
    // "arrival_datetime": "2022-01-17T14:00:00Z",
    // "departure_datetime": "2022-01-18T12:00:00Z",
    // "hold_date": null,
    // "hold_status": "CONFIRMED",
    // "edits": {
    //   "created_by": {
    //     "id": 1,
    //     "username": "admin",
    //     "action_time": "2023-04-01T21:59:35.313299Z"
    //   },
    //   "updated_by": {
    //     "id": null,
    //     "username": null,
    //     "action_time": null
    //   }
    // },
    // "readonly": false,
    // "balance": 0,
    // "shared": false,
    // "card_compartment": null,
    // "notes": [],
    // "do_not_move": false,
    // "auto_send_folio": false,
    // "confirmation_number": null,
    // "links": {
    //   "reservationchangeddata_set": "reservationchangeddata_set/"
    // },
    // "has_error": false,
    // "cloned": false,
    // "updated": false,
    // "reservation_dates_changed": false,
    // "upgrade": true,
    // "amount_summary": {
    //   "rate": [
    //     121,
    //     121
    //   ],
    //   "net_rate": [
    //     100,
    //     100
    //   ],
    //   "fixed_charges": [
    //     0,
    //     0
    //   ],
    //   "add_on_packages": [
    //     0,
    //     0
    //   ],
    //   "total_stay": [
    //     121,
    //     121
    //   ],
    //   "currency": [
    //     "EGP",
    //     "EGP"
    //   ]
    // },
    // "clone": {
    //   "reservation_id": 2898,
    //   "fixed_charges": false,
    //   "addon_packages": false,
    //   "alerts": false
    // },
    // "account": null,
    // "state": null,
    // "id": null,
    // "check_validation": true,
    // "action": null,
    // "files": [],
    // "overbook": true
};
Given("user logged in with username {string} and password {string} and tenant ID {string}", async function (username, password, tenanID) {
    this.browser = await chromium.launch({
        headless: false,
        slowMo: 50,
    });
    this.page = await this.browser.newPage();
    await this.page.goto('https://test.kwentra.com/?tenant_id=278');
    await this.page.locator('#id_auth-username').type('admin');
    await this.page.locator('#id_auth-password').type('Adm1n1234');
    await this.page.locator('button[type="submit"]').click();
    await this.page.locator('#bookmarks').waitFor();


    console.log('mmmmmmmmmmmmmmmmmmmmmmm')
});
