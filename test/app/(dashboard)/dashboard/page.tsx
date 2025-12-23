"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { MethodComparisonChart } from "@/components/dashboard/method-comparison-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { TopRanking } from "@/components/dashboard/top-ranking"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SystemStatus } from "@/components/dashboard/system-status"
import { useLanguage } from "@/lib/language-context"
import { useSettings } from "@/lib/settings-context"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { dashboardWidgets } = useSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
      </div>

      {/* Stats Cards */}
      {dashboardWidgets.statsCards && <StatsCards />}

      {/* Charts and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {dashboardWidgets.methodChart && (
          <div className="lg:col-span-2">
            <MethodComparisonChart />
          </div>
        )}
        {dashboardWidgets.quickActions && (
          <div>
            <QuickActions />
          </div>
        )}
      </div>

      {/* Top Ranking */}
      {dashboardWidgets.topRanking && <TopRanking />}

      {/* Recent Activity and System Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {dashboardWidgets.recentActivity && <RecentActivity />}
        {dashboardWidgets.systemStatus && <SystemStatus />}
      </div>
    </div>
  )
}
