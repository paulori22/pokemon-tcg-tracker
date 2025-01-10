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
    <div className="flex flex-row flex-wrap items-center justify-center gap-4">
      {dashboardData.expansionsSets.map((expansionSet) => {
        return (
          <ExpansionBoosterInfo
            key={expansionSet.id}
            imagePath={expansionSet.imagePath}
            ownedCards={expansionSet.totalOwned}
            totalCards={expansionSet.totalCards}
            cardBoosters={expansionSet.cardBoosters}
            higherPullChanceBoosterId={dashboardData.higherPullChanceBoosterId}
          />
        );
      })}
    </div>
  );
}
