import { After, Before, Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { ReservationAPI } from "../../../../apis/reservation.api";
import { HMSUser } from "../../../../models/hms-user.model";
import { BillingPage } from "../../../hms/pages/billing.page";
import { LoginPage } from "../../../login.page";
import { Browser, chromium, expect, Page } from "@playwright/test";

let page: Page
let browser: Browser
let loginPage;
let reservationAPI;
let billingPage;

let user: HMSUser;
let tenantID;
let createdResID: string;

setDefaultTimeout(60000)

Before(async () => {
    browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    page = await context.newPage();

    billingPage = new BillingPage(page);
    loginPage = new LoginPage(page);
    reservationAPI = new ReservationAPI(page)
});

// After(async () => {
// reservationAPI.changeReservationState(user, tenantID, createdResID, 'Canceled', 'reason')
// await browser.close();
// });

Given("user logged in with username {string} and password {string} and tenant ID {string}", async (username, pass, tenant_id) => {
    tenantID = tenant_id;
    user = {
        userName: username,
        password: pass
    }
    await loginPage.login(user, tenantID);
});

Given('user creates a reservation from date {string} to date {string}', async (arrivalDate, departureDate) => {
    const response = await reservationAPI.createReservation(user, tenantID, {
        arrival_date: arrivalDate,
        departure_date: departureDate
    })
    createdResID = (await response.json()).id;
});

When('user navigates to the created reservation billing screen', async () => {
    await billingPage.visit(createdResID);
    // await billingPage.visit('2929')
    await billingPage.enterCashierCredentials(user.password)
});

When('user clicks on {string} from tools', async (button) => {
    await page.waitForTimeout(3000);
    await billingPage.clickOnPaymentOnWindow(1)
});

When('user clicks on kwentra pay in payment options popup', async () => {
    await billingPage.paymentOptionsPopUp.selectKwentraPay();
    await page.waitForTimeout(3000);
});

When('user selects payment method {string} from payment methods field', async (paymentMethod) => {
    await billingPage.kwentraPayPopup.selectPaymentMethod(paymentMethod);
});

When('user enters amount {string} in amount filed', async (amount) => {
    await billingPage.kwentraPayPopup.enterAmount(amount);
});

When('user clicks on next button', async () => {
    await billingPage.kwentraPayPopup.clickNext();
});

When('user pay with the following card data', async (datatable) => {
    datatable.hashes().forEach(async cardData => {
        await page.waitForTimeout(3000);
        await billingPage.paymobIframe.pay({
            cardNumber: cardData.number,
            holderName: cardData.holderName,
            month: cardData.month,
            year: cardData.year,
            csv: cardData.csv
        })
    });
});

// todo
When('user cancels the created posting in row {string}', async (row) => {
    await billingPage.CancelWindowSelectedPosting("1", row)
})


Then('popup with message {string} should appear', async (message) => {
    await page.waitForTimeout(3000);
    await expect(billingPage.confirmationPopUp.innerText()).toBe(message);
});

Then('posting with amount {string} and department {string} should appear on row {int}', async (amount, department, row) => {
    await expect(billingPage.getPostingAmount(1, row)).toContainText(amount)
    await expect(billingPage.getPostingDepartment(1, row)).toContainText(department)
});