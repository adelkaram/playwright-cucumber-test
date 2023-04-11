Feature: Paymob hms making a payment

    Background:
        Given user logged in with username "admin" and password "Adm1n1234" and tenant ID ""
    #     When user navigates to billing screen of resrvation id "<reservationIdD>"
    #     And user clicks on tools
    #     And user clicks on payment
    #     And user clicks on kwentra pay

    Scenario: Verify making a success payment without a saved card
    #     When user choose payment method "" from payment methods field
    #     And user enter amount "" in amount filed
    #     Then department field should be ""
    #     When user clicks on "next" button
    #     Then paymob popup should be display
    #     And button text should be ""
    #     When user enter "" in "card number" field
    #     And user enter "" in "card holder name" field
    #     And user enter "" in "month" field
    #     And user enter "" in "year" field
    #     And user enter "" in "cvv" field
    #     And user clicks on pay button
    #     Then popup with message "" should be display
    #     And posting with amount "" and department "" should be display


    # Scenario Outline: Verify making a failed payment without a saved card
    #     When user choose payment method "" from payment methods field
    #     And user enter amount "" in amount filed
    #     Then department field should be ""
    #     When user clicks on "next" button
    #     Then paymob popup should be display
    #     And button text should be ""
    #     When user enter "" in "card number" field
    #     And user enter "" in "card holder name" field
    #     And user enter "" in "month" field
    #     And user enter "" in "year" field
    #     And user enter "" in "cvv" field
    #     And user clicks on pay button
    #     Then popup with message "" should be display
    #     Examples:
    #         | cardNumber | month   | year    | cvv   |
    #         | correct    | correct | correct | wrong |


    # Scenario: Verify making a success payment with a saved card
    #     When user choose payment method "" from payment methods field
    #     And user choose card from saved credit cards field
    #     And user enter amount "" in amount filed
    #     Then department field should be ""
    #     When user clicks on "pay now" button
    #     Then popup with message "" should be display
    #     And posting with amount "" and department "" should be display

    # Scenario: Verify making a success payment with a generated payment link
    #     When user choose payment method "" from payment methods field
    #     And user enter amount "" in amount filed
    #     Then department field should be ""
    #     When user clicks on "generate payment link" button
    #     Then popup with the link should be display
    #     When user open the link in the popup
    #     When user enter "" in "card number" field
    #     And user enter "" in "card holder name" field
    #     And user enter "" in "month" field
    #     And user enter "" in "year" field
    #     And user enter "" in "cvv" field
    #     And user clicks on pay button
    #     And user logged in with username "admin" and password "Adm1n1234" and tenant ID ""
    #     And user navigates to billing screen of resrvation id "<reservationIdD>"
    #     And posting with amount "" and department "" should be display

    # Scenario: Verify making a success full refund

    #     When user choose payment method "" from payment methods field
    #     And user choose card from saved credit cards field
    #     And user enter amount "" in amount filed
    #     And user clicks on "pay now" button
    #     Then popup with message "" should be display
    #     When user clicks on "dismiss"
    #     And user select posting in index ""
    #     And user clicks on tools
    #     And user clicks on cancel
    #     And user enter "" as reason of cancelation
    #     And user clicks on save
    #     Then posting with amount "" and department "" should be display

    # Scenario: Verify making a success partial refund
    #     When user choose payment method "" from payment methods field
    #     And user choose card from saved credit cards field
    #     And user enter amount "" in amount filed
    #     And user clicks on "pay now" button
    #     Then popup with message "" should be display
    #     When user clicks on "dismiss"
    #     And user select posting in index ""
    #     And user clicks on tools
    #     And user clicks on split
    #     And user enters amount to split ""
    #     And user clicks on save
    #     And user select posting in index ""
    #     And user clicks on tools
    #     And user clicks on cancel
    #     And user enter "" as reason of cancelation
    #     And user clicks on save
    #     Then posting with amount "" and department "" should be display
