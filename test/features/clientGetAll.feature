Feature: Get Client with API

  Scenario: Get Client
    Given the endpoint http://localhost:8080/Clients is available
    When a get Client request is sent
    Then the result is success
