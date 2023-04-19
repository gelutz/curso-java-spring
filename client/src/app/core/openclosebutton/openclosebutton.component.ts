import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
	selector: "app-openclose-button",
	templateUrl: "./openclosebutton.component.html",
	styleUrls: ["./openclosebutton.component.css"],
	animations: [],
})
export class OpenCloseButtonComponent {
	tooltip = ""
	@Input() isOpen = false

	@Input() activeIcon = ""
	@Input() inactiveIcon = ""

	@Output() clicado = new EventEmitter<boolean>()

	toggle(): void {
		this.isOpen = !this.isOpen
		this.clicado.emit(this.isOpen)
	}
}
