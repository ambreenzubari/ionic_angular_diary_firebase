import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },

  {
    path:'contacts',
    children:[
      {
        path: '',
        loadChildren: () => import('./auth/home-component/home-component.module').then( m => m.HomeComponentPageModule)
      },
      {
        path: 'addContact',
        loadChildren: () => import('./Contacts/add-contact/add-contact.module').then( m => m.AddContactPageModule)
      },
      {
        path: 'listContacts',
 
        children:[
          
          {
            path:'',
            loadChildren: () => import('./Contacts/list-contacts/list-contacts.module').then( m => m.ListContactsPageModule),
          }
          
          ,{

            // Edit-delete
            path: ':contactId',
            loadChildren: () => import('./Contacts/edit-delete-contact/edit-delete-contact.module').then( m => m.EditDeleteContactPageModule)
          },
        ]
      },

    ]
  }
  // {
  //   path: 'home',
  //   loadChildren: () => import('./auth/home-component/home-component.module').then( m => m.HomeComponentPageModule)
  // },
  // {
  //   path: 'addContact',
  //   loadChildren: () => import('./Contacts/add-contact/add-contact.module').then( m => m.AddContactPageModule)
  // },
  // {
  //   path: 'listContacts',
  //   loadChildren: () => import('./Contacts/list-contacts/list-contacts.module').then( m => m.ListContactsPageModule)
  // },
  // {

  //   // Edit-delete
  //   path: 'contactId',
  //   loadChildren: () => import('./Contacts/edit-delete-contact/edit-delete-contact.module').then( m => m.EditDeleteContactPageModule)
  // },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
