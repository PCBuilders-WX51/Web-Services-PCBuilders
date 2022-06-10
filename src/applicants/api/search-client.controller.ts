import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchClientService } from '../application/services/search-client.service';
import { ApiController } from '../../common/api/api.controller';
import { SearchClientDto } from '../application/dtos/queries/search-client.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';

@ApiBearerAuth()
@ApiTags('search-clients')
@Controller('search-clients')
export class SearchClientController {
  constructor(
    private readonly searchClientService: SearchClientService,
  ) {}

  @Get(':keyword')
  @ApiOperation({ summary: 'Search client by keyword' })
  @ApiResponse({
    status: 200,
    description: 'Clients that match returned',
    type: SearchClientDto,
    isArray: true,
  })
  async searchClient(
    @Param('keyword') keyword: string,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, SearchClientDto[]> =
        await this.searchClientService.searchClient(keyword);
      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
