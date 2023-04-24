import { ChartConfiguration } from "chart.js"

type PieChartOptions = ChartConfiguration<"pie">["options"]
type LineChartOptions = ChartConfiguration<"line">["options"]

type PieChartData = ChartConfiguration<"pie">["data"]
type LineChartData = ChartConfiguration<"line">["data"]
