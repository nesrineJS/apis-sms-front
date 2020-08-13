import { async, TestBed } from '@angular/core/testing';
import { StatByDlrComponent } from './stat-by-dlr.component';
describe('StatByDlrComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [StatByDlrComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(StatByDlrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stat-by-dlr.component.spec.js.map