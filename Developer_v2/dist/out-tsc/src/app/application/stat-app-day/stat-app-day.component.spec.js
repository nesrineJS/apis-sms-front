import { async, TestBed } from '@angular/core/testing';
import { StatAppDayComponent } from './stat-app-day.component';
describe('StatAppDayComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [StatAppDayComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(StatAppDayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stat-app-day.component.spec.js.map