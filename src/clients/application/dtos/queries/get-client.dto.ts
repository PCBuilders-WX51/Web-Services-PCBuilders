import { ApiProperty } from '@nestjs/swagger';

export class GetClientsDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public myLiking: string;
  @ApiProperty()
  public description: string;
}
