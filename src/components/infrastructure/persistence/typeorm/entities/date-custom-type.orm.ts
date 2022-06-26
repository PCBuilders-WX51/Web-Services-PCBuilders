import { Column } from 'typeorm';

export class DateCustomTypeOrm {
  @Column('date', { name: 'date', nullable: false })
  public date: string;

  private constructor(
    date: string
  ) {
    this.date = date;
  }

  public static from(date: string) {
    return new DateCustomTypeOrm(date);
  }
  public static of(
    day: number,
    month: number,
    year: number
  ) {
    let  date = `${day}/${month}/${year}`;
    return new DateCustomTypeOrm(date);
  }
}
