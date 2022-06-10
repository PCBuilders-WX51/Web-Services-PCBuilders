import { defineFeature, loadFeature } from 'jest-cucumber';
import axios from 'axios';

const feature = loadFeature('test/features/searchClient.feature');

defineFeature(feature, (test) => {
  test('Search Client', ({ given, when, then }) => {
    let url: string;
    let response: any;
    let statusCode: number;

    given(
      /^the endpoint http:\/\/localhost:8080\/search-clients\/{keyword} is available$/,
      function () {
        url = 'http://localhost:8080/search-clients/';
      },
    );
    when(
      /^a search Client request is sent with keyword '([^"]*)'$/,
      async function (keyword: string) {
        url += keyword;
        response = await axios.get(url);
        statusCode = response.status;
      },
    );
    then(/^the result is success for search request$/, function () {
      expect(statusCode).toBe(Number(200));
    });
  });
});
