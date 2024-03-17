import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

interface UserSignup {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form!: FormGroup<UserSignup>;
  submitted = false;
  successMessage = null;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.builder.nonNullable.group({
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    });
  }

  onSubmit(event: Event) {
    this.submitted = true;
    if(!(event instanceof SubmitEvent) || this.form.invalid) {
      return;
    }
    this.form.disable();
    this.auth.signUp(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        // Further steps on signup success
      },
      error: (err) => {
        this.form.enable();
        this.successMessage = null;
      }
    });
  }
}
