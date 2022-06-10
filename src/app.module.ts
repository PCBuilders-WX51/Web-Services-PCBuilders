import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './applicants/client.module';
//import { JobsApplicationsModule } from './jobs-applicants/jobs-applications.module';
//import { CompaniesModule } from './companies/companies.module';
//import { PaymentsModule } from './payments/payments.module';
//import { AnnouncementsModule} from './announcement/announcements.module';

@Module({
  imports: [
    ClientsModule,
    //CompaniesModule,
    //JobsApplicationsModule,
    //PaymentsModule,
    //AnnouncementsModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
