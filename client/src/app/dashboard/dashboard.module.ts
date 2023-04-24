import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ChartModule } from "primeng/chart"
import { PanelModule } from "primeng/panel"
import { SharedModule } from "../shared/shared.module"
import { DashboardComponent } from "./component/dashboard.component"
import { DashboardRouterModule } from "./dashboard.router"

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, SharedModule, DashboardRouterModule, PanelModule, ChartModule],
})
export class DashboardModule {}
