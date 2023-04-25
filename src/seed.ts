import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  // console.log(app);
  const seedService = app.get(SeedService);
  await seedService.createSeedData();
};
bootstrap().then();
