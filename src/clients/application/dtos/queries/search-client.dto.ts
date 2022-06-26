import { ApiProperty } from '@nestjs/swagger';

export class SearchClientDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public myLiking: string;
  @ApiProperty()
  public description: string;
}
