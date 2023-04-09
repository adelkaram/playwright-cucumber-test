import { test, expect } from '@playwright/test';
import { ReservationAPI } from '../../apis/reservation.api';
import { UserFactory } from '../../fixtures/user_factory';
import { BillingPage } from '../hms/pages/billing.page';

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

test('paymob payment', async ({ page, request }) => {
  const billingPage = new BillingPage();
  test.setTimeout(120000);
  const reservationAPI = new ReservationAPI();
  ///create res API
  const user = new UserFactory()
  reservationAPI.createReservation(request,user.user,278,body).then(response => {
    console.log(response.body)
    console.log(response.json())

  });


  const response = await request.post('https://test.kwentra.com/api/reservation/individualreservation/v2/?tenant_id=278', {
    data:
      JSON.stringify(body)
    ,
    headers: {
      authorization: 'Basic ' + btoa(`admin:Adm1n1234`),
      'content-type': 'application/json',
    }
  });

  // const createdResID = (await response.json()).id;
  // console.log(createdResID);

  // ///////////////////////////////////////

  // await page.goto('https://test.kwentra.com/?tenant_id=278', { waitUntil: 'networkidle' });
  // // basePage.visit()
  // // Click the get started link.
  // await page.locator('#id_auth-username').type('admin');
  // // billingPage.writeTextToField('#id_auth-username', 'admin');
  // await page.locator('#id_auth-password').type('Adm1n1234');
  // await page.locator('button[type="submit"]').click();
  // await page.locator('#bookmarks').waitFor();

  // // await page.goto(`https://test.kwentra.com/reservation/individualreservation/${createdResID}/billing/`, { waitUntil: 'networkidle' });
  // // billingPage.visit();
  // await page.locator('#id_password').type('Adm1n1234');
  // await page.locator('input[type="submit"]').click();
  // await page.locator('div.btn-group > .btn-default').waitFor();
  // await page.locator('div.btn-group > .btn-default').click();
  // await page.locator('#open_payment > a').click();
  // await page.getByText('Kwentra Pay').waitFor();
  // await page.waitForTimeout(2000);

  // await page.getByText('Kwentra Pay').click();
  // await page.waitForTimeout(2000);

  // await page.locator('[placeholder="Amount"]').waitFor();
  // await page.locator('[placeholder="Amount"]').type('222', { delay: 100 });
  // await page.locator('#mat-input-0').waitFor();
  // await page.locator('#mat-input-0').click();
  // await page.getByText('Credit Mai - Visa - EGP').click();
  // await page.locator('#btn-container > button:nth-child(2)').click();

  // await page.frameLocator('#paymob-iframe').locator('#number').waitFor();

  // await page.frameLocator('#paymob-iframe').locator('#number').type('5123456789012346', { delay: 100 });
  // await page.frameLocator('#paymob-iframe').locator('[paymob_field="card_holdername"]').type('Test Account', { delay: 100 });

  // await page.frameLocator('#paymob-iframe').locator('#monthDate').type('12', { delay: 100 });
  // await page.frameLocator('#paymob-iframe').locator('#yearDate').type('25', { delay: 100 });
  // await page.frameLocator('#paymob-iframe').locator('[placeholder="CVV"]').type('123', { delay: 100 });

  // await page.frameLocator('#paymob-iframe').locator('#submitButton').click();
  // await page.waitForTimeout(4000);

  // await page.locator('#paragraph-container').waitFor();
  // const sucessText = await page.locator('#paragraph-container > p:nth-child(1)').innerText();
  // expect(sucessText).toBe('Payment Succeeded');
});
