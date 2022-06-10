import { Injectable } from '@nestjs/common';
import { KeywordSearchClientValidator } from '../validators/keyword-search-client.validator';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { SearchClientResponseDto } from '../dtos/response/search-client-response.dto';
import { SearchClientQuery } from '../queries/search-client.query';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class SearchClientService {
  constructor(
    private queryBus: QueryBus,
    private keywordSearchClientValidator: KeywordSearchClientValidator,
  ) {}

  async searchClient(
    keyword: string,
  ): Promise<Result<AppNotification, SearchClientResponseDto[]>> {
    const notification: AppNotification =
      await this.keywordSearchClientValidator.validate(keyword);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const searchClientQuery: SearchClientQuery = new SearchClientQuery(
      keyword,
    );

    const searchClientsDto = await this.queryBus.execute(
      searchClientQuery,
    );

    const searchClientResponseDto = searchClientsDto.map(function (
      searchClient,
    ) {
      return new SearchClientResponseDto(
        searchClient.id,
        searchClient.firstName,
        searchClient.lastName,
        searchClient.email,
        searchClient.mySpecialty,
        searchClient.myExperience,
        searchClient.description,
        searchClient.nameGithub,
        searchClient.imgClient,
      );
    });

    return Result.ok(searchClientResponseDto);
  }
}
