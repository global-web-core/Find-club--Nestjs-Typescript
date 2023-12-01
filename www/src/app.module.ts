import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LanguagesModule } from './modules/languages/languages.module';
import { PrismaService } from './prisma.service'
import { CheckApiKeyMiddleware } from './modules/http/middleware/check-api-key.middleware';
import { DesiresModule } from './modules/desires/desires.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './modules/http/interceptors/transformResponse.interceptor';
import { HttpErrorService } from './modules/http/services/http-error.service';
import { AccountsModule } from './modules/accounts/accounts.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { TransformToQueryPrisma } from './modules/http/services/transform-to-query-prisma.service';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UsersModule } from './modules/users/users.module';
import { VerificationtokensModule } from './modules/verificationtokens/verificationtokens.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoriesByInterestsModule } from './modules/categoriesByInterests/categoriesByInterests.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CitiesByCountriesModule } from './modules/citiesByCountries/citiesByCountries.module';
import { CountriesModule } from './modules/countries/countries.module';
import { InterestsModule } from './modules/interests/interests.module';
import { InterestsByCitiesModule } from './modules/interestsByCities/interestsByCities.module';
import { LanguageTranslationsEnModule } from './modules/languageTranslationsEn/languageTranslationsEn.module';
import { LanguageTranslationsRuModule } from './modules/languageTranslationsRu/languageTranslationsRu.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), LanguagesModule, DesiresModule, AccountsModule, MeetingsModule, SessionsModule, UsersModule, VerificationtokensModule, CategoriesModule, CategoriesByInterestsModule, CitiesModule, CitiesByCountriesModule, CountriesModule, InterestsModule, InterestsByCitiesModule, LanguageTranslationsEnModule, LanguageTranslationsRuModule],
	providers: [PrismaService, HttpErrorService, TransformToQueryPrisma, {
		provide: APP_INTERCEPTOR,
		useClass: TransformResponseInterceptor,
	}],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckApiKeyMiddleware)
      .forRoutes(
				{ path: '*', method: RequestMethod.POST },
        { path: '*', method: RequestMethod.PUT },
        { path: '*', method: RequestMethod.PATCH },
        { path: '*', method: RequestMethod.DELETE },
			);
  }
}
