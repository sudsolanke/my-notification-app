import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class UserService {
    http = inject(HttpClient);
    getUsers(){
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}
