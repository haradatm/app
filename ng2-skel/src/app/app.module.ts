import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';

import { RestComponent } from './rest/rest.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './chat/socket.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'rest',
    component: RestComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: '**',
    redirectTo: 'chat'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RestComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    // InMemoryWebApiModule.forRoot(HeroData),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
