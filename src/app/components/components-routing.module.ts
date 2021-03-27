import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';

import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(`./users/chat.module`).then(m => m.ChatsModule),
      },
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
    ]
  },
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ComponentsRoutingModule { }
