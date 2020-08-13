import { async, TestBed } from '@angular/core/testing';
import { StatAppDlrComponent } from './stat-app-dlr.component';
describe('StatAppDlrComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [StatAppDlrComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(StatAppDlrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stat-app-dlr.component.spec.js.map