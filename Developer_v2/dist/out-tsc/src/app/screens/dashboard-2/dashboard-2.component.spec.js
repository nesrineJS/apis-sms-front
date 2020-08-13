import { async, TestBed } from '@angular/core/testing';
import { Dashboard2Component } from './dashboard-2.component';
describe('Dashboard2Component', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [Dashboard2Component]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(Dashboard2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard-2.component.spec.js.map