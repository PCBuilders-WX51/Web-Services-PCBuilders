Feature: Search Client with API

  Scenario: Search Client
    Given the endpoint http://localhost:8080/search-Clients/{keyword} is available
    When a search Client request is sent with keyword 'software'
    Then the result is success for search request