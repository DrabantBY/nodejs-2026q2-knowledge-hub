import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ArticlesModule, CategoriesModule, CommentsModule, UsersModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({ global: true }),
    UsersModule,
    ArticlesModule,
    CategoriesModule,
    CommentsModule,
  ],
})
export class AppModule {}
