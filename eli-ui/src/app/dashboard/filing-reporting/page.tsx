import FilingReportingTab from "../filing-reporting-tab"
import { ReportHistory } from "../report-history"
import { Separator } from "@/components/ui/separator"

export default function FilingReportingPage() {
  return (
    <div className="">
      <FilingReportingTab />
      <Separator className="my-8" />
      <ReportHistory />
    </div>
  )
}

