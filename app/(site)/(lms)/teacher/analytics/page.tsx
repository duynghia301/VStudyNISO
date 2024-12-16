import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";

const AnalyticsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalRevenue} label="Total Revenue" shouldFormat />
        <DataCard value={totalSales} label="Total Sales" shouldFormat={false} />
      </div>
      
      {data.map((item) => (
        <div key={item.name} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DataCard value={item.total} label={item.name} shouldFormat />
        </div>
      ))}
    </div>
  );
};

export default AnalyticsPage;
