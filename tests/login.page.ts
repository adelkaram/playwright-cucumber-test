// import { String } from 'typescript-string-operations';
// import { BasePage } from '../fixtures/base.page';
// import { HMSUser } from '../models/hms-user.model';

// export class LoginPage extends BasePage {
//     protected url = "?tenant_id={0}";
//     protected elementsSelectors = {
//         inputField: '#id_auth-{0}',
//         loginButton: 'button[type="submit"]'
//     };

//     async login(user: HMSUser, tenanID: string) {
//         await this.visit(tenanID);
//         await this.writeTextToField(String.format(this.elementsSelectors.inputField, "username"), user.userName);
//         await this.writeTextToField(String.format(this.elementsSelectors.inputField, "password"), user.password);
//         await this.click(this.elementsSelectors.loginButton);
//         await this.page.locator('#bookmarks').waitFor();
//     }
// }