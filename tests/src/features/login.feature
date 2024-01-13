Feature: Login
  As a user
  I want to log in to my account
  So that I can access the application

  Scenario: Successful login
    Given I navigate to the login page
    When I click on close button in popup
    And I click on my profile page
    And I should be logged in successfully
    And I click on username field
    And I click on password field
    When I tab on screen for submit button appear
    When I click on submit button
    Then I directs to home page and loged in 
    Then Close browser


    
