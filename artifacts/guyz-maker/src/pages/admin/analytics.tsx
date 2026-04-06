import { useGetAnalyticsStats, useGetDailyViews, useListPageViews } from "@workspace/api-client-react";
import AdminLayout from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, TrendingUp, Calendar, BarChart2, Globe } from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  loading,
}: {
  title: string;
  value: number | string | null | undefined;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="w-4 h-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-3xl font-bold font-orbitron">{value ?? 0}</div>
        )}
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-bold text-primary">{payload[0].value} vues</p>
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const { data: stats, isLoading: loadingStats } = useGetAnalyticsStats({ days });
  const { data: daily, isLoading: loadingDaily } = useGetDailyViews({ days });
  const { data: pages, isLoading: loadingPages } = useListPageViews({ days, limit: 10 });

  const chartData = Array.isArray(daily) ? daily.map(d => ({
    date: d.date ? format(new Date(d.date), "d MMM", { locale: fr }) : 'Unknown',
    views: d.views,
  })) : [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-gray-900 tracking-tight">Statistiques</h1>
            <p className="text-gray-500 mt-1">Visites du site et analyse des performances.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={days.toString()} onValueChange={(value) => setDays(parseInt(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 jours</SelectItem>
                <SelectItem value="30">30 jours</SelectItem>
                <SelectItem value="90">90 jours</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.reload()}
            >
              Actualiser
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Vues totales"
          value={stats?.totalViews}
          subtitle="depuis le début"
          icon={Eye}
          loading={loadingStats}
        />
        <StatCard
          title="Vues aujourd'hui"
          value={stats?.todayViews}
          subtitle={days === 30 ? "aujourd'hui" : `sur ${days} jours`}
          icon={Calendar}
          loading={loadingStats}
        />
        <StatCard
          title="Vues cette semaine"
          value={stats?.weekViews}
          subtitle="7 derniers jours"
          icon={TrendingUp}
          loading={loadingStats}
        />
        <StatCard
          title="Pages suivies"
          value={stats?.uniquePages}
          subtitle={stats?.topPage ? `Top : ${stats.topPage}` : undefined}
          icon={Globe}
          loading={loadingStats}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-orbitron text-base">
              <BarChart2 className="w-5 h-5 text-primary" />
              Visites par jour ({days} jours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDaily ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0064ff" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#0064ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#0064ff"
                    strokeWidth={2}
                    fill="url(#colorViews)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#0064ff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron text-base">Pages les plus vues ({days} jours)</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPages ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : Array.isArray(pages) && pages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Aucune donnée encore.</p>
            ) : (
              <div className="space-y-2">
                {Array.isArray(pages) && pages.map((p, i) => {
                  const max = Array.isArray(pages) && pages.length > 0 ? pages[0]?.views ?? 1 : 1;
                  const pct = Math.round((p.views / max) * 100);
                  return (
                    <div key={p.path}>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-medium text-gray-700 truncate max-w-[150px]" title={p.path}>
                          {p.path === "/" ? "Accueil" : p.path}
                        </span>
                        <span className="text-primary font-bold">{p.views}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-orbitron text-base">Détail par page ({days} jours)</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPages ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 text-xs font-medium text-gray-400 pb-2 uppercase tracking-wide">
                  <span className="col-span-2">Page</span>
                  <span className="text-right">Vues</span>
                  <span className="text-right">Dernière visite</span>
                </div>
                {Array.isArray(pages) && pages.map(p => (
                  <div key={p.path} className="grid grid-cols-4 text-sm py-2.5 hover:bg-gray-50">
                    <span className="col-span-2 font-medium text-gray-700 truncate" title={p.path}>{p.path}</span>
                    <span className="text-right font-bold text-primary">{p.views}</span>
                    <span className="text-right text-gray-400 text-xs">
                      {p.lastVisit ? format(new Date(p.lastVisit), "d MMM yyyy", { locale: fr }) : 'Never'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
