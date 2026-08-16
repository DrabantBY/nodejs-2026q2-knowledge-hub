import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import {
  ArticlesModule,
  CategoriesModule,
  CommentsModule,
  PrismaModule,
  UsersModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({ global: true }),
    PrismaModule,
    UsersModule,
    ArticlesModule,
    CategoriesModule,
    CommentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
