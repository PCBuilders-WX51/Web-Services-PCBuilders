import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { ComponentsModule } from './components/components.module';
import { CompaniesModule } from './companies/companies.module';
import { PaymentsModule } from './payments/payments.module';
import { AnnouncementsModule} from './announcement/announcements.module';

@Module({
  imports: [
    ClientsModule,
    CompaniesModule,
    ComponentsModule,
    PaymentsModule,
    AnnouncementsModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
