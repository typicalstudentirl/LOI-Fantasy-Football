import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

// App components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FixtureComponent } from './fixture/fixture.component';
import { LeagueComponent } from './league/league.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoalkeeperTransferComponent } from './transfer/goalkeeper/goalkeeper-transfer.component';
import { DefenderTransferComponent } from './transfer/defender/defender-transfer.component';
import { MidfielderTransferComponent } from './transfer/midfielder/midfielder-transfer.component';
import { ForwardTransferComponent } from './transfer/forward/forward-transfer.component';
import { InfoComponent } from './info/info.component';
// App services
import { AuthGuard } from './guards/auth-guard.service';
import { HomeService } from './home/home.service'
import { RegisterService } from './register/register.service'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FixtureComponent,
    LeagueComponent,
    LoginComponent,
    RegisterComponent,
    GoalkeeperTransferComponent,
    DefenderTransferComponent,
    MidfielderTransferComponent,
    ForwardTransferComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CollapseModule.forRoot(),
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['https://localhost'],
        blacklistedRoutes: []
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'fixture', component: FixtureComponent },
      { path: 'league', component: LeagueComponent},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'goalkeeper', component: GoalkeeperTransferComponent },
      { path: 'defender', component: DefenderTransferComponent },
      { path: 'midfielder', component: MidfielderTransferComponent },
      { path: 'forward', component: ForwardTransferComponent },
      { path: 'info', component: InfoComponent },
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard, HomeService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('currentUser');
}
