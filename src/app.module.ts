import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { PrismaService } from './services/prisma/prisma.service';

@Module({
  imports: [CountriesModule],
  providers: [PrismaService],
})
export class AppModule {}
