import { async, TestBed } from '@angular/core/testing';
import { ApplicationStatisticsComponent } from './application-statistics.component';
describe('ApplicationStatisticsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ApplicationStatisticsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ApplicationStatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=application-statistics.component.spec.js.map