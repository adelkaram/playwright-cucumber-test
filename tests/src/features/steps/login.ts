
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium,Page,Browser,} from 'playwright';
import { test, expect } from '@playwright/test';
let Browser;
let page: Page;

Given('I navigate to the login page', async function () {
 Browser = await chromium.launch({headless:false});
 page = await Browser.newPage();
 await page.goto('https://eshop.vodafone.com.eg/ar/');

});

When('I click on close button in popup', async function () {
    await page.getByLabel('إغلاق').click();
});

When('I click on my profile page', async function () {
    await page.locator('#userProfileMenu').getByRole('button').click();
});

When('I should be logged in successfully', async function () {
    await page.getByText('Hello! Managing your line has').click();

         });

 When('I click on username field', async function () {
            await page.getByPlaceholder('Ex: 01X XXXXXXXXXX').fill('01023514484');
        
                 });
When('I click on password field', async function () {
                    await page.getByLabel('Password').fill('158962347890a@A');
                
                         });
When('I tab on screen for submit button appear', async function () {
    await page.getByLabel('Password').press('Control+x');
                                                
    });
 When('I click on submit button', async function () {
    await page.getByRole('button', { name: 'Go to my account' }).click();
                        
     });

     Then('I directs to home page and loged in', async function () {
        await expect(page.getByRole('button', { name: 'مرحباً, usertest' })).toBeTruthy();
                            
         });

         Then('Close browser', async function () {
            await Browser.close();
                                
             });