import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthorizedComponent } from "./authorized/authorized.component"

export const Router: Routes = [
	{path: "authorized", component: AuthorizedComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(Router)],
	exports: [RouterModule],
})
export class SegurancaRouterModule {}
