import * as ApolloReact from "@apollo/client/react";
import { GET_STAT_CARDS_AND_BAR_CHARTS } from "./query";
import { BarChart, StatCards } from "@/src/types/backend-data";
import { dummyPieChartRatings } from "@/constants/coursesDummyData";



export function useStats() {
  const { data, loading, error, refetch } = ApolloReact.useQuery<{
    statisticData: {
      barCharts: BarChart[];
      statCards: StatCards;
    };
  }>(GET_STAT_CARDS_AND_BAR_CHARTS);

  const barChartsWithRateAverage = (data?.statisticData?.barCharts ?? []).map((chart, i) => ({
    ...chart,
    rateAverage: 4.0 + (i % 3) * 0.2,
  }));

  return {
    barCharts: barChartsWithRateAverage,
    statCards: data?.statisticData?.statCards,
    loading,
    error,
    refetch,
    pieChartRatings: dummyPieChartRatings,
  };
}
