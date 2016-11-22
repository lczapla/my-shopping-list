import { Component } from '@angular/core';

@Component({
    selector: 'test',
    template: require('./test.component.html')
})
export class TestComponent {
    public someText = "tatata";

    public doSomething() {
        this.someText = "buuuuuuu";
    }
}