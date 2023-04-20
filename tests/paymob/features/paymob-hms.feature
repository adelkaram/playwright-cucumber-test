Feature: Paymob hms making a payment

    Background:
        Given user logged in with username "admin" and password "Adm1n1234" and tenant ID "278"
        Given user creates a reservation from date "2025-02-11" to date "2025-02-12"
        When user navigates to the created reservation billing screen
        When user clicks on "payment" from tools
        And user clicks on kwentra pay in payment options popup
        And user enters amount "55" in amount filed
        When user selects payment method "Credit Mai - Visa - EGP" from payment methods field


    Scenario: Verify making a success payment without a saved card
        When user clicks on next button
        And user pay with the following card data
            | number           | holderName   | month | year | csv |
            | 5123456789012346 | Test Account | 12    | 25   | 123 |
        Then popup with message "Payment Succeeded" should appear
        And posting with amount "-55" and department "Visa" should appear on row 1


    Scenario Outline: Verify making a failed payment without a saved card
        When user clicks on next button
        And user pay with the following card data
            | number           | holderName   | month | year | csv |
            | 5123456789012349 | Test Account | 12    | 25   | 123 |
        Then popup with message "Payment Failed" should appear

    Scenario: Verify making a payment with full refund
        When user clicks on next button
        And user pay with the following card data
            | number           | holderName   | month | year | csv |
            | 5123456789012346 | Test Account | 12    | 25   | 123 |
        Then popup with message "Payment Succeeded" should appear
        And user cancels the created posting in row ""
        Then posting with amount "" and department "" should appear on row ""

# Scenario: Verify making a payment with partial refund
#     When user selects payment method "" from payment methods field
#     And user selects card from saved credit cards field
#     And user enters amount "" in amount filed
#     And user clicks on "pay now" button
#     Then popup with message "" should appear
#     When user clicks on "dismiss"
#     And user select posting in index ""
#     And user clicks on tools
#     And user clicks on split
#     And user enterss amount to split ""
#     And user clicks on save
#     And user select posting in index ""
#     And user clicks on tools
#     And user clicks on cancel
#     And user enters "" as reason of cancelation
#     And user clicks on save
#     Then posting with amount "" and department "" should appear on row ""


# Scenario: Verify making a success payment with a saved card
#     When user selects payment method "" from payment methods field
#     And user selects card from saved credit cards field
#     And user enters amount "" in amount filed
#     Then department field should be ""
#     When user clicks on "pay now" button
#     Then popup with message "" should appear
#     And posting with amount "" and department "" should appear on row ""

# Scenario: Verify making a success payment with a generated payment link
#     When user selects payment method "" from payment methods field
#     And user enters amount "" in amount filed
#     Then department field should be ""
#     When user clicks on "generate payment link" button
#     Then popup with the link should appear
#     When user open the link in the popup
#     When user enters "" in "card number" field
#     And user enters "" in "card holder name" field
#     And user enters "" in "month" field
#     And user enters "" in "year" field
#     And user enters "" in "cvv" field
#     And user clicks on pay button
#     And user logged in with username "admin" and password "Adm1n1234" and tenant ID ""
#     And user navigates to billing screen of resrvation id "<reservationIdD>"
#     And posting with amount "" and department "" should appear on row ""
