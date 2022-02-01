import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      id: 0,
      name: '',
      surname: '',
      age: 0,
      profession: '',
    });
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      console.log(this.userId);
      if (this.userId !== null) {
        this.userService.getUser(this.userId).subscribe((result) => {
          this.userForm.patchValue({
            id: result.id,
            name: result.name,
            surname: result.surname,
            age: result.age,
            profession: result.profession,
          });
        });
      }
    });
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length + 1);
    this.userService.postUser(this.userForm.value).subscribe({
      next: (response: User) => {
        alert(`User ${response.name} ${response.surname} added successfully!`);
      },
      error: (err) => {
        console.log('ERROR FOUND.' + err);
      },
      complete: () => {
        this.userForm.reset();
        this.router.navigate(['/']);
      },
    });
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe({
      next: (result) => {
        alert('User updated successfully!');
      },
      error: (err) => {
        console.log('Error to update' + err);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  actionButton() {
    if (this.userId !== null) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}
