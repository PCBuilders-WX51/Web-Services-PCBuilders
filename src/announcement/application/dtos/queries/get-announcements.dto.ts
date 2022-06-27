import { ApiProperty } from '@nestjs/swagger';

export class GetAnnouncementsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public requiredLiking: string;
  @ApiProperty()
  public visible: boolean;
  @ApiProperty()
  public companyId: number;
}
