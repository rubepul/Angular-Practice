// This is a built attribute directive to enhance the built in anchor element
import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./learning-resources/log.directive";

/* 
    The a in front of the attribute selectors specifies that the directive should
    be applied to anchor elements that have the SafeLink atrribute and no other elements.
*/
@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event )'
    },
    hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
    queryParam = input('myapp');

    // HTMLAnchorElement is wrapped by ElementRef wrapper object
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('SafeLinkDirective is active!')
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');

        if (wantsToLeave) {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
            return;
        }
        event.preventDefault();
    }
}