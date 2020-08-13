import { async, TestBed } from '@angular/core/testing';
import { GeneralStatisticsComponent } from './general-statistics.component';
describe('GeneralStatisticsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GeneralStatisticsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GeneralStatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=general-statistics.component.spec.js.map