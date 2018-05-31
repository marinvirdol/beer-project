import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { takeUntil, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent implements OnInit, OnDestroy {
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    paginationForm: FormGroup;

    private componentDestroyed: Subject<Component> = new Subject<Component>();

    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.paginationForm = this.buildPaginationForm();
        this.paginationForm.valueChanges.pipe(
            takeUntil(this.componentDestroyed),
            distinctUntilChanged(),
            switchMap((formValue) => {
                return of(formValue.page);
              })
        ).subscribe((page: number) => {
            if (page) {
                this.pageChanged.emit(page);
            }
        });
    }

    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
    }

    private buildPaginationForm() {
        return this.fb.group({
            page: [1, [Validators.min(1)]],
        });
    }
}
