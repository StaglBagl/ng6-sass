import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
  	this.createForm();
  }

  createForm() {
  	this.updateForm = this.fb.group({
      title: ['', Validators.required],
      resp: '',
      desc: '',
      severity: '',
      status: ''
    });
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  	  this.id = params.id;
  	  this.issueService.getIssueById(this.id).subscribe(res => {
  	  	  this.issue = res;
  	  	  this.updateForm.get('title').setValue(this.issue.title);
  	  	  this.updateForm.get('resp').setValue(this.issue.resp);
  	  	  this.updateForm.get('desc').setValue(this.issue.desc);
  	  	  this.updateForm.get('severity').setValue(this.issue.severity);
  	  	  this.updateForm.get('status').setValue(this.issue.status);
  	  });
  	});
  }

  updateIssue(title, resp, desc, severity, status) {
  	this.issueService.updateIssue(this.id, title, resp, desc, severity, status).subscribe(() => {
  		this.snackBar.open('Issue updated successfully', 'OK', {
  			duration: 3000
  		});
  	});
  }

}
