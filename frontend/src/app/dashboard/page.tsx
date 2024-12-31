import ExpansionBoosterInfo from "@/components/dashboard/ExpansionBoosterInfo";
import { api } from "@/lib/http";
import { DashboardApiResponse } from "../api/dashboard/route";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await api.get<DashboardApiResponse>("dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dashboardData = response.data;
  return (
    <div className="flex flex-row flex-wrap gap-4 items-center">
      {dashboardData.map((d) => {
        return (
          <ExpansionBoosterInfo
            key={d.id}
            imagePath={d.imagePath}
            ownedCards={d.totalOwned}
            totalCards={d.totalCards}
            cardBoosters={d.cardBoosters}
          />
        );
      })}
    </div>
  );
}
