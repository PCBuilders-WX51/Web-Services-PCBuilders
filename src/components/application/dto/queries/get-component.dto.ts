import { ApiProperty } from "@nestjs/swagger";

export class GetComponentDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public companyId: number;
  @ApiProperty()
  public piece: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public announcementId: number;
  @ApiProperty()
  public state: string;
  @ApiProperty()
  public date: string;
}
